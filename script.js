// Sample product data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 1199.99,
        originalPrice: 1299.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1247,
        description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
        inStock: true,
        discount: 8
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 1099.99,
        originalPrice: 1199.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 892,
        description: "Premium Android flagship with S Pen, 200MP camera, and AI features.",
        inStock: true,
        discount: 8
    },
    {
        id: 3,
        name: "MacBook Air M3",
        price: 1099.99,
        originalPrice: 1199.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1541807084-5c3b00d11c2a?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 567,
        description: "Ultra-thin laptop with M3 chip, all-day battery life, and stunning Retina display.",
        inStock: true,
        discount: 8
    },
    {
        id: 4,
        name: "Nike Air Max 270",
        price: 129.99,
        originalPrice: 159.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 2341,
        description: "Comfortable running shoes with Air Max technology and stylish design.",
        inStock: true,
        discount: 19
    },
    {
        id: 5,
        name: "Adidas Ultraboost 22",
        price: 179.99,
        originalPrice: 199.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop",
        rating: 4.5,
        reviews: 1892,
        description: "Premium running shoes with Boost midsole and Primeknit upper.",
        inStock: true,
        discount: 10
    },
    {
        id: 6,
        name: "Levi's 501 Original Jeans",
        price: 79.99,
        originalPrice: 99.99,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        rating: 4.4,
        reviews: 3421,
        description: "Classic straight-leg jeans with authentic vintage styling.",
        inStock: true,
        discount: 20
    },
    {
        id: 7,
        name: "IKEA MALM Bed Frame",
        price: 199.99,
        originalPrice: 249.99,
        category: "home-living",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=400&fit=crop",
        rating: 4.3,
        reviews: 892,
        description: "Modern bed frame with clean lines and under-bed storage.",
        inStock: true,
        discount: 20
    },
    {
        id: 8,
        name: "KitchenAid Stand Mixer",
        price: 299.99,
        originalPrice: 399.99,
        category: "home-living",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1247,
        description: "Professional stand mixer with 10-speed motor and multiple attachments.",
        inStock: true,
        discount: 25
    },
    {
        id: 9,
        name: "L'Oreal Paris Foundation",
        price: 24.99,
        originalPrice: 34.99,
        category: "beauty",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
        rating: 4.2,
        reviews: 2156,
        description: "Long-lasting foundation with SPF protection and natural finish.",
        inStock: true,
        discount: 29
    },
    {
        id: 10,
        name: "Nike Dri-FIT Training Shorts",
        price: 34.99,
        originalPrice: 44.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 892,
        description: "Lightweight training shorts with moisture-wicking technology.",
        inStock: true,
        discount: 22
    }
];

// Cart state
let cart = [];
let currentCategory = 'all';

// DOM elements
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalAmount = document.getElementById('totalAmount');
const overlay = document.getElementById('overlay');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const searchInput = document.getElementById('searchInput');
const featuredProducts = document.getElementById('featuredProducts');
const dealsGrid = document.getElementById('dealsGrid');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const productDetails = document.getElementById('productDetails');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProducts();
    loadDeals();
});

function initializeApp() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        updateCartTotal();
    }
}

function setupEventListeners() {
    // Search toggle
    searchToggle.addEventListener('click', toggleSearch);
    
    // Cart toggle
    cartToggle.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    
    // Menu toggle
    menuToggle.addEventListener('click', toggleMenu);
    
    // Overlay click
    overlay.addEventListener('click', closeAllModals);
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Modal close
    closeModal.addEventListener('click', closeProductModal);
    
    // Category navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleCategoryClick);
    });
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', handleCategoryCardClick);
    });
}

function toggleSearch() {
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) {
        searchInput.focus();
    }
}

function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    if (cartSidebar.classList.contains('active')) {
        renderCart();
    }
}

function toggleMenu() {
    nav.classList.toggle('active');
}

function closeAllModals() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    productModal.classList.remove('active');
}

function closeProductModal() {
    productModal.classList.remove('active');
    overlay.classList.remove('active');
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    if (searchTerm.length > 0) {
        renderSearchResults(filteredProducts);
    } else {
        loadProducts();
    }
}

