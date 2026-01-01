# Vercel Deployment Guide

## ✅ Prerequisites

1. **PostgreSQL Database** - Get one from:
   - [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (easiest)
   - [Supabase](https://supabase.com) (free tier available)
   - [Railway](https://railway.app) (free tier available)
   - [Neon](https://neon.tech) (serverless Postgres)

2. **GitHub Repository** - Push your code to GitHub

## 📋 Step-by-Step Deployment

### 1. Set Up Database

**Option A: Vercel Postgres (Recommended)**
```bash
# After connecting project to Vercel
vercel postgres create
```

**Option B: External Database (Supabase/Railway/Neon)**
- Create account and new Postgres database
- Copy the connection string (DATABASE_URL)

### 2. Run Prisma Migration on Production Database

```bash
# Set your production DATABASE_URL temporarily
DATABASE_URL="your-production-database-url" npx prisma migrate deploy

# Seed the database with initial data
DATABASE_URL="your-production-database-url" npx prisma db seed
```

### 3. Deploy to Vercel

**Via Vercel Dashboard:**

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure **Environment Variables**:
   - `DATABASE_URL` = your production database URL
   - `NEXT_PUBLIC_API_URL` = leave empty (uses same domain)

5. Click **"Deploy"**

**Via Vercel CLI:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 4. Set Environment Variables in Vercel

Go to: **Project Settings** → **Environment Variables**

Add:
```
DATABASE_URL = "postgresql://user:password@host:5432/database"
NEXT_PUBLIC_API_URL = ""
```

### 5. Verify Deployment

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Check homepage loads with case studies
3. Visit `/admin` to manage case studies
4. Test creating/editing/deleting case studies

## 🔧 Important Notes

### API Routes Work Automatically
- Development: Uses Express server (`db-server.js` on port 3001)
- Production: Uses Next.js API routes at `/api/admin/case-studies`
- No separate server needed on Vercel!

### Database Connection
- Vercel serverless functions have 10-second timeout
- Prisma connection pooling handles this automatically
- Use connection pooling for production databases

### Build Command
Default is fine: `next build`

### No Need to Deploy db-server.js
- `db-server.js` is only for local development
- Vercel uses the Next.js API routes instead
- They're already configured and will work automatically

## 🚀 Post-Deployment

### Add Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Monitor Logs
```bash
vercel logs
```

### Redeploy After Changes
```bash
git push origin main
# Auto-deploys to Vercel
```

## ⚠️ Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL in Vercel environment variables
- Ensure database allows connections from Vercel IPs (usually 0.0.0.0/0)
- Check if database is running

### "API routes return 500"
- Check Vercel function logs: `vercel logs`
- Verify Prisma schema matches database
- Run `npx prisma generate` locally and redeploy

### Admin portal shows no data
- Verify database has seeded data
- Check browser console for fetch errors
- Ensure NEXT_PUBLIC_API_URL is empty in Vercel

## 📝 Summary

**Development (Local):**
- Run: `npm run dev:all`
- Uses db-server.js on port 3001
- Next.js on port 3000

**Production (Vercel):**
- Automatic deployment from GitHub
- Uses Next.js API routes (no separate server)
- Database from Vercel Postgres or external provider
