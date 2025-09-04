// A-Frame 360° Image Experience JavaScript

(function() {
  // DOM elements
  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById('file-input');
  const fileInfo = document.getElementById('file-info');
  const fileName = document.getElementById('file-name');
  const fileSize = document.getElementById('file-size');
  const fileType = document.getElementById('file-type');
  const loadFileBtn = document.getElementById('load-file-btn');
  const clearFileBtn = document.getElementById('clear-file-btn');
  
  const form = document.getElementById('src-form');
  const input = document.getElementById('src-input');
  const typeSelect = document.getElementById('type-input');
  const statusEl = document.getElementById('status');
  const skyContainer = document.getElementById('sky-container');

  // State
  let currentFile = null;
  let currentBlobUrl = null;

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function validateFile(file) {
    const maxSize = 100 * 1024 * 1024; // 100MB limit
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if (file.size > maxSize) {
      alert(`File too large. Maximum size is ${formatFileSize(maxSize)}`);
      return false;
    }

    if (!allowedImageTypes.includes(file.type) && !allowedVideoTypes.includes(file.type)) {
      alert('Unsupported file type. Please use JPG, PNG, WebP, MP4, WebM, or OGG files.');
      return false;
    }

    return true;
  }

  function displayFileInfo(file) {
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileType.textContent = file.type.split('/')[1].toUpperCase();
    fileInfo.style.display = 'block';
    currentFile = file;
  }

  function clearFile() {
    currentFile = null;
    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
      currentBlobUrl = null;
    }
    fileInfo.style.display = 'none';
    setStatus('Ready to upload or paste URL');
  }

  function clearMedia() {
    while (skyContainer.firstChild) skyContainer.removeChild(skyContainer.firstChild);
  }

  function loadImageFromBlob(blobUrl, filename) {
    console.log('Loading image from blob:', blobUrl);
    const sky = document.createElement('a-sky');
    sky.setAttribute('src', blobUrl);
    sky.setAttribute('rotation', '0 -90 0');
    
    sky.addEventListener('load', () => {
      console.log('Image loaded successfully');
      setStatus(`Loaded: ${filename}`);
    });
    
    sky.addEventListener('error', (e) => {
      console.error('Image load error:', e);
      setStatus('Failed to load image');
      alert('Failed to load the image. Please try a different file.');
    });
    
    console.log('Appending sky to container:', skyContainer);
    skyContainer.appendChild(sky);
  }

  function loadVideoFromBlob(blobUrl, filename) {
    const video = document.createElement('video');
    video.setAttribute('src', blobUrl);
    video.setAttribute('crossorigin', 'anonymous');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.loop = true;
    video.muted = true;
    video.autoplay = true;

    const vs = document.createElement('a-videosphere');
    vs.setAttribute('src', '#dynamicVideo');

    video.addEventListener('loadeddata', () => {
      setStatus(`Loaded: ${filename}`);
    });
    
    video.addEventListener('error', () => {
      setStatus('Failed to load video');
      alert('Failed to load the video. Please try a different file.');
    });

    // Add to assets for A-Frame linking
    const assets = document.querySelector('a-assets') || (function(){
      const a = document.createElement('a-assets');
      document.querySelector('a-scene').prepend(a);
      return a;
    })();
    
    video.id = 'dynamicVideo';
    assets.appendChild(video);
    skyContainer.appendChild(vs);
    setStatus('Buffering video...');
  }

  function loadFile(file) {
    if (!file) return;
    
    console.log('Loading file:', file.name, file.type, file.size);
    clearMedia();
    setStatus('Processing file...');

    // Create blob URL for the file
    currentBlobUrl = URL.createObjectURL(file);
    console.log('Created blob URL:', currentBlobUrl);
    
    // Determine if it's a video or image
    const isVideo = file.type.startsWith('video/');
    console.log('Is video:', isVideo);
    
    if (isVideo) {
      loadVideoFromBlob(currentBlobUrl, file.name);
    } else {
      loadImageFromBlob(currentBlobUrl, file.name);
    }
  }

  // File input change handler
  fileInput.addEventListener('change', (e) => {
    console.log('File input changed');
    const file = e.target.files[0];
    console.log('Selected file:', file);
    if (file && validateFile(file)) {
      console.log('File validated successfully');
      displayFileInfo(file);
      setStatus('File selected. Click "Load in Viewer" to view.');
    } else {
      console.log('File validation failed');
    }
  });

  // Load file button
  loadFileBtn.addEventListener('click', () => {
    if (currentFile) {
      loadFile(currentFile);
    }
  });

  // Clear file button
  clearFileBtn.addEventListener('click', clearFile);

  // Drag and drop handlers
  uploadZone.addEventListener('click', () => {
    fileInput.click();
  });

  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('dragover');
  });

  uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('dragover');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        displayFileInfo(file);
        setStatus('File selected. Click "Load in Viewer" to view.');
      }
    }
  });

  // URL loading functions (existing functionality)
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
    const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    const idParam = new URL(url, window.location.origin).searchParams.get('id');
    if (idParam) {
      return `https://drive.google.com/uc?export=download&id=${idParam}`;
    }
    return url;
  }

  function loadMedia(src, forcedType) {
    if (!src) {
      setStatus('Ready to upload or paste URL');
      return;
    }
    
    let normalized = src.trim();
    if (/drive\.google\.com/.test(normalized)) {
      normalized = normalizeGoogleDriveURL(normalized);
    }

    clearMedia();
    setStatus('Loading URL...');

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

      video.addEventListener('loadeddata', () => setStatus('Loaded video from URL'));
      video.addEventListener('error', () => setStatus('Failed to load video (CORS or URL?)'));

      const assets = document.querySelector('a-assets') || (function(){
        const a = document.createElement('a-assets');
        document.querySelector('a-scene').prepend(a);
        return a;
      })();
      
      video.id = 'dynamicVideo';
      assets.appendChild(video);
      skyContainer.appendChild(vs);
      setStatus('Buffering video from URL...');
    } else {
      const sky = document.createElement('a-sky');
      sky.setAttribute('src', normalized);
      sky.setAttribute('rotation', '0 -90 0');
      sky.addEventListener('load', () => setStatus('Loaded image from URL'));
      sky.addEventListener('error', () => setStatus('Failed to load image (CORS or URL?)'));
      skyContainer.appendChild(sky);
      setStatus('Loading image from URL...');
    }

    updateQuery(normalized, kind);
  }

  // URL form submit
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

  // Initialize and debug
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, checking elements...');
    console.log('Upload zone:', uploadZone);
    console.log('File input:', fileInput);
    console.log('Sky container:', skyContainer);
    console.log('Load file button:', loadFileBtn);
    
    // Check if A-Frame is loaded
    if (typeof AFRAME !== 'undefined') {
      console.log('A-Frame loaded successfully');
    } else {
      console.error('A-Frame not loaded!');
    }
    
    // Make functions available globally for debugging
    window.debug360 = {
      loadFile,
      clearMedia,
      loadImageFromBlob,
      loadVideoFromBlob,
      setStatus,
      currentFile,
      currentBlobUrl
    };
    console.log('Debug functions available as window.debug360');
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
    }
  });
})();
