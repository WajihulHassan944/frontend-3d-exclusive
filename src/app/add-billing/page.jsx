'use client';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import TopupCreditInner from './TopupCreditInner';
import BillingMethods from './BillingMethods';

const stripePromise = loadStripe("pk_test_51Re7bwCDHYmyh26mg712Usqdmn1sobEbtsT2P2vhnh8ael8mu70YS9jLuxUmvyy5JKfEqIYU3VQjE1yk3dtOA1Hu0026iz3jsD");

const TopupCredit = () => {
  return (
    <><Elements stripe={stripePromise}>
      <BillingMethods />
    </Elements>
    </>
  );
};

export default TopupCredit;
