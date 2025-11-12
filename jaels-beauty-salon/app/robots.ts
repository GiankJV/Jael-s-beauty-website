import { MetadataRoute } from 'next';

/**
 * Generate a robots.txt file for the site. The sitemap URL is derived
 * from the `NEXT_PUBLIC_SITE_URL` environment variable when available.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl.replace(/\/$/, '')}/sitemap.xml`,
  };
}