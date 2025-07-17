'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';
import './thank.css';

export default function Status() {
  const searchParams = useSearchParams();
  const status = searchParams.get('verified'); // gets `success`, `fail`, or `already`

  const renderMessage = () => {
    switch (status) {
      case 'success':
        return {
          icon: <FaCheckCircle size={60} color="#ff8c2f" />,
          heading: 'Email Verified!',
          message: 'Thanks for signing up. Your email has been verified successfully.',
        };
      case 'already':
        return {
          icon: <FaExclamationCircle size={60} color="#ff8c2f" />,
          heading: 'Already Verified',
          message: 'This email is already verified. You can go ahead and log in.',
        };
      case 'fail':
      default:
        return {
          icon: <FaTimesCircle size={60} color="#ff8c2f" />,
          heading: 'Verification Failed',
          message: 'We could not verify your email. Please try again or contact support.',
        };
    }
  };

  const { icon, heading, message } = renderMessage();

  const isFailed = status === 'fail';
  const buttonText = isFailed ? 'Reattempt' : 'Login';
  const buttonLink = isFailed ? '/signup' : '/login';

  return (
    <div className="verify-container">
      <Image
        src="https://res.cloudinary.com/daflot6fo/image/upload/v1752555158/two-Photoroom_bvwst2.png"
        alt="Xclusive 3D Logo"
        width={180}
        height={90}
        className="logo-9"
      />

      <div className="verify-box">
        {icon}
        <h2>{heading}</h2>
        <p>{message}</p>
        <Link href={buttonLink}>
          <button className="login-btn">{buttonText}</button>
        </Link>
      </div>
    </div>
  );
}
