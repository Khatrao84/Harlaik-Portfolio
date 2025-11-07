// -------------------- Element References --------------------
const hero = document.getElementById('hero');
const gallery = document.getElementById('gallery');
const portfolioBtn = document.getElementById('portfolioBtn');
const toggleMode = document.getElementById('toggleMode');
const viewResume = document.getElementById('viewResume');
const resumeModal = document.getElementById('resumeModal');
const closeResume = document.getElementById('closeResume');

let showingPortfolio = false;

// -------------------- Image Configuration --------------------
// Automatically supports 33 images (image1.jpeg to image33.jpeg)
const IMAGES = Array.from({ length: 33 }, (_, i) => `image${i + 1}.jpeg`);

// -------------------- Hero and Gallery Control --------------------
function showHero() {
  gallery.classList.add('hidden');
  hero.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // disable scroll on hero view
}

function showGallery() {
  hero.classList.add('hidden');
  gallery.classList.remove('hidden');
  gallery.innerHTML = '';

  // Start from image2.jpeg (skip first one)
  for (let i = 1; i < IMAGES.length; i++) {
    const img = document.createElement('img');
    img.src = 'images/' + IMAGES[i];
    img.alt = 'Portfolio image ' + (i + 1);
    gallery.appendChild(img);
  }

  document.body.style.overflow = 'auto'; // enable scroll in gallery
}

// -------------------- Portfolio Toggle --------------------
portfolioBtn.addEventListener('click', () => {
  if (showingPortfolio) {
    showHero();
    showingPortfolio = false;
  } else {
    showGallery();
    showingPortfolio = true;
  }
});

// -------------------- Light / Dark Mode Toggle --------------------
toggleMode.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleMode.textContent = document.body.classList.contains('dark')
    ? 'Light Mode'
    : 'Dark Mode';
});

// -------------------- Resume Modal --------------------
viewResume.addEventListener('click', () => {
  resumeModal.style.display = 'flex';
});

closeResume.addEventListener('click', () => {
  resumeModal.style.display = 'none';
});

resumeModal.addEventListener('click', (e) => {
  if (e.target === resumeModal) resumeModal.style.display = 'none';
});

// -------------------- Dynamic Background for Hero (Mobile) --------------------
function setDynamicBackground() {
  const heroImg = document.querySelector('.hero-img');
  if (!heroImg) return;

  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = heroImg.src;

  img.onload = function () {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1;
      canvas.height = 1;
      ctx.drawImage(img, 0, 0, 1, 1);
      const pixel = ctx.getImageData(0, 0, 1, 1).data;
      const avgColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      document.documentElement.style.setProperty('--dynamic-bg', avgColor);
    } catch (err) {
      console.warn('Dynamic background could not be computed:', err);
    }
  };
}

// -------------------- Initialize Page --------------------
showHero();
setDynamicBackground();
