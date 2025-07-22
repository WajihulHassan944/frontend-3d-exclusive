export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const backendRes = await fetch('https://backend-3d-exclusive.vercel.app/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await backendRes.json();

    const rawSetCookie = backendRes.headers.get('set-cookie');
    console.log('🚨 Backend Set-Cookie:', rawSetCookie);

    if (rawSetCookie) {
      const cookies = rawSetCookie.includes(', ') && rawSetCookie.includes('Path=')
        ? rawSetCookie.split(/,(?=\s*\w+=)/)
        : [rawSetCookie];

      res.setHeader('Set-Cookie', cookies);
    }

    res.status(backendRes.status).json(data);
  } catch (error) {
    console.error('❌ Login proxy error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
