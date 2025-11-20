# Vercel Full Control Management Guide

Complete guide for managing your S3V Trading Group website on Vercel.

## 📋 Table of Contents

- [Quick Setup](#quick-setup)
- [Environment Variables](#environment-variables)
- [Deployment Management](#deployment-management)
- [Monitoring & Logs](#monitoring--logs)
- [Project Configuration](#project-configuration)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Setup

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Link Project (if not already linked)

```bash
cd s3v-web
vercel link
```

### 4. Run Setup Script

**Windows (PowerShell):**
```powershell
.\scripts\vercel-setup.ps1
```

**Mac/Linux:**
```bash
chmod +x scripts/vercel-setup.sh
./scripts/vercel-setup.sh
```

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | How to Get |
|----------|-------------|------------|
| `DATABASE_URL` | Supabase PostgreSQL connection string | Supabase Dashboard → Settings → Database |
| `AUTH_SECRET` | NextAuth.js secret key | Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your production URL | `https://your-domain.vercel.app` |

### Setting Environment Variables

#### Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **s3v-web**
3. Go to **Settings** → **Environment Variables**
4. Add each variable for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

#### Via CLI

```bash
# Add DATABASE_URL
vercel env add DATABASE_URL production
vercel env add DATABASE_URL preview
vercel env add DATABASE_URL development

# Add AUTH_SECRET
vercel env add AUTH_SECRET production
vercel env add AUTH_SECRET preview
vercel env add AUTH_SECRET development

# Add NEXTAUTH_URL
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_URL preview
vercel env add NEXTAUTH_URL development
```

### View Environment Variables

```bash
# List all
vercel env ls

# Pull to local file
vercel env pull .env.local
```

### Remove Environment Variable

```bash
vercel env rm VARIABLE_NAME production
```

---

## 🚢 Deployment Management

### Automatic Deployment

Your project is configured for **automatic deployment**:
- ✅ Every push to `master` branch → Production
- ✅ Pull requests → Preview deployments

### Manual Deployment

#### Production

```bash
vercel --prod
```

#### Preview

```bash
vercel
```

### Deployment Commands

```bash
# Deploy current directory
vercel

# Deploy to production
vercel --prod

# Deploy with specific environment
vercel --prod --env DATABASE_URL="your-url"

# List all deployments
vercel ls

# View specific deployment
vercel inspect [deployment-url]
```

### Rollback Deployment

1. Go to Vercel Dashboard → Deployments
2. Find the deployment you want to rollback to
3. Click **"..."** → **"Promote to Production"**

Or via CLI:
```bash
vercel promote [deployment-url]
```

---

## 📊 Monitoring & Logs

### View Logs

#### Via Dashboard

1. Go to Vercel Dashboard
2. Select project → **Deployments**
3. Click on a deployment
4. Click **"View Function Logs"**

#### Via CLI

```bash
# View logs for latest deployment
vercel logs

# View logs for specific deployment
vercel logs [deployment-url]

# Follow logs in real-time
vercel logs --follow
```

### View Deployment Status

```bash
# List all deployments
vercel ls

# Get deployment details
vercel inspect [deployment-url]
```

### Analytics

Access analytics in Vercel Dashboard:
- **Analytics** → View page views, visitors, performance
- **Speed Insights** → Core Web Vitals, performance metrics

---

## ⚙️ Project Configuration

### Current Configuration (`vercel.json`)

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "maxDuration": 10
  }
}
```

### Custom Domains

1. Go to Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain (e.g., `s3vtgroup.com.kh`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

### Build Settings

Current build configuration:
- **Framework:** Next.js 16
- **Build Command:** `npm run build`
- **Install Command:** `npm install`
- **Output Directory:** `.next` (auto-detected)

To modify, edit `vercel.json` or use Vercel Dashboard → Settings → General.

### Environment-Specific Settings

You can set different environment variables for:
- **Production:** Live site
- **Preview:** Pull request previews
- **Development:** Local development (when using `vercel dev`)

---

## 🔧 Advanced Management

### Project Information

```bash
# List all projects
vercel project ls

# Get project details
vercel project inspect
```

### Team Management

```bash
# List team members
vercel team ls

# Add team member
vercel team add [email]
```

### Webhooks

Set up webhooks for:
- Deployment notifications
- Build status updates
- Error alerts

Go to: **Settings** → **Integrations** → **Webhooks**

### Git Integration

Your project is connected to:
- **Repository:** `chamnabmeyinfo/s3vgroupdotcom`
- **Branch:** `master` (production)
- **Auto-deploy:** Enabled

To change:
1. Go to **Settings** → **Git**
2. Disconnect and reconnect repository

---

## 🐛 Troubleshooting

### Build Failures

**Check build logs:**
```bash
vercel logs [deployment-url]
```

**Common issues:**
1. **Missing environment variables** → Add in Vercel Dashboard
2. **Prisma client not generated** → Already fixed in `package.json`
3. **TypeScript errors** → Check `tsconfig.json` excludes

### Deployment Not Updating

1. Check if latest commit is pushed to GitHub
2. Verify Vercel is connected to correct branch
3. Manually trigger deployment: `vercel --prod`

### Environment Variables Not Working

1. Verify variables are set in correct environment (Production/Preview)
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Check Supabase project is active
3. Verify IP restrictions allow Vercel IPs
4. Use connection pooling URL for production

### Function Timeout

Current timeout: **10 seconds**

To increase:
1. Edit `vercel.json` → `functions.maxDuration`
2. Or upgrade Vercel plan (Pro plan: 60s, Enterprise: 300s)

---

## 📱 Quick Reference

### Essential Commands

```bash
# Login
vercel login

# Deploy
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Environment variables
vercel env ls
vercel env add VARIABLE_NAME production
vercel env pull .env.local

# Project info
vercel project ls
vercel inspect
```

### Dashboard Links

- **Dashboard:** https://vercel.com/dashboard
- **Project:** https://vercel.com/chamnabmeyinfo/s3v-web
- **Deployments:** https://vercel.com/chamnabmeyinfo/s3v-web/deployments
- **Settings:** https://vercel.com/chamnabmeyinfo/s3v-web/settings

---

## 🔒 Security Best Practices

1. ✅ **Never commit `.env` files** (already in `.gitignore`)
2. ✅ **Use different credentials** for dev/prod
3. ✅ **Rotate secrets regularly** (AUTH_SECRET, database passwords)
4. ✅ **Enable 2FA** on Vercel account
5. ✅ **Review deployment logs** regularly
6. ✅ **Use environment-specific variables**

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Status Page:** https://www.vercel-status.com

---

## 🎯 Next Steps

1. ✅ Set up environment variables
2. ✅ Configure custom domain (optional)
3. ✅ Set up monitoring/alerts
4. ✅ Review deployment logs
5. ✅ Test production deployment

---

**Last Updated:** $(Get-Date -Format "yyyy-MM-dd")

