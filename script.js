/*
 * Main client-side script for the Alankara website
 *
 * This file defines the catalogue data structures, builds
 * interactive components dynamically and wires up user
 * interactions. It also leverages GSAP to apply smooth
 * animations on load and when scrolling. You can add more
 * products or categories simply by editing the arrays below.
 */

// Catalogue definitions
const categories = [
    {
        id: 'earrings',
        name: 'Earrings',
        image: 'images/earrings/placeholder1.jpg'
    },
    {
        id: 'rings',
        name: 'Rings',
        image: 'images/rings/placeholder1.jpg'
    },
    {
        id: 'jhumka',
        name: 'Jhumka',
        image: 'images/jhumka/placeholder1.jpg'
    },
    {
        id: 'bracelet',
        name: 'Bracelet',
        image: 'images/bracelet/placeholder1.jpg'
    },
    {
        id: 'payal',
        name: 'Payal',
        image: 'images/payal/placeholder1.jpg'
    }
];

// Sample product catalogue. Replace these entries with your
// real products and Meesho URLs. Each object must include
// category, name, image, description and link. Additional
// properties can be added as needed.
const products = [
    {
        id: 'earring1',
        category: 'earrings',
        name: 'Pearl Drop Earrings',
        image: 'images/earrings/placeholder1.jpg',
        description: 'Elegant pearl drop earrings with gold plating, perfect for festive occasions.',
        link: 'https://www.meesho.com/search/pearl-earrings'
    },
    {
        id: 'earring2',
        category: 'earrings',
        name: 'Gold Stud Earrings',
        image: 'images/earrings/placeholder2.jpg',
        description: 'Minimalist gold stud earrings that add a subtle touch of luxury.',
        link: 'https://www.meesho.com/search/gold-stud-earrings'
    },
    {
        id: 'ring1',
        category: 'rings',
        name: 'Crystal Stone Ring',
        image: 'images/rings/placeholder1.jpg',
        description: 'Statement ring featuring a shimmering crystal stone set on a gold band.',
        link: 'https://www.meesho.com/search/crystal-ring'
    },
    {
        id: 'ring2',
        category: 'rings',
        name: 'Delicate Band Ring',
        image: 'images/rings/placeholder2.jpg',
        description: 'A thin, delicate band ring suitable for stacking or wearing alone.',
        link: 'https://www.meesho.com/search/delicate-ring'
    },
    {
        id: 'jhumka1',
        category: 'jhumka',
        name: 'Traditional Jhumka',
        image: 'images/jhumka/placeholder1.jpg',
        description: 'Classic bell‑shaped jhumkas with intricate detailing and pearls.',
        link: 'https://www.meesho.com/search/traditional-jhumka'
    },
    {
        id: 'jhumka2',
        category: 'jhumka',
        name: 'Antique Oxidised Jhumka',
        image: 'images/jhumka/placeholder2.jpg',
        description: 'Oxidised silver jhumkas that lend a vintage charm to your outfit.',
        link: 'https://www.meesho.com/search/oxidised-jhumka'
    },
    {
        id: 'bracelet1',
        category: 'bracelet',
        name: 'Charm Bracelet',
        image: 'images/bracelet/placeholder1.jpg',
        description: 'Gold plated charm bracelet with delicate pendants.',
        link: 'https://www.meesho.com/search/charm-bracelet'
    },
    {
        id: 'bracelet2',
        category: 'bracelet',
        name: 'Kada Bangle',
        image: 'images/bracelet/placeholder2.jpg',
        description: 'Traditional kada bangle with engraved patterns.',
        link: 'https://www.meesho.com/search/kada-bangle'
    },
    {
        id: 'payal1',
        category: 'payal',
        name: 'Silver Payal',
        image: 'images/payal/placeholder1.jpg',
        description: 'Elegant silver anklet with small ghungroos.',
        link: 'https://www.meesho.com/search/silver-payal'
    },
    {
        id: 'payal2',
        category: 'payal',
        name: 'Minimalist Payal',
        image: 'images/payal/placeholder2.jpg',
        description: 'Sleek and lightweight payal ideal for everyday wear.',
        link: 'https://www.meesho.com/search/minimalist-payal'
    }
];

// DOM elements
const categoryGrid = document.getElementById('categoryGrid');
const filterBar     = document.getElementById('filterBar');
const productGrid   = document.getElementById('productGrid');
const productModal  = document.getElementById('productModal');
const modalImg      = document.getElementById('modalImg');
const modalTitle    = document.getElementById('modalTitle');
const modalDesc     = document.getElementById('modalDesc');
const modalLink     = document.getElementById('modalLink');
const closeModalBtn = document.getElementById('closeModal');

