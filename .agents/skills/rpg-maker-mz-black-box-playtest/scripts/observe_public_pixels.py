"""Mutating scratch helper: emit one native frame after a frozen public pixel match."""
import argparse
import base64
import json
from pathlib import Path
import subprocess
import sys
import time
import uuid

from public_pixel_predicate import PublicPixelPredicate, PublicPixelReadiness, digest


def capture_code(lease, geometry, nonce):
    binding = json.dumps({"lease": lease, "geometry": geometry, "nonce": nonce})
    return "async (page) => { const binding = " + binding + ";" + """
      const {lease, geometry, nonce} = binding;
      const holder = page[lease.holderProperty];
      if (page.url() !== lease.url || !holder || holder._guid !== lease.holderGuid)
        throw new Error('Owned page/holder differs');
      const session = await page.context().newCDPSession(page);
      const errors = [];
      let owned = false, result;
      const metrics = {width:geometry.width,height:geometry.height,deviceScaleFactor:1,mobile:false};
      try {
        const target = (await session.send('Target.getTargetInfo')).targetInfo;
        if (target.targetId !== lease.targetId || target.browserContextId !== lease.contextId)
          throw new Error('Owned target/context differs');
        const before = await page.evaluate(() => ({timeOrigin:performance.timeOrigin,
          now:performance.now(),visible:document.visibilityState,focused:document.hasFocus(),
          width:innerWidth,height:innerHeight,dpr:devicePixelRatio,locale:navigator.language}));
        if (before.timeOrigin !== lease.timeOrigin || before.visible !== 'visible' || !before.focused ||
            before.width !== geometry.width || before.height !== geometry.height || before.dpr !== 1 ||
            before.locale !== lease.locale)
          throw new Error('Owned document/focus/geometry/locale differs');
        owned = true;
        await session.send('Emulation.setDeviceMetricsOverride', metrics);
        const layout = await session.send('Page.getLayoutMetrics');
        const publicGeometry = await page.evaluate(async () => {
          await document.fonts.ready;
          return {width:innerWidth,height:innerHeight,dpr:devicePixelRatio,locale:navigator.language};
        });
        if (publicGeometry.width !== geometry.width || publicGeometry.height !== geometry.height ||
            publicGeometry.dpr !== 1 || publicGeometry.locale !== lease.locale)
          throw new Error('Native geometry/locale differs');
        const png = await session.send('Page.captureScreenshot', {format:'png',fromSurface:true,
          captureBeyondViewport:false,clip:{x:0,y:0,width:geometry.width,height:geometry.height,scale:1}});
        result = {nonce,target,before,geometry:publicGeometry,layout,data:png.data};
      } catch (error) { errors.push({phase:'capture',message:error.message}); }
      finally {
        try { await session.detach(); }
        catch(error) { errors.push({phase:'detach',message:error.message}); }
        if (owned) {
          try {
            if (page.url() !== lease.url || page[lease.holderProperty] !== holder || holder._guid !== lease.holderGuid)
              throw new Error('Owned page/holder changed before restoration');
            const currentOrigin = await page.evaluate(() => performance.timeOrigin);
            if (currentOrigin !== lease.timeOrigin) throw new Error('Owned document changed before restoration');
            await holder.send('Emulation.clearDeviceMetricsOverride');
            await holder.send('Emulation.setDeviceMetricsOverride', metrics);
          } catch(error) { errors.push({phase:'restore-holder',message:error.message}); }
        }
      }
      const after = await page.evaluate(() => ({timeOrigin:performance.timeOrigin,
        width:innerWidth,height:innerHeight,dpr:devicePixelRatio,now:performance.now(),
        visible:document.visibilityState,focused:document.hasFocus()}));
      if (after.timeOrigin !== lease.timeOrigin || after.width !== geometry.width ||
          after.height !== geometry.height || after.dpr !== 1 || after.visible !== 'visible' || !after.focused ||
          page.url() !== lease.url || page[lease.holderProperty] !== holder || holder._guid !== lease.holderGuid)
        errors.push({phase:'post-capture',message:'Owned document/geometry/focus differs'});
      return {result,after,errors};
    }"""


def tool_result(path):
    envelope = json.loads(path.read_text())
    if envelope.get("error"):
        raise ValueError(f"MCP error: {envelope['error']}")
    result = envelope["result"]
    if result.get("isError"):
        raise ValueError(f"Capture tool error: {result}")
    for block in result["content"]:
        if block.get("type") == "text" and "### Result\n" in block["text"]:
            return json.loads(block["text"].split("### Result\n", 1)[1].split("\n###", 1)[0])
    raise ValueError("Capture result missing")


