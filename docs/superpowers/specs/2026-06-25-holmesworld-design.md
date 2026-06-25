# HolmesWorld — Design Specification
**Date:** 2026-06-25
**Project:** HolmesWorld E-Commerce Prototype
**Route root:** `app/work/holmesworld/`

---

## 1. Product Vision

HolmesWorld is a premium digital marketplace for home construction materials targeting Indian homeowners, architects, contractors, and builders. The prototype demonstrates the complete purchasing experience — from discovery through checkout — with particular emphasis on the flagship BoM (Bill of Materials) intelligent procurement feature.

This prototype will serve as case study source material, so the code structure, visual quality, and interaction design must read as production-ready.

---

## 2. Prototype Scope

### Fidelity Model: Deep Showcase (Option B)

Two fully interactive journeys built end-to-end, plus high-fidelity static screens for the remaining product areas.

### Interactive Journeys

| Journey | Route(s) |
|---|---|
| Journey A — Purchase | Homepage → Category PLP → Product Detail → Cart → Checkout |
| Journey B — BoM | Homepage → BoM Upload → Recommendations → Cart → Checkout |

Cart and Checkout are shared between both journeys — they must handle both regular items and BoM-sourced items simultaneously.

### Static Screens (high-fidelity, no state changes)

| Screen | Route |
|---|---|
| Orders list | `/work/holmesworld/orders` |
| Order detail + tracking | `/work/holmesworld/orders/[id]` |
| Project Workspace | `/work/holmesworld/projects` |
| Product Comparison | `/work/holmesworld/compare` |

---

## 3. Information Architecture & Route Structure

```
app/work/holmesworld/
  layout.tsx                  ← persistent nav shell
  page.tsx                    ← Homepage
  categories/
    page.tsx                  ← All Categories grid
    [slug]/page.tsx           ← Category PLP (Journey A)
  products/
    [slug]/page.tsx           ← Product Detail Page (Journey A)
  bom/
    page.tsx                  ← BoM Upload + Smart Recommendations (Journey B)
  cart/
    page.tsx                  ← Cart (shared — Journeys A + B)
  checkout/
    page.tsx                  ← Checkout (shared)
  orders/
    page.tsx                  ← Orders list [static]
    [id]/page.tsx             ← Order detail + tracking [static]
  projects/
    page.tsx                  ← Project Workspace [static]
  compare/
    page.tsx                  ← Product Comparison [static]

lib/holmesworld/
  data/
    products.ts               ← ~50 product records
    categories.ts             ← 18 category records
    orders.ts                 ← 3 sample orders
    projects.ts               ← 2 sample projects
  types.ts                    ← TypeScript interfaces
  store.tsx                   ← Cart + BoM state via React Context
```

---

## 4. Visual Design Language

### Reference
Jaquar.com visual register: minimal, editorial, large-format photography, extreme whitespace, warm premium palette. Adapted for the full construction material taxonomy (not only bathroom fittings).

### Colour Palette

| Token | Hex | Use |
|---|---|---|
| `surface` | `#F7F5F2` | Page background |
| `surface-2` | `#EFEBE5` | Card backgrounds, section fills |
| `surface-dark` | `#1A1814` | Dark hero sections, overlays |
| `ink` | `#111010` | Primary text |
| `ink-muted` | `#6A6560` | Secondary text, labels |
| `gold` | `#B8986A` | Accent — prices, CTAs, badges |
| `gold-light` | `#EDE4D4` | Hover fills, tags, chips |
| `surface-3` | `#E2DDD7` | Card borders, dividers |
| `white` | `#FFFFFF` | Cards on dark, overlays |
| `amber` | `#D4821A` | Warning — BoM unmatched items |
| `green` | `#2D6A4F` | Success — Delivered, In Stock |

### Typography
- Font: Geist Sans (already loaded in layout)
- Display: Light weight (300), wide letter-spacing (`tracking-widest`), uppercase where editorial
- Headings: Semibold (600), normal tracking
- Body: Regular (400), tight line-height (1.5)
- Price: Medium (500) in `gold` token

