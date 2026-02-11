/**
 * CoreTech E-Commerce App - Bundled JavaScript (ES2020)
 * Combined Router, StateManager, UIHandler, and App
 */

// ========================
// ROUTER
// ========================

class Router {
    constructor() {
        this.currentRoute = 'home';
        this.routes = new Map();
        this.listeners = [];
        this.setupRoutes();
        this.setupNavigationListeners();
    }

    setupRoutes() {
        this.routes.set('home', { path: 'home', pageId: 'home-page' });
        this.routes.set('products', { path: 'products', pageId: 'products-page' });
        this.routes.set('product-detail', { path: 'product-detail', pageId: 'product-detail-page' });
        this.routes.set('cart', { path: 'cart', pageId: 'cart-page' });
        this.routes.set('checkout', { path: 'checkout', pageId: 'checkout-page' });
    }

    setupNavigationListeners() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            const navigateAttr = target?.closest('[data-navigate]')?.getAttribute('data-navigate');
            
            if (navigateAttr) {
                e.preventDefault();
                this.navigate(navigateAttr);
            }
        });
    }

    navigate(routeName, params) {
        if (!this.routes.has(routeName)) {
            console.warn(`Route ${routeName} not found`);
            return;
        }

        this.currentRoute = routeName;
        this.showPage(routeName);
        this.notifyListeners(routeName, params);
    }

    showPage(routeName) {
        const route = this.routes.get(routeName);
        if (!route) return;

        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        const pageElement = document.getElementById(route.pageId);
        if (pageElement) {
            pageElement.classList.add('active');
            window.scrollTo(0, 0);
        }
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notifyListeners(route, params) {
        this.listeners.forEach(listener => listener(route, params));
    }

    getCurrentRoute() {
        return this.currentRoute;
    }
}

// ========================
// STATE MANAGER
// ========================

class StateManager {
    constructor() {
        this.state = {
            cart: [],
            products: this.generateSampleProducts(),
            selectedProduct: undefined,
            selectedCategory: undefined,
        };
        this.listeners = [];
        this.loadFromLocalStorage();
    }

    generateSampleProducts() {
        return [
            {
                id: '1',
                name: 'RTX 4090 Gaming Laptop',
                price: 3299.99,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2PXOJ9OuTPH0JNuFM_K8tM9jA2dFsneHDNTZH_ZrDwcfovhnC9tMJD302hqLj5sClvY6qD6RGJJCQSqkS_OUg3k39tnX_TOlGmon7Y7lNUFPc1LBoo2M4Hik2-k29RDnekdSCTnNwBLn-Yhvd0dNbZveOo0s_VD90sNAWCgcuE7ai6UiOrEd3_TmZ6GH8ecs7x6E3y3s6MhSjDYaZhHSWpi4MfzxBhYbov9hPnNw1w--6xg4hefuDcU5vVYhuvfCcfc_N5JRlxvQ',
                category: 'laptops',
                description: 'Ultimate gaming performance with RTX 4090',
                rating: 4.8,
            },
            {
                id: '2',
                name: 'RTX 4080 SuperFast Laptop',
                price: 2499.99,
                image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
                category: 'laptops',
                description: 'High-performance gaming laptop',
                rating: 4.7,
            },
            {
                id: '3',
                name: 'DDR5 32GB RAM',
                price: 129.99,
                image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
                category: 'components',
                description: 'High-speed DDR5 memory',
                rating: 4.9,
            },
            {
                id: '4',
                name: 'NVMe 2TB SSD',
                price: 199.99,
                image: 'https://images.unsplash.com/photo-1579725519063-dcd91a02a7d9?w=500&h=500&fit=crop',
                category: 'components',
                description: 'Ultra-fast NVMe SSD storage',
                rating: 4.8,
            },
            {
                id: '5',
                name: 'RGB Mechanical Keyboard',
                price: 159.99,
                image: 'https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=500&h=500&fit=crop',
                category: 'accessories',
                description: 'Premium mechanical keyboard with RGB',
                rating: 4.6,
            },
            {
                id: '6',
                name: '4K Gaming Mouse',
                price: 89.99,
                image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
                category: 'accessories',
                description: 'Precision gaming mouse',
                rating: 4.7,
            },
        ];
    }

    getState() {
        return this.state;
    }