function handleCategoryClick(e) {
    e.preventDefault();
    const category = e.target.getAttribute('href').substring(1);
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Filter products by category
    if (category === 'home') {
        currentCategory = 'all';
    } else {
        currentCategory = category;
    }
    
    loadProducts();
}

function handleCategoryCardClick(e) {
    const category = e.currentTarget.dataset.category;
    currentCategory = category;
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${category}`) {
            link.classList.add('active');
        }
    });
    
    loadProducts();
}

function loadProducts() {
    let filteredProducts = products;
    
    if (currentCategory !== 'all') {
        filteredProducts = products.filter(product => product.category === currentCategory);
    }
    
    renderProducts(filteredProducts, featuredProducts);
}

function loadDeals() {
    const deals = products.filter(product => product.discount > 15);
    renderDeals(deals);
}

function renderProducts(products, container) {
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p class="text-center">No products found in this category.</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

function renderDeals(deals) {
    dealsGrid.innerHTML = '';
    
    deals.forEach(deal => {
        const dealCard = createDealCard(deal);
        dealsGrid.appendChild(dealCard);
    });
}

function renderSearchResults(results) {
    featuredProducts.innerHTML = '';
    
    if (results.length === 0) {
        featuredProducts.innerHTML = '<p class="text-center">No products found matching your search.</p>';
        return;
    }
    
    results.forEach(product => {
        const productCard = createProductCard(product);
        featuredProducts.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h4 class="product-title">${product.name}</h4>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span class="rating-text">(${product.reviews})</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    // Add click event to show product details
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart-btn')) {
            showProductDetails(product);
        }
    });
    
    return card;
}

function createDealCard(deal) {
    const card = document.createElement('div');
    card.className = 'deal-card';
    card.innerHTML = `
        <div class="deal-badge">-${deal.discount}%</div>
        <img src="${deal.image}" alt="${deal.name}" class="deal-image">
        <div class="deal-info">
            <h4 class="deal-title">${deal.name}</h4>
            <div class="deal-price">
                <span class="current-price">$${deal.price.toFixed(2)}</span>
                <span class="original-price">$${deal.originalPrice.toFixed(2)}</span>
                <span class="discount">-${deal.discount}%</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${deal.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    // Add click event to show product details
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart-btn')) {
            showProductDetails(deal);
        }
    });
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function showProductDetails(product) {
    productDetails.innerHTML = `
        <div class="product-detail-content">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <div class="product-detail-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice > product.price ? 
                        `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    ${product.discount ? `<span class="discount">-${product.discount}%</span>` : ''}
                </div>
                <div class="product-detail-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span>${product.rating} (${product.reviews} reviews)</span>
                </div>
                <p class="product-detail-description">${product.description}</p>
                <div class="product-detail-actions">
                    <button class="add-to-cart-btn large" onclick="addToCart(${product.id})">
                        Add to Cart - $${product.price.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    productModal.classList.add('active');
    overlay.classList.add('active');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    updateCartTotal();
    
    // Show success message
    showNotification(`${product.name} added to cart!`);
    
    // Update cart if it's open
    if (cartSidebar.classList.contains('active')) {
        renderCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    updateCartTotal();
    renderCart();
    
    showNotification('Item removed from cart!');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    updateCartTotal();
    renderCart();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

function renderCart() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty.</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some additional CSS for the notification
const style = document.createElement('style');
style.textContent = `
    .product-detail-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        align-items: start;
    }
    
    .product-detail-image img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
    
    .product-detail-info h2 {
        margin-bottom: 20px;
        color: #333;
    }
    
    .product-detail-price {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .product-detail-rating {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .product-detail-description {
        margin-bottom: 30px;
        line-height: 1.6;
        color: #666;
    }
    
    .add-to-cart-btn.large {
        padding: 18px 30px;
        font-size: 18px;
    }
    
    .remove-item {
        background: #ff4757;
        color: white;
        border: none;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .remove-item:hover {
        background: #e74c3c;
    }
    
    @media (max-width: 768px) {
        .product-detail-content {
            grid-template-columns: 1fr;
            gap: 20px;
        }
    }
`;
document.head.appendChild(style);
