'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Link from 'next/link';

const BillingMethods = () => {
  const user = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();

  const [cardSubmitting, setCardSubmitting] = useState(false);

  const primaryCard = user?.wallet?.cards?.find(card => card.isPrimary);
  const otherCards = user?.wallet?.cards?.filter(card => !card.isPrimary) || [];

  const handleAddCard = async () => {
    setCardSubmitting(true);
    try {
      const card = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        toast.error(error.message);
        setCardSubmitting(false);
        return;
      }

      const res = await fetch(`${baseUrl}/wallet/add-billing-method`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          paymentMethodId: paymentMethod.id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Card added!');
        window.location.reload();
      } else {
        toast.error(data.message || 'Failed to add card');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add card');
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
        <CardElement />
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
