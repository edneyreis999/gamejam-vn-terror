from pathlib import Path
p=Path('rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js');s=p.read_text()
assert 'function deriveVisualComposition' not in s
s=s.replace(' * @command Present\n',''' * @command Focus
 * @text Foco por posição
 * @arg slot
 * @text Picture em destaque (0 = neutro)
 * @type number
 * @min 0
 * @max 65
 * @default 60
 * @arg listenerScale
 * @text Escala do ouvinte (% da entrada)
 * @type number
 * @min 1
 * @max 100
 * @default 90
 * @arg listenerTone
 * @text Tom do ouvinte [R,G,B,cinza]
 * @type string
 * @default [-24,-24,-24,0]
 * @arg offset
 * @text Recuo horizontal do ouvinte
 * @type number
 * @min 0
 * @max 100
 * @default 16
 * @arg duration
 * @text Duração em frames
 * @type number
 * @min 0
 * @max 60
 * @default 20
 * @command Present
''',1)
point=s.index('  function dialogueSlots(id)')
s=s[:point]+'''  function validFocusCommand(p, slots) {
    if (p.length !== 4 || p[0] !== 'Dryland_EventBridge' || p[1] !== 'Focus' || typeof p[2] !== 'string') return false;
    const a = p[3];
    if (!a || Object.keys(a).sort().join(',') !== 'duration,listenerScale,listenerTone,offset,slot' ||
        Object.values(a).some(value => typeof value !== 'string')) return false;
    for (const [key, min, max] of [['slot', 0, 65], ['listenerScale', 1, 100], ['offset', 0, 100], ['duration', 0, 60]]) {
      if (!literalNumber(a[key]) || !Number.isInteger(Number(a[key])) || Number(a[key]) < min || Number(a[key]) > max) return false;
    }
    if (Number(a.slot) !== 0 && !slots.has(Number(a.slot))) return false;
    let tone;
    try { tone = JSON.parse(a.listenerTone); } catch { return false; }
    return Array.isArray(tone) && tone.length === 4 && tone.every((v, i) => Number.isInteger(v) && v >= (i === 3 ? 0 : -255) && v <= 255);
  }
  function focusedTargets(bases, args) {
    const active = Number(args.slot), ratio = Number(args.listenerScale) / 100;
    if (active && !bases.has(active)) throw new Error(`Focus on empty dialogue slot: ${active}`);
    return new Map([...bases].map(([slot, base]) => {
      const listening = active !== 0 && slot !== active;
      return [slot, { ...base, x: base.x + (listening && slot !== 65 ? Number(args.offset) * (slot < 63 ? -1 : 1) : 0),
        scaleX: base.scaleX * (listening ? ratio : 1), scaleY: base.scaleY * (listening ? ratio : 1),
        tone: listening ? JSON.parse(args.listenerTone) : [0, 0, 0, 0] }];
    }));
  }
  const visualFamily = id => /^(profile|speech)\\.H[1-8]$/.test(id) ? `tavern.${id.split('.')[1]}` :
    /^(council\\.(challenge|solo|confession|andira)|opinion\\.H[1-8])$/.test(id) ? 'council' : id;

''' + s[point:]
s=s.replace('    const locations = {};\n','    const locations = {};\n    const visualSources = {};\n',1)
s=s.replace('if (!validBustCommand(p, system, slots)) fail();','if (!validBustCommand(p, system, slots) && !validFocusCommand(p, slots)) fail();',1)
s=s.replace("transition = Number(p[3]['Duration:eval']);","transition = Number(p[1] === 'Focus' ? p[3].duration : p[3]['Duration:eval']);",1)
s=s.replace("const match = /^@(passage|speaker|status|source|scene|asset) (.+)$/.exec(line);","const match = /^@(passage|speaker|status|source|scene|asset|visualFrom) (.+)$/.exec(line);")
s=s.replace('locations[id] = { commonEventId: event.id, start, end, indent };','''locations[id] = { commonEventId: event.id, start, end, indent };
        if (meta.visualFrom) visualSources[id] = meta.visualFrom.split(' ');''')
