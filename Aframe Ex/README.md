# A-Frame 360° Image Experience

A web-based 360° image viewer built with A-Frame that allows users to explore panoramic images in an immersive 3D environment.

## Features

- 360° panoramic image viewing
- Mouse controls for looking around
- Loading screen with progress indication
- Information panel with instructions
- Keyboard shortcuts for enhanced interaction
- Responsive design for different screen sizes
- VR-ready (WebXR compatible)

## Setup Instructions

### 1. Add Your 360° Image

1. Place your 360° image file in the `assets/` folder
2. Rename it to `360-image.jpg` (or update the filename in `index.html`)
3. Supported formats: JPG, PNG, WebP

**Note:** For best results, use equirectangular projection images with 2:1 aspect ratio (e.g., 4096x2048, 8192x4096).

### 2. Run Locally

#### Option 1: Using Python (Recommended)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option 2: Using Node.js
```bash
# Install five-server globally
npm install -g five-server@latest

# Run the server
five-server --port=8000
```

#### Option 3: Using Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

### 3. Access Your Experience

Open your browser and navigate to:
- **Python/Node.js**: `http://localhost:8000`
- **Live Server**: Usually `http://localhost:5500`

## Controls

- **Mouse**: Click and drag to look around
- **R key**: Reset camera rotation
- **F key**: Toggle fullscreen mode
- **Click on info panel**: Toggle visibility

## File Structure

```
├── index.html          # Main HTML file with A-Frame scene
├── styles.css          # Custom CSS styling
├── script.js           # JavaScript for interactivity
├── assets/             # Directory for your 360° images
│   └── 360-image.jpg  # Your 360° image (add this)
└── README.md           # This file
```

## Customization

### Changing the 360° Image
Update the `src` attribute in the `<a-sky>` element in `index.html`:
```html
<a-sky src="assets/your-image-name.jpg" rotation="0 -90 0"></a-sky>
```

### Adjusting Camera Controls
Modify the camera attributes in `index.html`:
```html
<a-camera 
  look-controls="reverseMouseDrag: true; sensitivity: 0.5" 
  wasd-controls="enabled: false">
</a-camera>
```

### Adding Hotspots
You can add interactive hotspots by adding `<a-sphere>` or `<a-box>` entities with click events.

## Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile browsers**: Touch controls supported

## VR Support

The experience is VR-ready and will work with:
- WebXR-compatible browsers
- VR headsets (Oculus Quest, HTC Vive, etc.)
- Mobile VR viewers (Google Cardboard, etc.)

## Troubleshooting

### Image Not Loading
1. Check that the image file exists in the `assets/` folder
2. Verify the filename matches exactly (case-sensitive)
3. Ensure the image is a valid 360° equirectangular format

### Controls Not Working
1. Make sure you're running from a local server (not `file://` protocol)
2. Check browser console for JavaScript errors
3. Try refreshing the page

### Performance Issues
1. Optimize your 360° image size (recommended: 4096x2048 or smaller)
2. Use compressed image formats (JPG for photos, PNG for graphics)
3. Close other browser tabs to free up memory

## License

This project is open source and available under the MIT License.

## Credits

Built with [A-Frame](https://aframe.io/) - A web framework for building virtual reality experiences.
