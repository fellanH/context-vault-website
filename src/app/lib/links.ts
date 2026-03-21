const rawBaseUrl = import.meta.env.VITE_APP_BASE_URL || 'https://app.context-vault.com';
const normalizedBaseUrl = rawBaseUrl.trim().replace(/\/+$/, '');

export const docsQuickstartUrl =
  'https://github.com/fellanH/context-vault/blob/main/docs/distribution/connect-in-2-minutes.md';

export function appHref(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return normalizedBaseUrl ? `${normalizedBaseUrl}${normalizedPath}` : normalizedPath;
}

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
