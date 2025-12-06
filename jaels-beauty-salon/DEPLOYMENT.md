# Deployment Guide

## Quick Deploy to Vercel

Your website is ready to deploy! Here are the steps:

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Navigate to the project directory:**
   ```bash
   cd jaels-beauty-salon
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Login to your Vercel account (or create one)
   - Link to existing project or create new
   - Confirm settings

3. **Set Environment Variables:**
   After deployment, go to your Vercel dashboard and add these environment variables:
   - `RESEND_API_KEY` - Your Resend API key for contact form emails
   - `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., `https://jaelsbeautysalon.com`)
   - `NEXT_PUBLIC_SQUARE_BOOKING_URL` - (Optional) Square booking widget URL
   - `NEXT_PUBLIC_NANOCHAT_SCRIPT` - (Optional) Nanochat script

4. **Redeploy after adding environment variables:**
   ```bash
   vercel --prod
   ```

### Manual SQL: Reviews Table

Run this SQL snippet once in your Vercel Postgres database to provision the `reviews` table used by the site:

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  rating INT,
  service TEXT,
  message TEXT NOT NULL,
  permission_to_publish BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | approved | rejected
  token TEXT NOT NULL,
  lang TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Option 2: Deploy via Vercel Web Interface

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign up/Login
   - Click "Add New Project"
   - Import your GitHub repository
   - Set Root Directory to `jaels-beauty-salon`
   - Add environment variables
   - Deploy!

### Custom Domain

After deployment, you can add a custom domain in the Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your domain (e.g., `jaelsbeautysalon.com`)
4. Follow DNS configuration instructions

## Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Custom domain configured (if applicable)
- [ ] Test contact form
- [ ] Test booking functionality
- [ ] Verify all pages load correctly
- [ ] Check mobile responsiveness
