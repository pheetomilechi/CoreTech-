/**
 * app.ts - Main application entry point
 */

import { Router } from './Router';
import { StateManager } from './StateManager';
import { UIHandler } from './UIHandler';

class App {
    private router: Router;
    private stateManager: StateManager;
    private uiHandler: UIHandler;

    constructor() {
        this.router = new Router();
        this.stateManager = new StateManager();
        this.uiHandler = new UIHandler(this.stateManager, this.router);
        
        this.init();
    }

    private init(): void {
        // Setup router to re-render when navigating
        this.router.subscribe((route: string, params?: Record<string, any>) => {
            this.handleRouteChange(route);
        });

        // Setup state manager to update UI when state changes
        this.stateManager.subscribe(() => {
            this.uiHandler.updateCartUI();
        });

        // Initial renders
        this.uiHandler.renderHomePage();
        this.uiHandler.updateCartUI();
    }

    private handleRouteChange(route: string): void {
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
            default:
                break;
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new App();
    });
} else {
    new App();
}
