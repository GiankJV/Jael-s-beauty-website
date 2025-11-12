import { MetadataRoute } from 'next';

/**
 * Simple sitemap generator listing the top‑level pages of the site. The
 * base URL is taken from `NEXT_PUBLIC_SITE_URL` environment variable.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');
  const paths = ['', 'services', 'about', 'gallery', 'testimonials', 'book', 'contact'];
  return paths.map((path) => ({
    url: `${base}/${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));
}