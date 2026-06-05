#!/usr/bin/env python3
"""price-propagation.py — copy pricing from content/_shared/pricing.json into docs and markdown references when prices change."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load_pricing() -> dict:
    path = ROOT / "content" / "_shared" / "pricing.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    lines = []
    for tier in data.get("tiers", []):
        name = tier.get("name", "")
        monthly = tier.get("monthlyPrice", 0)
        annual = tier.get("annualPrice", 0)
        lines.append(f"{name}: G. {monthly:,} / mes | G. {annual:,} / año")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()

    block = load_pricing()
    table = f"\n{block}\n"

    files = [
        ROOT / "docs" / "client" / "ONBOARDING_CHECKLIST.md",
        ROOT / "docs" / "content" / "CONTENT_WORKPLAN.md",
        ROOT / "docs" / "features" / "FEATURES.md",
    ]
    for path in files:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        new = re.sub(r"<!-- PRICING_BLOCK -->.*?<!-- END_PRICE_BLOCK -->", f"<!-- PRICING_BLOCK -->{table}<!-- END_PRICE_BLOCK -->", text, flags=re.S)
        changed = new != text
        if args.apply and changed:
            path.write_text(new, encoding="utf-8")
            print(f"updated: {path}")
        elif changed:
            print(f"would update: {path}")

    return 0


if __name__ == "__main__":
    raise(SystemExit(main()))
