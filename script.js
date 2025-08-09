// --------- CONFIG ---------
const categories = [
  { id: 'earrings', name: 'Earrings', img: 'images/earrings/placeholder1.jpg' },
  { id: 'rings',    name: 'Rings',    img: 'images/rings/placeholder1.jpg' },
  { id: 'jhumka',   name: 'Jhumka',   img: 'images/jhumka/placeholder1.jpg' },
  { id: 'bracelet', name: 'Bracelet', img: 'images/bracelet/placeholder1.jpg' },
  { id: 'payal',    name: 'Payal',    img: 'images/payal/placeholder1.jpg' },
];

// Replace these Meesho links with your actual product URLs
const products = [
  { id: 1, category: 'earrings', name: 'Pearl Drop Earrings',  img: 'images/earrings/placeholder1.jpg',  description: 'Elegant drop earrings with pearls.', link: 'https://www.meesho.com' },
  { id: 2, category: 'earrings', name: 'Gold Stud Earrings',   img: 'images/earrings/placeholder2.jpg',  description: 'Classic studs in a chic gold finish.', link: 'https://www.meesho.com' },
  { id: 3, category: 'rings',    name: 'Crystal Stone Ring',   img: 'images/rings/placeholder1.jpg',     description: 'Sparkling crystal at center stage.',   link: 'https://www.meesho.com' },
  { id: 4, category: 'rings',    name: 'Delicate Band Ring',   img: 'images/rings/placeholder2.jpg',     description: 'Minimal band with refined shine.',     link: 'https://www.meesho.com' },
  { id: 5, category: 'jhumka',   name: 'Traditional Jhumka',   img: 'images/jhumka/placeholder1.jpg',    description: 'Traditional jhumka with ghunghroo.',  link: 'https://www.meesho.com' },
  { id: 6, category: 'jhumka',   name: 'Antique Oxidised Jhumka', img: 'images/jhumka/placeholder2.jpg', description: 'Oxidised silver jhumka charm.',        link: 'https://www.meesho.com' },
  { id: 7, category: 'bracelet', name: 'Charm Bracelet',       img: 'images/bracelet/placeholder1.jpg',  description: 'Everyday charm bracelet.',             link: 'https://www.meesho.com' },
  { id: 8, category: 'bracelet', name: 'Kada Bangle',          img: 'images/bracelet/placeholder2.jpg',  description: 'Bold kada bangle statement.',          link: 'https://www.meesho.com' },
  { id: 9, category: 'payal',    name: 'Silver Payal',         img: 'images/payal/placeholder1.jpg',     description: 'Silver anklet with ghunghroo.',        link: 'https://www.meesho.com' },
  { id:10, category: 'payal',    name: 'Minimalist Payal',     img: 'images/payal/placeholder2.jpg',     description: 'Lightweight minimalist anklet.',       link: 'https://www.meesho.com' },
];

// --------- DOM refs ---------
const categoryGrid = document.getElementById('categoryGrid');
const filterBar     = document.getElementById('filterBar');
const productGrid   = document.getElementById('productGrid');

const productModal  = document.getElementById('productModal');
const modalImg      = document.getElementById('modalImg');
const modalTitle    = document.getElementById('modalTitle');
const modalDesc     = document.getElementById('modalDesc');
const modalLink     = document.getElementById('modalLink');
const closeModalBtn = document.getElementById('closeModal');

const hamburger     = document.getElementById('hamburger');
const mobileMenu    = document.getElementById('mobileMenu');
const closeMenuBtn  = document.getElementById('closeMenu');

// --------- Helpers ---------
const clear = node => node.replaceChildren();

// Build categories
function buildCategories(){
  clear(categoryGrid);
  categories.forEach(c=>{
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <img src="${c.img}" alt="${c.name}">
      <div class="meta">${c.name}</div>
    `;
    card.addEventListener('click', () => filterProducts(c.id));
    categoryGrid.appendChild(card);
  });
}

// Build filter buttons
function buildFilters(){
  clear(filterBar);
  const allBtn = document.createElement('button');
  allBtn.textContent = 'All';
  allBtn.classList.add('active');
  allBtn.addEventListener('click', ()=>{
    setActive(allBtn);
    buildProductGrid('all');
  });
  filterBar.appendChild(allBtn);

  categories.forEach(c=>{
    const btn = document.createElement('button');
    btn.textContent = c.name;
    btn.addEventListener('click', ()=>{
      setActive(btn);
      buildProductGrid(c.id);
    });
    filterBar.appendChild(btn);
  });
}

function setActive(btn){
  [...filterBar.querySelectorAll('button')].forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

// Build product grid
function buildProductGrid(filter='all'){
  clear(productGrid);
  const list = filter==='all' ? products : products.filter(p=>p.category===filter);
  list.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <span>${categories.find(c=>c.id===p.category).name}</span>
      </div>
    `;
    card.addEventListener('click', ()=>openModal(p));
    productGrid.appendChild(card);
  });

  // animate cards
  gsap.from('.product-card', {
    scrollTrigger: { trigger: productGrid, start: 'top 85%', toggleActions:'play none none none' },
    y: 40, opacity: 0, duration: .6, stagger: .08
  });
}

function filterProducts(id){
  const btn = [...filterBar.querySelectorAll('button')].find(b=>b.textContent.toLowerCase()===categories.find(c=>c.id===id).name.toLowerCase());
  if (btn) setActive(btn);
  buildProductGrid(id);
}

// Modal handlers
function openModal(p){
  modalImg.src = p.img;
  modalImg.alt = p.name;
  modalTitle.textContent = p.name;
  modalDesc.textContent = p.description;
  modalLink.href = p.link;
  productModal.classList.add('show');
  gsap.from('.modal-content',{scale:.9,opacity:0,duration:.35,ease:'power2.out'});
}
function closeModal(){ productModal.classList.remove('show'); }
closeModalBtn.addEventListener('click', closeModal);
document.addEventListener('click', (e)=>{
  if (productModal.classList.contains('show') && !e.target.closest('.modal-content')) closeModal();
});

// Nav
hamburger.addEventListener('click', ()=> mobileMenu.classList.add('open'));
closeMenuBtn.addEventListener('click', ()=> mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=> mobileMenu.classList.remove('open')));

// Animations
function initAnims(){
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero-content h1',{y:-40,opacity:0,duration:.8,ease:'power3.out'});
  gsap.from('.hero-content p',{y:-20,opacity:0,duration:.8,delay:.2,ease:'power3.out'});
  gsap.from('.hero-content .btn',{y:12,opacity:0,duration:.8,delay:.4,ease:'power3.out'});

  gsap.from('.category-card',{
    scrollTrigger:{trigger:'.categories',start:'top 80%'},
    y:30,opacity:0,stagger:.12,duration:.6
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  buildCategories();
  buildFilters();
  buildProductGrid('all');
  initAnims();
});
