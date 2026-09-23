"""Verify/apply the proposed 32px MessageCore wrap margin at an explicit path."""
import argparse
import copy
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--file', required=True, type=Path)
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    source = args.file.read_text()
    start = source.index('[')
    current = json.loads(source[start:].strip().rstrip(';'))
    matches = [i for i, p in enumerate(current) if p['name'] == 'VisuMZ_1_MessageCore']
    assert len(matches) == 1
    index = matches[0]
    assert current[index]['status'] is True
    old = current[index]['parameters']['WordWrap:struct']
    wrap = json.loads(old)
    assert wrap['MessageWindow:eval'] == 'true'
    assert wrap['EndPadding:num'] in ['0', '32']
    wrap['EndPadding:num'] = '32'
    desired = copy.deepcopy(current)
    new = json.dumps(wrap, ensure_ascii=False, separators=(',', ':'))
    desired[index]['parameters']['WordWrap:struct'] = new
    if args.write and current != desired:
        target = json.dumps(old, ensure_ascii=False)
        assert source.count(target) == 1
        updated = source.replace(target, json.dumps(new, ensure_ascii=False))
        assert json.loads(updated[start:].strip().rstrip(';')) == desired
        args.file.write_text(updated)
    actual = json.loads(args.file.read_text()[start:].strip().rstrip(';'))
    assert actual == desired
    print('PASS: VisuMZ_1_MessageCore WordWrap EndPadding=32; all unrelated fields preserved')


if __name__ == '__main__':
    main()