### Photography Direction
- Hero: Full-bleed lifestyle — marble slabs, brass fixtures, polished stone, raw concrete in beautiful homes
- Product cards: product against warm-neutral or white background, clean studio lighting
- Category cards: editorial crop of the material/product in context
- All imagery: Unsplash/Pexels URLs with Indian homes and construction context where available

### Component Conventions
- Card border: none, or 1px `surface-3` (`#E2DDD7`)
- Card shadow: none at rest, `0 4px 24px rgba(0,0,0,0.08)` on hover
- Border radius: `8px` for cards and inputs, `6px` for buttons
- Button — primary: `background: ink`, `color: white`
- Button — accent: `background: gold`, `color: white`
- Button — ghost: `border: 1px ink`, `background: transparent`
- No pill buttons
- Input: 1px `surface-3` border, focus ring in `gold-light`

### Motion (Framer Motion v12)
- Scroll-entry: fade-up (`y: 20 → 0`, `opacity: 0 → 1`, `duration: 0.5`)
- Page transitions: `AnimatePresence` with crossfade
- Cart drawer: slide in from right (`x: 100% → 0`)
- Mega menu: expand with `height` animation + opacity
- BoM processing: staggered line-item reveal
- Category card hover: subtle scale `1 → 1.02`
- All animations respect `prefers-reduced-motion`

---

## 5. India-Specific Requirements

- **Currency:** ₹ INR throughout, no $ or €
- **Price points:** Realistic Indian market rates
  - Tiles: ₹65–₹285/sq ft
  - Bathroom fittings: ₹8,000–₹95,000
  - Cement: ₹380–₹420/50kg bag
  - Paint: ₹180–₹650/litre
  - Steel TMT bars: ₹62–₹68/kg
- **Brands:** Asian Paints, Kajaria, Somany, Jaquar, Hindware, Havells, Ultratech Cement, JK Cement, Tata Steel, Astral Pipes, Berger, Cera
- **Address fields:** Flat/House no., Building/Society name, Locality/Area, City, State (Indian states dropdown), PIN code
- **Payment methods:** UPI (hero — first position), Net Banking, No Cost EMI (prominent), Debit/Credit Card
- **Delivery:** PIN code check, lead times: metros 3–5 days, tier-2 cities 7–12 days
- **Tax:** GST shown separately in cart and checkout (12% on most construction materials, 18% on fittings)
- **Sample locations:** Mumbai, Bengaluru, Delhi NCR, Hyderabad, Pune

---

## 6. Data Layer

### TypeScript Types (`lib/holmesworld/types.ts`)

```typescript
interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  subcategory: string
  price: number          // per unit
  unit: string           // 'sq ft' | 'bag' | 'piece' | 'kg' | 'litre' | 'set'
  bulkPricing: { minQty: number; price: number }[]
  images: string[]       // Unsplash URLs
  rating: number
  reviewCount: number
  inStock: boolean
  deliveryDays: number   // metro
  specs: Record<string, string>
  description: string
  tags: string[]
}

interface Category {
  id: string
  slug: string
  name: string
  description: string
  image: string
  subcategories: string[]
  productCount: number
}

interface CartItem {
  productId: string
  quantity: number
  source: 'browse' | 'bom'
  bomLineItem?: string   // original BoM description if source === 'bom'
}

interface Order {
  id: string
  date: string
  status: 'Processing' | 'Confirmed' | 'Dispatched' | 'Out for Delivery' | 'Delivered'
  items: { product: Product; quantity: number }[]
  address: Address
  paymentMethod: string
  subtotal: number
  gst: number
  delivery: number
  total: number
  trackingEvents: { date: string; status: string; description: string }[]
}

interface Project {
  id: string
  name: string
  location: string
  budget: number
  spent: number
  completionPercent: number
  lastUpdated: string
  orders: string[]       // order IDs
  pendingItems: string[] // product IDs
}

interface Address {
  flatNo: string
  building: string
  locality: string
  city: string
  state: string
  pincode: string
}
```

