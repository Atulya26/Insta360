#!/bin/bash

# A-Frame 360° Experience Startup Script

echo "🚀 Starting A-Frame 360° Image Experience..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found. Starting server..."
    echo "🌐 Open your browser and go to: http://localhost:8000"
    echo "📱 Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python found. Starting server..."
    echo "🌐 Open your browser and go to: http://localhost:8000"
    echo "📱 Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8000
else
    echo "❌ Python not found. Please install Python or use Node.js."
    echo ""
    echo "Alternative options:"
    echo "1. Install Python: https://www.python.org/downloads/"
    echo "2. Use Node.js: npm install -g five-server && five-server --port=8000"
    echo "3. Use VS Code Live Server extension"
    echo ""
    read -p "Press Enter to exit..."
fi
