# Environment Variables Guide

Here's what to add for each environment variable in your Vercel dashboard:

## Required Variables

### 1. `RESEND_API_KEY`
**What it does:** Enables the contact form to send emails to your salon inbox.

**How to get it:**
1. Go to [resend.com](https://resend.com) and sign up for a free account
2. Once logged in, go to **API Keys** in the dashboard
3. Click **Create API Key**
4. Give it a name (e.g., "Jael's Beauty Salon Website")
5. Copy the API key (it starts with `re_...`)
6. **Important:** You'll also need to verify a domain in Resend to send emails. For testing, you can use their test domain, but for production you'll want to add your own domain.

**Value to add:** `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### 2. `NEXT_PUBLIC_SITE_URL`
**What it does:** Used for SEO (sitemap.xml and robots.txt) to tell search engines your website URL.

**What to add:**
- **For now (using Vercel URL):** `https://jaels-beauty-salon-igjwf9xsd-giankjvs-projects.vercel.app`
- **OR** if you have a custom domain: `https://jaelsbeautysalon.com` (or whatever your domain is)

**Value to add:** Your production website URL (with `https://`)

---

## Optional Variables

### 3. `NEXT_PUBLIC_SQUARE_BOOKING_URL`
**What it does:** Enables the online booking widget from Square Appointments.

**How to get it:**
1. Log in to your [Square Dashboard](https://squareup.com/dashboard)
2. Go to **Appointments** → **Online Booking**
3. Click on **Website Embed** or **Get Embed Code**
4. Copy the iframe URL (it will look something like: `https://squareup.com/appointments/book/xxxxx/xxxxx`)
5. This is the URL you'll use

**Value to add:** `https://squareup.com/appointments/book/xxxxx/xxxxx`

**Note:** If you don't have Square Appointments set up yet, you can leave this blank. The booking buttons will show a message to configure it.

---

### 4. `NEXT_PUBLIC_NANOCHAT_SCRIPT`
**What it does:** Adds a chat widget to your website (if you use Nanochat).

**How to get it:**
1. Sign up at [nanochat.ai](https://nanochat.ai) (or your chat service)
2. Get your embed script
3. Copy the script content (without the `<script>` tags)

**Value to add:** The JavaScript code from your chat service (without `<script>` tags)

**Note:** This is completely optional. If you don't use a chat service, leave this blank.

---

## Quick Setup Steps

1. **Go to Vercel Dashboard:**
   https://vercel.com/giankjvs-projects/jaels-beauty-salon/settings/environment-variables

2. **Add each variable:**
   - Click **Add New**
   - Enter the variable name (exactly as shown above)
   - Enter the value
   - Select **Production** (and optionally Preview/Development)
   - Click **Save**

3. **Redeploy:**
   After adding variables, redeploy your site:
   ```bash
   cd jaels-beauty-salon
   vercel --prod
   ```

---

## Priority Order

**Must have for basic functionality:**
1. ✅ `NEXT_PUBLIC_SITE_URL` - Set this to your Vercel URL for now
2. ✅ `RESEND_API_KEY` - If you want the contact form to work

**Nice to have:**
3. `NEXT_PUBLIC_SQUARE_BOOKING_URL` - For online booking
4. `NEXT_PUBLIC_NANOCHAT_SCRIPT` - For chat widget

---

## Testing

After setting variables and redeploying:
- ✅ Visit your site and test the contact form
- ✅ Check that booking buttons work (if you added Square URL)
- ✅ Verify sitemap works: `https://your-site.com/sitemap.xml`
- ✅ Verify robots.txt: `https://your-site.com/robots.txt`

