'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const BillingMethods = () => {
  const user = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
const searchParams = useSearchParams();
  const [cardSubmitting, setCardSubmitting] = useState(false);

  const primaryCard = user?.wallet?.cards?.find(card => card.isPrimary);
  const otherCards = user?.wallet?.cards?.filter(card => !card.isPrimary) || [];



 useEffect(() => {
    const setupIntentClientSecret = searchParams.get('setup_intent_client_secret');
    const redirectStatus = searchParams.get('redirect_status');

    if (stripe && setupIntentClientSecret && redirectStatus === 'succeeded') {
      (async () => {
        setCardSubmitting(true);
        const { setupIntent, error } = await stripe.retrieveSetupIntent(setupIntentClientSecret);

        if (error || !setupIntent) {
          toast.error(error?.message || 'Setup failed');
          setCardSubmitting(false);
          return;
        }

        const res = await fetch(`${baseUrl}/wallet/add-billing-method`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user._id,
            paymentMethodId: setupIntent.payment_method,
          }),
        });

        const data = await res.json();
        if (data.success) {
          toast.success('Payment method added!');
          window.location.href = '/add-billing'; // clean URL (no query params)
        } else {
          toast.error(data.message || 'Failed to save billing method');
        }

        setCardSubmitting(false);
      })();
    }
  }, [stripe]);






const handleAddCard = async () => {
  setCardSubmitting(true);
  try {
    const { setupIntent, error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/add-billing`, // optional if you don't want redirect
      },
      redirect: "if_required", // avoid full-page redirect
    });

    if (error) {
      toast.error(error.message);
    } else if (setupIntent && setupIntent.status === 'succeeded') {
      // Send to backend to link with user
      const res = await fetch(`${baseUrl}/wallet/add-billing-method`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          paymentMethodId: setupIntent.payment_method,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Card added!');
        window.location.reload();
      } else {
        toast.error(data.message || 'Failed to save billing method');
      }
    }
  } catch (err) {
    console.error(err);
    toast.error('Failed to add billing method');
  }
  setCardSubmitting(false);
};

  const handleSetPrimary = async (stripeCardId) => {
    try {
      const res = await fetch(`${baseUrl}/wallet/set-primary-card`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, stripeCardId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Card set as primary!');
        window.location.reload();
      } else toast.error(data.message || 'Failed to update card');
    } catch (err) {
      toast.error('Error updating primary card');
    }
  };

  const handleRemoveCard = async (stripeCardId) => {
    try {
      const res = await fetch(`${baseUrl}/wallet/remove-card`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, stripeCardId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Card removed');
        window.location.reload();
      } else toast.error(data.message || 'Error removing card');
    } catch (err) {
      toast.error('Card removal error');
    }
  };

  return (
   <div className="topup-wrapper">
     
      <h1 className="topup-title">Billing Methods</h1>

  <div className="topup-section">
      <h3>Primary Card</h3>
      <div className='topperCard'>
        {primaryCard ? (
        <div className="topup-card primary">
          <img
            src={primaryCard.brand === 'mastercard' ? '/mastercard.png' : '/visa.png'}
            alt={primaryCard.brand}
          />
          <span>**** **** **** {primaryCard.last4}</span>
          <span>Exp: {primaryCard.expMonth}/{primaryCard.expYear}</span>
        </div>
      ) : (
        <p>No primary card found.</p>
      )}
      </div>

      {otherCards.length > 0 && (
        <>
          <h3>Saved Cards</h3>
          <div className="saved-cards-grid">
            {otherCards.map((card) => (
              <div key={card._id} className="topup-card">
                <div className="topup-card-content">
                  <img
                    src={card.brand === 'mastercard' ? '/mastercard.png' : '/visa.png'}
                    alt={card.brand}
                  />
                  <span>**** {card.last4}</span>
                  <span>Exp: {card.expMonth}/{card.expYear}</span>
                </div>
                <div className="topup-card-actions">
                  <button onClick={() => handleSetPrimary(card.stripeCardId)}>Set as Primary</button>
                  <button onClick={() => handleRemoveCard(card.stripeCardId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <h3>Add New Card</h3>
      <div className="stripe-box">
  <PaymentElement options={{ layout: 'tabs' }} />
</div>

      <button className="topup-btn" onClick={handleAddCard} disabled={cardSubmitting}>
        {cardSubmitting ? 'Saving...' : 'Add Card'}
      </button>
   <center> <Link href="/transactions-history" className='viewTransactionsBtn'>View transactions history</Link></center>
    </div> 
   
    </div>
  );
};

export default BillingMethods;
