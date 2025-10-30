'use client';

import React from 'react';
import './price.css';
import PricingSectionInPricing from './PricingSection/PricingSection';
import { useSelector } from 'react-redux';
import PaymentOptions from './PaymentOptions/PaymentOptions';

const Pricing = ({ section }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <center>
      <div className="pricing-container">
        <h2
          className="pricing-title"
          dangerouslySetInnerHTML={{
            __html: (section?.title || "<span class='highlight'>Pricing</span>")
              .replace(/\\u003C/g, "<")
              .replace(/\\u003E/g, ">")
              .replace(/className=/g, "class="),
          }}
        />

        <p className="pricingSubTitle">
          {section?.description || "Choose the perfect plan for your 3D video conversion needs."}
        </p>

        <PricingSectionInPricing />
        <PaymentOptions />
      </div>
    </center>
  );
};

export default Pricing;
