'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa';
import './PricingSection.css';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { baseUrl } from '@/const';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { useCurrencyByUserCountry } from '@/utils/getCurrencySymbolByCountry';
import CreditUsagePerMinute from './CreditUsagePerMinute';

const PricingSectionInPricing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const [loadingAmount, setLoadingAmount] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const pathname = usePathname();
  const { code: currencyCode, symbol: currencySymbol } = useCurrencyByUserCountry();

  // ✅ Fetch products dynamically from backend using selected currency
  useEffect(() => {
  const fetchProducts = async () => {
  try {
    setLoadingPlans(true); // start loading
    const res = await fetch(`${baseUrl}/products/by-currency?currency=${currencyCode}`);
    const data = await res.json();

    if (data.success && Array.isArray(data.products)) {
      const mappedPlans = data.products.map((p) => ({
        credits: p.credits,
        name: p.name,
        rate: p.description,
        price: `${currencySymbol} ${Math.round(p.localizedPricing?.[0]?.price || p.priceEUR)}`,
        features: p.features,
        popular: p.isPopular,
      }));

      const sortedPlans = mappedPlans.sort(
        (a, b) =>
          Number(a.price.replace(/[^\d.-]/g, '')) -
          Number(b.price.replace(/[^\d.-]/g, ''))
      );

      setPlans(sortedPlans);
    } else {
      toast.error('Failed to load pricing data');
    }
  } catch (err) {
    console.error('❌ Error fetching products:', err);
    toast.error('Something went wrong while loading plans');
  } finally {
    setLoadingPlans(false); // stop loading
  }
};

    if (currencyCode) fetchProducts();
  }, [currencyCode, currencySymbol]);

  const handleBuyCredits = async (credits, amount) => {
    setLoadingAmount(credits);

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

  const handleClick = (credits, amount) => {
    if (isLoggedIn) {
      handleBuyCredits(credits, amount);
    } else {
      localStorage.setItem('pendingCredits', credits);
      router.push('/login');
    }
  };

  return (
    <>
      <CreditUsagePerMinute />
      {!isLoggedIn && (
        <center>
          <div
            className="free-minute-pricing"
            style={{ marginBottom: pathname === '/' ? '95px' : '50px' }}
          >
            🎁 Get 1 minute of free conversion after registration
            <br />
            <span>Newsletter signup required • Excludes 8K content</span>
          </div>
        </center>
      )}

      <h1 className="buy-credit-title">
        Buy your <span className="highlight"> credits</span>
      </h1>

      <div className="pricing-card-wrapper">
        {loadingPlans ? (
    <p className="loading-text">Loading plans...</p>
  ) : (plans.map((plan, index) => {
          const amount = Number(plan.price.replace(/[^\d.-]/g, ''));
          return (
            <div
              key={index}
              className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''}`}
              onClick={() => handleClick(plan.credits, amount)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                cursor: loadingAmount === plan.credits ? 'default' : 'pointer',
                pointerEvents: loadingAmount === plan.credits ? 'none' : 'auto',
              }}
            >
              {index === 2 && (
                <div className="pricing-card-ribbon">
                  <span>Best Value</span>
                </div>
              )}
              {plan.popular && <div className="pricing-card-label">Most Popular</div>}
              <h3 className="pricing-card-credits">{plan.credits} credits</h3>
              <p className="pricing-card-price">{plan.price}</p>
              <p className="pricing-card-rate">{plan.rate}</p>
              <h4 className="pricing-card-name">{plan.name}</h4>
              <h5>One-time purchase</h5>
              <ul className="pricing-feature-list">
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <FaCheck className="pricing-feature-icon" /> {feature}
                  </li>
                ))}
              </ul>
              <div className="pricing-button-container">
                <button
                  className={`pricing-get-started-btn ${
                    hoveredIndex !== null && hoveredIndex !== index ? 'button-dull' : ''
                  }`}
                  disabled={loadingAmount === plan.credits}
                >
                  {loadingAmount === plan.credits ? 'Processing...' : 'Get Started'}
                </button>
              </div>
              <p className="credit-valid-para">Credits valid for 1 year</p>
            </div>
          );
        }))}
      </div>
    </>
  );
};

export default PricingSectionInPricing;
