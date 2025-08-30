'use client';
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import BillingMethods from './BillingMethods';
import "./TopupCredit.css";
const stripePromise = loadStripe("pk_live_51RvNstHpow7HoYZURyGWZHskSTYGsl0zHWJVvK9ItweHZgvmo1eMyyDrbESgcorVsb7EHjv6CvTaQSwKjXfFoWGp0066SXf4lT");
import { baseUrl } from '@/const';
const Page = () => {
    const [clientSecret, setClientSecret] = useState('');
  
    useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch(`${baseUrl}/wallet/create-setup-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // if using cookies/auth
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, []);
  
 const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <BillingMethods />
        </Elements>
      )}
    </>
  );
};

export default Page;
