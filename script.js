// Configuration: update filenames here if needed
const IMAGES = ['image1.jpeg','image2.jpeg','image3.jpeg','image4.jpeg','image5.jpeg'];
const START = 0; // index for image1
const REPLACE_START = 2; // index of image3 (0-based)

const main = document.getElementById('mainContent');
const brand = document.getElementById('brand');
const toggleTheme = document.getElementById('toggleTheme');
const viewResume = document.getElementById('viewResume');
const downloadResume = document.getElementById('downloadResume');
const resumeModal = document.getElementById('resumeModal');
const closeResume = document.getElementById('closeResume');

// Simple loader
const loader = document.createElement('div');
loader.className = 'loader';
loader.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
document.body.appendChild(loader);

window.addEventListener('load', ()=>{
  setTimeout(()=>{ loader.style.display='none'; },300);
});

// Utility: create panel element for an image
function createPanel(src, idx){
  const panel = document.createElement('section');
  panel.className = 'panel';
  panel.dataset.index = idx;
  const inner = document.createElement('div');
  inner.className = 'panel-inner';
  const img = document.createElement('img');
  img.src = 'images/' + src;
  img.alt = src;
  img.loading = 'lazy';
  // when image loads, add show class to trigger slide-up
  img.addEventListener('load', ()=>{
    setTimeout(()=> panel.classList.add('show'), 50);
  });
  inner.appendChild(img);
  panel.appendChild(inner);
  return panel;
}

// Render initial two images (image1, image2)
function renderInitial(){
  main.innerHTML = '';
  const first = createPanel(IMAGES[0],0);
  const second = createPanel(IMAGES[1]||IMAGES[0],1);
  main.appendChild(first);
  main.appendChild(second);
  // render the rest but keep them hidden (will be removed/replace behavior)
  for(let i=2;i<IMAGES.length;i++){
    const p = createPanel(IMAGES[i], i);
    main.appendChild(p);
  }
}

// Replace first two with images starting from image3 (REPLACE_START)
let replaced = false;
function replaceWithRest(){
  // If already replaced, go back to main images
  if(replaced){
    renderInitial();
    replaced = false;
    return;
  }
  // Build new panels: start from REPLACE_START onwards, but show only them
  main.innerHTML = '';
  for(let i=REPLACE_START;i<IMAGES.length;i++){
    const p = createPanel(IMAGES[i], i);
    main.appendChild(p);
  }
  replaced = true;
}

// Click brand to toggle replacement (first time replace, second click restore)
brand.addEventListener('click', ()=>{
  replaceWithRest();
  // scroll to top smoothly
  window.scrollTo({top:0,behavior:'smooth'});
});
brand.addEventListener('keydown',(e)=>{ if(e.key==='Enter') brand.click(); });

// Theme toggle
toggleTheme.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  toggleTheme.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Resume modal open
viewResume.addEventListener('click', ()=>{
  resumeModal.classList.add('open');
  resumeModal.setAttribute('aria-hidden','false');
});
closeResume.addEventListener('click', ()=>{
  resumeModal.classList.remove('open');
  resumeModal.setAttribute('aria-hidden','true');
});
// Close modal on background click
resumeModal.addEventListener('click',(e)=>{ if(e.target===resumeModal) { closeResume.click(); } });
// Escape key closes modal
document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closeResume.click(); });

// Initial render
renderInitial();

// Optional: lazy intersection to add 'show' when panels enter viewport (extra safety)
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      ent.target.classList.add('show');
    }
  });
}, {threshold:0.2});

document.querySelectorAll('.panel').forEach(p=>observer.observe(p));
