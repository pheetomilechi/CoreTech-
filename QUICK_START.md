# 🚀 Quick Start - CoreTech E-Commerce App

Your reactive TypeScript ecommerce site is ready to use! No build step needed - just open the file.

## Option 1: Quick Test (Fastest Way)

1. **Open index.html in your browser**
   - Right-click on `index.html`
   - Click "Open with" → Your preferred browser
   - OR drag & drop `index.html` to your browser

That's it! The app is fully functional.

---

## Option 2: Run with Local Server (Recommended)

Open PowerShell in the CoreTech folder and run:

```powershell
# Start a simple Python server
python -m http.server 8000

# OR if you have Node.js
npx http-server -p 8000

# Then visit: http://localhost:8000
```

---

## 📁 What You Have

✅ **index.html** - All 5 pages (Home, Products, Product Detail, Cart, Checkout)  
✅ **dist/app.js** - Pre-compiled JavaScript (ready to use, no build needed)  
✅ **src/** - TypeScript source files (for reference/modification)  
✅ **README.md** - Full documentation  

---

## 🎮 Try These Features

1. **Browse Products** - Click categories or "Shop Now"
2. **Search** - Type in the search bar
3. **Add to Cart** - Click the cart icon on any product
4. **View Cart** - Click the shopping bag in the header
5. **Checkout** - Fill out your info and place order
6. **Persistent Cart** - Refresh the page, cart stays!

---

## 📝 Modifying the Code

### If you want to edit TypeScript:

1. Install TypeScript:
   ```powershell
   npm install
   ```

2. Make changes in `src/` files

3. Compile to JavaScript:
   ```powershell
   npm run build
   ```

### OR just edit the bundled JavaScript:

Edit `dist/app.js` directly - changes take effect immediately on page refresh

---

## 🔧 Common Customizations

### Change Product List
Edit `generateSampleProducts()` in `dist/app.js` (around line 166)

### Change Colors
Edit Tailwind config in `index.html` (around line 27):
```javascript
colors: {
    "primary": "#137fec",  // Change this
    ...
}
```

### Add New Products
```javascript
{
    id: '7',
    name: 'Your Product',
    price: 99.99,
    image: 'image-url',
    category: 'category-name',
    rating: 4.5,
}
```

---

## 🐛 Troubleshooting

**App not loading?**
→ Make sure you opened `index.html` (not a folder)

**Products not showing?**
→ Check browser console (F12) for errors

**Cart not saving?**
→ Check if localStorage is enabled in browser

**Need to reset cart?**
→ Open Developer Tools → Application tab → Clear localStorage

---

## 📚 Learning the Architecture

- **Router.ts** - Handles page navigation
- **StateManager.ts** - Manages products & cart
- **UIHandler.ts** - Renders UI components  
- **app.ts** - Connects everything

All combined into `dist/app.js` for simplicity.

---

## ✨ Next Steps

1. Test all pages and flows
2. Customize products and prices
3. Connect to a real backend API
4. Add user authentication
5. Implement real payment processing

---

**Ready to go!** Open `index.html` now 🎉
