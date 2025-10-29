# 🚀 Deploy to Vercel - Complete Guide

Deploy your AI Birth Simulation to Vercel and share it with the world!

---

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ Vite build works: `npm run build`
- ✅ Supabase configured (optional but recommended)
- ✅ GitHub/GitLab/Bitbucket account (for Git integration)
- ✅ Or Vercel CLI installed (for direct deployment)

---

## 🎯 Method 1: Deploy via Vercel Dashboard (Easiest) ⭐

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (top right)
3. Sign up with:
   - GitHub (recommended - easiest)
   - GitLab
   - Bitbucket
   - Email

### Step 2: Push to GitHub (If not already)

If your code isn't on GitHub yet:

```bash
# Navigate to project
cd "/Users/naveedjawaid/Documents/AI Birth Simulation"

# Initialize git (if not already)
git init

# Create .gitignore (if doesn't exist)
# Make sure it includes:
# - node_modules/
# - .env
# - dist/
# - .DS_Store

# Create GitHub repo (via GitHub website)
# Then:

git add .
git commit -m "Initial commit - AI Birth Simulation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-birth-simulation.git
git push -u origin main
```

### Step 3: Import Project in Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. **Import Git Repository:**
   - Select your repository
   - Click **"Import"**

### Step 4: Configure Project

**Project Settings:**
- **Framework Preset:** Vite
- **Root Directory:** `./` (leave default)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `dist` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

Click **"Deploy"** → Wait 1-2 minutes! 🎉

---

## 🔐 Step 5: Add Environment Variables (CRITICAL!)

**After first deployment, you MUST add environment variables:**

1. Go to your project in Vercel dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** (left sidebar)
4. Add these variables:

### Required (if using cloud features):

```bash
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenRouter (for AI responses)
VITE_OPENROUTER_API_KEY=your_openrouter_key
VITE_OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free

# Database (optional, for direct PostgreSQL)
VITE_DATABASE_URL=your_postgres_connection_string
```

**How to add:**
1. Click **"Add New"**
2. **Key:** `VITE_SUPABASE_URL`
3. **Value:** Your Supabase URL (from `.env`)
4. **Environments:** ✅ Production ✅ Preview ✅ Development
5. Click **"Save"**
6. Repeat for all variables

### Step 6: Redeploy

After adding environment variables:
1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait ~2 minutes

---

## 🛠️ Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

Follow the prompts (will open browser for auth).

### Step 3: Deploy

```bash
# Navigate to project
cd "/Users/naveedjawaid/Documents/AI Birth Simulation"

# Deploy to production
vercel --prod
```

**First time:**
- Link to existing project? → No
- Project name → `ai-birth-simulation` (or your choice)
- Directory → `./` (default)
- Override settings? → No

**It will:**
1. Build your project
2. Deploy to Vercel
3. Give you a URL like: `ai-birth-simulation.vercel.app`

---

## 📁 Create vercel.json (Optional but Recommended)

Create `vercel.json` in project root for better control:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

This ensures:
- ✅ SPA routing works (all routes → `index.html`)
- ✅ Static assets cached properly
- ✅ Faster loading

---

## 🔄 Continuous Deployment (Auto-Deploy)

**Once connected to Git:**

Every time you push to `main` branch:
- ✅ Vercel automatically builds
- ✅ Creates preview deployment
- ✅ Deploys to production (if configured)

**Workflow:**
```bash
git add .
git commit -m "Update feature"
git push origin main
# → Vercel automatically deploys!
```

---

## 🌍 Custom Domain (Optional)

### Add Custom Domain:

1. Go to **Project Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain: `ai-birth-simulation.com`
4. Follow DNS setup instructions:
   - Add CNAME record: `cname.vercel-dns.com`
   - Or A record: Vercel IP addresses
5. Wait for DNS propagation (1-24 hours)
6. SSL certificate auto-generated (free!)

---

## 🎨 Environment-Specific Deployments

You can have different configs for:

- **Production** (`vercel --prod`)
  - Main domain
  - Production environment variables
  
- **Preview** (every git branch)
  - Automatic preview URLs
  - Preview environment variables
  
