// A-Frame 360° Image Experience JavaScript

(function() {
  const form = document.getElementById('src-form');
  const input = document.getElementById('src-input');
  const typeSelect = document.getElementById('type-input');
  const statusEl = document.getElementById('status');
  const skyContainer = document.getElementById('sky-container');

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function qs(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name) || '';
  }

  function updateQuery(src, type) {
    const url = new URL(window.location.href);
    if (src) url.searchParams.set('src', src);
    else url.searchParams.delete('src');
    if (type && type !== 'auto') url.searchParams.set('type', type);
    else url.searchParams.delete('type');
    history.replaceState(null, '', url.toString());
  }

  function isVideoByExt(url) {
    return /(\.mp4|\.webm|\.ogg)(\?.*)?$/i.test(url);
  }

  function isImageByExt(url) {
    return /(\.jpg|\.jpeg|\.png|\.webp|\.avif)(\?.*)?$/i.test(url);
  }

  function normalizeGoogleDriveURL(url) {
    // Accept share links like https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // Convert to direct download endpoint which often allows range requests
    const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    // Handle open?id=FILE_ID
    const idParam = new URL(url, window.location.origin).searchParams.get('id');
    if (idParam) {
      return `https://drive.google.com/uc?export=download&id=${idParam}`;
    }
    return url;
  }

  function clearMedia() {
    while (skyContainer.firstChild) skyContainer.removeChild(skyContainer.firstChild);
  }

  function loadMedia(src, forcedType) {
    if (!src) {
      setStatus('Idle');
      return;
    }
    let normalized = src.trim();
    if (/drive\.google\.com/.test(normalized)) {
      normalized = normalizeGoogleDriveURL(normalized);
    }

    clearMedia();
    setStatus('Loading…');

    let kind = forcedType && forcedType !== 'auto' ? forcedType : (isVideoByExt(normalized) ? 'video' : (isImageByExt(normalized) ? 'image' : 'image'));

    if (kind === 'video') {
      const video = document.createElement('video');
      video.setAttribute('src', normalized);
      video.setAttribute('crossorigin', 'anonymous');
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.loop = true;
      video.muted = true;
      video.autoplay = true;

      const vs = document.createElement('a-videosphere');
      vs.setAttribute('src', '#dynamicVideo');

      // attach on loadeddata
      video.addEventListener('loadeddata', () => setStatus('Loaded video'));
      video.addEventListener('error', () => setStatus('Failed to load video (CORS or URL?)'));

      // Add to assets for A-Frame linking
      const assets = document.querySelector('a-assets') || (function(){
        const a = document.createElement('a-assets');
        document.querySelector('a-scene').prepend(a);
        return a;
      })();
      video.id = 'dynamicVideo';
      assets.appendChild(video);
      skyContainer.appendChild(vs);
      setStatus('Buffering video…');
    } else {
      const sky = document.createElement('a-sky');
      sky.setAttribute('src', normalized);
      sky.setAttribute('rotation', '0 -90 0');
      sky.addEventListener('load', () => setStatus('Loaded image'));
      sky.addEventListener('error', () => setStatus('Failed to load image (CORS or URL?)'));
      skyContainer.appendChild(sky);
      setStatus('Loading image…');
    }

    updateQuery(normalized, kind);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    loadMedia(input.value, typeSelect.value);
  });

  // Autoload from query params
  const qsSrc = qs('src');
  const qsType = qs('type') || 'auto';
  if (qsSrc) {
    input.value = qsSrc;
    typeSelect.value = qsType;
    loadMedia(qsSrc, qsType);
  }
})();
