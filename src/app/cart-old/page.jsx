'use client';
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { baseUrl } from '@/const';
import ShoppingCart from './cart';

const stripePromise = loadStripe(
  'pk_test_51Re7bwCDHYmyh26mg712Usqdmn1sobEbtsT2P2vhnh8ael8mu70YS9jLuxUmvyy5JKfEqIYU3VQjE1yk3dtOA1Hu0026iz3jsD'
);

const Page = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await fetch(`${baseUrl}/wallet/create-payment-intent-all-methods`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // if you need cookies/auth
          body: JSON.stringify({
            amount: 5000, // example amount in cents
            currency: 'eur', // can be dynamic
          }),
        });

        const data = await res.json();
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
          setPaymentMethods(data.paymentMethods || []);
        }
      } catch (error) {
        console.error('❌ Error fetching client secret:', error);
      }
    };

    fetchClientSecret();
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
    fields: {
      billingDetails: {
        name: 'never',
        email: 'never',
        address: 'never',
      },
    },
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <ShoppingCart availableMethods={paymentMethods} />
        </Elements>
      )}
      
    </>
  );
};

export default Page;
