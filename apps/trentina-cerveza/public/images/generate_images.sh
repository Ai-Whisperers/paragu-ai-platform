#!/bin/bash
# Generate missing beer/brewery images using inference.sh (fallback to WebAAI)

echo "Checking available image gen tools..."

# Try fal for image gen
which fal 2>/dev/null && echo "fal available" || echo "fal not found"

# Check if we have any image generation CLI
for cmd in fal sd modest python3; do
    which $cmd 2>/dev/null && echo "$cmd: found" || echo "$cmd: not found"
done

echo "---"
echo "Available image generation options:"
echo "1. Use WebAAI (web.studio.aaai.dev) - requires browser"
echo "2. Use inference.sh CLI (infsh) if available"  
echo "3. Download from source sites"
echo "4. Ask Ivan to provide photos"
