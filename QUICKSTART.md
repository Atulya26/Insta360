# 🚀 Quick Start Guide

## Get Running in 30 Seconds!

### 1. Add Your 360° Image
- Place your 360° image in the `assets/` folder
- Rename it to `360-image.jpg` (or update `index.html`)

### 2. Start the Server
**On Mac/Linux:**
```bash
./start.sh
```

**On Windows:**
```cmd
start.bat
```

**Manual start:**
```bash
python3 -m http.server 8000
```

### 3. Open in Browser
Go to: `http://localhost:8000`

### 4. Enjoy!
- Use mouse to look around
- Press `R` to reset view
- Press `F` for fullscreen

## 🎯 What You Get

- ✅ **360° Image Viewer** - Immersive panoramic experience
- ✅ **Mouse Controls** - Click and drag to explore
- ✅ **Loading Screen** - Professional user experience
- ✅ **Info Panel** - User instructions and controls
- ✅ **Keyboard Shortcuts** - Enhanced interaction
- ✅ **VR Ready** - WebXR compatible
- ✅ **Mobile Friendly** - Touch controls supported
- ✅ **Local Development** - No internet required after setup

## 🔧 Customization

- **Change image**: Update `src` in `<a-sky>` element
- **Adjust controls**: Modify camera attributes
- **Add hotspots**: Insert interactive elements
- **Modify styling**: Edit `styles.css`

## 📱 Supported Browsers

- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## 🎮 Controls

| Action | Control |
|--------|---------|
| Look around | Mouse drag |
| Reset view | R key |
| Fullscreen | F key |
| Toggle info | Click info panel |

## 🚨 Troubleshooting

**Image not showing?**
- Check file exists in `assets/` folder
- Verify filename matches exactly
- Ensure image is 360° equirectangular format

**Controls not working?**
- Must run from local server (not `file://`)
- Check browser console for errors
- Try refreshing the page

**Need help?**
- Check the main `README.md` for detailed instructions
- Review `assets/README.md` for image requirements