    getProducts(category) {
        if (category) {
            return this.state.products.filter(p => p.category === category);
        }
        return this.state.products;
    }

    getProduct(id) {
        return this.state.products.find(p => p.id === id);
    }

    addToCart(productId, quantity = 1) {
        const product = this.getProduct(productId);
        if (!product) return;

        const existingItem = this.state.cart.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.state.cart.push({
                productId,
                quantity,
                product,
            });
        }

        this.saveToLocalStorage();
        this.notifyListeners();
    }

    removeFromCart(productId) {
        this.state.cart = this.state.cart.filter(item => item.productId !== productId);
        this.saveToLocalStorage();
        this.notifyListeners();
    }

    updateCartQuantity(productId, quantity) {
        const item = this.state.cart.find(i => i.productId === productId);
        if (item) {
            item.quantity = Math.max(0, quantity);
            if (item.quantity === 0) {
                this.removeFromCart(productId);
            } else {
                this.saveToLocalStorage();
                this.notifyListeners();
            }
        }
    }

    clearCart() {
        this.state.cart = [];
        this.saveToLocalStorage();
        this.notifyListeners();
    }

    getCartTotal() {
        return this.state.cart.reduce((total, item) => {
            const product = this.getProduct(item.productId);
            return total + (product?.price || 0) * item.quantity;
        }, 0);
    }

    getCartItemCount() {
        return this.state.cart.reduce((count, item) => count + item.quantity, 0);
    }

    setSelectedProduct(productId) {
        this.state.selectedProduct = this.getProduct(productId);
    }

    setSelectedCategory(category) {
        this.state.selectedCategory = category;
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }

    saveToLocalStorage() {
        localStorage.setItem('coretech-cart', JSON.stringify(this.state.cart));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('coretech-cart');
        if (saved) {
            try {
                this.state.cart = JSON.parse(saved);
                this.state.cart.forEach(item => {
                    item.product = this.getProduct(item.productId);
                });
            } catch (e) {
                console.error('Failed to load cart from localStorage', e);
            }
        }
    }
}

// ========================
// UI HANDLER
// ========================

