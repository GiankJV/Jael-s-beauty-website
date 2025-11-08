# Jael’s Beauty Salon Website

This repository contains the source code for **Jael’s Beauty Salon**, a modern single‑page web application built with [Next.js](https://nextjs.org/) (App Router) and [Tailwind CSS](https://tailwindcss.com/). The site showcases the salon’s services, gallery, testimonials and allows clients to book appointments through an embedded Square widget.

## Features

* **Responsive design**: A disappearing header, sticky “Book Now” button and mobile‑first layouts.
* **Custom branding**: Bespoke colours, typography and logo integrated throughout the UI.
* **Online booking**: A modal and dedicated booking page embed Square Appointments (configure with `NEXT_PUBLIC_SQUARE_BOOKING_URL`).
* **Contact form**: Sends messages to the salon’s inbox via [Resend](https://resend.com/).
* **SEO & Local SEO**: Each page exports metadata, a dynamic sitemap and robots.txt, plus structured data for a local business.
* **Social integrations**: Placeholders for Instagram and an embedded Facebook page plugin.
* **Chat & WhatsApp**: Hooks to integrate Nanochat and a click‑to‑chat WhatsApp button.

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env.local` and fill in the values:

   - `RESEND_API_KEY`: Your Resend API key for sending contact form emails.
   - `NEXT_PUBLIC_SQUARE_BOOKING_URL`: The Square booking widget URL from your Square dashboard.
   - `NEXT_PUBLIC_SITE_URL`: The canonical URL of your deployed site (e.g. `https://jaelsbeautysalon.com`).
   - `NEXT_PUBLIC_NANOCHAT_SCRIPT`: (Optional) Your Nanochat embed script without the `<script>` tags.

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open your browser at [http://localhost:3000](http://localhost:3000) to view the site.

4. **Deploy to Vercel**

   This project is ready to deploy on [Vercel](https://vercel.com/). Simply import the repository, set the environment variables in your Vercel dashboard and connect your custom domain (e.g. purchased via Cloudflare or Porkbun). Vercel will automatically build and deploy the site.

## Customisation

* **Services, testimonials and gallery**: Edit the arrays in `app/services/page.tsx` and `app/testimonials/page.tsx`, or fetch data from a CMS.
* **Instagram grid**: Replace the placeholder blocks in `components/InstagramGrid.tsx` with an embed or API‑powered feed.
* **Images**: Place your own photos in the `public` directory and update the components accordingly.

## License

This project is provided as sample code for educational purposes.