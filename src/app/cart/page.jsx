'use client';

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);
const countryOptions = Object.entries(countries.getNames('en')).map(([code, name]) => ({
  value: code,
  label: name,
}));

import './cart.css';
import { FaTrashAlt, FaVrCardboard } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { baseUrl } from '@/const';
import Link from 'next/link';

export default function ShoppingCart() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
const [checkoutLoading, setCheckoutLoading] = useState(false);
const [billingData, setBillingData] = useState({
  name:'',
  street: '',
  postalCode: '',
  city: '',
  country: '',
  companyName: '',
  vatNumber: ''
});
const [vatPercent, setVatPercent] = useState(null);
const [finalPrice, setFinalPrice] = useState(0);
const [vatNote, setVatNote] = useState('');

const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const checkVAT = async () => {
    const { vatNumber, country } = billingData;
    if (!country) return;

    try {
      const res = await fetch(`${baseUrl}/wallet/checkVat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vatNumber, country }),
      });

      const data = await res.json();
      if (data.success) {
        const baseTotal = credits.reduce((sum, c) => sum + c.amount, 0);
        const vatAmount = baseTotal * data.vatRate;
        const final = baseTotal + vatAmount;
setVatNote(data.vatNote || '');

        setVatPercent(data.vatRate * 100);
        setFinalPrice(final);
      }
    } catch (err) {
      console.error('VAT check error:', err);
    }
  };

  checkVAT();
}, [billingData, credits]);
const isBillingComplete = billingData.name &&
  billingData.country &&
  billingData.street &&
  billingData.postalCode &&
  billingData.city;

const isCheckoutDisabled = checkoutLoading || vatPercent === null || !isBillingComplete;
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${baseUrl}/cart/user`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && data.success && data.cart?.credits) {
          setCredits(data.cart.credits);
        } else {
          setCredits([]);
        }
      } catch (err) {
        console.error(err);
        setCredits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleDelete = async (index) => {
    try {
      const res = await fetch(`${baseUrl}/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ index }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Credit removed');
        await refreshAndDispatchUser(dispatch);
        setCredits((prev) => prev.filter((_, i) => i !== index));
      } else {
        toast.error(data.message || 'Failed to remove credit');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error removing credit');
    }
  };

  const clearCart = async () => {
    try {
      await fetch(`${baseUrl}/cart/user`, {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Failed to clear cart');
    }
  };



  const handleCheckout = async () => {
  const total = credits.reduce((sum, credit) => sum + credit.amount, 0);
  const primaryCard = user?.wallet?.cards?.find(card => card.isPrimary);


  if (!billingData.street || !billingData.postalCode || !billingData.city || !billingData.country) {
    return toast.error('Please fill in the required billing fields.');
  }

  if (!primaryCard) {
    toast.error('Please add billing first');
    return router.push('/add-billing');
  }

  if (total <= 0) {
    return toast.error('Your cart is empty.');
  }

  setCheckoutLoading(true);
  try {
    const res = await fetch(`${baseUrl}/wallet/add-funds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
     body: JSON.stringify({
  userId: user._id,
  amount: Number(total),
  credits, 
  billingInfo: billingData,
}),

    });

    const data = await res.json();
    if (data.success) {
      await refreshAndDispatchUser(dispatch);
      toast.success('Top-up successful!');
      await clearCart();
      router.push('/thankyou-for-purchase');
    } else {
      toast.error(data.message || 'Top-up failed');
    }
  } catch (err) {
    console.error(err);
    toast.error('Top-up failed');
  } finally {
    setCheckoutLoading(false);
  }
};


  return (
    <div className="cart-container-page">
    

      <h2 className="cart-title">Shopping Cart</h2>

      {loading ? (
        <p className="loading-cart">Loading cart...</p>
      ) : credits.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        credits.map((credit, index) => (
          <div key={credit._id || index} className="cart-item">
            <div className="item-icon">
              <FaVrCardboard size={24} color="#fff" />
            </div>
            <div className="item-info">
             <strong>{credit.credits} credits for €{credit.amount}</strong>
<span>3D video conversion</span>

            </div>
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              <FaTrashAlt color="#fff" />
            </button>
          </div>
        ))
      )}{credits.length > 0 && (
  <div className="billing-form">
    <h3 className="billing-title">Billing Information</h3>

   {user?.wallet?.cards?.length > 0 ? (
  <div className="primary-card">
    <span className="card-label">Primary Card:</span>
    <span className="card-details">
      {user.wallet.cards.find(card => card.isPrimary)?.brand?.toUpperCase()} ••••{' '}
      {user.wallet.cards.find(card => card.isPrimary)?.last4} — Expires{' '}
      {user.wallet.cards.find(card => card.isPrimary)?.expMonth}/
      {user.wallet.cards.find(card => card.isPrimary)?.expYear}
    </span>
  </div>
) : (
  <p className="redText">
    You haven't added a billing method.{' '}
    <Link href="/add-billing" className="redtextLink">
      Please click here to add it first
    </Link>{' '}
    and then proceed.
  </p>
)}

<input
      type="text"
      placeholder="Name"
      value={billingData.name}
      onChange={(e) => setBillingData({ ...billingData, name: e.target.value })}
    />
<input
      type="text"
      placeholder="Company Name (Optional)"
      value={billingData.companyName}
      onChange={(e) => setBillingData({ ...billingData, companyName: e.target.value })}
    />
    
    <input
      type="text"
      placeholder="Street Address"
      value={billingData.street}
      onChange={(e) => setBillingData({ ...billingData, street: e.target.value })}
    />
    <input
      type="text"
      placeholder="Postal Code"
      value={billingData.postalCode}
      onChange={(e) => setBillingData({ ...billingData, postalCode: e.target.value })}
    />
    <input
      type="text"
      placeholder="City"
      value={billingData.city}
      onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
    />
  <Select
  options={countryOptions}
  value={countryOptions.find((opt) => opt.value === billingData.country)}
 onChange={(selected) => {
  setBillingData({ ...billingData, country: selected?.label || '' });
}}

  placeholder="Select Country"
  className="country-select"
  classNamePrefix="select"
  styles={{
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      color: 'black',
      textAlign: 'left',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
      textAlign: 'left',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f0f0f0' : 'white',
      color: 'black',
      textAlign: 'left',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'gray',
      textAlign: 'left',
    }),
  }}
/>


    <input
      type="text"
      placeholder="VAT Number (Optional)"
      value={billingData.vatNumber}
      onChange={(e) => setBillingData({ ...billingData, vatNumber: e.target.value })}
    />
  </div>
)}


{credits.length > 0 && (
  <>
    <div className="final-price-box">
      <p className="subtotal-line">
  <span className='colored'>Subtotal:</span>  €{credits.reduce((sum, c) => sum + c.amount, 0).toFixed(2)}
</p>

{vatPercent !== null && (
  <p className="vat-total-line">
   Total incl. <span>VAT ({vatPercent}%):</span> €{finalPrice.toFixed(2)}
  </p>
)}

    </div>
  </>
)}



{vatNote && <p className="vat-note">{vatNote}</p>}

      {!loading && credits.length > 0 && (
       <button
  className="checkout-btn"
  onClick={handleCheckout}
  disabled={checkoutLoading || isCheckoutDisabled}
>
  {checkoutLoading ? (
    <div className="spinner-cart" />
  ) : (
    'Checkout'
  )}
</button>

      )}
    </div>
  );
}
