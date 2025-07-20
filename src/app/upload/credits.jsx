'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';

const Credits = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [loadingAmount, setLoadingAmount] = useState(null);

  const handleBuyCredits = async (amount) => {
    setLoadingAmount(amount);
    try {
      const res = await fetch(`${baseUrl}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Credits added to cart!');
        router.push('/cart');
        await refreshAndDispatchUser(dispatch);
      } else {
        toast.error(data.error || 'Failed to add credits');
      }
    } catch (err) {
      console.error('❌ Error adding credits:', err);
      toast.error('Something went wrong');
    } finally {
      setLoadingAmount(null);
    }
  };

  return (
    <div className="credits">
      {[10, 50, 100].map((amount) => (
        <button
          key={amount}
          onClick={() => handleBuyCredits(amount)}
          className={loadingAmount === amount ? 'loading' : ''}
          disabled={loadingAmount !== null}
        >
          {loadingAmount === amount ? (
            <div className="spinner-buy" />
          ) : (
            `Buy ${amount} credits € ${amount === 10 ? 9 : amount === 50 ? 39 : 69}`
          )}
        </button>
      ))}
    </div>
  );
};

export default Credits;
