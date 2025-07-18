'use client';

import React, { useState } from 'react';
import './forgot.css';
import Image from 'next/image';
import { baseUrl } from '@/const'; // ✅ make sure this path is correct
import toast from 'react-hot-toast';
const Forgot = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${baseUrl}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Reset link sent to your email.');
        toast.success(data.message);
      } else {
        setError(data.message || 'Something went wrong.');
        toast.error(data.message);
      }
    } catch (err) {
      setError('Failed to send reset link. Please try again later.');
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <Image
        src="/logo.png"
        alt="Xclusive 3D Logo"
        width={160}
        height={120}
        className="forgot-logo"
      />

      <h2 className="forgot-title">Forgot Password</h2>
      <form className="forgot-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="forgot-btn" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      {error && <p className="forgot-error">{error}</p>}
      {success && <p className="forgot-success">{success}</p>}
    </div>
  );
};

export default Forgot;