def observe(contract, transaction, lease_path, transport, output):
    predicate = PublicPixelPredicate(contract, transaction)
    readiness = PublicPixelReadiness(predicate)
    lease = json.loads(Path(lease_path).read_text())
    transport = Path(transport).resolve()
    if digest(transport.read_bytes()) != lease["transportSha256"]:
        raise ValueError("Frozen capture transport hash differs")
    if type(lease["observationDeadlineSeconds"]) not in (int, float) or not 0 < lease["observationDeadlineSeconds"] <= 60:
        raise ValueError("Observation resource deadline must be within 0..60 seconds")
    if type(lease["captureTimeoutSeconds"]) not in (int, float) or not 0 < lease["captureTimeoutSeconds"] <= lease["observationDeadlineSeconds"]:
        raise ValueError("Capture timeout must be positive and fit the observation budget")
    output = Path(output).resolve()
    output.mkdir(parents=True, exist_ok=False)
    report = {"schema": "public-pixel-observation-report/v1", "status": "NOT_MATCHED",
              "transaction": transaction, "contractSha256": predicate.sha256,
              "leaseSha256": digest(Path(lease_path).read_bytes()), "samples": [],
              "startedEpochNs": str(time.time_ns()), "startedMonoNs": str(time.monotonic_ns()),
              "remoteOperationMayStillBeRunning": False,
              "limits": "Only frozen regions matched. The player must inspect the emitted whole frame. Deadline is a resource bound, not completion or permission for input."}
    deadline = time.monotonic() + lease["observationDeadlineSeconds"]
    try:
        while time.monotonic() < deadline:
            index = len(report["samples"])
            nonce = str(uuid.uuid4())
            request = output / f"capture-{index:04d}-request.json"
            response = output / f"capture-{index:04d}-response.json"
            request.write_text(json.dumps({"name": "browser_run_code_unsafe", "arguments": {
                "code": capture_code(lease, predicate.geometry, nonce)}}))
            if deadline - time.monotonic() < lease["captureTimeoutSeconds"]:
                break
            subprocess.run(["node", str(transport), "tools/call", str(request), str(response)],
                           stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, check=True,
                           timeout=lease["captureTimeoutSeconds"])
            sample = tool_result(response)
            if sample["errors"]:
                raise ValueError(f"Capture lifecycle errors: {sample['errors']}")
            if sample["result"]["nonce"] != nonce:
                raise ValueError("Stale or unbound capture response")
            raw = base64.b64decode(sample["result"]["data"], validate=True)
            match = predicate.match(raw)
            ready = readiness.observe(match)
            (output / "last-sample.png").write_bytes(raw)
            report["samples"].append({"index": index, "nonce": nonce, "response": response.name,
                                      "observedMonoNs": str(time.monotonic_ns()), "readiness": ready, **match})
            if time.monotonic() >= deadline:
                break
            if ready["ready"]:
                (output / "observation.png").write_bytes(raw)
                report.update(status="MATCH", image="observation.png", imageSha256=digest(raw))
                break
        if report["status"] != "MATCH":
            report["status"] = "UNMET_RESOURCE_BOUND"
    except (ValueError, KeyError, TypeError, OSError, subprocess.SubprocessError) as error:
        report.update(status="SENSOR_ERROR", error={"type": type(error).__name__, "message": str(error)})
        if isinstance(error, (subprocess.CalledProcessError, subprocess.TimeoutExpired)) and error.stderr:
            report["error"]["stderr"] = error.stderr.decode("utf-8", errors="replace")
        if isinstance(error, subprocess.SubprocessError):
            report["remoteOperationMayStillBeRunning"] = True
    finally:
        report["finishedEpochNs"] = str(time.time_ns())
        report["finishedMonoNs"] = str(time.monotonic_ns())
        (output / "report.json").write_text(json.dumps(report, indent=2) + "\n")
    return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    for name in ("contract", "transaction", "lease", "transport", "output"):
        parser.add_argument("--" + name, required=True)
    args = parser.parse_args()
    try:
        result = observe(args.contract, args.transaction, args.lease, args.transport, args.output)
    except (ValueError, KeyError, TypeError, OSError) as error:
        print(json.dumps({"status": "INVALID", "error": str(error)}), file=sys.stderr)
        raise SystemExit(2)
    print(json.dumps({key: result[key] for key in ("status", "transaction", "contractSha256")}
                     | {"output": str(Path(args.output).resolve()), "samples": len(result["samples"])}),
          file=sys.stdout if result["status"] == "MATCH" else sys.stderr)
    raise SystemExit(0 if result["status"] == "MATCH" else 1)
