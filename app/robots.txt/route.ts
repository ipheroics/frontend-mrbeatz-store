export async function GET() {
  return new Response(`User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml
`, { headers: { 'Content-Type': 'text/plain' } });
}
