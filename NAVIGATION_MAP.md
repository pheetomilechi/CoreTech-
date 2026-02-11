# 🗺️ Application Navigation Map

## Page Structure & Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                       CORETECH E-COMMERCE APP                          │
│                                                                          │
│              [Logo]        [Search Bar]      [Profile] [Cart]           │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


                        ┌────────────────────┐
                        │   HOME PAGE        │
                        │                    │
                        │  ┌──────────────┐  │
                        │  │ Hero Banner  │  │
                        │  │ "Shop Now"   │  │
                        │  └──────┬───────┘  │
                        │         │          │
                        │  ┌──────┴──────┐   │
                        │  │ Categories  │   │
                        │  │ - Laptops   │   │
                        │  │ - Components│   │
                        │  │ - Accessories   │
                        │  └──────┬──────┘   │
                        │         │          │
                        │  ┌──────┴──────┐   │
                        │  │  Featured   │   │
                        │  │  Products   │   │
                        │  └────────┬────┘   │
                        └───────────┼────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
              Click Category  Click Product   Click Shop Now
              or Featured              │
                    │                  │
                    └──────┬───────────┘
                           │
                    ┌──────▼──────────┐
                    │ PRODUCTS PAGE   │
                    │                 │
                    │ ┌─────────────┐ │
                    │ │ Product 1   │ │  [Add to Cart]
                    │ │ $x.xx       │ │
                    │ └┬────────────┘ │
                    │  │              │
                    │ ┌┴─────────────┐│
                    │ │ Product 2   │ │  [Add to Cart]
                    │ │ $y.yy       │ │
                    │ └──────┬───────┘│
                    │        │        │
                    └────────┼────────┘
         ┌───────────────────┼────────────────────┐
         │                   │                    │
         ▼                   ▼                    ▼
    Click Product    Click Add to Cart    Click Logo/Home
         │                   │                    │
         │                   ├─────────┐          │
         │                   │         │          │
         ▼                   ▼         ▼          │
    ┌───────────────┐   ┌────────┐    │         │
    │ PRODUCT       │   │ Show   │    │         │
    │ DETAIL PAGE   │   │ Toast  │    │         │
    │               │   └────────┘    │         │
    │ [Image]       │                 │         │
    │ [Specs]       │                 ▼         │
    │ [Qty Select]  │            (cart updates) │
    │ [Add to Cart] │                 │         │
    │ [Back]        │                 ▼         │
    │               │            ┌──────────┐   │
    │ [Back to      │            │ Cart     │   │
    │  Products]    │            │ Count    │   │
    └───┬───────────┘            │ Badge    │   │
        │                        │ Updates  │   │
        │                        │ (e.g 3)  │   │
        │                        └──────────┘   │
        │                             │         │
        ├─────────────────────────────┘         │
        │                                       │
        └────────────┬──────────────────────────┘
                     │
            Click "Add to Cart"
            or Cart Icon Button
                     │
                     ▼
        ┌────────────────────────┐
        │   CART PAGE            │
        │                        │
        │ Items Section:         │
        │ ┌──────────────────┐   │
        │ │ Product 1 x 2    │   │
        │ │ [- 1 qty +]      │   │
        │ │ [Remove]         │   │
        │ └──────────────────┘   │
        │ ┌──────────────────┐   │
        │ │ Product 2 x 1    │   │
        │ │ [- 1 qty +]      │   │
        │ │ [Remove]         │   │
        │ └──────────────────┘   │
        │                        │
        │ Subtotal: $xxx.xx      │
        │ Shipping: $9.99        │
        │ Total: $xxx.xx         │
        │                        │
        │ [Proceed to Checkout]  │
        │ [Continue Shopping]    │
        └────────────┬───────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
    [Checkout]         [Back/Continue Shopping]
          │                     │
          │                     └────────► (back to products)
          │
          ▼
    ┌──────────────────────┐
    │ CHECKOUT PAGE        │
    │                      │
    │ Shipping Address:    │
    │ [Full Name]          │
    │ [Email]              │
    │ [Address]            │
    │                      │
    │ Payment Method:      │
    │ ◉ Credit Card        │
    │ ○ PayPal             │
    │                      │
    │ Order Summary:       │
    │ ├─ Product 1 x 2     │
    │ ├─ Product 2 x 1     │
    │ ├─ Subtotal: $xxx    │
    │ ├─ Shipping: $9.99   │
    │ └─ Total: $xxx.xx    │
    │                      │
    │ [Place Order]        │
    │ [Back to Cart]       │
    └────────┬─────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
[Place Order]   [Back Button]
    │                 │
    │                 ▼ (back to cart)
    │
    ▼
[Order Success Toast Message]
Cart Clears
Redirect to Home
    │
    ▼
    Back at HOME PAGE (fresh start)
