'use client';
import React from 'react';

export default function CartItems({ credits, currencySymbol, onDelete }) {
  return (
    <div className="cart-items">
      {credits.map((credit) => (
        <div key={credit.id} className="cart-item">
          <span className="credit-name">{credit.name}</span>
          <span className="credit-price">
            {currencySymbol}{credit.price}
          </span>
          <button
            className="delete-cart-item"
            onClick={() => onDelete(credit.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
