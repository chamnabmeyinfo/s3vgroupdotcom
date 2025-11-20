# S3V Trading Group Website

A modern, full-stack website for S3V Trading Group Co., Ltd - Industrial weighing and logistics solutions provider in Cambodia.

## 🚀 Live Site

**Production URL:** https://s3v-mr21jxk8o-chamnab-meys-projects-13552d22.vercel.app

**GitHub Repository:** https://github.com/chamnabmeyinfo/s3vgroupdotcom

## 📋 Table of Contents

- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Development](#development)
- [Deployment](#deployment)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## 🛠 Technology Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma 7
- **Deployment:** Vercel
- **Form Handling:** React Hook Form + Zod validation
- **UI Components:** Custom components with Radix UI primitives

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account (for database)
- Vercel account (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/chamnabmeyinfo/s3vgroupdotcom.git
cd s3v-web

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your DATABASE_URL

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📁 Project Structure

```
s3v-web/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/             # Database migrations
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/                # API routes
│   │   │   └── quote/          # Quote request endpoint
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/
│   │   ├── layout/             # Layout components (header, footer)
│   │   ├── sections/           # Page sections (hero, products, etc.)
│   │   └── ui/                 # Reusable UI components
│   ├── lib/
│   │   ├── actions/            # Server actions
│   │   ├── config/             # Configuration files
│   │   ├── data/               # Mock data (fallback)
│   │   ├── repositories/       # Data access layer
│   │   ├── validations/        # Zod schemas
│   │   ├── prisma.ts           # Prisma client setup
│   │   └── utils.ts            # Utility functions
│   └── types/                  # TypeScript type definitions
└── .env                        # Environment variables (not in git)
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres?sslmode=require"
```

**Important:** Never commit `.env` files to git. They're already in `.gitignore`.

## 🗄 Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string from Settings → Database

### 2. Run Migrations

```bash
# Development (creates migration files)
npx prisma migrate dev --name init

# Production (applies migrations only)
npx prisma migrate deploy
```

### 3. Seed Data (Optional)

The app uses mock data as fallback. To seed real data:

```bash
# Create prisma/seed.ts and add seed script
npx prisma db seed
```

## 💻 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Development Workflow

1. Make changes to components/pages
2. Test locally with `npm run dev`
3. Run `npm run build` to check for errors
4. Commit and push to GitHub
5. Vercel automatically deploys (if linked)

## 🚢 Deployment

### Vercel Deployment

The site is already deployed on Vercel. For new deployments:

1. **Automatic (Recommended):**
   - Link GitHub repo in Vercel dashboard
   - Every push to `master` auto-deploys

2. **Manual via CLI:**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

### Environment Variables in Vercel

Add `DATABASE_URL` in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add for Production, Preview, and Development

## ✨ Features

### Current Features

- ✅ Modern, responsive homepage design
- ✅ Product catalog with categories
- ✅ Quote request form with validation
- ✅ Contact information display
- ✅ Newsletter subscription section
- ✅ SEO-friendly structure
- ✅ Server-side rendering (SSR)
- ✅ Automatic fallback to mock data

### Product Categories

- Truck Scale
- Digital Scale
- Racking System
- Lifting Equipment
- Material Handling Equipment
- Plastic Pallet & Baskets
- And more...

## 📡 API Documentation

### POST `/api/quote`

Submit a quote request.

**Request Body:**
```json
{
  "companyName": "Company Name",
  "contactName": "John Doe",
  "email": "john@example.com",
  "phone": "+855123456789",
  "message": "Project details..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "quote_id",
    "status": "NEW"
  }
}
```

## 🐛 Troubleshooting

### Build Errors

**Prisma Client not found:**
```bash
npx prisma generate
```

**Type errors:**
```bash
npm run build  # Check TypeScript errors
```

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Check Supabase project is active
3. Ensure IP is allowed (if using IP restrictions)
4. Try connection pooling URL from Supabase dashboard

### Deployment Issues

1. Check environment variables in Vercel
2. Review build logs in Vercel dashboard
3. Ensure `DATABASE_URL` is set for all environments

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📝 License

© 2024 S3V Trading Group Co., Ltd. All Rights Reserved.

## 🤝 Support

For issues or questions:
- Email: info@s3vtgroup.com.kh
- Phone: 011 777 889 | 067 777 988

---

**Built with ❤️ for S3V Trading Group**
