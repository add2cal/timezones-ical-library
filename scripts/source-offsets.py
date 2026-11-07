"""Enumerate complete source offset partitions, never runtime ICU samples.

Run only against a zic-built directory from the selected source release. tzdb's
zdump enumerates POSIX-tail transitions as well as TZif's explicit transitions.
"""
import datetime
import json
import pathlib
import re
import subprocess
import sys
import zoneinfo

root, tools, version, output = sys.argv[1:]
if pathlib.Path(tools, 'version').read_text().strip() != version:
    raise ValueError('Source release does not match selected IANA version')
zdump = str(pathlib.Path(tools, 'zdump').resolve())
db = json.loads(pathlib.Path('src/db/zonesdb.json').read_text())
names = []


def walk(node, prefix=''):
    for key, value in node.items():
        name = prefix + key
        if isinstance(value, list):
            names.append(name)
        else:
            walk(value, name + '/')


walk(db['db'])
# The four library-defined abbreviations retain their established city semantics.
artificial = {'ET': 'America/New_York', 'CT': 'America/Chicago',
              'MT': 'America/Denver', 'PT': 'America/Los_Angeles'}
utc = datetime.timezone.utc
start = datetime.datetime(1800, 1, 1, tzinfo=utc)
end = datetime.datetime(2101, 1, 1, tzinfo=utc)
result = {}
for name in names:
    path = pathlib.Path(root).resolve() / (artificial[name] if name in artificial else name)
    if not path.is_file():
        continue  # Unknown identities must remain uncertified.
    with path.open('rb') as source:
        zone = zoneinfo.ZoneInfo.from_file(source)
    initial_offset = start.astimezone(zone).utcoffset()
    assert initial_offset is not None
    points = {int(start.timestamp()) * 1000: int(initial_offset.total_seconds()) * 1000}
    dump = subprocess.check_output([zdump, '-V', '-c', '1800,2101', str(path)], text=True, env={'LC_ALL': 'C'})
    for line in dump.splitlines():
        match = re.search(r'  (.*?) UT = .* gmtoff=(-?\d+)$', line)
        if not match:
            raise ValueError('Unrecognized zdump output: ' + line)
        when = datetime.datetime.strptime(match[1], '%a %b %d %H:%M:%S %Y').replace(tzinfo=utc)
        if start <= when < end:
            points[int(when.timestamp()) * 1000] = int(match[2]) * 1000
    result[name] = sorted(points.items())
pathlib.Path(output).write_text(json.dumps({'version': version, 'zones': result}, separators=(',', ':')))
print(f'Enumerated complete source partitions for {len(result)} requested names')
