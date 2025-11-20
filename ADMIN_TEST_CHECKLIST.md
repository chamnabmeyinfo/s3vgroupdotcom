# Admin Backend Testing Checklist

**Version:** 1.0  
**Date:** November 20, 2024  
**Commit:** c650e29

---

## Pre-Testing Setup

### 1. Start Development Server
```bash
cd s3v-web
npm run dev
```

### 2. Test Credentials
- **Email:** admin@s3vtgroup.com
- **Password:** admin123

---

## Test Scenarios

### ✅ Authentication Flow

#### Test 1: Protected Routes
- [ ] Navigate to `http://localhost:3000/admin`
- [ ] **Expected:** Redirects to `/auth/signin`
- [ ] **Status:** 

#### Test 2: Login Page
- [ ] Visit `http://localhost:3000/auth/signin`
- [ ] **Expected:** Login form displays
- [ ] Fields present: Email, Password
- [ ] **Status:**

#### Test 3: Successful Login
- [ ] Enter: admin@s3vtgroup.com / admin123
- [ ] Click "Sign In"
- [ ] **Expected:** Redirects to `/admin` dashboard
- [ ] **Status:**

#### Test 4: Failed Login
- [ ] Enter: wrong@email.com / wrongpass
- [ ] Click "Sign In"
- [ ] **Expected:** Error message displays
- [ ] **Status:**

#### Test 5: Logout
- [ ] Click "Sign Out" button in admin header
- [ ] **Expected:** Redirects to signin, session cleared
- [ ] **Status:**

---

### ✅ Dashboard Overview

#### Test 6: Dashboard Load
- [ ] Navigate to `/admin` (after login)
- [ ] **Expected:** Dashboard displays with stats cards
- [ ] Shows: Total Products, Categories, Quotes, Quotes Today
- [ ] **Status:**

#### Test 7: Recent Quotes Table
- [ ] Check "Recent Quote Requests" section
- [ ] **Expected:** Shows latest quotes or "No quotes yet"
- [ ] **Status:**

#### Test 8: Navigation Links
- [ ] Click sidebar links: Products, Categories, Quotes, Team, Portfolio
- [ ] **Expected:** Each page loads correctly
- [ ] **Status:**

---

### ✅ Product Management

#### Test 9: Products List Page
- [ ] Navigate to `/admin/products`
- [ ] **Expected:** Products table displays
- [ ] Shows: Product name, category, status, price, updated date
- [ ] "+ New Product" button visible
- [ ] **Status:**

#### Test 10: Create Product Page
- [ ] Click "+ New Product"
- [ ] Navigate to `/admin/products/new`
- [ ] **Expected:** Form displays with all fields
- [ ] **Status:**

#### Test 11: Create Product - Form Validation
- [ ] Leave "Product Name" empty, click "Create Product"
- [ ] **Expected:** Validation error shows
- [ ] **Status:**

- [ ] Enter invalid slug (with spaces/capitals)
- [ ] **Expected:** Slug validation error
- [ ] **Status:**

- [ ] Leave "Category" empty
- [ ] **Expected:** Category validation error
- [ ] **Status:**

#### Test 12: Create Product - Success
Fill form with:
- [ ] Name: "Test Truck Scale"
- [ ] Slug: "test-truck-scale"
- [ ] SKU: "TS-001"
- [ ] Category: (select any)
- [ ] Summary: "Test product"
- [ ] Price: "5000"
- [ ] Status: "Published"
- [ ] Highlights: "Feature 1, Feature 2, Feature 3"
- [ ] Click "Create Product"
- [ ] **Expected:** Redirects to `/admin/products`, new product in list
- [ ] **Status:**

#### Test 13: Edit Product Page
- [ ] Click "Edit" on any product
- [ ] Navigate to `/admin/products/[id]`
- [ ] **Expected:** Form pre-filled with product data
- [ ] **Status:**

#### Test 14: Update Product
- [ ] Change product name
- [ ] Click "Update Product"
- [ ] **Expected:** Redirects to list, changes saved
- [ ] **Status:**

#### Test 15: Cancel Button
- [ ] On create/edit page, click "Cancel"
- [ ] **Expected:** Returns to products list without saving
- [ ] **Status:**

---

### ✅ Categories Management

