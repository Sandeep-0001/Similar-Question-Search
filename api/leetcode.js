export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body;

    const resp = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await resp.text();

    res.status(resp.status).send(text);
  } catch (error) {
    console.error('LeetCode proxy error:', error);
    res.status(500).json({ error: 'Failed to reach LeetCode GraphQL' });
  }
}