### Sample Data Scale
- **Products:** ~50 records across 8 categories (tiles, bathroom fittings, cement, steel, paint, electrical, plumbing, lighting)
- **Categories:** 18 records with subcategories
- **Orders:** 3 records — 1 Delivered, 1 In Transit (mid-tracking), 1 Processing
- **Projects:** 2 records — "3BHK Koramangala Renovation" (Bengaluru), "Villa Interiors — Whitefield" (Bengaluru)

### State Management (`lib/holmesworld/store.tsx`)
React Context with `useReducer`. Actions:
- `ADD_TO_CART` (with source: browse | bom)
- `REMOVE_FROM_CART`
- `UPDATE_QUANTITY`
- `CLEAR_CART`
- `SET_BOM_RESULTS`
- `ADD_TO_RECENTLY_VIEWED` (stores last 4 product IDs in context, used on PDP)

No persistence — state resets on page refresh (prototype behaviour).

---

## 7. Screen Specifications

### 7.1 Homepage (`/work/holmesworld`)

**Hero section**
- Full-bleed image: marble/stone lifestyle photography
- Dark overlay (60% opacity on `surface-dark`)
- Headline: "Build Your Dream Home." (light weight, 72px, white)
- Subline: "Everything you need, from foundation to fittings." (muted, 20px)
- Two CTAs: "Browse Materials" (primary) + "Upload Bill of Materials" (ghost, white border)
- Scroll indicator arrow

**Categories strip**
- Heading: "Shop by Category"
- Horizontal scroll on mobile, 6-col grid on desktop
- Each card: square image, category name, product count

**Featured collection**
- Heading: "Curated for Your Home"
- Asymmetric editorial grid: 1 large card (left 2/3) + 2 stacked cards (right 1/3)
- Each card: full-bleed product image, name, price, "View Product" link

**Construction stages**
- Heading: "Shop by Stage"
- Horizontal stepper: Foundation → Structure → Electrical & Plumbing → Interiors → Finishes & Fittings
- Active stage highlights relevant product categories below

**Trending products**
- 4-up product card grid
- Standard product card: image, brand, name, price, rating, Add to Cart

**Promotions banner**
- Full-width dark section (`surface-dark` background)
- Gold headline: "No Cost EMI on orders above ₹50,000"
- Subtext + CTA

**BoM CTA section**
- Split layout: left text, right illustration/icon
- Headline: "Have a Bill of Materials?"
- Body: "Upload your architect's list and we'll find everything in minutes."
- CTA: "Upload BoM" → links to `/work/holmesworld/bom`

---

### 7.2 All Categories (`/work/holmesworld/categories`)

- Full-width page grid of all 18 category cards (3-col desktop, 2-col tablet, 1-col mobile)
- Each card: large image, category name, subcategory count, product count
- Links to the respective `[slug]` PLP
- Simple header: "All Categories" h1

---

### 7.3 Category PLP (`/work/holmesworld/categories/[slug]`)

**Header**
- Category name (h1), breadcrumb, product count, hero category image banner

**Layout**
- Left sidebar (240px, sticky): filters
- Right content: sort bar + product grid

**Filters**
- Price range slider (₹ min/max)
- Brand checkboxes (top 5 brands in category)
- Material/Finish multi-select
- Rating filter (4★ and above toggle)
- In Stock toggle
- "Clear all filters" link

**Sort bar**
- Dropdown: Popularity / Price: Low to High / Price: High to Low / Newest / Rating
- Active filter chips (removable)
- Result count: "Showing 24 of 48 products"

**Product card**
- Image (4:3 ratio)
- Brand name (small, muted)
- Product name (medium weight)
- Rating (stars + count)
- Price (gold, bold) + unit
- Bulk price indicator: "₹X/unit for 100+"
- "Add to Cart" button (appears on hover on desktop, always visible on mobile)

**Pagination**
- Previous / page numbers / Next
- "Showing X–Y of Z products"