needle='    return freeze({ catalog, locations, helpers, violations });\n  }\n\n  function validateEnvelope'
assert needle in s
s=s.replace(needle,'''    function checkSources(id, ancestry = []) {
      if (ancestry.includes(id)) { issue('invalid_visual_source', id); return; }
      const sources = visualSources[id] || [];
      if (new Set(sources).size !== sources.length) issue('invalid_visual_source', id);
      for (const source of sources) {
        if (!hasOwn(locations, source) || !dialogueSlots(source).size || visualFamily(source) !== visualFamily(id)) issue('invalid_visual_source', id);
        else checkSources(source, [...ancestry, id]);
      }
    }
    for (const id of Object.keys(visualSources)) checkSources(id);
    return freeze({ catalog, locations, helpers, visualSources, violations });
  }

  function deriveVisualComposition(commonEvents, parsed, id, box, variables) {
    if (parsed.violations.length || !parsed.locations[id] || !Number.isInteger(box) || box < 0) throw new Error('Invalid visual composition input');
    const targets = new Map(), bases = new Map();
    function effects(list) {
      const branches = [];
      const enabled = () => branches.every(branch => branch);
      for (const command of list) {
        const p = command.parameters;
        if (command.code === 111) { branches.push(variables[p[1]] === p[3]); continue; }
        if (command.code === 411) { branches[branches.length - 1] = !branches.at(-1); continue; }
        if (command.code === 412) { branches.pop(); continue; }
        if (!enabled()) continue;
        if (command.code === 117) effects(commonEvents[p[0]].list);
        else if (command.code === 357 && p[0] === 'Dryland_EventBridge' && p[1] === 'Focus') {
          for (const [slot, target] of focusedTargets(bases, p[3])) targets.set(slot, target);
        } else if (command.code === 357 && p[0] === 'VisuMZ_2_VNPictureBusts') {
          const args = p[3], name = p[1];
          if (name === 'Basic_EnterBust') {
            const slot = Number(args['PictureID:eval']);
            const target = { enter: clone(args), tone: [0, 0, 0, 0] };
            targets.set(slot, target); bases.set(slot, { ...target });
            continue;
          }
          for (const slot of JSON.parse(args['PictureID:arrayeval']).map(Number)) {
            if (name === 'Basic_ExitBusts') { targets.delete(slot); bases.delete(slot); continue; }
            const target = targets.get(slot);
            if (!target) continue;
            if (name === 'Scale_ScaleTo') Object.assign(target, { scaleX: Number(args['TargetScaleX:str']), scaleY: Number(args['TargetScaleY:str']) });
            if (name === 'Move_MoveToCoordinates') Object.assign(target, { x: Number(args['TargetX:str']), y: Number(args['TargetY:str']) });
            if (name === 'Tone_NormalBust') target.tone = [0, 0, 0, 0];
            if (name === 'Tone_CustomToneBust') target.tone = JSON.parse(args['customTone:eval']);
            if (Number(args['Duration:eval']) === 0 && ['Scale_ScaleTo', 'Move_MoveToCoordinates'].includes(name)) Object.assign(bases.get(slot), target);
          }
        }
      }
    }
    function section(sectionId, selectedBox) {
      for (const source of parsed.visualSources[sectionId] || []) section(source);
      const location = parsed.locations[sectionId], list = commonEvents[location.commonEventId].list.slice(location.start, location.end);
      const texts = list.flatMap((command, index) => command.code === 101 ? [index] : []);
      const end = texts[selectedBox === undefined ? texts.length - 1 : selectedBox];
      if (end === undefined) throw new Error(`Invalid visual text box: ${sectionId}.${selectedBox}`);
      effects(list.slice(0, end));
    }
    section(id, box);
    for (const target of targets.values()) if (![target.x, target.y, target.scaleX, target.scaleY].every(Number.isFinite)) throw new Error(`Incomplete native visual entry: ${id}`);
    return { targets, bases };
  }

  function validateEnvelope''')
