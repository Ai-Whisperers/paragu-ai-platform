from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_JSON = ROOT / "content" / "es" / "site.json"

def load_site_json() -> dict:
    with open(SITE_JSON, "r", encoding="utf-8") as f:
        return json.load(f)

def extract_feature_keys(site_json: dict) -> set[str]:
    return set(site_json.get("features", {}).keys())

def scan_feature_refs(feature_keys: set[str]) -> dict:
    patterns = ["content/en/features", "content/es/features"]
    bad: list[str] = []
    for pattern in patterns:
        for path in ROOT.glob(f"{pattern}/**/*.json"):
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
            except Exception:
                continue
            for key in _flatten(data):
                if key not in feature_keys:
                    bad.append(f"{path}: unknown feature ref `{key}`")
    return {"unknown_feature_refs": bad}

def _flatten(obj, prefix=""):
    out = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            out.extend(_flatten(v, f"{prefix}.{k}" if prefix else k))
    return out

def _find_navs(obj):
    out = []
    if isinstance(obj, dict):
        for nav in obj.get("navigation", {}).values():
            out.extend(nav)
        for v in obj.values():
            out.extend(_find_navs(v))
    elif isinstance(obj, list):
        for item in obj:
            if isinstance(item, dict):
                out.extend(_find_navs(item))
    return out

def scan_links(feature_keys: set[str]) -> dict:
    results = {"dead_links": [], "feature_guarded_links": []}
    for path in ROOT.rglob("*.tsx"):
        text = path.read_text(encoding="utf-8", errors="ignore")
        for href in __import__("re").findall(r"href=\\\"?([^\\\"']+)\\\"?", text):
            if href.startswith("/"):
                results.get("dead_links", []).append(str(path))
    for path in list((ROOT / "content" / "es").glob("*.json")) + list((ROOT / "content" / "en").glob("*.json")):
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            continue
        for item in _find_navs(data):
            if not isinstance(item, dict):
                continue
            feat = item.get("feature")
            if feat and feat not in feature_keys:
                label = item.get("label", "")
                results["feature_guarded_links"].append(f"{path}: nav item `{label}` references unknown feature `{feat}`")
    return results

def main() -> int:
    parser = argparse.ArgumentParser(description="Cross-reference validator")
    parser.add_argument("--feature", action="store_true")
    parser.add_argument("--links", action="store_true")
    parser.add_argument("--all", action="store_true")
    args = parser.parse_args()
    try:
        site = load_site_json()
        feature_keys = extract_feature_keys(site)
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        return 1
    summary = {"version": "0.1.0", "features": sorted(feature_keys), "total_features": len(feature_keys)}
    if args.feature or args.all:
        summary.update(scan_feature_refs(feature_keys))
    if args.links or args.all:
        summary.update(scan_links(feature_keys))
    print(json.dumps(summary, indent=2))
    failed = len(summary.get("unknown_feature_refs", [])) + len(summary.get("feature_guarded_links", []))
    return 1 if failed else 0

if __name__ == "__main__":
    raise(SystemExit(main()))
