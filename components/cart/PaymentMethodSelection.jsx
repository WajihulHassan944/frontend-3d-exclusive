'use client';
import React from 'react';

export default function PaymentMethodSelection({
  user,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  setPage,
  stripeRedirectSuccess,
  stripe,
  elements,
  dispatch,
  setStripeCard,
  cardSubmitting,
  setCardSubmitting,
  handleStripeSubmit
}) {
  return (
    <div className="payment-method-section">
      <h3>Select Payment Method</h3>

      <div className="payment-methods">
        <button
          className={selectedPaymentMethod === 'stripe' ? 'active' : ''}
          onClick={() => setSelectedPaymentMethod('stripe')}
        >
          Credit/Debit Card
        </button>

        <button
          className={selectedPaymentMethod === 'paypal' ? 'active' : ''}
          onClick={() => setSelectedPaymentMethod('paypal')}
        >
          PayPal
        </button>
      </div>

      {selectedPaymentMethod === 'stripe' && (
        <button
          className="checkout-btn"
          onClick={() => {
            setCardSubmitting(true);
            handleStripeSubmit().finally(() => setCardSubmitting(false));
          }}
          disabled={cardSubmitting}
        >
          {cardSubmitting ? <div className="spinner-cart" /> : 'Submit'}
        </button>
      )}

      <button
        className="next-btn"
        onClick={() => setPage(2)}
      >
        Continue to Billing
      </button>
    </div>
  );
}