class UIHandler {
    constructor(stateManager, router) {
        this.stateManager = stateManager;
        this.router = router;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.filterProducts(query);
            });
        }

        document.querySelectorAll('.category-item').forEach(item => {
            item.addEventListener('click', () => {
                const category = item.getAttribute('data-category');
                if (category) {
                    this.stateManager.setSelectedCategory(category);
                    this.renderProductList();
                    this.router.navigate('products');
                }
            });
        });

        const placeOrderBtn = document.getElementById('place-order-btn');
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', () => {
                this.handlePlaceOrder();
            });
        }
    }

    renderHomePage() {
        this.renderFeaturedProducts();
    }

    renderFeaturedProducts() {
        const container = document.getElementById('featured-products');
        if (!container) return;

        const products = this.stateManager.getProducts().slice(0, 3);
        container.innerHTML = '';

        products.forEach(product => {
            const element = this.createProductCard(product, 'featured');
            container.appendChild(element);
        });
    }

    renderProductList() {
        const container = document.getElementById('products-list');
        if (!container) return;

        const category = this.stateManager.getState().selectedCategory;
        const products = category 
            ? this.stateManager.getProducts(category)
            : this.stateManager.getProducts();

        container.innerHTML = '';

        if (products.length === 0) {
            container.innerHTML = '<p class="text-center text-slate-500 py-8">No products found</p>';
            return;
        }

        products.forEach(product => {
            const element = this.createProductCard(product, 'list');
            container.appendChild(element);
        });
    }

    createProductCard(product, type) {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer';
        
        const ratingHtml = product.rating ? `
            <div class="flex items-center gap-1 mt-2">
                <span class="text-yellow-400 text-xs">★</span>
                <span class="text-xs font-medium">${product.rating}</span>
            </div>
        ` : '';

        const content = `
            <div class="flex gap-4 p-3">
                <img src="${product.image}" alt="${product.name}" class="w-24 h-24 object-cover rounded-lg"/>
                <div class="flex-1 flex flex-col justify-between">
                    <div>
                        <h3 class="font-semibold text-sm">${product.name}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${product.category}</p>
                        ${ratingHtml}
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold text-primary">$${product.price.toFixed(2)}</span>
                        <button class="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors add-to-cart-btn" data-product-id="${product.id}">
                            <span class="material-icons-round text-sm">add_shopping_cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        card.innerHTML = content;

        const handler = () => {
            this.stateManager.setSelectedProduct(product.id);
            this.renderProductDetail();
            this.router.navigate('product-detail');
        };

        card.querySelector('img')?.addEventListener('click', handler);
        card.querySelector('h3')?.addEventListener('click', handler);

        const addBtn = card.querySelector('.add-to-cart-btn');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.stateManager.addToCart(product.id, 1);
                this.showToast('Added to cart!');
            });
        }

        return card;
    }

    renderProductDetail() {
        const container = document.getElementById('product-detail-content');
        if (!container) return;

        const product = this.stateManager.getState().selectedProduct;
        if (!product) {
            container.innerHTML = '<p>Product not found</p>';
            return;
        }

        const ratingHtml = product.rating ? `
            <div class="flex items-center gap-2 mt-2">
                <span class="text-yellow-400">★</span>
                <span class="font-medium">${product.rating}</span>
                <span class="text-sm text-slate-500">(128 reviews)</span>
            </div>
        ` : '';

        const html = `
            <div class="space-y-4">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover rounded-lg"/>
                
                <div>
                    <span class="text-xs font-bold uppercase tracking-widest text-primary/70">${product.category}</span>
                    <h1 class="text-2xl font-bold mt-2">${product.name}</h1>
                    ${ratingHtml}
                </div>

                <div class="flex items-baseline gap-2 text-3xl font-bold">
                    <span class="text-primary">$${product.price.toFixed(2)}</span>
                </div>

                <p class="text-slate-600 dark:text-slate-400">${product.description || 'High-quality product for your needs.'}</p>

                <div class="space-y-3 pt-4 border-t border-primary/10">
                    <h3 class="font-semibold">Specifications</h3>
                    <ul class="space-y-2 text-sm">
                        <li class="flex justify-between"><span>Warranty</span><span>2 Years</span></li>
                        <li class="flex justify-between"><span>Shipping</span><span>Free</span></li>
                        <li class="flex justify-between"><span>Stock</span><span class="text-green-500">In Stock</span></li>
                    </ul>
                </div>

                <div class="flex gap-3 pt-4">
                    <input type="number" id="quantity-input" value="1" min="1" max="10" class="w-20 bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 px-4 text-center focus:ring-2 focus:ring-primary/50"/>
                    <button class="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-all" id="add-to-cart-detail">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;

        const addBtn = document.getElementById('add-to-cart-detail');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const quantityInput = document.getElementById('quantity-input');
                const quantity = parseInt(quantityInput?.value || '1', 10);
                this.stateManager.addToCart(product.id, quantity);
                this.showToast('Added to cart!');
            });
        }
    }

    updateCartUI() {
        const cartCount = this.stateManager.getCartItemCount();
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount.toString();
        }

        this.renderCartPage();
    }

    renderCartPage() {
        const cart = this.stateManager.getState().cart;
        const cartItemsContainer = document.getElementById('cart-items');
        const cartItemsCount = document.getElementById('cart-items-count');
        const cartSubtotal = document.getElementById('cart-subtotal');
        const cartShipping = document.getElementById('cart-shipping');
        const cartTotal = document.getElementById('cart-total');

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="text-center py-12">
                        <span class="material-icons-round text-6xl text-slate-300 mb-4 block">shopping_bag</span>
                        <p class="text-slate-500 mb-4">Your cart is empty</p>
                        <button class="text-primary font-medium" data-navigate="products">Start Shopping</button>
                    </div>
                `;
                return;
            }

            cart.forEach(item => {
                const product = this.stateManager.getProduct(item.productId);
                if (product) {
                    const cartItemElement = document.createElement('div');
                    cartItemElement.className = 'flex gap-4 pb-4 border-b border-primary/10 last:border-0';
                    cartItemElement.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover rounded-lg"/>
                        <div class="flex-1">
                            <h3 class="font-semibold">${product.name}</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400">$${product.price.toFixed(2)}</p>
                            <div class="flex items-center gap-2 mt-2">
                                <button class="decrease-qty-btn px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded" data-product-id="${product.id}">−</button>
                                <span class="qty-display w-8 text-center font-medium">${item.quantity}</span>
                                <button class="increase-qty-btn px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded" data-product-id="${product.id}">+</button>
                                <button class="remove-cart-item-btn ml-auto text-red-500 hover:text-red-600" data-product-id="${product.id}">
                                    <span class="material-icons-round text-sm">delete</span>
                                </button>
                            </div>
                        </div>
                    `;

                    cartItemElement.querySelector('.decrease-qty-btn')?.addEventListener('click', () => {
                        this.stateManager.updateCartQuantity(product.id, item.quantity - 1);
                    });

                    cartItemElement.querySelector('.increase-qty-btn')?.addEventListener('click', () => {
                        this.stateManager.updateCartQuantity(product.id, item.quantity + 1);
                    });

                    cartItemElement.querySelector('.remove-cart-item-btn')?.addEventListener('click', () => {
                        this.stateManager.removeFromCart(product.id);
                    });

                    cartItemsContainer.appendChild(cartItemElement);
                }
            });
        }

        const cartCountValue = this.stateManager.getCartItemCount();
        if (cartItemsCount) cartItemsCount.textContent = cartCountValue.toString();
        
        const subtotal = this.stateManager.getCartTotal();
        const shipping = subtotal > 0 ? 9.99 : 0;
        const total = subtotal + shipping;

        if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (cartShipping) cartShipping.textContent = `$${shipping.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    renderCheckout() {
        const summaryContainer = document.getElementById('checkout-summary');
        const checkoutTotal = document.getElementById('checkout-total');
        const cart = this.stateManager.getState().cart;

        if (summaryContainer) {
            summaryContainer.innerHTML = '';

            cart.forEach(item => {
                const product = this.stateManager.getProduct(item.productId);
                if (product) {
                    const summaryItem = document.createElement('div');
                    summaryItem.className = 'flex justify-between items-center pb-2 border-b border-primary/10 last:border-0';
                    summaryItem.innerHTML = `
                        <div>
                            <p class="font-medium">${product.name}</p>
                            <p class="text-sm text-slate-500">Qty: ${item.quantity}</p>
                        </div>
                        <p class="font-semibold">$${(product.price * item.quantity).toFixed(2)}</p>
                    `;
                    summaryContainer.appendChild(summaryItem);
                }
            });
        }

        const subtotal = this.stateManager.getCartTotal();
        const shipping = subtotal > 0 ? 9.99 : 0;
        const total = subtotal + shipping;

        if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;
    }

    filterProducts(query) {
        const container = document.getElementById('featured-products');
        if (!container) return;

        const products = this.stateManager.getProducts().filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );

        container.innerHTML = '';
        products.forEach(product => {
            const element = this.createProductCard(product, 'featured');
            container.appendChild(element);
        });
    }

    handlePlaceOrder() {
        const name = document.querySelector('input[placeholder="Full Name"]')?.value;
        const email = document.querySelector('input[placeholder="Email"]')?.value;
        const address = document.querySelector('input[placeholder="Address"]')?.value;

        if (!name || !email || !address) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        this.showToast('Order placed successfully!', 'success');
        this.stateManager.clearCart();
        
        setTimeout(() => {
            this.router.navigate('home');
        }, 1500);
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-20 left-4 right-4 p-4 rounded-lg text-white font-medium z-50 animate-pulse ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
}

// ========================
// APP (MAIN)
// ========================

class App {
    constructor() {
        this.router = new Router();
        this.stateManager = new StateManager();
        this.uiHandler = new UIHandler(this.stateManager, this.router);
        
        this.init();
    }

    init() {
        this.router.subscribe((route, params) => {
            this.handleRouteChange(route);
        });

        this.stateManager.subscribe(() => {
            this.uiHandler.updateCartUI();
        });

        this.uiHandler.renderHomePage();
        this.uiHandler.updateCartUI();
    }

    handleRouteChange(route) {
        switch (route) {
            case 'home':
                this.uiHandler.renderHomePage();
                break;
            case 'products':
                this.uiHandler.renderProductList();
                break;
            case 'product-detail':
                this.uiHandler.renderProductDetail();
                break;
            case 'cart':
                this.uiHandler.renderCartPage();
                break;
            case 'checkout':
                this.uiHandler.renderCheckout();
                break;
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new App();
    });
} else {
    new App();
}
