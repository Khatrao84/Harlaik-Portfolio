const hero = document.getElementById('hero');
const gallery = document.getElementById('gallery');
const portfolioBtn = document.getElementById('portfolioBtn');
const toggleMode = document.getElementById('toggleMode');
const viewResume = document.getElementById('viewResume');
const resumeModal = document.getElementById('resumeModal');
const closeResume = document.getElementById('closeResume');
let showingPortfolio = false;

const IMAGES = Array.from({length: 33}, (_, i) => `image${i+1}.jpeg`);

function showHero() {
  gallery.classList.add('hidden');
  hero.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function showGallery() {
  hero.classList.add('hidden');
  gallery.classList.remove('hidden');
  gallery.innerHTML = '';
  for (let i = 1; i < IMAGES.length; i++) {
    const img = document.createElement('img');
    img.src = 'images/' + IMAGES[i];
    img.alt = 'Portfolio image ' + (i+1);
    gallery.appendChild(img);
  }
  document.body.style.overflow = 'auto';
}

portfolioBtn.addEventListener('click', () => {
  if (showingPortfolio) {
    showHero();
    showingPortfolio = false;
  } else {
    showGallery();
    showingPortfolio = true;
  }
});

toggleMode.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleMode.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
});

viewResume.addEventListener('click', () => {
  resumeModal.style.display = 'flex';
});

closeResume.addEventListener('click', () => {
  resumeModal.style.display = 'none';
});

resumeModal.addEventListener('click', e => {
  if (e.target === resumeModal) resumeModal.style.display = 'none';
});

// Initial state
showHero();
