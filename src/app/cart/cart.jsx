'use client';
import React, { useState } from 'react';
import { handleStripeSubmit } from '@/utils/cart/handleStripeSubmit';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { FaArrowLeft } from 'react-icons/fa';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import './cart.css';

countries.registerLocale(enLocale);

export default function ShoppingCart({ billingData, setPage, selectedPaymentMethod, setSelectedPaymentMethod }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [cardSubmitting, setCardSubmitting] = useState(false);
  const [stripeCard, setStripeCard] = useState(false);

  // ✅ Spinner for Stripe Elements loading
  const [elementsLoading, setElementsLoading] = useState(true);

  // ✅ Detect selected local method from PaymentElement
  const handlePaymentMethodChange = (event) => {
    if (event?.value?.type) {
      localStorage.setItem('selectedLocalPaymentMethod', event.value.type);
      console.log('💳 User selected local method:', event.value.type);
    }
  };

  return (
    
      <div className="billing-form">
        <h3 className="billing-title">Billing Information</h3>
  <div className="backArrowIconWrap">
        <FaArrowLeft onClick={() => setPage(1)} className="backArrowIcon" />
      </div>

        {/* Payment options */}
        <div className="payment-method-options">
          {/* Primary card option */}
          {user?.wallet?.cards?.length > 0 && (
            <label
              className={`payment-option ${selectedPaymentMethod === 'card' ? 'selected-option' : ''}`}
              onClick={() => {
                setSelectedPaymentMethod('card');
                setPage(3);
              }}
            >
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedPaymentMethod === 'card'}
                onChange={() => setSelectedPaymentMethod('card')}
              />
              <div className="primary-card">
                <span className="card-label">Primary Card:</span>
                <span className="card-details">
                  {user.wallet.cards.find(card => card.isPrimary)?.brand?.toUpperCase()} ••••{' '}
                  {user.wallet.cards.find(card => card.isPrimary)?.last4} — Expires{' '}
                  {user.wallet.cards.find(card => card.isPrimary)?.expMonth}/
                  {user.wallet.cards.find(card => card.isPrimary)?.expYear}
                </span>
              </div>
            </label>
          )}

          {/* Stripe Elements option */}
          <label
            className={`payment-option ${selectedPaymentMethod === 'element' ? 'selected-option' : ''}`}
            onClick={() => setSelectedPaymentMethod('element')}
          >
            <input
              type="radio"
              name="payment"
              value="element"
              checked={selectedPaymentMethod === 'element'}
              onChange={() => setSelectedPaymentMethod('element')}
            />
            <div className="stripe-element-box">
              <h4>Or use another payment method</h4>
              <div className="stripe-box">
                {elementsLoading && <div className="spinner-cart" />} {/* Spinner while loading */}
                <PaymentElement
                  onReady={() => setElementsLoading(false)} // hide spinner once ready
                  onChange={handlePaymentMethodChange} // detect local payment method
                  options={{
                    fields: {
                      billingDetails: {
                        name: 'never',
                        email: 'never',
                        address: 'never',
                      },
                    },
                  }}
                  onFocus={() => setSelectedPaymentMethod('element')}
                  onClick={() => setSelectedPaymentMethod('element')}
                />
              </div>
            </div>
          </label>
        </div>

        {/* Submit button only for element method */}
        {selectedPaymentMethod === 'element' && (
          <button
            className="checkout-btn"
            onClick={() =>
              handleStripeSubmit({
                stripe,
                elements,
                user,
                dispatch,
                setStripeCard,
                setCardSubmitting,
                billingData,
                isCard: selectedPaymentMethod === 'card'
              })
            }
            disabled={cardSubmitting}
          >
            {cardSubmitting ? <div className="spinner-cart" /> : 'Submit'}
          </button>
        )}
      </div>
    
  );
}
