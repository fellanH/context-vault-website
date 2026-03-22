import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { routes } from './app/route-config';
import { posts } from './app/content/posts';

const BASE_URL = 'https://context-vault.com';

export { posts };

export function getStaticPaths(): string[] {
  const staticPaths = [
    '/',
    '/get-started',
    '/blog',
    '/pricing',
    '/privacy',
    '/terms',
    '/support',
    '/docs',
    '/docs/setup',
    '/docs/agent-rules',
  ];

  const blogPaths = posts.map((p) => `/blog/${p.slug}`);
  return [...staticPaths, ...blogPaths];
}

export async function render(
  urlPath: string
): Promise<{ html: string; helmet: HelmetServerState }> {
  const handler = createStaticHandler(routes);
  const url = new URL(urlPath, BASE_URL);
  const request = new Request(url.toString(), { method: 'GET' });

  const context = await handler.query(request);
  if (context instanceof Response) {
    throw new Error(`Route ${urlPath} returned a Response (redirect?)`);
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouterProvider router={router} context={context} />
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet! };
}

export function generateSitemap(paths: string[]): string {
  const today = new Date().toISOString().split('T')[0];
  const urls = paths
    .map((p) => {
      const priority = p === '/' ? '1.0' : p.startsWith('/blog/') ? '0.7' : '0.8';
      const changefreq = p.startsWith('/blog/') ? 'monthly' : 'weekly';
      return `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
