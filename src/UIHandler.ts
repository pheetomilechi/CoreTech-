/**
 * UIHandler.ts - Handles UI rendering and updates
 */

import { StateManager, Product, CartItem } from './StateManager';
import { Router } from './Router';

export class UIHandler {
    constructor(private stateManager: StateManager, private router: Router) {
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        // Search functionality
        const searchInput = document.getElementById('search-input') as HTMLInputElement;
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = (e.target as HTMLInputElement).value.toLowerCase();
                this.filterProducts(query);
            });
        }

        // Category filters
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

        // Place order button
        const placeOrderBtn = document.getElementById('place-order-btn');
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', () => {
                this.handlePlaceOrder();
            });
        }
    }

    public renderHomePage(): void {
        this.renderFeaturedProducts();
    }

    private renderFeaturedProducts(): void {
        const container = document.getElementById('featured-products');
        if (!container) return;

        const products = this.stateManager.getProducts().slice(0, 3);
        container.innerHTML = '';

        products.forEach(product => {
            const element = this.createProductCard(product, 'featured');
            container.appendChild(element);
        });
    }

    public renderProductList(): void {
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

    private createProductCard(product: Product, type: 'featured' | 'list'): HTMLElement {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer';
        
        const content = `
            <div class="flex gap-4 p-3">
                <img src="${product.image}" alt="${product.name}" class="w-24 h-24 object-cover rounded-lg"/>
                <div class="flex-1 flex flex-col justify-between">
                    <div>
                        <h3 class="font-semibold text-sm">${product.name}</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${product.category}</p>
                        ${product.rating ? `
                            <div class="flex items-center gap-1 mt-2">
                                <span class="text-yellow-400 text-xs">★</span>
                                <span class="text-xs font-medium">${product.rating}</span>
                            </div>
                        ` : ''}
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

        // View details on card click
        card.querySelector('img')?.addEventListener('click', () => {
            this.stateManager.setSelectedProduct(product.id);
            this.renderProductDetail();
            this.router.navigate('product-detail');
        });

        card.querySelector('h3')?.addEventListener('click', () => {
            this.stateManager.setSelectedProduct(product.id);
            this.renderProductDetail();
            this.router.navigate('product-detail');
        });

        // Add to cart button
        const addBtn = card.querySelector('.add-to-cart-btn');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = addBtn.getAttribute('data-product-id');
                if (productId) {
                    this.stateManager.addToCart(productId, 1);
                    this.showToast('Added to cart!');
                }
            });
        }

        return card;
    }

    public renderProductDetail(): void {
        const container = document.getElementById('product-detail-content');
        if (!container) return;

        const product = this.stateManager.getState().selectedProduct;
        if (!product) {
            container.innerHTML = '<p>Product not found</p>';
            return;
        }

        const html = `
            <div class="space-y-4">
                <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover rounded-lg"/>
                
                <div>
                    <span class="text-xs font-bold uppercase tracking-widest text-primary/70">${product.category}</span>
                    <h1 class="text-2xl font-bold mt-2">${product.name}</h1>
                    ${product.rating ? `
                        <div class="flex items-center gap-2 mt-2">
                            <span class="text-yellow-400">★</span>
                            <span class="font-medium">${product.rating}</span>
                            <span class="text-sm text-slate-500">(128 reviews)</span>
                        </div>
                    ` : ''}
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

        // Add to cart from detail page
        const addBtn = document.getElementById('add-to-cart-detail');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const quantityInput = document.getElementById('quantity-input') as HTMLInputElement;
                const quantity = parseInt(quantityInput?.value || '1', 10);
                this.stateManager.addToCart(product.id, quantity);
                this.showToast('Added to cart!');
            });
        }
    }

    public updateCartUI(): void {
        const cartCount = this.stateManager.getCartItemCount();
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount.toString();
        }

        this.renderCartPage();
    }

    public renderCartPage(): void {
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

                    // Setup event listeners
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

        // Update totals
        if (cartItemsCount) cartItemsCount.textContent = cart.length.toString();
        
        const subtotal = this.stateManager.getCartTotal();
        const shipping = subtotal > 0 ? 9.99 : 0;
        const total = subtotal + shipping;

        if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        if (cartShipping) cartShipping.textContent = `$${shipping.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    public renderCheckout(): void {
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

    private filterProducts(query: string): void {
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

    private handlePlaceOrder(): void {
        const name = (document.querySelector('input[placeholder="Full Name"]') as HTMLInputElement)?.value;
        const email = (document.querySelector('input[placeholder="Email"]') as HTMLInputElement)?.value;
        const address = (document.querySelector('input[placeholder="Address"]') as HTMLInputElement)?.value;

        if (!name || !email || !address) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        // Simulate order placement
        this.showToast('Order placed successfully!', 'success');
        this.stateManager.clearCart();
        
        setTimeout(() => {
            this.router.navigate('home');
        }, 1500);
    }

    private showToast(message: string, type: 'success' | 'error' = 'success'): void {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-20 left-4 right-4 p-4 rounded-lg text-white font-medium z-50 animation-fadeIn ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2000);
    }
}
