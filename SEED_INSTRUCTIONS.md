# Database Seeding Instructions

## Step 1: Run Migrations

First, create the database tables in Supabase:

```bash
cd "C:\Coding Development\s3v-web"
npx prisma migrate dev --name add_team_portfolio
```

This creates:
- categories
- products
- product_media
- product_tags
- quote_requests
- team_members
- portfolio_projects

## Step 2: Seed Sample Data

Run the seed script:

```bash
npx prisma db seed
```

Or manually:

```bash
npx tsx prisma/seed.ts
```

This will populate:
- **5 Categories:** Truck Scale, Digital Scale, Racking System, Lifting Equipment, Plastic Solutions
- **5 Products:** Heavy Duty Truck Scale, Digital Indicator, Pallet Rack, Reach Stacker, Plastic Pallet
- **3 Team Members:** Managing Director, Technical Director, Sales Manager
- **3 Portfolio Projects:** Rice Mill, Logistics Center, Garment Factory
- **3 Quote Requests:** Sample inquiries

## Alternative: Use Supabase SQL Editor

If the seed script doesn't work, you can manually insert data:

1. Go to your Supabase project
2. Click "SQL Editor"
3. Run the migration SQL first
4. Then copy/paste the seed data

## Verify Data

After seeding, check your admin dashboard:

- `/admin/products` - Should show 5 products
- `/admin/categories` - Should show 5 categories
- `/admin/team` - Should show 3 team members
- `/admin/portfolio` - Should show 3 projects
- `/admin/quotes` - Should show 3 quote requests

## Troubleshooting

**Error: Can't reach database**
- Check `DATABASE_URL` is set in `.env`
- Verify Supabase project is active
- Check your network connection

**Error: Table doesn't exist**
- Run migrations first: `npx prisma migrate dev`

**Error: Unique constraint**
- Data already exists, seed script uses `upsert` so it's safe to re-run

## Clean Database (Reset)

To start fresh:

```bash
npx prisma migrate reset
```

⚠️ This deletes ALL data. Use with caution.

---

**After seeding, your admin dashboard will be fully populated with realistic sample data!**

