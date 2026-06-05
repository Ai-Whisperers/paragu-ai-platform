#!/usr/bin/env python3
"""Fix all small JSON files that should be images."""
import os
import json
import requests
from pathlib import Path

IMAGES_DIR = Path("/home/ai-whisperers/site-template/public/images")
MAX_SIZE = 10000  # files under 10KB are probably JSON metadata

def fix_images():
    fixed = 0
    errors = 0

    for png_file in IMAGES_DIR.rglob("*.png"):
        if png_file.stat().st_size < MAX_SIZE:
            try:
                with open(png_file, 'r') as f:
                    content = f.read()

                # Check if it's JSON
                if '"images"' in content:
                    data = json.loads(content)
                    if 'images' in data and len(data['images']) > 0:
                        url = data['images'][0]['url']
                        print(f"Downloading: {png_file.relative_to(IMAGES_DIR)}")

                        resp = requests.get(url, timeout=30)
                        if resp.status_code == 200 and len(resp.content) > MAX_SIZE:
                            with open(png_file, 'wb') as f:
                                f.write(resp.content)
                            print(f"  Fixed: {resp.headers.get('content-length', '?')} bytes")
                            fixed += 1
                        else:
                            print(f"  Failed: status={resp.status_code}, size={len(resp.content)}")
                            errors += 1
            except Exception as e:
                print(f"Error: {png_file}: {e}")
                errors += 1

    print(f"\nFixed: {fixed}, Errors: {errors}")

if __name__ == "__main__":
    fix_images()