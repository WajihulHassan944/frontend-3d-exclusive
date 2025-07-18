'use client';

import React, { useState } from 'react';
import './reset.css';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('Missing token. Please check your reset link.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://backend-3d-exclusive.vercel.app/api/users/reset-password-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Password reset successfully.');
toast.success(data.message);
        // ✅ Redirect to login after 1s
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } else {
        setError(data.message || 'Reset failed.');
        toast.error(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Try again.');
      toast.error(data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <Image
        src="/logo.png"
        alt="Xclusive 3D Logo"
        width={160}
        height={120}
        className="reset-logo"
      />

      <h2 className="reset-title">Reset Password</h2>

      <form className="reset-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="reset-btn" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      {error && <p className="reset-error">{error}</p>}
      {success && <p className="reset-success">{success}</p>}
    </div>
  );
};

export default ResetPassword;
