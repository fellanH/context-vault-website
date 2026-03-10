export const config = { runtime: 'edge' };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let email: string;
  try {
    const body = await req.json();
    email = body?.email;
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return Response.json({ error: 'Valid email required' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return Response.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const resendRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!resendRes.ok) {
    return Response.json({ error: 'Failed to subscribe' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
