'use client';

import React from 'react';
import './StepGetResult.css';
import { Check } from 'lucide-react';
import Link from 'next/link';

const StepGetResult = ({ discountCode }) => {
  return (
    <div className="sgr-wrapper">

      {/* Success Icon */}
      <div className="sgr-icon">
        <Check size={34} strokeWidth={3} />
      </div>

      {/* Title */}
      <h2 className="sgr-title">
        Your 3D Preview is Ready!
      </h2>

      {/* Subtitle */}
      <p className="sgr-subtitle">
        Check your email for the download link
      </p>

      {/* CTA Card */}
      <div className="sgr-cta-card">
        <h3>Want to convert full videos?</h3>
        <p>
          Create a free account and get 50% off your first credit pack!
        </p>

        <Link href="/signup" className="sgr-cta-btn">
          Create Free Account
        </Link>
      </div>

      {/* Coupon */}
      <p className="sgr-coupon">
  Use code <span>{discountCode}</span> at checkout for 40% off!
</p>


    </div>
  );
};

export default StepGetResult;
