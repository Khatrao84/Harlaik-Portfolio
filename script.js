
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  loader.style.display = 'none';
});

const gallery = document.getElementById('gallery');
const viewResume = document.getElementById('viewResume');
const resumeSection = document.getElementById('resumeSection');
const toggleMode = document.getElementById('toggleMode');

const images = ['image1.jpeg', 'image2.jpeg', 'image3.jpeg'];

function loadGallery() {
  images.forEach(img => {
    const el = document.createElement('img');
    el.src = 'images/' + img;
    el.alt = img;
    gallery.appendChild(el);
  });
}
loadGallery();

viewResume.addEventListener('click', () => {
  resumeSection.classList.toggle('hidden');
  window.scrollTo({ top: resumeSection.offsetTop, behavior: 'smooth' });
});

toggleMode.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
