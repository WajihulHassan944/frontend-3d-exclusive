import React, { Suspense } from 'react';
import CartPage from './CartPage';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <CartPage />
    </Suspense>
  );
};

export default Page;