// Navigation elements
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobileMenu');
const closeMenuBtn = document.getElementById('closeMenu');

// Utility function to clear children of an element
function clearChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Build category cards
function buildCategories() {
    clearChildren(categoryGrid);
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.classList.add('category-card');
        card.dataset.category = cat.id;
        card.innerHTML = `
            <img src="${cat.image}" alt="${cat.name}">
            <div class="meta">${cat.name}</div>
        `;
        card.addEventListener('click', () => {
            filterProducts(cat.id);
            // Optionally scroll to products
        });
        categoryGrid.appendChild(card);
    });
}

// Build filter buttons
function buildFilters() {
    clearChildren(filterBar);
    // Add "All" button first
    const allBtn = document.createElement('button');
    allBtn.textContent = 'All';
    allBtn.classList.add('active');
    allBtn.addEventListener('click', () => {
        setActiveFilter(allBtn);
        buildProductGrid('all');
    });
    filterBar.appendChild(allBtn);
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat.name;
        btn.addEventListener('click', () => {
            setActiveFilter(btn);
            buildProductGrid(cat.id);
        });
        filterBar.appendChild(btn);
    });
}

// Set active class on selected filter button
function setActiveFilter(selected) {
    const buttons = filterBar.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('active'));
    selected.classList.add('active');
}

// Build product cards based on selected category
function buildProductGrid(filterCategory = 'all') {
    clearChildren(productGrid);
    const filtered = filterCategory === 'all'
        ? products
        : products.filter(item => item.category === filterCategory);
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="product-info">
                <h3>${item.name}</h3>
                <span>${categories.find(c => c.id === item.category).name}</span>
            </div>
        `;
        card.addEventListener('click', () => openModal(item));
        productGrid.appendChild(card);
    });
    // Apply GSAP animation to the newly added cards
    gsap.from('.product-card', {
        scrollTrigger: {
            trigger: productGrid,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
    });
}

// Filter helper for categories grid click
function filterProducts(categoryId) {
    // Highlight filter button if exists
    const buttons = filterBar.querySelectorAll('button');
    buttons.forEach(btn => {
        if (btn.textContent.toLowerCase() === categoryId) {
            setActiveFilter(btn);
        }
    });
    buildProductGrid(categoryId);
}

// Modal handlers
function openModal(item) {
    modalImg.src = item.image;
    modalImg.alt = item.name;
    modalTitle.textContent = item.name;
    modalDesc.textContent = item.description;
    modalLink.href = item.link;
    productModal.classList.add('show');
    // Animate modal appearance
    gsap.from('.modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
    });
}

function closeModal() {
    productModal.classList.remove('show');
}

// Navigation menu handlers
function setupNavigation() {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
    // Close mobile menu on navigation link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });
}

// Initialise GSAP animations for hero and categories
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    // Hero animation
    gsap.from('.hero-content h1', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    gsap.from('.hero-content p', {
        y: -30,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
    });
    gsap.from('.hero-content .btn', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    // Categories reveal on scroll
    gsap.from('.category-card', {
        scrollTrigger: {
            trigger: '.categories',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15
    });
}

// Bind modal close events
function bindModalEvents() {
    /*
     * Attach explicit listeners for closing the product modal.
     * The close button within the modal has its own id so we
     * can simply bind a click handler to it. We also attach a
     * click handler to the overall modal overlay so that
     * clicking anywhere outside the modal content (the dark
     * backdrop) will also close the modal. This approach
     * ensures the modal can always be dismissed on mobile and desktop.
     */
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            closeModal();
        });
    }
    if (productModal) {
        productModal.addEventListener('click', () => {
            // Clicks on backdrop
            if (event.target === productModal) {
                closeModal();
            }
        });
    }
    // Global click handler: closes modal when user clicks outside modal content
    document.addEventListener('click', (event) => {
        if (productModal.classList.contains('show')) {
            const clickedInside = event.target.closest('.modal-content');
            const clickedClose  = event.target.closest('#closeModal');
            if (!clickedInside && !clickedClose) {
                closeModal();
            }
        }
    });
}

// Set current year in footer
function setYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Initialise page
document.addEventListener('DOMContentLoaded', () => {
    setYear();
    buildCategories();
    buildFilters();
    buildProductGrid('all');
    setupNavigation();
    bindModalEvents();
    initAnimations();
});
