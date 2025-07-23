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

 const handleBuyCredits = async (credits) => {
  setLoadingAmount(credits);

  // Map credits to actual Euro amount
  const pricingMap = {
    10: 9,
    50: 39,
    100: 69,
  };
  const amount = pricingMap[credits];

  try {
    const res = await fetch(`${baseUrl}/cart/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ credits, amount }),
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
     {[10, 50, 100].map((credits) => (
  <button
    key={credits}
    onClick={() => handleBuyCredits(credits)}
    className={loadingAmount === credits ? 'loading' : ''}
    disabled={loadingAmount !== null}
  >
    {loadingAmount === credits ? (
      <div className="spinner-buy" />
    ) : (
      `Buy ${credits} credits € ${credits === 10 ? 9 : credits === 50 ? 39 : 69}`
    )}
  </button>
))}

    </div>
  );
};

export default Credits;
