# ZyvoMart - E-Commerce Application Specification

## 1. Project Overview

**Project Name:** ZyvoMart  
**Type:** Full-stack e-commerce web application  
**Core Functionality:** A modern e-commerce platform with user authentication, product catalog, shopping cart, checkout, and admin dashboard  
**Target Users:** General consumers (buyers) and store administrators

---

## 2. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js with credentials provider
- **Styling:** Tailwind CSS
- **Payments:** Stripe (Test Mode)
- **State Management:** React Context + useReducer for cart

---

## 3. Folder Structure

```
ZyvoMart/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (shop)/
│   │   │   ├── page.tsx (home/catalog)
│   │   │   ├── products/[id]/page.tsx
│   │   │   ├── cart/page.tsx
│   │   │   └── checkout/page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx (dashboard)
│   │   │   ├── products/page.tsx
│   │   │   ├── products/new/page.tsx
│   │   │   ├── products/[id]/edit/page.tsx
│   │   │   └── orders/page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── products/route.ts
│   │   │   ├── products/[id]/route.ts
│   │   │   ├── orders/route.ts
│   │   │   └── checkout/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartItem.tsx
│   │   ├── AdminSidebar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── lib/
│   │   ├── mongodb.ts
│   │   ├── stripe.ts
│   │   └── auth.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   └── Order.ts
│   ├── context/
│   │   └── CartContext.tsx
│   └── types/
│       └── index.ts
├── public/
├── .env.local
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## 4. Database Schema

### User Model
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string (hashed),
  role: 'user' | 'admin',
  createdAt: Date
}
```

### Product Model
```typescript
{
  _id: ObjectId,
  name: string,
  description: string,
  price: number,
  image: string (URL),
  category: string,
  stock: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  items: [{
    productId: ObjectId,
    name: string,
    price: number,
    quantity: number,
    image: string
  }],
  totalAmount: number,
  status: 'pending' | 'paid' | 'shipped' | 'delivered',
  stripePaymentId: string,
  createdAt: Date
}
```

---

## 5. UI/UX Specification

### Color Palette
- **Primary:** `#0f172a` (Slate 900 - dark navy)
- **Secondary:** `#3b82f6` (Blue 500 - vibrant blue)
- **Accent:** `#f59e0b` (Amber 500 - golden yellow)
- **Background:** `#f8fafc` (Slate 50)
- **Surface:** `#ffffff` (White)
- **Text Primary:** `#1e293b` (Slate 800)
- **Text Secondary:** `#64748b` (Slate 500)
- **Success:** `#22c55e` (Green 500)
- **Error:** `#ef4444` (Red 500)

### Typography
- **Font Family:** `Inter` (Google Fonts)
- **Headings:** Bold, tracking-tight
- **Body:** Regular, leading-relaxed

### Layout
- **Max Width:** 1280px centered
- **Spacing:** 4px base unit (Tailwind scale)
- **Responsive Breakpoints:**
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### Components

#### Header
- Logo (left)
- Navigation: Home, Products (center)
- Actions: Cart icon with count, Login/Profile (right)
- Sticky, white background with subtle shadow

#### Product Card
- Image (aspect-ratio 4:3, object-cover)
- Category badge (top-left overlay)
- Name (bold, truncate 2 lines)
- Price (primary color, bold)
- "Add to Cart" button (full width)

#### Product Detail Page
- Two-column layout (image left, details right)
- Image gallery support
- Price display with stock status
- Quantity selector
- Add to Cart button
- Product description

#### Cart Page
- List of cart items with quantity controls
- Remove button per item
- Order summary with total
- Proceed to Checkout button

#### Checkout Page
- Order summary
- Stripe Elements integration
- Place Order button

#### Admin Dashboard
- Sidebar navigation
- Stats cards (total products, orders, revenue)
- Recent orders table

#### Admin Products Page
- Product table with image thumbnails
- Edit/Delete actions
- "Add Product" button

#### Admin Orders Page
- Orders table with status
- Update status dropdown

---

## 6. Functionality Specification

### Authentication
- Login with email/password
- Register with name, email, password
- Session-based auth with NextAuth.js
- Role-based redirect (admin → /admin, user → /)

### Product Catalog
- Grid display (4 columns desktop, 2 mobile)
- Search by name
- Filter by category
- Pagination (12 items per page)

### Shopping Cart
- Add to cart from product card/detail
- Update quantity (+/-)
- Remove item
- Persist in localStorage
- Show cart count in header

### Checkout
- Display cart items summary
- Stripe test mode payment
- Create order on success
- Clear cart after order

### Admin Features
- CRUD products (name, description, price, image, category, stock)
- View all orders
- Update order status
- Only accessible to admin role

---

## 7. API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| GET | /api/products | Get all products (with search/filter) |
| POST | /api/products | Create product (admin) |
| PUT | /api/products/[id] | Update product (admin) |
| DELETE | /api/products/[id] | Delete product (admin) |
| GET | /api/orders | Get user orders |
| POST | /api/orders | Create order |
| PUT | /api/orders/[id] | Update order status (admin) |
| POST | /api/checkout | Create Stripe payment intent |

---

## 8. Acceptance Criteria

1. ✅ User can register and login
2. ✅ User can browse products with search and filter
3. ✅ User can view product details
4. ✅ User can add products to cart
5. ✅ User can manage cart quantities
6. ✅ User can checkout with Stripe test mode
7. ✅ Admin can access dashboard
8. ✅ Admin can add/edit/delete products
9. ✅ Admin can view and update orders
10. ✅ Responsive design works on mobile/tablet/desktop
11. ✅ All pages load without errors

---

## 9. Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/zuvomart
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 10. Sample Data

### Categories
- Electronics
- Clothing
- Home & Garden
- Sports
- Books

### Initial Admin User
- Email: admin@zuvomart.com
- Password: admin123
- Role: admin

---

*Specification created for ZyvoMart e-commerce project*