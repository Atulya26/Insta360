@echo off
title A-Frame 360° Experience Startup

echo 🚀 Starting A-Frame 360° Image Experience...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Python found. Starting server...
    echo 🌐 Open your browser and go to: http://localhost:8000
    echo 📱 Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else (
    echo ❌ Python not found. Please install Python or use Node.js.
    echo.
    echo Alternative options:
    echo 1. Install Python: https://www.python.org/downloads/
    echo 2. Use Node.js: npm install -g five-server ^&^& five-server --port=8000
    echo 3. Use VS Code Live Server extension
    echo.
    pause
)
