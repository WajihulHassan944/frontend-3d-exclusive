'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import './PricingSection.css';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { baseUrl } from '@/const';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { useCurrencyByUserCountry } from '@/utils/getCurrencySymbolByCountry';
import { localizedPricing } from '@/utils/localizedPricing';

const PricingSectionInPricing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const [loadingAmount, setLoadingAmount] = useState(null);

  // ✅ Get currency directly from reusable hook
  const { code: currencyCode, symbol: currencySymbol } = useCurrencyByUserCountry();

  // Build plans dynamically
  const plans = [10, 50, 100].map((credits) => {
    const price =
      localizedPricing[currencyCode]?.[credits] ??
      localizedPricing['EUR'][credits];

    return {
      credits,
      price: `${currencySymbol} ${price}`,
      rate: `${currencySymbol} ${(price / credits).toFixed(2)} per credit`,
      name:
        credits === 10
          ? 'Basic Plan'
          : credits === 50
          ? 'Standard Plan'
          : 'Pro Plan',
      features:
        credits === 10
          ? ['Up to 2.7K conversion', 'Standard processing']
          : credits === 50
          ? [
              'Up to 4K conversion',
              'Standard processing',
              'Commercial license',
            ]
          : [
              'Up to 8K conversion',
              'Batch uploads',
              'Priority rendering',
              'Commercial license',
            ],
      popular: credits === 50,
    };
  });

  const handleBuyCredits = async (credits) => {
    if (!localizedPricing[currencyCode] || localizedPricing[currencyCode][credits] === undefined) {
      toast.error('Please wait, calculating local pricing...');
      return;
    }

    setLoadingAmount(credits);
    const amount = localizedPricing[currencyCode][credits];

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

  const handleClick = (credits) => {
    if (isLoggedIn) {
      handleBuyCredits(credits);
    } else {
      localStorage.setItem('pendingCredits', credits);
      router.push('/login');
    }
  };

  return (
    <>
      <div className="priceBoxWrapper">
        <div className="price-box">
          <h3 className="price-box-heading">Credit Usage per minute</h3>
          <div className="price-table">
            <div className="price-row">
              <span>1080p</span>
              <span className="orangeColored">1 credit</span>
            </div>
            <div className="price-row">
              <span>2.7K</span>
              <span className="orangeColored">2 credits</span>
            </div>
            <div className="price-row">
              <span>4K</span>
              <span className="orangeColored">3 credits</span>
            </div>
            <div className="price-row">
              <span>8K</span>
              <span className="orangeColored">6 credits</span>
            </div>
          </div>
          <div className="price-note-div">
            ✓ Credits valid for 1 year from purchase date
          </div>
        </div>
      </div>

      <h1 className="buy-credit-title">Buy your credits</h1>
      <div className="pricing-card-wrapper">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
            onClick={() => handleClick(plan.credits)}
            style={{
              cursor: loadingAmount === plan.credits ? 'default' : 'pointer',
              pointerEvents: loadingAmount === plan.credits ? 'none' : 'auto',
            }}
          >
            {plan.popular && <div className="pricing-card-label">Most Popular</div>}
            <h3 className="pricing-card-credits">{plan.credits} credits</h3>
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
                disabled={loadingAmount === plan.credits}
              >
                {loadingAmount === plan.credits ? 'Processing...' : 'Get Started'}
              </button>
            </div>
            <p className="credit-valid-para">Credits valid for 1 year</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PricingSectionInPricing;