s=s.replace('freeze({ parseEventCatalog, validateEnvelope,','freeze({ parseEventCatalog, deriveVisualComposition, validateEnvelope,',1)
s=s.replace("slots: new Set(slots), initialTargets: new Map() }","slots: new Set(slots), initialTargets: new Map(), bases: new Map(), focusTargets: new Map() }")
s=s.replace('    owner.initialTargets.clear();','    owner.initialTargets.clear();\n    owner.bases.clear();\n    owner.focusTargets.clear();',1)
# Extract the existing wrapper so Focus uses its validated lifecycle without recursively recording new bases.
s=s.replace("  Game_Interpreter.prototype.command357 = function(params) {\n", "  function executeBust(interpreter, params, recordBase = true) {\n    return runBust.call(interpreter, params, recordBase);\n  }\n  function runBust(params, recordBase) {\n",1)
s=s.replace("    if (params[1] === 'Basic_EnterBust') {\n      conversation.phase", "    if (params[1] === 'Basic_EnterBust') {\n      conversation.bases.delete(Number(params[3]['PictureID:eval']));\n      conversation.focusTargets.delete(Number(params[3]['PictureID:eval']));\n      conversation.phase",1)
s=s.replace("    conversation.phase = params[1] === 'Basic_ExitBusts'",'''    if (recordBase && !this._drylandRecovery && Number(params[3]['Duration:eval']) === 0 && ['Scale_ScaleTo', 'Move_MoveToCoordinates'].includes(params[1])) {
      for (const slot of JSON.parse(params[3]['PictureID:arrayeval']).map(Number)) {
        const base = conversation.bases.get(slot) || {};
        if (params[1] === 'Scale_ScaleTo') Object.assign(base, { scaleX: Number(params[3]['TargetScaleX:str']), scaleY: Number(params[3]['TargetScaleY:str']) });
        else Object.assign(base, { x: Number(params[3]['TargetX:str']), y: Number(params[3]['TargetY:str']) });
        conversation.bases.set(slot, base);
      }
    }
    if (params[1] === 'Basic_ExitBusts') for (const slot of JSON.parse(params[3]['PictureID:arrayeval']).map(Number)) {
      conversation.bases.delete(slot); conversation.focusTargets.delete(slot);
    }
    conversation.phase = params[1] === 'Basic_ExitBusts' ''',1)
needle="    return result;\n  };\n  const nativeWait = Game_Interpreter.prototype.command230;"
assert needle in s
s=s.replace(needle,'''    return result;
  }
  Game_Interpreter.prototype.command357 = function(params) { return executeBust(this, params); };
  function transformCommands(slot, target, duration) {
    const ids = JSON.stringify([String(slot)]), command = (name, args) => [
      'VisuMZ_2_VNPictureBusts', name, name, { 'PictureID:arrayeval': ids, 'Duration:eval': String(duration), ...args }
    ];
    return [command('Scale_ScaleTo', { 'TargetScaleX:str': String(target.scaleX), 'TargetScaleY:str': String(target.scaleY) }),
      command('Move_MoveToCoordinates', { 'TargetX:str': String(target.x), 'TargetY:str': String(target.y), 'EasingType:str': 'InOutSine', 'FlipDirection:str': 'None' }),
      command('Tone_CustomToneBust', { 'customTone:eval': JSON.stringify(target.tone) })];
  }
  PluginManager.registerCommand('Dryland_EventBridge', 'Focus', function(args) {
    if (!conversation || this._drylandDialogueOwner !== conversation.serial || !validFocusCommand(['Dryland_EventBridge', 'Focus', 'Focus', args], conversation.slots)) {
      return reportRejection('Focus', commandError('invalid_target'));
    }
    const occupied = new Map([...conversation.bases].filter(([slot]) => $gameScreen.picture(slot)));
    for (const [slot, target] of focusedTargets(occupied, args)) {
      if (JSON.stringify(conversation.focusTargets.get(slot)) === JSON.stringify(target)) continue;
      for (const params of transformCommands(slot, target, Number(args.duration))) executeBust(this, params, false);
      conversation.focusTargets.set(slot, target);
    }
  });
  const nativeWait = Game_Interpreter.prototype.command230;''',1)
s=s.replace("    const helper = Object.values(registry.helpers).find(helper => helper.name === `restore.${id}.${box}`);\n    if (!helper) throw new Error(`Missing native restoration recipe: ${id}.${box}`);\n",'')
s=s.replace("    recovery.setup(clone($dataCommonEvents[helper.commonEventId].list), root._eventId);",'''    const composition = deriveVisualComposition($dataCommonEvents, registry, id, box,
      Object.fromEntries([144, 145, 146].map(variable => [variable, $gameVariables.value(variable)])));
    const commands = [];
    for (const [slot, target] of composition.targets) {
      commands.push({ code: 357, indent: 0, parameters: ['VisuMZ_2_VNPictureBusts', 'Basic_EnterBust', 'Basic_EnterBust', { ...target.enter, 'Duration:eval': '0' }] });
      for (const parameters of transformCommands(slot, target, 0)) commands.push({ code: 357, indent: 0, parameters });
    }
    commands.push({ code: 0, indent: 0, parameters: [] });
    owner.bases = composition.bases;
    recovery.setup(commands, root._eventId);''')
# Recovery entry must preserve the freshly derived immutable bases.
s=s.replace("      conversation.bases.delete(Number(params[3]['PictureID:eval']));", "      if (!this._drylandRecovery) conversation.bases.delete(Number(params[3]['PictureID:eval']));",1)
s=s.replace('// The authored restoration helper replaces only the skipped-to prefix.','// Recompose the skipped-to prefix from the same native visual commands.')
p.write_text(s)
