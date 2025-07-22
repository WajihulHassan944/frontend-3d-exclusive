export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const backendRes = await fetch('https://backend-3d-exclusive.vercel.app/api/users/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await backendRes.json();

    const setCookie = backendRes.headers.get('set-cookie');
    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie);
    }

    res.status(backendRes.status).json(data);
  } catch (error) {
    console.error('Google login proxy error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
