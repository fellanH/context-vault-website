import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://context-vault.com';
const SITE_NAME = 'Context Vault';
const DEFAULT_DESCRIPTION =
  'Context Vault gives Claude, Cursor, and MCP-compatible AI tools persistent memory across sessions. Local-first, open-core, and setup in under 5 minutes.';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og/default.png`;

type PageHeadProps = {
  title: string;
  description?: string;
  canonical: string;
  image?: string; // absolute URL or root-relative path like /og/blog-slug.png
};

export function PageHead({ title, description, canonical, image }: PageHeadProps) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = `${BASE_URL}${canonical}`;
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${BASE_URL}${image}`
    : DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
