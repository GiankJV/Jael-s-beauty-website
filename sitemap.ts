/**
 * Simple sitemap generator listing the top‑level pages of the site. The
 * base URL is taken from `NEXT_PUBLIC_SITE_URL` environment variable.
 */
export function GET() {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com').replace(/\/$/, '');
  const paths = ['', 'services', 'about', 'gallery', 'testimonials', 'book', 'contact'];
  const urls = paths.map((p) => `${base}/${p}`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    urls
      .map((url) => `\n  <url>\n    <loc>${url}</loc>\n  </url>`)
      .join('') +
    '\n</urlset>';
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}