'use client';

import React, { useEffect, useState } from 'react';
import './login.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { baseUrl } from '@/const';
import { loginUser } from '@/redux/features/userSlice';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import withoutAuth from '@/hooks/withoutAuth';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
const { data: geoData, loading: loadingCountry } = useSelector((state) => state.geo);

const country = geoData?.country || 'Unknown';
console.log(country);
const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('login successful');
        const userDetailsRes = await fetch(`${baseUrl}/users/userdetails`, {
          method: 'GET',
          credentials: 'include',
        });

        const userDetailsData = await userDetailsRes.json();

        if (userDetailsRes.ok && userDetailsData.success) {
          const user = userDetailsData.user;
           const userWithWallet = {
    ...userDetailsData.user,
    wallet: userDetailsData.wallet,
    cart: userDetailsData.cart,
     videos: userDetailsData.videos,
                    invoices: userDetailsData.invoices,
  };

  dispatch(loginUser(userWithWallet));
const hasPendingCredits = localStorage.getItem('pendingCredits');
const hasTempVideo = localStorage.getItem('tempVideo');

if (hasPendingCredits) {
  router.push('/cart');
} else {
  router.push(hasTempVideo ? '/upload' : '/upload');
}


        } else {
          setError('Failed to fetch user details.');
        }
      } else {
        setError(data.message || 'Login failed.');
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError('');

      try {
        const res = await fetch(`${baseUrl}/users/google-login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ token: tokenResponse.access_token })
        });

        const data = await res.json();

        if (res.ok && data.success) {
           toast.success('login successful');
          const userDetailsRes = await fetch(`${baseUrl}/users/userdetails`, {
            method: 'GET',
            credentials: 'include',
          });

          const userDetailsData = await userDetailsRes.json();

          if (userDetailsRes.ok && userDetailsData.success) {
            const user = userDetailsData.user;
             const userWithWallet = {
    ...userDetailsData.user,
    wallet: userDetailsData.wallet,
    cart: userDetailsData.cart,
                        invoices: userDetailsData.invoices,
    videos: userDetailsData.videos,
  };

  dispatch(loginUser(userWithWallet));
const hasPendingCredits = localStorage.getItem('pendingCredits');
const hasTempVideo = localStorage.getItem('tempVideo');

if (hasPendingCredits) {
  router.push('/cart');
} else {
  router.push(hasTempVideo ? '/upload' : '/upload');
}

          } else {
            setError('Failed to fetch user details.');
          }
        } else {
          setError(data.message || 'Google login failed.');
          toast.error(data.message);
        }
      } catch (err) {
        console.error('Google login error:', err);
        setError('Something went wrong during Google login.');
      } finally {
        setLoading(false);
      }
    },
    onError: () => setError('Google login was cancelled or failed.')
  });


useEffect(() => {
  const script = document.createElement('script');
  script.src =
    'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
  script.async = true;
  script.onload = () => {
    window.AppleID.auth.init({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
      scope: 'name email',
      redirectURI: `https://xclusive3d.com/api/auth/callback/apple`, // must match Apple Developer config
      usePopup: false, // 🔑 full redirect mode
    });
  };
  document.body.appendChild(script);
}, []);

const handleAppleLogin = () => {

  if (loadingCountry) {
    toast.error('Please wait until country is determined...');
    return;
  }
  window.AppleID.auth.signIn({
    state: crypto.randomUUID(),
    nonce: crypto.randomUUID(),
  });
};



return (
  <>
   <div className="login-container">
  
    <h2 className="login-title">Sign in</h2>

    <button onClick={googleLogin} className="social-btn google">
      <img src="/google.png" alt="Google" className="social-icon" />
      Sign in with Google
    </button>

    <button className="social-btn apple" onClick={handleAppleLogin}>
      <img src="/apple.png" alt="Apple" className="social-icon" style={{marginLeft:'-10px'}} />
      Sign in with Apple
    </button>

    <form className="login-form" onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
     <div className="password-input-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <span
    className="toggle-password"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? 'Logging in...' : 'Sign in'}
      </button>
      <div className='forgot-pass-wrapper'>
      <Link href="/forgot-password" className='forgot-password'>Forgot password</Link>
      </div>
      <div className="signup-link">
  If you don’t have an account you can{' '}
  <Link href="/signup">sign up here</Link>.
</div>

    </form>

    {error && <p className="error-message">{error}</p>}
  </div>
  </>
);

};

export default withoutAuth(LoginForm);