---

### 7.4 Product Detail Page (`/work/holmesworld/products/[slug]`)

**Left column (55%)**
- Main image (large, square)
- 4 thumbnail images below, click to swap main
- Hover zoom effect on main image

**Right column (45%)**
- Breadcrumb
- Brand name (small, muted, linked)
- Product name (h1, large)
- Rating + review count
- SKU / product code
- Price (large, gold)
- Bulk pricing table: qty tiers with per-unit price
- Quantity selector (stepper)
- PIN code delivery check (input + "Check" button → shows delivery estimate)
- "Add to Cart" (primary, full-width)
- "Add to Project" (ghost, full-width)
- Delivery info: metro/non-metro estimates
- Returns policy snippet

**Below fold**
- Tab bar: Technical Specs / Dimensions / Downloads / FAQs
- Related products: 4-up card row
- Recently viewed: 4-up card row (last 4 viewed, from session state)

---

### 7.5 BoM Upload (`/work/holmesworld/bom`)

**Step 1 — Upload**
- Large editorial header: "Your architect gave you a list. We'll find everything on it."
- Drop zone: dashed border, upload icon, "Drop your BoM here or click to browse"
- Accepted formats: PDF, Excel (.xlsx), CSV
- "Download sample BoM" link (downloads a pre-made CSV for demo)
- On file select: filename shown, "Process BoM" CTA activates

**Step 2 — Processing (simulated)**
- Full-screen overlay with progress animation
- Text cycling: "Reading your document…" → "Identifying materials…" → "Matching products…" → "Finding best prices…"
- Line items appear one by one (staggered reveal) showing raw BoM text
- 2.5 second total simulated delay

**Step 3 — Results**
- Header: "We found X of Y items" 
- Results table/list:
  - BoM line item text (left)
  - Matched product: image thumbnail + name + brand (centre)
  - Quantity from BoM (right)
  - Unit price × qty = line total (right)
  - "Swap" action to select alternative product
- Unmatched items: amber highlight, "Suggest Alternative" CTA → opens a modal
  - Modal shows 2–3 alternative products (image, name, price, rating)
  - "Select" button on each swaps the matched product for that row
  - "Skip this item" option removes it from the cart addition
- Matched items: green checkmark

**Step 4 — Review & Add**
- Summary bar: X items matched, Y items need review, Estimated total ₹
- Checkboxes on each item (all checked by default)
- "Add X items to Cart" primary CTA
- "Save as Project BoM" secondary CTA

---

### 7.6 Cart (`/work/holmesworld/cart`)

**Layout**
- Left (65%): item list
- Right (35%): order summary (sticky)

**Item list**
- Section header: "Your Items (X)" 
- BoM-sourced items grouped under "From your Bill of Materials" with a subtle amber-left-border label
- Each item row: image (64px), name + brand, qty stepper, unit price, line total, remove icon
- "Save for later" link per item

**Order summary**
- Subtotal
- GST (12% or 18% per item, shown as combined line)
- Delivery (free above ₹2,000, else ₹299)
- **Total**
- "Proceed to Checkout" (primary, full-width)
- Secure payment badges (UPI, Visa, Mastercard, RuPay)

---

### 7.7 Checkout (`/work/holmesworld/checkout`)

**Step indicator:** Delivery → Payment → Confirm (3 steps, top of page)

**Step 1 — Delivery**
- Fields: Flat/House no., Building/Society, Locality, City, State (Indian states dropdown), PIN code
- Delivery date picker: earliest available date pre-selected, 3 options shown
- Installation toggle: "Add professional installation service (+₹X)"
- "Continue to Payment" CTA

**Step 2 — Payment**
- UPI (first, recommended badge): UPI ID input field or QR code option
- Net Banking: bank dropdown (top 8 Indian banks)
- No Cost EMI: tenure selector (3/6/9/12 months), bank options
- Debit/Credit Card: card number, expiry, CVV
- "Place Order" CTA (no real processing — navigates to confirmation)

