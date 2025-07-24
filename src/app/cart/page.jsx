'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './cart.css';
import { FaTrashAlt, FaVrCardboard } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { baseUrl } from '@/const';
import Link from 'next/link';

export default function ShoppingCart() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
const [checkoutLoading, setCheckoutLoading] = useState(false);
const [billingData, setBillingData] = useState({
  name:'',
  street: '',
  postalCode: '',
  city: '',
  country: '',
  companyName: '',
  vatNumber: ''
});

  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${baseUrl}/cart/user`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && data.success && data.cart?.credits) {
          setCredits(data.cart.credits);
        } else {
          setCredits([]);
        }
      } catch (err) {
        console.error(err);
        setCredits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleDelete = async (index) => {
    try {
      const res = await fetch(`${baseUrl}/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ index }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Credit removed');
        await refreshAndDispatchUser(dispatch);
        setCredits((prev) => prev.filter((_, i) => i !== index));
      } else {
        toast.error(data.message || 'Failed to remove credit');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error removing credit');
    }
  };

  const clearCart = async () => {
    try {
      await fetch(`${baseUrl}/cart/user`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Failed to clear cart');
    }
  };



  const handleCheckout = async () => {
  const total = credits.reduce((sum, credit) => sum + credit.amount, 0);
  const primaryCard = user?.wallet?.cards?.find(card => card.isPrimary);


  if (!billingData.street || !billingData.postalCode || !billingData.city || !billingData.country) {
    return toast.error('Please fill in the required billing fields.');
  }

  if (!primaryCard) {
    toast.error('Please add billing first');
    return router.push('/add-billing');
  }

  if (total <= 0) {
    return toast.error('Your cart is empty.');
  }

  setCheckoutLoading(true);
  try {
    const res = await fetch(`${baseUrl}/wallet/add-funds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
     body: JSON.stringify({
  userId: user._id,
  amount: Number(total),
  credits, // 🔥 Include full credits array
  billingInfo: billingData,
}),

    });

    const data = await res.json();
    if (data.success) {
      toast.success('Top-up successful!');
      await clearCart();
      await refreshAndDispatchUser(dispatch);
      router.push('/thankyou-for-purchase');
    } else {
      toast.error(data.message || 'Top-up failed');
    }
  } catch (err) {
    console.error(err);
    toast.error('Top-up failed');
  } finally {
    setCheckoutLoading(false);
  }
};


  return (
    <div className="cart-container-page">
    

      <h2 className="cart-title">Shopping Cart</h2>

      {loading ? (
        <p className="loading-cart">Loading cart...</p>
      ) : credits.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        credits.map((credit, index) => (
          <div key={credit._id || index} className="cart-item">
            <div className="item-icon">
              <FaVrCardboard size={24} color="#fff" />
            </div>
            <div className="item-info">
             <strong>{credit.credits} credits for €{credit.amount}</strong>
<span>3D video conversion</span>

            </div>
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              <FaTrashAlt color="#fff" />
            </button>
          </div>
        ))
      )}{credits.length > 0 && (
  <div className="billing-form">
    <h3 className="billing-title">Billing Information</h3>

   {user?.wallet?.cards?.length > 0 ? (
  <div className="primary-card">
    <span className="card-label">Primary Card:</span>
    <span className="card-details">
      {user.wallet.cards.find(card => card.isPrimary)?.brand?.toUpperCase()} ••••{' '}
      {user.wallet.cards.find(card => card.isPrimary)?.last4} — Expires{' '}
      {user.wallet.cards.find(card => card.isPrimary)?.expMonth}/
      {user.wallet.cards.find(card => card.isPrimary)?.expYear}
    </span>
  </div>
) : (
  <p className="redText">
    You haven't added a billing method.{' '}
    <Link href="/add-billing" className="redtextLink">
      Please click here to add it first
    </Link>{' '}
    and then proceed.
  </p>
)}

<input
      type="text"
      placeholder="Name"
      value={billingData.name}
      onChange={(e) => setBillingData({ ...billingData, name: e.target.value })}
    />
<input
      type="text"
      placeholder="Company Name (Optional)"
      value={billingData.companyName}
      onChange={(e) => setBillingData({ ...billingData, companyName: e.target.value })}
    />
    
    <input
      type="text"
      placeholder="Street Address"
      value={billingData.street}
      onChange={(e) => setBillingData({ ...billingData, street: e.target.value })}
    />
    <input
      type="text"
      placeholder="Postal Code"
      value={billingData.postalCode}
      onChange={(e) => setBillingData({ ...billingData, postalCode: e.target.value })}
    />
    <input
      type="text"
      placeholder="City"
      value={billingData.city}
      onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
    />
    <input
      type="text"
      placeholder="Country"
      value={billingData.country}
      onChange={(e) => setBillingData({ ...billingData, country: e.target.value })}
    />
    <input
      type="text"
      placeholder="VAT Number (Optional)"
      value={billingData.vatNumber}
      onChange={(e) => setBillingData({ ...billingData, vatNumber: e.target.value })}
    />
  </div>
)}

      {!loading && credits.length > 0 && (
       <button
  className="checkout-btn"
  onClick={handleCheckout}
  disabled={checkoutLoading}
>
  {checkoutLoading ? (
    <div className="spinner-cart" />
  ) : (
    'Checkout'
  )}
</button>

      )}
    </div>
  );
}
