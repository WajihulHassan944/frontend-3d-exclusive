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

export default function ShoppingCart() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

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

  const handleTopUp = async (topUpAmount) => {
    try {
      const res = await fetch(`${baseUrl}/wallet/add-funds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ userId: user._id, amount: Number(topUpAmount) }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Top-up successful!');
        await clearCart();
        await refreshAndDispatchUser(dispatch);
        router.push('/upload');
      } else {
        toast.error(data.message || 'Top-up failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Top-up failed');
    }
  };

  const handleCheckout = () => {
    const primaryCard = user?.wallet?.cards?.find(card => card.isPrimary);

    if (primaryCard) {
      const total = credits.reduce((sum, credit) => sum + credit.amount, 0);
      if (total > 0) {
        handleTopUp(total);
      } else {
        toast.error('Your cart is empty.');
      }
    } else {
      toast.error('Please add billing first');
      router.push('/add-billing');
    }
  };

  return (
    <div className="cart-container">
      <Image
        src="/logo.png"
        alt="Xclusive 3D Logo"
        width={180}
        height={90}
        className="logo"
      />

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
              <strong>{credit.amount} credits for</strong>
              <span>3D video conversion</span>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              <FaTrashAlt color="#fff" />
            </button>
          </div>
        ))
      )}

      {!loading && credits.length > 0 && (
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
}
