#!/bin/bash

# Debug information
echo "Current directory: $(pwd)"
echo "Script location: $0"
ls -la public/ur_logo.png

# Create icons directory
mkdir -p public/icons

# Try a single conversion
convert public/ur_logo.png -resize 72x72 public/icons/icon-72x72.png

# Check the result
if [ $? -eq 0 ]; then
    echo "Test conversion successful"
    ls -la public/icons/icon-72x72.png
else
    echo "Test conversion failed"
    # Check ImageMagick version and capabilities
    convert -version
    # Check if ImageMagick has proper permissions
    ls -l $(which convert)
fi