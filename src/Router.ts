/**
 * Router.ts - Handles page navigation
 */

export interface RouteConfig {
    path: string;
    pageId: string;
}

export class Router {
    private currentRoute: string = 'home';
    private routes: Map<string, RouteConfig> = new Map();
    private listeners: ((route: string) => void)[] = [];

    constructor() {
        this.setupRoutes();
        this.setupNavigationListeners();
    }

    private setupRoutes(): void {
        this.routes.set('home', { path: 'home', pageId: 'home-page' });
        this.routes.set('products', { path: 'products', pageId: 'products-page' });
        this.routes.set('product-detail', { path: 'product-detail', pageId: 'product-detail-page' });
        this.routes.set('cart', { path: 'cart', pageId: 'cart-page' });
        this.routes.set('checkout', { path: 'checkout', pageId: 'checkout-page' });
    }

    private setupNavigationListeners(): void {
        // Listen for click events on elements with data-navigate attribute
        document.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            const navigateAttr = target?.closest('[data-navigate]')?.getAttribute('data-navigate');
            
            if (navigateAttr) {
                e.preventDefault();
                this.navigate(navigateAttr);
            }
        });
    }

    public navigate(routeName: string, params?: Record<string, any>): void {
        if (!this.routes.has(routeName)) {
            console.warn(`Route ${routeName} not found`);
            return;
        }

        this.currentRoute = routeName;
        this.showPage(routeName);
        this.notifyListeners(routeName, params);
    }

    private showPage(routeName: string): void {
        const route = this.routes.get(routeName);
        if (!route) return;

        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show the selected page
        const pageElement = document.getElementById(route.pageId);
        if (pageElement) {
            pageElement.classList.add('active');
            window.scrollTo(0, 0);
        }
    }

    public subscribe(listener: (route: string, params?: Record<string, any>) => void): void {
        this.listeners.push(listener);
    }

    private notifyListeners(route: string, params?: Record<string, any>): void {
        this.listeners.forEach(listener => listener(route, params));
    }

    public getCurrentRoute(): string {
        return this.currentRoute;
    }
}
