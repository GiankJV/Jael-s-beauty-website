/**
 * Generate a robots.txt file for the site. The sitemap URL is derived
 * from the `NEXT_PUBLIC_SITE_URL` environment variable when available.
 */
export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const content = `User-agent: *\nAllow: /\nSitemap: ${baseUrl.replace(/\/$/, '')}/sitemap.xml`;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}