'use client';
import React from 'react';

export default function PriceSummary({ credits, currencySymbol, vatPercent, finalPrice, vatNote }) {
  const subtotal = credits.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="price-summary">
      <p>Subtotal: {currencySymbol}{subtotal.toFixed(2)}</p>
      {vatPercent > 0 && <p>VAT ({vatPercent}%): {currencySymbol}{(subtotal * vatPercent / 100).toFixed(2)}</p>}
      <h4>Total: {currencySymbol}{finalPrice.toFixed(2)}</h4>
      {vatNote && <small>{vatNote}</small>}
    </div>
  );
}
