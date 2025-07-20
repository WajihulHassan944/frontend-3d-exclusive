'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';
import '../status/thank.css';

export default function Page() {

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
        <h2>Thank you!</h2>
        <p>Your payment was successful. Please enjoy the Xclusive3D conversion service.</p>
        <Link href="/upload">
          <button className="login-btn">Get Started</button>
        </Link>
      </div>
    </div>
  );
}
