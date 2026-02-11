/**
 * StateManager.ts - Manages application state
 */

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    rating?: number;
}

export interface CartItem {
    productId: string;
    quantity: number;
    product?: Product;
}

export interface AppState {
    cart: CartItem[];
    products: Product[];
    selectedProduct?: Product;
    selectedCategory?: string;
}

export class StateManager {
    private state: AppState = {
        cart: [],
        products: this.generateSampleProducts(),
        selectedProduct: undefined,
        selectedCategory: undefined,
    };

    private listeners: ((state: AppState) => void)[] = [];

    constructor() {
        this.loadFromLocalStorage();
    }

    private generateSampleProducts(): Product[] {
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
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBtRJQI_ZB9mFEmZVUotfae45PT8CH_eHXn1oBeZHNIQUkWTPDHQKuWV6LOCdDjnXW0ljABTqilyetmWqAGU7ehr3brJyTfZELJvazSoPJaiCAqWOY3oZeSjmK3HiXm2HLxkEO1LLnwnXsQ9I715GYP3KIRQn3muZ3wxA-_QfTL7cjUu3jfndI-BgOMQ-e3Go5U-6BEzBHpad7ezcyPfNeT-Yc2GvLBb7e7Y1efhAa0S8V-q177Dr1FRuKygsECcHHshmFWjbkDi0',
                category: 'components',
                description: 'Ultra-fast NVMe SSD storage',
                rating: 4.8,
            },
            {
                id: '5',
                name: 'RGB Mechanical Keyboard',
                price: 159.99,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxpd5LvViALmCFITzuYKqIEhraY2NWZ5onRWSJnASDSkbqffn2tSNL3RkUiFTx9WdwP_4gKG03gB3Rk8AIuaUv6MmSpH3DnF_7SmEZkg6L7eRUM8q13ZFzJnnW-Sp7l_rGq0AkXtp6JhWQWoIZ9q6h5ygBIu-UI9NZOVr8ikhqyA4hBdCIouJROXfiYeSxr1TX-BcxvaPjBqcpyK1JBcIQg0ASYC80JVv63MYeWlHWASp6zllKjZRlBG7o339jS_lafIkHLxUQJw0',
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

    public getState(): AppState {
        return this.state;
    }

    public getProducts(category?: string): Product[] {
        if (category) {
            return this.state.products.filter(p => p.category === category);
        }
        return this.state.products;
    }

    public getProduct(id: string): Product | undefined {
        return this.state.products.find(p => p.id === id);
    }

    public addToCart(productId: string, quantity: number = 1): void {
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

    public removeFromCart(productId: string): void {
        this.state.cart = this.state.cart.filter(item => item.productId !== productId);
        this.saveToLocalStorage();
        this.notifyListeners();
    }

    public updateCartQuantity(productId: string, quantity: number): void {
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

    public clearCart(): void {
        this.state.cart = [];
        this.saveToLocalStorage();
        this.notifyListeners();
    }

    public getCartTotal(): number {
        return this.state.cart.reduce((total, item) => {
            const product = this.getProduct(item.productId);
            return total + (product?.price || 0) * item.quantity;
        }, 0);
    }

    public getCartItemCount(): number {
        return this.state.cart.reduce((count, item) => count + item.quantity, 0);
    }

    public setSelectedProduct(productId: string): void {
        this.state.selectedProduct = this.getProduct(productId);
    }

    public setSelectedCategory(category: string): void {
        this.state.selectedCategory = category;
    }

    public subscribe(listener: (state: AppState) => void): void {
        this.listeners.push(listener);
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener(this.state));
    }

    private saveToLocalStorage(): void {
        localStorage.setItem('coretech-cart', JSON.stringify(this.state.cart));
    }

    private loadFromLocalStorage(): void {
        const saved = localStorage.getItem('coretech-cart');
        if (saved) {
            try {
                this.state.cart = JSON.parse(saved);
                // Refresh product references
                this.state.cart.forEach(item => {
                    item.product = this.getProduct(item.productId);
                });
            } catch (e) {
                console.error('Failed to load cart from localStorage', e);
            }
        }
    }
}
