'use client';

import React from 'react';
import './price.css';
import PricingSectionInPricing from './PricingSection/PricingSection';
import { useSelector } from 'react-redux';
import PaymentOptions from './PaymentOptions/PaymentOptions';

const Pricing = () => {
   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
  <center> <div className="pricing-container">
     

      <h2 className="pricing-title highlight">Pricing</h2>
      <p className='pricingSubTitle'>Choose the perfect plan for your 3D video conversion needs</p>
      
      
      <PricingSectionInPricing />
     
<PaymentOptions />




    </div>
  </center> 
   );
};

export default Pricing;
