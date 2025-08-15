'use client';
import React from 'react';

export default function ActionButtons({ loading, disabled, onCheckout }) {
  return (
    <button
      className="checkout-btn"
      onClick={onCheckout}
      disabled={loading || disabled}
    >
      {loading ? <div className="spinner-cart" /> : 'Checkout'}
    </button>
  );
}
