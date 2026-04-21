// ===========================
// PRODUCT DATA
// ===========================

const products = [
    {
        id: 1,
        title: "Quantum Pro X",
        price: "$1,299",
        originalPrice: "$1,599",
        discount: "20% OFF",
        image: "🎧",
        description: "Next-generation wireless headphones with adaptive noise cancellation and premium sound quality.",
        features: ["40-hour battery life", "Premium ANC technology", "Spatial audio support", "Premium materials"]
    },
    {
        id: 2,
        title: "Luxora SmartWatch",
        price: "$499",
        originalPrice: "$599",
        discount: "17% OFF",
        image: "⌚",
        description: "Advanced wearable featuring health monitoring, fitness tracking, and seamless connectivity.",
        features: ["Heart rate monitoring", "Sleep tracking", "5G connectivity", "AMOLED display"]
    },
    {
        id: 3,
        title: "Crystal Vision 4K",
        price: "$2,499",
        originalPrice: "$2,999",
        discount: "17% OFF",
        image: "📷",
        description: "Professional-grade camera with 8K video recording and AI-enhanced photography.",
        features: ["8K video recording", "AI scene detection", "Weather resistant", "Professional lenses"]
    },
    {
        id: 4,
        title: "Neo Tablet Pro",
        price: "$899",
        originalPrice: "$1,099",
        discount: "18% OFF",
        image: "📱",
        description: "Ultra-thin tablet with powerful processor and stunning display for creative professionals.",
        features: ["12.9\" OLED display", "M2 processor", "Stylus included", "Expandable storage"]
    },
    {
        id: 5,
        title: "Aurora Speaker",
        price: "$599",
        originalPrice: "$799",
        discount: "25% OFF",
        image: "🔊",
        description: "Premium smart speaker with immersive sound and AI voice assistant integration.",
        features: ["360° sound", "AI assistant", "Multi-room audio", "Premium finish"]
    },
    {
        id: 6,
        title: "Zenith Laptop",
        price: "$1,999",
        originalPrice: "$2,499",
        discount: "20% OFF",
        image: "💻",
        description: "Ultra-lightweight laptop designed for professionals with exceptional performance.",
        features: ["32GB RAM", "1TB SSD", "RTX 4090", "17\" display"]
    }
];

// ===========================
// CART MANAGEMENT
// ===========================

let cart = [];

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    updateCart();
    showToast(`${product.title} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showToast('Item removed from cart');
}

function updateCart() {
    // Update cart count
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items display
    const cartItems = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-quantity">Qty: ${item.quantity}</div>
                </div>
                <div class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</div>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', '').replace(',', ''));
        return sum + (price * item.quantity);
    }, 0);
    document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
}

// ===========================
// TOAST NOTIFICATION
// ===========================

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// ===========================
// THEME TOGGLE
// ===========================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeToggle').querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===========================
// NAVBAR FUNCTIONALITY
// ===========================

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('.nav-link');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===========================
// PRODUCT GRID INITIALIZATION
// ===========================

function initProductGrid() {
    const productsGrid = document.getElementById('productsGrid');
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image">
                <span>${product.image}</span>
                ${product.discount ? `<div class="product-badge">${product.discount}</div>` : ''}
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price}</div>
                <div class="product-footer">
                    <button class="view-btn" onclick="openModal(${product.id})">
                        View Details
                    </button>
                    <button class="like-btn" onclick="toggleLike(this)">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===========================
// MODAL FUNCTIONALITY
// ===========================

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    document.getElementById('modalImage').textContent = product.image;
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalOriginalPrice').textContent = product.originalPrice;
    document.getElementById('discountBadge').textContent = product.discount;
    document.getElementById('modalDescription').textContent = product.description;
    
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = product.features.map(feature => `<li>${feature}</li>`).join('');

    // Reset quantity
    document.getElementById('quantity').value = 1;

    // Store current product for add to cart
    modal.dataset.productId = productId;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function initModal() {
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const quantityMinus = document.getElementById('quantityMinus');
    const quantityPlus = document.getElementById('quantityPlus');
    const quantity = document.getElementById('quantity');

    // Close button
    modalClose.addEventListener('click', closeModal);

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Quantity controls
    quantityMinus.addEventListener('click', () => {
        if (quantity.value > 1) quantity.value--;
    });

    quantityPlus.addEventListener('click', () => {
        quantity.value++;
    });

    // Add to cart
    addToCartBtn.addEventListener('click', () => {
        const productId = parseInt(modal.dataset.productId);
        const qty = parseInt(quantity.value);
        addToCart(productId, qty);
        closeModal();
    });
}

// ===========================
// CART SIDEBAR
// ===========================

function initCartSidebar() {
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');

    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });

    const closeCart = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    };

    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
}

// ===========================
// BACK TO TOP BUTTON
// ===========================

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===========================
// CONTACT FORM
// ===========================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        if (name && email && message) {
            showToast(`Thank you, ${name}! We'll contact you soon.`);
            contactForm.reset();
        }
    });
}

// ===========================
// LIKE BUTTON
// ===========================

function toggleLike(button) {
    button.classList.toggle('liked');
    const icon = button.querySelector('i');
    if (button.classList.contains('liked')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}

// ===========================
// CANVAS BACKGROUND ANIMATION
// ===========================

function initCanvasAnimation() {
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particles = [];
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        // Clear canvas with gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        const theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'dark') {
            gradient.addColorStop(0, 'rgba(15, 15, 30, 1)');
            gradient.addColorStop(1, 'rgba(15, 15, 30, 1)');
        } else {
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===========================
// GSAP ANIMATIONS
// ===========================

function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // CTA Button click scroll
    document.querySelector('.cta-button').addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: { y: '#products', offsetY: 100 },
            duration: 1
        });
    });

    // Scroll animations for sections
    gsap.utils.toArray('section').forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            onEnter: () => {
                section.style.opacity = '1';
            }
        });
    });
}

// ===========================
// AOS INITIALIZATION
// ===========================

function initAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 100
    });
}

// ===========================
// PRELOADER
// ===========================

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 2000);
}

// ===========================
// INITIALIZATION ON PAGE LOAD
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    hidePreloader();
    initTheme();
    initNavbar();
    initProductGrid();
    initModal();
    initCartSidebar();
    initBackToTop();
    initContactForm();
    initCanvasAnimation();
    initAOS();
    initGSAPAnimations();

    // Update cart initially
    updateCart();

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Handle dynamic theme changes
document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver(() => {
        // Reinitialize AOS when theme changes
        AOS.refresh();
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
});