```

---

## Navigation Summary

### From HOME PAGE, you can:
- Navigate to: **PRODUCTS** (Shop Now or Category)
- View: **Cart** (shopping bag icon)
- Search: **Find Products** (search bar)
- Logo click: **Stay Home** (no-op)

### From PRODUCTS PAGE, you can:
- Navigate to: **HOME** (back button or logo)
- Navigate to: **PRODUCT DETAIL** (click product)
- Navigate to: **CART** (shopping bag icon)
- Action: **Add to Cart** (quick button)

### From PRODUCT DETAIL PAGE, you can:
- Navigate to: **PRODUCTS** (back button)
- Navigate to: **CART** (cart icon or after adding)
- Action: **Add to Cart** (with quantity)
- Action: **View Specs** (see product details)

### From CART PAGE, you can:
- Navigate to: **HOME** (back button or logo)
- Navigate to: **CHECKOUT** (proceed button)
- Navigate to: **PRODUCTS** (continue shopping, if empty)
- Action: **Modify Qty** (+/- buttons)
- Action: **Remove Item** (trash icon)

### From CHECKOUT PAGE, you can:
- Navigate to: **CART** (back button)
- Action: **Fill Form** (shipping, email, payment)
- Action: **Submit Order** (place order button)
- After Submit: **Auto → HOME** (success, cart cleared)

---

## User Journeys

### Journey 1: Browse & Buy
```
HOME 
  → See featured product 
  → Click product 
  → PRODUCT DETAIL 
  → Add to cart with quantity 2 
  → CART (auto if wanted) 
  → Modify quantity (qty -1) 
  → Proceed to CHECKOUT 
  → Fill form 
  → Place order 
  → Success → HOME (empty cart)
```

### Journey 2: Category Browse
```
HOME 
  → Click LAPTOPS category 
  → PRODUCTS PAGE (filtered) 
  → Click different laptop 
  → PRODUCT DETAIL 
  → Add to cart 
  → Back to PRODUCTS 
  → Add another laptop 
  → Continue Shopping back to HOME 
  → Click Cart icon 
  → CART 
  → Checkout flow
```

### Journey 3: Search & Quick Buy
```
HOME 
  → Type "Mouse" in search 
  → See filtered products 
  → Click mouse product 
  → PRODUCT DETAIL 
  → Set qty to 3 
  → Add to cart 
  → Continue viewing products 
  → Click Cart icon 
  → CART 
  → Checkout
```

### Journey 4: Cart Review & Adjust
```
HOME 
  → Add Product A 
  → Add Product B 
  → Add Product C 
  → Click Cart 
  → CART PAGE 
  → Review items 
  → Increase Product A qty 
  → Remove Product C 
  → Review total 
  → Checkout
```

---

## State Transitions

```
┌────────────┐
│   HOME     │ ←─── START HERE
└─────┬──────┘
      │ Navigate
      ▼
┌────────────┐
│ PRODUCTS   │
└─────┬──────┘
      │ Click product
      ▼
┌────────────┐
│   DETAIL   │
└─────┬──────┘
      │ Add to cart
      │ (StateManager updates)
      │ (Cart badge updates)
      ▼
┌────────────┐
│   CART     │
└─────┬──────┘
      │ Checkout
      ▼
┌────────────┐
│ CHECKOUT   │
└─────┬──────┘
      │ Place Order
      │ (Cart cleared)
      ▼
┌────────────┐
│   HOME     │ ←─── Back to start
└────────────┘
```

---

## Component Interaction Map

```
┌──────────────────────┐
│    HTML Elements     │
│  (index.html)        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Event Listeners    │    User clicks button
│   (dist/app.js)      │◄───
└────┬────────────────┬┘
     │ calls          │
     ▼                ▼
┌──────────────┐  ┌──────────────────┐
│   Router     │  │  StateManager    │
│              │  │                  │
│ navigate()   │  │ addToCart()      │
│ showPage()   │  │ removeFromCart() │
│ subscribe()  │  │ subscribe()      │
└──────┬───────┘  └────────┬─────────┘
       │                   │
       ▼                   ▼
  ┌─────────────────────────────────┐
  │      App Receives Events        │
  │                                 │
  │  handleRouteChange()            │
  │  (state → UI binding)           │
  └────────────┬────────────────────┘
               │
               ▼
        ┌──────────────┐
        │   UIHandler  │
        │              │
        │ render*()    │
        │ showToast()  │
        └──────┬───────┘
               │
               ▼
        ┌──────────────┐
        │  DOM Updates │
        │              │
        │ No reload!   │
        │ Just CSS &   │
        │ innerHTML    │
        └──────────────┘
```

---

## Data Flow Through Pages

```
Product Data
    ├──────────────────────────────────────────────┐
    │                                              │
    ▼                                              ▼
[HOME PAGE]                              [PRODUCTS PAGE]
Featured Products                        All or Filtered
    │                                              │
    └─────────────────┬───────────────────────────┘
                      │
                      ▼
            [PRODUCT DETAIL PAGE]
         Full Product Info
                │ Add to Cart
                ▼
            StateManager
         cart.push({product})
                │ Notify
                ▼
              App
            Re-render UI
                │
                ▼
        [CART PAGE]
    Shows cart contents from StateManager
                │
                ├─ Modify Qty
                ├─ Remove Item
                └─ Checkout
                      │
                      ▼
              [CHECKOUT PAGE]
          Shows order summary
                │ Place Order
                ▼
            StateManager
         clearCart()
                │ Notify
                ▼
              App
            Navigate to HOME
```

---

This map shows:
- ✅ All 5 pages and their structure
- ✅ How pages connect to each other
- ✅ User navigation paths
- ✅ Component interactions
- ✅ Data flow through the app

**Ready to navigate!** 🚀
