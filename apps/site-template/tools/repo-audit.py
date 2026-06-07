#!/usr/bin/env python3
import argparse, json, os, importlib.util, sys
from pathlib import Path
from datetime import datetime
from collections import defaultdict

ROOT = Path(__file__).resolve().parent.parent

GROUPS = [
    ('content/es', ROOT / 'content' / 'es'),
    ('content/en', ROOT / 'content' / 'en'),
    ('content/_shared', ROOT / 'content' / '_shared'),
    ('app', ROOT / 'app'),
    ('components', ROOT / 'components'),
    ('lib', ROOT / 'lib'),
    ('docs', ROOT / 'docs'),
    ('tests', ROOT / 'tests'),
]

def count_files():
    counts = defaultdict(int)
    for root_str, dir_path in GROUPS:
        if dir_path.exists():
            counts[root_str] = sum(1 for _ in dir_path.rglob('*') if _.is_file())
    counts['total_scanned'] = sum(counts.values())
    return counts

def size_by_group():
    sizes = defaultdict(int)
    for root_str, dir_path in GROUPS:
        if not dir_path.exists():
            continue
        for f in dir_path.rglob('*'):
            if f.is_file():
                sizes[root_str] += f.stat().st_size
    sizes['total_bytes'] = sum(sizes.values())
    return sizes

def stale_refs():
    patterns = ['TU_NEGOCIO', 'TU_BUSINESS', 'TU_CIUDAD', 'TU_CITY', 'TU_INSTAGRAM',
                '8000000-1', '981 000 000', 'tu-negocio', 'tu-emprendimiento']
    hits = []
    for path in ROOT.rglob('*.json'):
        try:
            text = path.read_text(encoding='utf-8')
        except Exception:
            continue
        rel = path.relative_to(ROOT)
        if any(p in text for p in patterns):
            match = next((p for p in patterns if p in text), None)
            if match:
                hits.append((str(rel), match))
    return hits

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--json', action='store_true')
    args = parser.parse_args()
    counts = count_files()
    sizes = size_by_group()
    stale = stale_refs()
    try:
        site = load_site_json()
        keys = extract_feature_keys(site)
        cross = {'feature_count': len(keys), 'features': sorted(keys)}
    except Exception as e:  # pragma: no cover - defensive
        # validate-refs.py uses a hyphen and cannot be imported by name directly.
        # Load it through importlib.util to provide a fallback module path.
        try:
            spec = importlib.util.spec_from_file_location(
                'validate_refs', ROOT / 'tools' / 'validate-refs.py'
            )
            if spec is not None:
                mod = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(mod)
                site = mod.load_site_json()
                keys = mod.extract_feature_keys(site)
                cross = {'feature_count': len(keys), 'features': sorted(keys)}
            else:
                raise RuntimeError('spec is None for validate-refs.py')
        except Exception as e2:
            cross = {'error': f'cross-ref summary failed: {e} / fallback failed: {e2}'}
    lines = []
    lines.append('=== FILE COUNTS ===')
    for g in ['content/es', 'content/en', 'content/_shared', 'app', 'components', 'lib', 'docs', 'tests']:
        lines.append(f'{g:<20} {counts.get(g,0)}')
    lines.append(f'{"TOTAL":<20} {counts.get("total_scanned",0)}')
    lines.append('\n=== STALE/HARDCODED REF ERORS ===')
    if stale:
        for rel, val in stale[:20]:
            lines.append(f'{rel} -> `{val}`')
    else:
        lines.append('none')
    lines.append('\n=== CROSS-REF SUMMARY ===')
    if 'error' in cross:
        lines.append(cross['error'])
    else:
        lines.append(f"feature_count={cross.get('feature_count',0)}")
    summary = '\n'.join(lines)
    if args.json:
        print(json.dumps({'counts': counts, 'stale': [{'path': r, 'value': v} for r, v in stale[:50]], 'cross_ref': cross, 'generated_at': datetime.utcnow().isoformat()+'Z'}, indent=2))
    else:
        print(summary)

if __name__ == '__main__':
    main()
