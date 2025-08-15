'use client';
import React from 'react';

export default function BillingForm({ billingData, setBillingData, setPage }) {
  const handleChange = (e) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="billing-form">
      <h3>Billing Information</h3>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={billingData.name || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={billingData.address || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={billingData.country || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="vatNumber"
        placeholder="VAT Number (optional)"
        value={billingData.vatNumber || ''}
        onChange={handleChange}
      />

      <button className="back-btn" onClick={() => setPage(1)}>Back</button>
    </div>
  );
}