- **Development** (`vercel dev`)
  - Local development with Vercel features

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads: `https://your-project.vercel.app`
- [ ] All stages work (1-5)
- [ ] Supabase connection works
- [ ] Avatar upload works
- [ ] Gallery displays correctly
- [ ] Console shows no errors (check browser console)
- [ ] Audio files load (if uploaded)
- [ ] Images load from Supabase Storage

---

## 🐛 Troubleshooting

### Issue: Build Fails

**Error:** `Build failed`

**Solution:**
1. Check build locally: `npm run build`
2. Verify all dependencies in `package.json`
3. Check Vercel build logs for errors
4. Ensure `node` version is compatible (Vercel uses Node 18+)

**Fix Node version:**
Create `.nvmrc`:
```
18
```

Or in `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

### Issue: Environment Variables Not Working

**Error:** `VITE_SUPABASE_URL is undefined`

**Solution:**
1. Verify variables start with `VITE_` (required for Vite)
2. Add variables in Vercel dashboard (Settings → Environment Variables)
3. **Redeploy** after adding variables
4. Check variable names match exactly

---

### Issue: 404 on Refresh

**Error:** Page shows 404 when refreshing

**Solution:**
Add `vercel.json` with rewrites (see above) or:

**In Vite config** (`vite.config.js`):
```javascript
export default {
  // ... existing config
  base: './'
}
```

**Or use vercel.json** (recommended):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

### Issue: Images Not Loading

**Error:** Avatar images show broken

**Solution:**
1. Check Supabase Storage is public
2. Verify `VITE_SUPABASE_URL` is correct
3. Check CORS settings in Supabase
4. Verify bucket name matches: `ai-avatars`

---

### Issue: Audio Not Playing

**Error:** Audio files don't load

**Solution:**
1. Audio files must be in `/public/` folder
2. Check file paths are correct
3. Browser may block autoplay (normal)
4. Verify file names match code:
   - `heartbeat.mp3`
   - `womb_ambience.mp3`
   - `birth_ambience.mp3`
   - `bonding_ambience.mp3`
   - `release_ambience.mp3`

---

## 📊 Monitor Deployment

**Vercel Dashboard Shows:**
- ✅ Build status
- ✅ Deployment logs
- ✅ Performance metrics
- ✅ Error tracking
- ✅ Analytics (if enabled)

**View logs:**
1. Go to project dashboard
2. Click on deployment
3. View **"Build Logs"** or **"Runtime Logs"**

---

## 🚀 Quick Deploy Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View deployments
vercel ls

# View logs
vercel logs

# Open project in browser
vercel open

# Remove deployment
vercel rm
```

---

## 🔒 Security Best Practices

1. **Never commit `.env` files**
   - ✅ Already in `.gitignore`
   - ✅ Add environment variables in Vercel dashboard

2. **Use Vite env vars correctly**
   - Must start with `VITE_`
   - Public (exposed to client)
   - For secrets, use server-side API routes

3. **Enable Vercel Security**
   - ✅ DDoS Protection (automatic)
   - ✅ Firewall (automatic)
   - ✅ HTTPS (automatic, free)

---

## 📈 Performance Tips

**Vercel automatically:**
- ✅ CDN caching
- ✅ Edge functions
- ✅ Image optimization (if using Next.js Image)
- ✅ Automatic compression

**Your app is already optimized:**
- ✅ Vite builds optimized bundles
- ✅ Tailwind purges unused CSS
- ✅ Static assets cached

---

## 🎉 Success!

Once deployed, you'll get:

- 🌐 **Production URL:** `https://your-project.vercel.app`
- 📊 **Analytics Dashboard**
- 🔄 **Automatic deployments** on git push
- 🔒 **Free SSL certificate**
- ⚡ **Global CDN** (fast worldwide)
- 📈 **Unlimited bandwidth** (free tier)

---

## 📝 Next Steps After Deployment

1. **Test thoroughly** on production URL
2. **Share with friends** for feedback
3. **Post on social media** (Twitter, Reddit, etc.)
4. **Monitor analytics** in Vercel dashboard
5. **Iterate** based on feedback

---

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**You're ready to deploy! 🚀**

Choose your method:
- **Method 1:** Git Integration (Easiest, auto-deploys)
- **Method 2:** CLI (Direct, more control)

Both work great! Method 1 is recommended for ongoing development.

---

*Guide created: ${new Date().toLocaleDateString()}*

