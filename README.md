# Quick 360 Viewer (A-Frame)

Paste any direct 360 image or video URL and view it instantly in the browser. Designed for static hosting (Vercel, GitHub Pages, Netlify).

- A-Frame 1.7.0 (CDN) — per docs: https://aframe.io/docs/1.7.0/introduction/installation.html
- Static HTML/JS/CSS only — no build step
- Query params supported: `?src=...&type=image|video|auto`

## Run locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to Vercel
- Framework Preset: Other
- Build Command: (leave empty)
- Output Directory: (leave empty)
- Root Directory: `./`
- `vercel.json` routes `/` to `/index.html`

## Usage
1. Paste a direct URL to a 360 equirectangular image (`.jpg/.png/.webp`) or video (`.mp4/.webm`).
2. Click Load. Look around with mouse or touch.
3. Or open with query params, e.g.:
   - `https://your-app.vercel.app/?src=https://example.com/pano.jpg`
   - `https://your-app.vercel.app/?src=https://example.com/pano.mp4&type=video`

## Google Drive links
Drive sharing pages are converted to a direct download URL automatically. If the file’s sharing or CORS settings don’t allow cross-origin access, the browser will block it. Prefer a host that serves the file with CORS headers.

## CORS notes
- The remote file must be served with `Access-Control-Allow-Origin: *` (or your origin) for the browser to load it as a texture or video.
- Many cloud drives and CDNs allow this; some don’t. If it fails, try hosting the asset on a static bucket (S3/Cloudflare R2/GCS) with CORS enabled.

## Files
- `index.html` — form and scene
- `script.js` — URL handling and dynamic A-Frame entities
- `styles.css` — minimal responsive UI
- `vercel.json` — static rewrite to `index.html`

## License
MIT
