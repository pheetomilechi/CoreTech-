# 📁 File Structure Reference

## Project Files Overview

### Root Files

**index.html** (473 lines)
- Main entry point - render this in your browser
- Contains HTML structure for all 5 pages
- Imports Tailwind CSS and dist/app.js
- All pages exist in DOM, visibility controlled by CSS

**dist/app.js** (597 lines)
- **Bundled JavaScript** - Pre-compiled, ready to use
- No build step needed, just load in browser
- Contains all classes: Router, StateManager, UIHandler, App
- Works standalone without TypeScript

**package.json**
- NPM configuration (optional, only if using TypeScript)
- Scripts: build, watch, dev, serve

**tsconfig.json**
- TypeScript configuration (optional)
- Outputs to dist/ folder

---

## TypeScript Source Files (Optional)

### src/Router.ts (66 lines)
**Purpose**: Handle page navigation
```typescript
- class Router
  - navigate(routeName) → Switch pages
  - subscribe(listener) → Listen to route changes
  - setupRoutes() → Define available routes
```
**Used By**: App, UIHandler (indirect)

### src/StateManager.ts (196 lines)
**Purpose**: Manage all application data
```typescript
- class StateManager
  - State includes: cart[], products[], selectedProduct
  - addToCart() → Add item to cart
  - removeFromCart() → Remove item
  - updateCartQuantity() → Change quantity
  - clearCart() → Empty cart
  - getCartTotal() → Calculate total
  - subscribe() → Listen to state changes
  - localStorage → Auto-persist cart data
```
**Used By**: App, UIHandler

### src/UIHandler.ts (381 lines)
**Purpose**: Render UI and handle interactions
```typescript
- class UIHandler
  - renderHomePage() → Show home
  - renderProductList() → Show products
  - renderProductDetail() → Show product details
  - renderCartPage() → Show shopping cart
  - renderCheckout() → Show checkout form
  - createProductCard() → Create product UI
  - updateCartUI() → Update cart badge & page
  - showToast() → Show notifications
  - filterProducts() → Search function
```
**Used By**: App

### src/app.ts (32 lines)
**Purpose**: Application bootstrap and orchestration
```typescript
- class App
  - init() → Initialize app
  - handleRouteChange() → Route → render mapping
```
**Connects**: Router + StateManager + UIHandler

---

## Documentation Files

**README.md** (221 lines)
- Complete documentation
- Features overview
- API integration guide
- Troubleshooting

**QUICK_START.md** (65 lines)
- Fast setup instructions
- How to run without build tools
- Common customizations

**ARCHITECTURE.md** (This explains system structure)
- Visual diagrams
- Data flow explanations
- Component dependencies

**FILE_STRUCTURE.md** (This file)
- Reference for all files
- What each file does
- How to modify them

---

## How Files Connect

```
index.html (HTML Markup)
    └─ References dist/app.js

dist/app.js (Main JavaScript)
    └─ Bundled version of src/*
    └─ Ready to use (no build needed)

src/app.ts → dist/app.js
    Creates App instance which uses:
    ├─ src/Router.ts → dist/app.js
    │   Handles: navigate(), page switching
    ├─ src/StateManager.ts → dist/app.js
    │   Handles: cart, products, data
    └─ src/UIHandler.ts → dist/app.js
        Handles: rendering, UI updates
```

---

## Editing Files

### To Edit HTML (UI Layout)
Edit: **index.html**
- Change page structure
- Add new elements
- Modify button text/icons
- Add form fields
→ Changes appear immediately on refresh

### To Edit Styling
Edit: **index.html** (lines 24-30)
- Tailwind configuration
- Color scheme
- Font families
- Border radius
→ Changes appear immediately on refresh

### To Edit Products
Edit: **dist/app.js** (lines 166-206)
```javascript
generateSampleProducts() {
    return [
        {
            id: '1',
            name: 'Product Name',
            price: 99.99,
            image: 'url',
            category: 'category',
            rating: 4.5
        },
        // Add more...
    ];
}
```
→ Changes appear immediately on refresh

### To Edit Logic
**Option A: Edit JavaScript directly**
Edit: **dist/app.js**
→ Changes appear immediately on refresh

**Option B: Edit TypeScript (better for large changes)**
Edit: **src/** files
Run: `npm run build` (requires npm/Node.js)
→ Generates new dist/app.js

---

## What Each Component Does

### Router
```
Role: Navigation Manager
├─ Detects [data-navigate] clicks
├─ Shows/hides pages with CSS
├─ Fires route change events
└─ Maintains current route state
```

### StateManager
```
Role: Data Manager
├─ Stores products list
├─ Manages shopping cart
├─ Calculates totals
├─ Saves to localStorage
└─ Notifies listeners of changes
```

### UIHandler
```
Role: Rendering Manager
├─ Creates product cards
├─ Renders each page
├─ Handles user interactions
├─ Shows notifications
└─ Filters/searches products
```

### App (Main)
```
Role: Orchestrator
├─ Initializes all systems
├─ Connects Router → route changes
├─ Connects StateManager → data updates
├─ Connects UIHandler → renders updates
└─ Handles route → render mapping
```

---

## Common Questions

**Q: Do I need npm/Node.js?**
A: No! Just open index.html. npm is optional only for TypeScript development.

**Q: Where's my data?**
A: Products are hardcoded in StateManager.generateSampleProducts()
Cart data is saved in browser localStorage

**Q: How do I connect a real API?**
A: Create src/api.ts with fetch calls, then modify StateManager to use it

**Q: Can I change the design?**
A: Yes! Edit Tailwind classes in index.html or dist/app.js

**Q: How do I add new pages?**
A: Add page DIV in index.html, add route in Router, add render method in UIHandler

**Q: Is the code production-ready?**
A: It's a great starter. For production:
  - Connect real API
  - Add authentication
  - Integrate payment processor
  - Add error handling
  - Add unit tests
  - Optimize bundle size

---

## File Size Reference

| File | Size | Purpose |
|------|------|---------|
| index.html | ~20 KB | HTML structure |
| dist/app.js | ~25 KB | All logic bundled |
| src/Router.ts | ~3 KB | Navigation |
| src/StateManager.ts | ~8 KB | Data management |
| src/UIHandler.ts | ~12 KB | UI rendering |
| src/app.ts | ~1 KB | Main app |
| Total | ~65 KB | Everything |

---

## Quick Edit Recipes

### Change Primary Color
In **index.html** line 27:
```javascript
"primary": "#137fec",  // Change to any hex color
```

### Change Site Name
In **index.html** line 45:
```html
<h1>CORE<span class="text-primary">TECH</span></h1>
```

### Add New Product
In **dist/app.js** inside generateSampleProducts():
```javascript
{
    id: '999',
    name: 'New Product',
    price: 299.99,
    image: 'https://example.com/image.jpg',
    category: 'category-name',
    description: 'Product description',
    rating: 4.9,
}
```

### Change Shipping Price
In **dist/app.js**, find `shipping = 9.99`, change to your price

### Fix Cart Not Showing
Check browser DevTools:
1. F12 → Application tab
2. Storage → localStorage
3. Should see 'coretech-cart' key
4. If not, try adding product again

---

## Next Steps

1. **Test the app** - Open index.html
2. **Explore the code** - Read dist/app.js
3. **Try editing** - Change a price, refresh, see update
4. **Customize** - Change colors, products, text
5. **Connect API** - Integrate real backend
6. **Deploy** - Upload to web host

---

**Files are ready to go!** 🚀