**Step 3 — Confirmation**
- Full-page success state
- Order number (e.g. #HW-2024-00847)
- "Your order has been placed successfully."
- Delivery estimate
- Links: "Track Order" → `/work/holmesworld/orders/[id]`, "Continue Shopping" → homepage

---

### 7.8 Orders List (`/work/holmesworld/orders`) — Static

- 3 order cards: order number, date, item thumbnails (3 max), status badge, total
- Status badges: Processing (grey), In Transit (blue), Delivered (green)
- "View Order" link per card

---

### 7.9 Order Detail (`/work/holmesworld/orders/[id]`) — Static

- Order header: number, date, total, payment method
- Tracking timeline: 5-step horizontal stepper with dates/times
  - Order 1: all steps complete (Delivered)
  - Order 2: stopped at "Dispatched" (in transit)
- Line items with images, qty, price
- Delivery address block
- "Need help?" link

---

### 7.10 Project Workspace (`/work/holmesworld/projects`) — Static

**Project list view**
- 2 project cards: name, location, budget vs spent progress bar, completion %, last updated, "Open Project" CTA

**Project detail (inline expand or separate view)**
- Budget: total vs spent, remaining, progress ring
- BoM section: uploaded BoM filename, items count, "View BoM" link
- Orders section: linked order cards
- Pending purchases: list of items not yet ordered

---

### 7.11 Product Comparison (`/work/holmesworld/compare`) — Static

- 3 pre-loaded products (e.g. 3 premium bathroom showers from Jaquar, Hindware, Cera)
- Sticky product header row: image, name, price, "Add to Cart"
- Comparison rows: Brand, Material, Finish, Dimensions, Flow Rate, Warranty, Rating, In Stock
- Differences highlighted with gold background on the winning/different cell
- "Remove from comparison" × per column

---

## 8. Navigation Shell (`layout.tsx`)

**Header (sticky)**
- Logo: "HolmesWorld" wordmark (custom lockup in Geist, gold dot or accent)
- Left nav: "Categories" (triggers mega menu) | "Projects" | "Experience Centre" (static placeholder — no route, `cursor-not-allowed` or simple disabled state)
- Centre: Search bar (full-width on focus, expands from icon on mobile)
- Right: Notifications bell | Cart icon with item count badge | Profile avatar

**Mega Menu**
- Triggered on hover over "Categories"
- Left column (180px): all 18 category names, hover to activate
- Right area: featured image for active category + 4 subcategory quick-links
- Full-width dropdown, closes on Escape or click-outside

**Search**
- Expands on click/focus
- Shows: recent searches, popular categories, product suggestions (hardcoded, 6 items)
- Closes on Escape or click-outside

**Footer** (not shown on checkout)
- 4-column: About / Categories / Support / Connect
- Bottom bar: © HolmesWorld 2025 | Made in India

---

## 9. Accessibility

- All interactive elements keyboard accessible
- Focus ring: 2px `gold` offset outline
- ARIA labels on icon-only buttons (cart, search, close)
- Semantic heading hierarchy per page
- Alt text on all product images (product name + brand)
- `prefers-reduced-motion` respected via Framer Motion's `useReducedMotion`
- Colour contrast: all text meets WCAG AA (ink on surface, white on dark)

---

## 10. Technical Constraints

- **Framework:** Next.js 16.2.9 with App Router, React 19
- **Styling:** Tailwind CSS v4 (CSS-first config in `globals.css` — no `tailwind.config.js`)
- **Animation:** Framer Motion v12 — use `easing` arrays not named strings (known breaking change)
- **Icons:** Lucide React (already installed)
- **No external data fetching** — all data from `lib/holmesworld/data/`
- **No database, no auth, no API routes** — pure client-side prototype
- **Images:** Unsplash URLs with `next/image` (add `images.remotePatterns` for `images.unsplash.com` to `next.config.ts`)
- **State:** React Context only — no Zustand, Redux, or other state libraries
- **Fonts:** Geist Sans already loaded in root layout — HolmesWorld layout inherits it
