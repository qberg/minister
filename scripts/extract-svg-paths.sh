#!/bin/bash
# scripts/extract-svg-paths.sh

# Configuration
SVG_FILE="$HOME/dev/minister/apps/web/public/bg/pattern.svg"
OUTPUT_FILE="./patterns.ts"

# Check if SVG file exists
if [ ! -f "$SVG_FILE" ]; then
	echo "❌ Error: $SVG_FILE not found"
	exit 1
fi

# Extract path 'd' attributes using grep and sed
echo "🔍 Extracting paths from $SVG_FILE..."

# Create output directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

# Extract paths and format as TypeScript array
{
	echo "// Auto-generated from SVG - DO NOT EDIT MANUALLY"
	echo "// Generated: $(date)"
	echo ""
	echo "export const patternPaths: readonly string[] = ["

	# Use sed to extract d attributes (works everywhere)
	sed -n 's/.*d="\([^"]*\)".*/  "\1",/p' "$SVG_FILE" | sed '$ s/,$//'

	echo "] as const;"
	echo ""
	echo "// Total paths: $(grep -c '<path' "$SVG_FILE")"
} >"$OUTPUT_FILE"

# Count and report
PATH_COUNT=$(grep -c '<path' "$SVG_FILE")
echo "✅ Extracted $PATH_COUNT paths to $OUTPUT_FILE"
