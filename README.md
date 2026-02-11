# CoreTech E-Commerce - TypeScript Reactive Architecture

## Quick Start Guide

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Build TypeScript**
```bash
# One-time build
npm run build

# Or watch mode (auto-rebuild on file changes)
npm run watch
```

### 3. **Run the Application**
```bash
# Option 1: Development mode (watch + serve)
npm run dev

# Option 2: Just serve (if already built)
npm run serve
```

The app will open at `http://localhost:8080`

---

## Project Architecture

### **Folder Structure**
```
CoreTech/
├── index.html           # Main HTML file (unified SPA)
├── src/
│   ├── app.ts          # Application entry point
│   ├── Router.ts       # Page navigation system
│   ├── StateManager.ts # Application state & data
│   └── UIHandler.ts    # UI rendering & updates
├── dist/
│   └── app.js          # Compiled JavaScript (auto-generated)
├── tsconfig.json       # TypeScript configuration
├── package.json        # NPM dependencies
└── README.md           # This file
```

---

## How It Works

### **1. Router (src/Router.ts)**
- Manages navigation between pages
- Handles `data-navigate` attributes
- Triggers page transitions with fade-in animation

```typescript
router.navigate('products'); // Navigate to products page
```

### **2. StateManager (src/StateManager.ts)**
- Centralized application state
- Manages cart, products, and selections
- Persists cart to localStorage
- Notifies listeners when state changes

```typescript
stateManager.addToCart(productId, quantity);
const cartTotal = stateManager.getCartTotal();
```

### **3. UIHandler (src/UIHandler.ts)**
- Renders and updates all UI components
- Handles user interactions (buttons, form inputs)
- Filters products by category/search
- Shows toast notifications

### **4. App (src/app.ts)**
- Ties everything together
- Sets up subscriptions
- Handles route changes → UI updates

---

## Navigation Flow

```
Home Page
  ├─> Shop Now → Products Page
  ├─> Category Click → Products Page (filtered)
  └─> Cart Icon → Cart Page

Products Page
  ├─> Product Card → Product Detail Page
  ├─> Add to Cart → Back to Products (toast)
  └─> Back Button → Home

Product Detail Page
  ├─> Add to Cart → Cart Page
  └─> Back Button → Products

Cart Page
  ├─> Proceed to Checkout → Checkout Page
  ├─> Modify Quantity → Update Cart
  └─> Remove Item → Update Cart

Checkout Page
  ├─> Fill Form
  └─> Place Order → Home (clears cart)
```

---

## Key Features

✅ **Reactive State Management** - Cart updates trigger UI re-renders  
✅ **Client-Side Routing** - No page reloads, smooth transitions  
✅ **LocalStorage Persistence** - Cart data saved between sessions  
✅ **TypeScript Type Safety** - Interfaces for Product, CartItem, AppState  
✅ **Event-Driven Architecture** - Loose coupling between components  
✅ **Responsive UI** - Mobile-first Tailwind CSS design  
✅ **Search & Filter** - Search products by name/category  

---

## Adding New Features

### **Add a New Page**

1. Add page container in `index.html`:
```html
<div id="new-page" class="page">
    <!-- Your content -->
</div>
```

2. Add route in `Router.ts`:
```typescript
this.routes.set('new-page', { path: 'new-page', pageId: 'new-page' });
```

3. Add render method in `UIHandler.ts`:
```typescript
public renderNewPage(): void {
    // Render logic
}
```

4. Handle route in `app.ts`:
```typescript
case 'new-page':
    this.uiHandler.renderNewPage();
    break;
```

### **Add a New Product**

Edit `generateSampleProducts()` in `StateManager.ts`:
```typescript
{
    id: '7',
    name: 'New Product',
    price: 99.99,
    image: 'image-url',
    category: 'category-name',
    description: 'Description',
    rating: 4.5,
}
```

---

## API Integration

To connect to a real backend API:

1. Create `src/api.ts`:
```typescript
export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('/api/products');
    return response.json();
}
```

2. Update `StateManager.ts`:
```typescript
constructor() {
    this.loadProducts(); // Load from API
}

private async loadProducts() {
    this.state.products = await fetchProducts();
}
```

---

## Troubleshooting

**Issue: App not showing content**  
→ Make sure you've run `npm run build` and the `dist/app.js` exists

**Issue: TypeScript errors**  
→ Run `npm run build` to check for compilation errors

**Issue: Changes not reflected**  
→ Make sure you're in watch mode: `npm run watch`

**Issue: Cart not persisting**  
→ Check browser's localStorage is enabled  
→ Clear browser cache if needed

---

## Next Steps

- Connect to a backend API
- Add user authentication
- Implement payment gateway (Stripe, PayPal)
- Add product reviews and ratings
- Implement order history
- Add wishlist feature
- Create admin dashboard

---

## Files Reference

**index.html** - Contains all 5 page structures  
**Router.ts** - Handles navigation between pages  
**StateManager.ts** - Manages app state and data  
**UIHandler.ts** - Renders UI components  
**app.ts** - Initializes and connects everything  

---

Happy coding! 🚀
