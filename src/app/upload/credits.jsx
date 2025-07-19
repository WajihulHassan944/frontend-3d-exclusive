'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';

const Credits = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const handleBuyCredits = async (amount) => {
    try {
      const res = await fetch(`${baseUrl}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ amount }), // userId is extracted from auth middleware
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
    }
  };

  return (
    <div className="credits">
      <button onClick={() => handleBuyCredits(10)}>Buy 10 credits € 9</button>
      <button onClick={() => handleBuyCredits(50)}>Buy 50 credits € 39</button>
      <button onClick={() => handleBuyCredits(100)}>Buy 100 credits € 69</button>
    </div>
  );
};

export default Credits;
