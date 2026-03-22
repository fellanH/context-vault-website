/**
 * Pages Function: proxy /mcp to api.context-vault.com/mcp
 * Replaces the Vercel rewrite rule.
 */
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const target = new URL("/mcp" + url.search, "https://api.context-vault.com");

  const headers = new Headers(context.request.headers);
  headers.set("Host", "api.context-vault.com");

  return fetch(target.toString(), {
    method: context.request.method,
    headers,
    body: context.request.body,
    redirect: "follow",
  });
}