#### Test 16: Categories List
- [ ] Navigate to `/admin/categories`
- [ ] **Expected:** Categories table displays
- [ ] Shows: Name, slug, priority, product count
- [ ] "+ New Category" button visible
- [ ] **Status:**

#### Test 17: Category Product Count
- [ ] Check "Products" column
- [ ] **Expected:** Shows correct count for each category
- [ ] **Status:**

---

### ✅ Quotes Management

#### Test 18: Quotes List
- [ ] Navigate to `/admin/quotes`
- [ ] **Expected:** Quotes table displays
- [ ] Shows: Company, contact, email, phone, status, date
- [ ] **Status:**

#### Test 19: Quote Details
- [ ] Check message column
- [ ] **Expected:** Full quote message visible or truncated
- [ ] **Status:**

---

### ✅ Team Management

#### Test 20: Team Page
- [ ] Navigate to `/admin/team`
- [ ] **Expected:** Page loads with placeholder or team list
- [ ] **Status:**

---

### ✅ Portfolio Management

#### Test 21: Portfolio Page
- [ ] Navigate to `/admin/portfolio`
- [ ] **Expected:** Page loads with placeholder or project list
- [ ] **Status:**

---

## Database Integration Tests

### Test 22: With Database Connected
- [ ] Ensure `DATABASE_URL` is set in `.env`
- [ ] Run: `npx prisma migrate dev`
- [ ] Create a product via admin
- [ ] **Expected:** Product saved to Supabase
- [ ] Check Prisma Studio: `npx prisma studio`
- [ ] **Status:**

### Test 23: Without Database (Fallback)
- [ ] Comment out `DATABASE_URL` in `.env`
- [ ] Restart dev server
- [ ] Navigate to `/admin`
- [ ] **Expected:** Mock data displays, no errors
- [ ] **Status:**

---

## Security Tests

### Test 24: Unauthorized Access
- [ ] Open incognito/private browser
- [ ] Try to access `/admin/products` directly
- [ ] **Expected:** Redirects to `/auth/signin`
- [ ] **Status:**

### Test 25: Session Persistence
- [ ] Login successfully
- [ ] Refresh page
- [ ] **Expected:** Still logged in, stays on admin
- [ ] **Status:**

---

## Performance Tests

### Test 26: Page Load Speed
- [ ] Navigate to `/admin`
- [ ] **Expected:** Loads in < 2 seconds
- [ ] **Status:**

### Test 27: Form Response Time
- [ ] Submit product form
- [ ] **Expected:** Response in < 1 second
- [ ] **Status:**

---

## Browser Compatibility

### Test 28: Different Browsers
- [ ] Chrome: All features work
- [ ] Firefox: All features work
- [ ] Edge: All features work
- [ ] **Status:**

---

## Mobile Responsiveness

### Test 29: Mobile View
- [ ] Open admin on mobile/responsive mode
- [ ] **Expected:** Layout adapts, sidebar collapses
- [ ] Forms usable on mobile
- [ ] **Status:**

---

## Error Handling

### Test 30: Network Error
- [ ] Disconnect internet
- [ ] Try to create product
- [ ] **Expected:** Error message shows
- [ ] **Status:**

### Test 31: Invalid JSON in Specs
- [ ] Enter invalid JSON in specs field: `{invalid}`
- [ ] Submit form
- [ ] **Expected:** Validation error or parse error caught
- [ ] **Status:**

---

## Automated Test Commands

```bash
# Lint check
npm run lint

# Type check
npx tsc --noEmit

# Build check
npm run build

# Database check
npx prisma validate
npx prisma generate
```

---

## Known Issues / Limitations

1. **Team/Portfolio CRUD forms not yet implemented** (models exist, UI pending)
2. **Category create/edit forms pending**
3. **Image upload via UI not implemented** (URL input only)
4. **Quote status update UI pending**
5. **No delete functionality exposed in UI yet** (actions exist)
6. **Middleware deprecation warning** (Next.js 16 recommends "proxy" over "middleware")

---

## Sign-Off

**Tester:** ___________  
**Date:** ___________  
**Overall Status:** ⬜ PASS / ⬜ FAIL  
**Notes:** ___________

---

## Next Phase Testing

After implementing:
- Category CRUD forms
- Quote status updates
- Team/Portfolio CRUD
- Image upload integration

Rerun this checklist plus:
- E2E tests with Playwright
- Load testing
- Security audit

