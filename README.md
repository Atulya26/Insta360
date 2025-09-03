# Quick 360 Viewer (A-Frame)

Upload 360° images/videos directly or paste URLs. **No more CORS issues!** Files are processed locally in your browser.

- A-Frame 1.7.0 (CDN) — per docs: https://aframe.io/docs/1.7.0/introduction/installation.html
- **File Upload**: Drag & drop or browse for 360° files
- **URL Support**: Still works with direct, CORS-enabled URLs
- **Static Hosting**: Perfect for Vercel, GitHub Pages, Netlify

## ✨ Features

- **📁 File Upload**: Drag & drop 360° images/videos (JPG, PNG, WebP, MP4, WebM, OGG)
- **🔗 URL Loading**: Paste direct URLs (when CORS allows)
- **📱 Responsive**: Works on desktop and mobile
- **🎥 Video Support**: 360° videos with videosphere
- **💾 Local Processing**: Files never leave your device
- **⚡ Instant Preview**: No upload wait time

## 🚀 Deploy to Vercel

1. **Framework Preset**: Other
2. **Build Command**: (leave empty)
3. **Output Directory**: (leave empty)
4. **Root Directory**: `./`
5. **vercel.json** routes `/` to `/index.html`

## 💻 Run Locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## 📖 Usage

### File Upload (Recommended)
1. **Drag & drop** a 360° file onto the upload zone
2. **Or click** the upload zone to browse files
3. **Click "Load in Viewer"** to display
4. **Use mouse/touch** to look around

### URL Loading
1. **Paste a direct URL** to a 360° image/video
2. **Select type** (auto-detect, image, or video)
3. **Click "Load URL"** (requires CORS-enabled host)

### Query Parameters
- `https://your-app.vercel.app/?src=https://example.com/pano.jpg`
- `https://your-app.vercel.app/?src=https://example.com/pano.mp4&type=video`

## 🔧 File Requirements

- **Images**: JPG, PNG, WebP (equirectangular projection)
- **Videos**: MP4, WebM, OGG (equirectangular projection)
- **Size Limit**: 100MB maximum
- **Format**: 2:1 aspect ratio recommended (360° equirectangular)

## 🌐 CORS & Hosting Notes

### File Upload (No CORS Issues!)
- ✅ **Files processed locally** in your browser
- ✅ **No server needed** - works offline
- ✅ **Instant loading** - no network delays
- ✅ **Privacy** - files never leave your device

### URL Loading (May Have CORS Issues)
- ❌ **Google Drive** - often blocks cross-origin
- ❌ **Dropbox** - requires special sharing settings
- ✅ **Cloudflare R2** - CORS-enabled by default
- ✅ **AWS S3** - CORS configurable
- ✅ **GitHub** - CORS-enabled for raw files

## 🏗️ Architecture

- **Frontend Only**: Pure HTML/JS/CSS
- **No Backend**: Static hosting compatible
- **Blob URLs**: Creates temporary URLs for A-Frame
- **Memory Management**: Automatically cleans up resources

## 📁 Files

- `index.html` — Upload interface and A-Frame scene
- `script.js` — File handling, drag & drop, A-Frame integration
- `styles.css` — Responsive UI styling
- `vercel.json` — Static rewrite configuration

## 🎯 Why This Approach?

**Traditional URL-only viewers** have CORS issues:
- ❌ Google Drive links fail
- ❌ Dropbox sharing problems
- ❌ Many hosts block cross-origin
- ❌ Authentication required

**Our upload system** solves everything:
- ✅ **No CORS issues** - files are local
- ✅ **Instant preview** - no network delays
- ✅ **Works offline** - no internet required
- ✅ **Privacy first** - files stay on device

## 📱 Mobile Support

- **Touch controls** for looking around
- **Responsive design** adapts to screen size
- **File picker** works on mobile browsers
- **Drag & drop** on touch devices

## 🔒 Privacy & Security

- **Files never uploaded** to any server
- **Local processing only** in your browser
- **No tracking** or analytics
- **Offline capable** - works without internet

## 📄 License

MIT License - Open source and free to use.
