# Assets Directory

This directory is for storing your 360° panoramic images.

## How to Add Your 360° Image

1. **Place your 360° image file here**
2. **Rename it to `360-image.jpg`** (or update the filename in `index.html`)
3. **Supported formats**: JPG, PNG, WebP

## Image Requirements

- **Format**: Equirectangular projection (2:1 aspect ratio)
- **Recommended sizes**: 4096x2048, 8192x4096, or 2048x1024
- **File size**: Keep under 10MB for optimal performance
- **Quality**: High quality images work best

## Example Filenames

- `360-image.jpg` (default - update index.html if using this)
- `my-panorama.jpg` (custom name - update index.html accordingly)
- `vacation-360.png` (custom name - update index.html accordingly)

## Updating the HTML

If you use a different filename, update the `src` attribute in `index.html`:

```html
<!-- Change this line in index.html -->
<a-sky src="assets/your-image-name.jpg" rotation="0 -90 0"></a-sky>
```

## Testing

After adding your image:
1. Start the local server (see main README.md)
2. Open `http://localhost:8000` in your browser
3. You should see your 360° image as a spherical background
4. Use mouse to look around and explore the panorama

## Troubleshooting

- **Image not showing**: Check file path and format
- **Poor quality**: Use higher resolution images
- **Slow loading**: Compress large images or use smaller sizes
- **Distorted view**: Ensure image is equirectangular projection
