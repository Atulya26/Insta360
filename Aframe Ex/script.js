// A-Frame 360° Image Experience JavaScript

AFRAME.registerComponent('image-loader', {
  init: function() {
    this.el.addEventListener('load', this.onImageLoad.bind(this));
    this.el.addEventListener('error', this.onImageError.bind(this));
  },

  onImageLoad: function() {
    console.log('360° image loaded successfully');
    // Hide loading screen
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Show info panel with fade-in effect
    const infoPanel = document.querySelector('.info-panel');
    if (infoPanel) {
      infoPanel.classList.add('fade-in');
    }
  },

  onImageError: function() {
    console.error('Failed to load 360° image');
    // Show error message
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      const text = loadingScreen.querySelector('a-text');
      if (text) {
        text.setAttribute('value', 'Error: Failed to load image\nPlease check the image path');
        text.setAttribute('color', '#FF0000');
      }
    }
  }
});

// Add image loader component to sky
document.addEventListener('DOMContentLoaded', function() {
  const sky = document.querySelector('a-sky');
  if (sky) {
    sky.setAttribute('image-loader', '');
  }
});

// Handle window resize
window.addEventListener('resize', function() {
  // Adjust camera position based on window size
  const camera = document.querySelector('a-camera');
  if (camera) {
    // You can add responsive adjustments here
  }
});

// Add click event to info panel for interaction
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('info-panel')) {
    // Toggle info panel visibility
    event.target.style.opacity = event.target.style.opacity === '0' ? '0.7' : '0';
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case 'r':
    case 'R':
      // Reset camera rotation
      const camera = document.querySelector('a-camera');
      if (camera) {
        camera.setAttribute('rotation', '0 0 0');
      }
      break;
    case 'f':
    case 'F':
      // Toggle fullscreen
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
      break;
  }
});

// VR mode detection
if (navigator.getVRDisplays) {
  navigator.getVRDisplays().then(function(displays) {
    if (displays.length > 0) {
      console.log('VR display detected:', displays[0].displayName);
      // Enable VR controls if needed
    }
  });
}
