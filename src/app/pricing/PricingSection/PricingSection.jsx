'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import './PricingSection.css';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { baseUrl } from '@/const';
import { refreshAndDispatchUser } from '@/utils/refreshUser';

const localizedPricing = {
  USD: { 10: 10, 50: 45, 100: 80 },
  GBP: { 10: 8, 50: 35, 100: 60 },
  CAD: { 10: 15, 50: 60, 100: 100 },
  AUD: { 10: 15, 50: 60, 100: 110 },
  JPY: { 10: 1440, 50: 6240, 100: 11040 },
  CHF: { 10: 9, 50: 35, 100: 70 },
  SEK: { 10: 100, 50: 450, 100: 790 },
  NOK: { 10: 100, 50: 440, 100: 780 },
  NZD: { 10: 15, 50: 70, 100: 120 },
  SGD: { 10: 15, 50: 60, 100: 100 },
  EUR: { 10: 9, 50: 39, 100: 69 },
  PKR: { 10: 2500, 50: 9500, 100: 17000 }, // Optional override
};

const countryToCurrency = {
  US: 'USD',
  GB: 'GBP',
  CA: 'CAD',
  AU: 'AUD',
  JP: 'JPY',
  CH: 'CHF',
  SE: 'SEK',
  NO: 'NOK',
  NZ: 'NZD',
  SG: 'SGD',
  PK: 'PKR',
  NL: 'EUR',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  BE: 'EUR',
};

const getCurrencySymbol = (code) => {
  const symbols = {
    USD: '$',
    GBP: '£',
    EUR: '€',
    PKR: '₨',
    CAD: 'CA$',
    AUD: 'A$',
    JPY: '¥',
    CHF: 'CHF',
    SEK: 'kr',
    NOK: 'kr',
    NZD: 'NZ$',
    SGD: 'S$',
  };
  return symbols[code] || code;
};

const PricingSectionInPricing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const [loadingAmount, setLoadingAmount] = useState(null);
  const [currency, setCurrency] = useState('EUR'); // default

  // Fetch user's country code via IP and set currency
  useEffect(() => {
    const fetchCountryAndSetCurrency = async () => {
      try {
        const res = await fetch('https://ipwho.is/');
        const data = await res.json();
        if (data.success && data.country_code) {
          const matchedCurrency = countryToCurrency[data.country_code] || 'EUR';
          setCurrency(matchedCurrency);
        }
      } catch (err) {
        console.error('Failed to get IP location:', err);
        setCurrency('EUR');
      }
    };

    fetchCountryAndSetCurrency();
  }, []);

  const plans = [10, 50, 100].map((credits) => {
    const price = localizedPricing[currency]?.[credits] ?? localizedPricing['EUR'][credits];
    const currencySymbol = getCurrencySymbol(currency);

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
    setLoadingAmount(credits);
    const amount = localizedPricing[currency]?.[credits] ?? localizedPricing['EUR'][credits];

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
<div className='priceBoxWrapper'>
<div className="price-box">
        <h3 className="price-box-heading">Credit Usage per minute</h3>
        <div className="price-table">
          <div className="price-row">
            <span>1080p</span>
            <span className='orangeColored'>1 credit</span>
          </div>
          <div className="price-row">
            <span>2.7K</span>
            <span className='orangeColored'>2 credits</span>
          </div>
          <div className="price-row">
            <span>4K</span>
            <span className='orangeColored'>3 credits</span>
          </div>
          <div className="price-row">
            <span>8K</span>
            <span className='orangeColored'>6 credits</span>
          </div>
        </div>
           <div className='price-note-div'>✓ Credits valid for 1 year from purchase date</div>
       
      </div>
      </div>

<h1 className='buy-credit-title'>Buy your credits</h1>
    <div className="pricing-card-wrapper">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
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
              onClick={() => handleClick(plan.credits)}
              disabled={loadingAmount === plan.credits}
            >
              {loadingAmount === plan.credits ? 'Processing...' : 'Get Started'}
            </button>
          </div>
          <p className='credit-valid-para'>Credits valid for 1 year</p>
        </div>
      ))}
    </div>

    </>
  );
};

export default PricingSectionInPricing;
