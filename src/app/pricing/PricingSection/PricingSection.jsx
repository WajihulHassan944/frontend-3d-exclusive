'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import "./PricingSection.css";

const plans = [
  {
    credits: '10 credits',
    price: '€9',
    rate: '€0.90 per credit',
    name: 'Basic Plan',
    features: [
      'Up to 2.7K conversion',
      'Standard processing',
      'Email support',
    ],
  },
  {
    credits: '50 credits',
    price: '€39',
    rate: '€0.78 per credit',
    name: 'Standard Plan',
    features: [
      'Up to 4K conversion',
      'Standard processing',
      'Commercial license',
      'Priority email support',
    ],
    popular: true,
  },
  {
    credits: '100 credits',
    price: '€69',
    rate: '€0.69 per credit',
    name: 'Pro Plan',
    features: [
      'Up to 8K conversion',
      'Batch uploads',
      'Priority rendering',
      'Commercial license',
      'Priority support',
    ],
  },
];

const PricingSectionInPricing = () => {
  const router = useRouter();

  return (
    <div className="pricing-card-wrapper">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
        >
          {plan.popular && <div className="pricing-card-label">Most Popular</div>}
          <h3 className="pricing-card-credits">{plan.credits}</h3>
          <p className="pricing-card-price">{plan.price}</p>
          <p className="pricing-card-rate">{plan.rate}</p>
          <h4 className="pricing-card-name">{plan.name}</h4>
          <ul className="pricing-feature-list">
            {plan.features.map((feature, i) => (
              <li key={i}>
                <FaCheck className="pricing-feature-icon" /> {feature}
              </li>
            ))}
          </ul>
          <div className="pricing-button-container">
            <button
              className="pricing-get-started-btn"
              onClick={() => router.push('/login')}
            >
              Get Started
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingSectionInPricing;
