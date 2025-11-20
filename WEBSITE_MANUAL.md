# S3V Trading Group Website - Complete Manual

## 📖 Table of Contents

1. [Introduction](#introduction)
2. [System Overview](#system-overview)
3. [Getting Started](#getting-started)
4. [Configuration Guide](#configuration-guide)
5. [Database Management](#database-management)
6. [Content Management](#content-management)
7. [Development Guide](#development-guide)
8. [Deployment Guide](#deployment-guide)
9. [Maintenance](#maintenance)
10. [Troubleshooting](#troubleshooting)
11. [Security Best Practices](#security-best-practices)
12. [Performance Optimization](#performance-optimization)

---

## 1. Introduction

### Purpose

This manual provides comprehensive documentation for the S3V Trading Group website - a modern e-commerce platform for industrial weighing equipment, storage solutions, and material handling products.

### Target Audience

- **Developers:** Setting up and maintaining the codebase
- **Content Managers:** Adding/editing products and content
- **Administrators:** Managing deployments and configurations

### Website Overview

The website showcases:
- **162+ Products** across 13 categories
- **Quote Request System** for customer inquiries
- **Product Catalog** with filtering and search capabilities
- **Contact Forms** and newsletter subscriptions
- **Responsive Design** for all devices

---

## 2. System Overview

### Architecture

```
┌─────────────────┐
│   Vercel CDN    │  ← Serves static assets globally
└────────┬────────┘
         │
┌────────▼────────┐
│  Next.js App    │  ← Server-side rendering
│  (App Router)   │
└────────┬────────┘
         │
┌────────▼────────┐
│  Prisma ORM     │  ← Database abstraction
└────────┬────────┘
         │
┌────────▼────────┐
│  Supabase       │  ← PostgreSQL database
│  PostgreSQL     │
└─────────────────┘
```

### Technology Stack Details

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | Next.js | 16.0.3 | React framework with SSR |
| Language | TypeScript | 5.x | Type-safe development |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Database | PostgreSQL | Latest | Relational database |
| ORM | Prisma | 7.0.0 | Type-safe database client |
| Hosting | Vercel | Latest | Serverless hosting |
| Forms | React Hook Form | 7.x | Form state management |
| Validation | Zod | 4.x | Schema validation |

### Key Features

- ✅ **Server-Side Rendering (SSR)** for SEO and performance
- ✅ **Static Site Generation (SSG)** for fast page loads
- ✅ **API Routes** for backend functionality
- ✅ **Type Safety** with TypeScript throughout
- ✅ **Responsive Design** mobile-first approach
- ✅ **Automatic Fallbacks** to mock data if DB unavailable
- ✅ **Environment-Based Config** for dev/staging/prod

---

## 3. Getting Started

### 3.1 Prerequisites

Before starting, ensure you have:

- **Node.js** 18.0 or higher
- **npm** 9.0+ (or yarn/pnpm/bun)
- **Git** for version control
- **Code Editor** (VS Code recommended)
- **Supabase Account** (free tier works)
- **Vercel Account** (free tier works)

### 3.2 Initial Setup

#### Step 1: Clone Repository

```bash
git clone https://github.com/chamnabmeyinfo/s3vgroupdotcom.git
cd s3v-web
```

#### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- Next.js and React
- Prisma and database client
- Tailwind CSS
- Form handling libraries
- Type definitions

#### Step 3: Environment Configuration

Create `.env` file in root directory:

```env
# Database Connection (from Supabase)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres?sslmode=require"
```

**How to get Supabase connection string:**
1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Go to Settings → Database
4. Copy "Connection string" → "URI"
5. Replace `[YOUR-PASSWORD]` with your database password

#### Step 4: Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates tables)
npx prisma migrate dev --name init

# Optional: View database in browser
npx prisma studio
```

#### Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 4. Configuration Guide

### 4.1 Environment Variables

#### Local Development (`.env`)

```env
DATABASE_URL="postgresql://postgres:password@host:5432/postgres?sslmode=require"
```

#### Production (Vercel)

Set in Vercel Dashboard:
1. Go to Project → Settings → Environment Variables
2. Add `DATABASE_URL` for:
   - Production
   - Preview
   - Development

### 4.2 Site Configuration

Edit `src/lib/config/site.ts`:

```typescript
export const siteConfig = {
  name: "S3V Trading Group",
  url: "https://s3vtgroup.com.kh",
  description: "Industrial weighing and logistics solutions",
  // ... more config
}
```

### 4.3 Database Schema

The schema is defined in `prisma/schema.prisma`. Key models:

- **Category:** Product categories (Truck Scale, Digital Scale, etc.)
- **Product:** Individual products with details
- **ProductMedia:** Product images and media
- **ProductTag:** Product tags/labels
- **QuoteRequest:** Customer quote submissions

---

## 5. Database Management

### 5.1 Prisma Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Open database GUI
npx prisma studio
```

### 5.2 Adding Products

#### Via Prisma Studio (GUI)

1. Run `npx prisma studio`
2. Navigate to `Product` model
3. Click "Add record"
4. Fill in fields:
   - `name`: Product name
   - `slug`: URL-friendly name (auto-generated)
   - `summary`: Short description
   - `description`: Full description
   - `categoryId`: Link to category
   - `status`: PUBLISHED (to show on site)
   - `heroImage`: Main image URL
   - `highlights`: Array of key features

#### Via Code (Seed Script)

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const category = await prisma.category.findFirst({
    where: { slug: 'truck-scale' }
  })
  
  await prisma.product.create({
    data: {
      name: "Heavy Duty Truck Scale",
      slug: "heavy-duty-truck-scale",
      summary: "Industrial truck scale for heavy vehicles",
      categoryId: category.id,
      status: "PUBLISHED",
      highlights: ["50-ton capacity", "Weatherproof", "Digital display"]
    }
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run: `npx prisma db seed`

### 5.3 Managing Categories

Categories are managed in the `Category` table:

```typescript
// Add new category
await prisma.category.create({
  data: {
    name: "New Category",
    slug: "new-category",
    description: "Category description",
    priority: 10 // Higher = appears first
  }
})
```

### 5.4 Quote Requests

Quote requests are stored in `QuoteRequest` table:

- **Status values:** NEW, IN_PROGRESS, RESOLVED, CLOSED
- **Access via:** Prisma Studio or API endpoint
- **Email notifications:** Can be added via server actions

---

## 6. Content Management

### 6.1 Editing Homepage Content

Edit `src/app/page.tsx`:

```typescript
// Modify sections
<HeroSection />
<CategoryGridSection categories={categories} />
<ProductShowcase products={products} />
```

### 6.2 Updating Site Information

**Company Info:** `src/lib/config/site.ts`

**Contact Details:** `src/components/sections/contact.tsx`

**Footer Links:** `src/components/layout/site-footer.tsx`

### 6.3 Adding New Pages

1. Create file in `src/app/`:
   ```
   src/app/about/page.tsx
   ```

2. Export default component:
   ```typescript
   export default function AboutPage() {
     return <div>About Us</div>
   }
   ```

3. Add to navigation in `src/components/layout/site-header.tsx`

### 6.4 Managing Images

**Option 1: Public Folder**
- Place images in `public/images/`
- Reference: `/images/product.jpg`

**Option 2: External CDN**
- Upload to Supabase Storage, Cloudinary, or similar
- Store URL in database

**Option 3: Next.js Image Optimization**
```typescript
import Image from 'next/image'
<Image src="/product.jpg" alt="Product" width={500} height={300} />
```

---

## 7. Development Guide

### 7.1 Project Structure Explained

```
s3v-web/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   └── migrations/            # Migration history
│
├── public/                    # Static files (images, fonts)
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # API endpoints
│   │   │   └── quote/         # Quote submission API
│   │   ├── layout.tsx         # Root layout (header/footer)
│   │   └── page.tsx           # Homepage
│   │
│   ├── components/
│   │   ├── layout/            # Site-wide components
│   │   │   ├── site-header.tsx
│   │   │   └── site-footer.tsx
│   │   ├── sections/         # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── category-grid.tsx
│   │   │   ├── product-showcase.tsx
│   │   │   └── quote-form.tsx
│   │   └── ui/                # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── badge.tsx
│   │
│   ├── lib/
│   │   ├── actions/           # Server actions
│   │   │   └── quote.ts       # Quote submission logic
│   │   ├── repositories/      # Data access layer
│   │   │   ├── catalog.ts     # Product/category queries
│   │   │   └── quote.ts      # Quote queries
│   │   ├── data/              # Mock data (fallback)
│   │   ├── validations/       # Zod schemas
│   │   ├── config/            # Configuration
│   │   ├── prisma.ts          # Prisma client setup
│   │   └── utils.ts           # Helper functions
│   │
│   └── types/                 # TypeScript types
│       └── catalog.ts
│
├── .env                       # Environment variables (gitignored)
├── .gitignore                # Git ignore rules
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind CSS config
└── tsconfig.json             # TypeScript config
```

### 7.2 Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make Changes**
   - Edit files
   - Test locally with `npm run dev`

3. **Test Build**
   ```bash
   npm run build
   ```

4. **Commit & Push**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push origin feature/new-feature
   ```

5. **Create Pull Request** (if using GitHub workflow)

### 7.3 Code Style

- **TypeScript:** Strict mode enabled
- **ESLint:** Configured for Next.js
- **Formatting:** Prettier recommended
- **Components:** Functional components with TypeScript
- **Naming:** PascalCase for components, camelCase for functions

### 7.4 Adding New Features

#### Example: Add New API Endpoint

1. Create file: `src/app/api/products/route.ts`
2. Export handler:
   ```typescript
   import { NextResponse } from 'next/server'
   import { getPrismaClient } from '@/lib/prisma'
   
   export async function GET() {
     const prisma = await getPrismaClient()
     const products = await prisma.product.findMany({
       where: { status: 'PUBLISHED' }
     })
     return NextResponse.json(products)
   }
   ```

#### Example: Add New Component

1. Create: `src/components/sections/new-section.tsx`
2. Export component:
   ```typescript
   export function NewSection() {
     return <section>Content</section>
   }
   ```
3. Import and use in page

---

## 8. Deployment Guide

### 8.1 Vercel Deployment

#### Automatic Deployment (Recommended)

1. **Link GitHub Repository**
   - Go to Vercel Dashboard
   - Project Settings → Git
   - Connect repository
   - Enable "Auto-deploy from branch: master"

2. **Configure Environment Variables**
   - Settings → Environment Variables
   - Add `DATABASE_URL` for all environments

3. **Deploy**
   - Every push to `master` triggers deployment
   - Preview deployments for pull requests

#### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 8.2 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Fix all TypeScript errors
- [ ] Test all forms and API endpoints
- [ ] Verify environment variables are set
- [ ] Check database migrations are applied
- [ ] Test on mobile devices
- [ ] Verify SEO meta tags

### 8.3 Post-Deployment

1. **Verify Deployment**
   - Check Vercel dashboard for build status
   - Visit production URL
   - Test key features

2. **Monitor**
   - Check Vercel logs for errors
   - Monitor database connections
   - Check performance metrics

3. **Rollback** (if needed)
   - Vercel dashboard → Deployments
   - Click "..." → "Promote to Production"

---

## 9. Maintenance

### 9.1 Regular Tasks

**Weekly:**
- Review quote requests
- Check error logs in Vercel
- Monitor database performance

**Monthly:**
- Update dependencies: `npm update`
- Review and update content
- Check broken links
- Review analytics

**Quarterly:**
- Security updates
- Performance optimization
- Database cleanup (archive old quotes)

### 9.2 Updating Dependencies

```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest

# Test after updates
npm run build
```

### 9.3 Database Maintenance

**Backup:**
- Supabase provides automatic backups
- Manual backup via Supabase dashboard

**Cleanup:**
```sql
-- Archive old quote requests (via Supabase SQL editor)
UPDATE quote_requests 
SET status = 'ARCHIVED' 
WHERE created_at < NOW() - INTERVAL '1 year';
```

**Optimization:**
- Run `ANALYZE` periodically
- Check slow queries in Supabase logs
- Add indexes for frequently queried fields

### 9.4 Content Updates

**Products:**
- Add via Prisma Studio or seed scripts
- Update images via Supabase Storage or CDN
- Maintain consistent naming conventions

**Categories:**
- Update priority for ordering
- Add descriptions for SEO
- Ensure slugs are URL-friendly

---

## 10. Troubleshooting

### 10.1 Common Issues

#### Issue: Build Fails

**Symptoms:** `npm run build` errors

**Solutions:**
1. Check TypeScript errors: `npx tsc --noEmit`
2. Verify all imports are correct
3. Check Prisma client is generated: `npx prisma generate`
4. Clear `.next` folder: `rm -rf .next`

#### Issue: Database Connection Error

**Symptoms:** "Can't reach database server"

**Solutions:**
1. Verify `DATABASE_URL` is correct
2. Check Supabase project is active
3. Verify IP restrictions (if enabled)
4. Try connection pooling URL
5. Check SSL mode: `?sslmode=require`

#### Issue: Prisma Client Errors

**Symptoms:** "PrismaClient is not defined"

**Solutions:**
```bash
# Regenerate client
npx prisma generate

# Restart dev server
npm run dev
```

#### Issue: Environment Variables Not Working

**Symptoms:** Variables undefined in production

**Solutions:**
1. Check Vercel environment variables are set
2. Ensure variable names match exactly
3. Redeploy after adding variables
4. Check variable scope (Production/Preview/Development)

#### Issue: Images Not Loading

**Symptoms:** Broken image links

**Solutions:**
1. Verify image paths are correct
2. Check `next.config.ts` for image domains
3. Ensure images are in `public/` folder
4. Check CDN URLs if using external storage

### 10.2 Debugging Tips

**Enable Debug Logging:**
```typescript
// In development
console.log('Debug info:', data)

// In production (use Vercel logs)
console.error('Error:', error)
```

**Check Vercel Logs:**
1. Go to Vercel Dashboard
2. Project → Deployments
3. Click deployment → "View Function Logs"

**Database Debugging:**
```bash
# Open Prisma Studio
npx prisma studio

# Check connection
npx prisma db pull
```

---

## 11. Security Best Practices

### 11.1 Environment Variables

- ✅ Never commit `.env` files
- ✅ Use different credentials for dev/prod
- ✅ Rotate database passwords regularly
- ✅ Use Vercel's environment variable encryption

### 11.2 Database Security

- ✅ Use SSL connections (`sslmode=require`)
- ✅ Limit database access to necessary IPs
- ✅ Use connection pooling for production
- ✅ Regularly update Prisma and database drivers

### 11.3 API Security

- ✅ Validate all inputs with Zod schemas
- ✅ Rate limit API endpoints (add middleware)
- ✅ Sanitize user inputs
- ✅ Use HTTPS only in production

### 11.4 Code Security

- ✅ Keep dependencies updated
- ✅ Review npm audit reports: `npm audit`
- ✅ Use TypeScript for type safety
- ✅ Validate environment variables at startup

---

## 12. Performance Optimization

### 12.1 Next.js Optimizations

**Image Optimization:**
```typescript
import Image from 'next/image'
// Automatically optimizes images
```

**Static Generation:**
```typescript
// Pre-render pages at build time
export const revalidate = 3600 // Revalidate every hour
```

**Code Splitting:**
- Automatic with Next.js
- Use dynamic imports for heavy components

### 12.2 Database Optimization

**Indexes:**
```prisma
model Product {
  // Already indexed
  @@index([slug])
  @@index([categoryId])
  
  // Add more if needed
  @@index([status, updatedAt])
}
```

**Query Optimization:**
- Use `select` to fetch only needed fields
- Limit results with `take`
- Use `include` carefully (avoid N+1 queries)

### 12.3 Caching Strategy

- **Static Pages:** Cached by Vercel CDN
- **API Routes:** Add cache headers
- **Database:** Use Prisma connection pooling
- **Images:** Next.js Image component caches automatically

### 12.4 Monitoring

**Vercel Analytics:**
- Enable in Vercel dashboard
- Monitor page views and performance

**Error Tracking:**
- Consider Sentry or similar
- Monitor Vercel function logs

---

## Appendix A: Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# Database
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Create migration
npx prisma migrate deploy # Apply migrations (prod)
npx prisma studio        # Open database GUI

# Deployment
vercel --prod            # Deploy to production
vercel                   # Deploy preview
```

### Important Files

- `prisma/schema.prisma` - Database schema
- `src/app/page.tsx` - Homepage
- `src/lib/config/site.ts` - Site configuration
- `.env` - Environment variables
- `next.config.ts` - Next.js config

### Support Contacts

- **Email:** info@s3vtgroup.com.kh
- **Phone:** 011 777 889 | 067 777 988
- **GitHub:** https://github.com/chamnabmeyinfo/s3vgroupdotcom

---

## Appendix B: Glossary

- **SSR:** Server-Side Rendering
- **SSG:** Static Site Generation
- **ORM:** Object-Relational Mapping (Prisma)
- **CDN:** Content Delivery Network
- **API Route:** Serverless function endpoint
- **Server Action:** Server-side function in Next.js
- **Migration:** Database schema change script

---

**Last Updated:** November 2024  
**Version:** 1.0  
**Maintained by:** S3V Trading Group Development Team

