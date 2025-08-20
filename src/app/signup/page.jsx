'use client';

import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useGoogleLogin } from '@react-oauth/google';
import './signup.css';
import { baseUrl } from '@/const';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiCheck } from 'react-icons/fi';
const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [country, setCountry] = useState('');
  const [loadingCountry, setLoadingCountry] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  // Fetch actual country name using IP geolocation
  useEffect(() => {
   const fetchCountry = async () => {
  try {
    const res = await fetch('https://ipwho.is/');
    const data = await res.json();
    if (data && data.success && data.country) {
      setCountry(data.country);
    } else {
      setCountry('Unknown');
    }
  } catch (err) {
    console.error('Failed to fetch country:', err);
    setCountry('Unknown');
  } finally {
    setLoadingCountry(false);
  }
};


    fetchCountry();
  }, []);
useEffect(() => {
  const script = document.createElement('script');
  script.src =
    'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
  script.async = true;
  script.onload = () => {
    window.AppleID.auth.init({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
      scope: 'name email',
      redirectURI: `${baseUrl}/auth/callback/apple`, // must match Apple Developer config
      usePopup: false, // 🔑 full redirect mode
    });
  };
  document.body.appendChild(script);
}, []);

const handleAppleLogin = () => {
  if (!country || loadingCountry) {
    toast.error('Please wait until country is determined...');
    return;
  }

  // ✅ In redirect flow, you do not await a response here.
  // Apple will redirect to backend callback
  window.AppleID.auth.signIn({
    state: crypto.randomUUID(),
    nonce: crypto.randomUUID(),
  });
};

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfileImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || loadingCountry) return;

    if (!country || country === 'Unknown') {
      toast.error('Could not determine country. Please reload the web page.');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('country', country);
    formData.append('subscribeNewsletter', subscribeNewsletter ? 'true' : 'false');

    if (profileImage) formData.append('profileImage', profileImage);

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        body: formData,
      });

      const text = await response.json();
      if (response.ok) {
        toast.success('User registered successfully');
        localStorage.setItem('registeredEmail', email);
        router.push('/registration-confirmed');
      } else {
        toast.error(`${text.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error during registration');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (!country || loadingCountry) {
      toast.loading('Please wait until country is determined...');
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/users/google-register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: tokenResponse.access_token,
            country: country,
          }),
        });

        const text = await response.json();
        if (response.ok) {
          toast.success('Google Registration successful!');
          router.push('/login');
        } else {
          toast.error(`${text.message}`);
        }
      } catch (error) {
        console.error('Google registration error:', error);
        toast.error('Error during Google registration');
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google login failed:', error);
      alert('Google login failed');
    },
  });
return (
  <div className="signup-container">
   
    <h2 className="signup-title">Sign up</h2>

    <button
      onClick={() => !loading && googleLogin()}
      className="social-btn google"
      disabled={loading}
    >
      <img src="/google.png" alt="Google" className="social-icon" />
      Sign up with Google
    </button>

 <button className="social-btn apple"   onClick={() => !loading && handleAppleLogin()} disabled={loading}>
       <img src="/apple.png" alt="Apple" className="social-icon" />
      Sign up with Apple
    </button>
    <form className="signup-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />

      <input
        type="hidden"
        value={loadingCountry ? 'Loading country...' : country}
        readOnly
        disabled
      />

      <div {...getRootProps()} className="custom-upload-btn">
        <input {...getInputProps()} disabled={loading} />
        <span>Upload Profile Image</span>
      </div>

      {profileImage && (
        <div className="image-preview">
          <img
            src={URL.createObjectURL(profileImage)}
            alt="Profile Preview"
            className="preview-img"
          />
        </div>
      )}
      <div className="terms-checkbox" onClick={() => !loading && setAgreeToTerms(!agreeToTerms)}>
  <div className={`custom-checkbox ${agreeToTerms ? 'checked' : ''}`}>
    {agreeToTerms && <FiCheck size={12} color="#fff" />}
  </div>
  <label>
    I agree to the{' '}
    <a href="/termsandconditions" target="_blank" rel="noopener noreferrer">
      Terms and Conditions
    </a>
  </label>
</div>

<div className="terms-checkbox" style={{marginBottom:'20px', marginTop:'7px'}} onClick={() => setSubscribeNewsletter(!subscribeNewsletter)}>
  <div className={`custom-checkbox ${subscribeNewsletter ? 'checked' : ''}`}>
    {subscribeNewsletter && <FiCheck size={12} color="#fff" />}
  </div>
  <label className="checked-label">
    Yes, I would like to receive special promotions and tips & tricks for the best 3D experiences.
  </label>
</div>


    <button type="submit" className="signup-btn" disabled={loading || !agreeToTerms}>
  {loading ? 'Creating Account...' : 'Create Account'}
</button>


      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  </div>
);
};

export default SignupForm;
