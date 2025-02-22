@echo off
setlocal enabledelayedexpansion

echo Checking ImageMagick installation...

:: Check if ImageMagick is installed
where magick >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ImageMagick is not installed. Please install it from https://imagemagick.org/script/download.php#windows
    exit /b 1
)

:: Create icons directory
if not exist "public\icons" mkdir "public\icons"

:: Check if source image exists
if not exist "public\ur_logo.png" (
    echo Source image public\ur_logo.png not found!
    exit /b 1
)

echo Generating icons...

:: Generate standard icons
set SIZES=72 96 128 144 152 192 384 512
for %%s in (%SIZES%) do (
    echo Generating %%sx%%s icon...
    magick "public\ur_logo.png" -resize %%sx%%s "public\icons\icon-%%sx%%s.png"
)

:: Generate Apple touch icons
echo Generating Apple touch icons...
magick "public\ur_logo.png" -resize 180x180 "public\icons\apple-touch-icon.png"
magick "public\ur_logo.png" -resize 152x152 "public\icons\touch-icon-ipad.png"
magick "public\ur_logo.png" -resize 180x180 "public\icons\touch-icon-iphone-retina.png"
magick "public\ur_logo.png" -resize 167x167 "public\icons\touch-icon-ipad-retina.png"

:: Generate splash screens
echo Generating splash screens...
set SPLASH_SIZES=640x1136 750x1334 828x1792 1125x2436 1242x2688 1536x2048 1668x2224 1668x2388 2048x2732

for %%s in (%SPLASH_SIZES%) do (
    echo Generating splash screen %%s...
    magick -size %%s xc:white "public\icons\splash-%%s.png"
    
    for /f "tokens=1,2 delims=x" %%a in ("%%s") do (
        set /a "width=%%a"
        set /a "height=%%b"
        if %%a lss %%b (
            set /a "logo_size=%%a * 40 / 100"
        ) else (
            set /a "logo_size=%%b * 40 / 100"
        )
        magick "public\icons\splash-%%s.png" "public\ur_logo.png" -resize !logo_size!x!logo_size! -gravity center -composite "public\icons\splash-%%s.png"
    )
)

:: Generate favicon
echo Generating favicon...
magick "public\ur_logo.png" -resize 16x16 "public\ur_logo.png" -resize 32x32 "public\ur_logo.png" -resize 48x48 "public\favicon.ico"

echo Icon generation completed!
echo Generated files:
dir "public\icons"  