export default async function handler(req, res) {
  const baseUrl = "https://khidoyatovvv.vercel.app";

  const pages = [
    { loc: `${baseUrl}/`, priority: "1.0", changefreq: "weekly" },
    { loc: `${baseUrl}/about`, priority: "0.9", changefreq: "monthly" },
    { loc: `${baseUrl}/projects`, priority: "0.8", changefreq: "weekly" },
    { loc: `${baseUrl}/experience`, priority: "0.7", changefreq: "monthly" },
    { loc: `${baseUrl}/contact`, priority: "0.6", changefreq: "monthly" },
  ];

  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>2026-07-21</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(xml);
}
