'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import '../status/thank.css';
import toast from 'react-hot-toast';

export default function Status() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('registeredEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    const timer = setTimeout(() => {
      toast('You’re being redirected to login...', { icon: '🔁' });
 router.push('/login');
      localStorage.removeItem('registeredEmail');
     
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="verify-container">
      <Image
        src="/logo.png"
        alt="Xclusive 3D Logo"
        width={180}
        height={90}
        className="logo-9"
      />

      <div className="verify-box">
        <FaCheckCircle size={60} color="#ff8c2f" />
        <h2>Account Verification</h2>
        <p>We’ve sent an email to <strong>{email || '[your email]'}</strong>. Please verify your email address.</p>
        <Link href="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>
    </div>
  );
}
