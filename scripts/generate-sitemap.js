const fs = require('fs');
const path = require('path');

const siteUrl = 'https://demoapp-two-phi.vercel.app/'; // Replace with your actual domain

// List all your static and dynamic routes
const pages = [
  '/',
  '/auth/auth1/login',
  '/auth/auth1/forgot-password',
  '/auth/auth1/register',
  '/dashboards/modern',
  '/dashboards/marketdata'

  // Add your dynamic routes here
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((url) => {
      return `
    <url>
      <loc>${siteUrl}${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
};

generateSitemap();
