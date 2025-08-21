'use client';
import React, { useEffect, useState } from 'react';
import { fetchCart } from '@/utils/cart/fetchCart';
import { handleBuyCredits } from '@/utils/cart/handleBuyCredits';
import { handleDelete } from '@/utils/cart/handleDelete';
import { handleCheckout } from '@/utils/cart/handleCheckout';
import { handleStripeSubmit } from '@/utils/cart/handleStripeSubmit';
import Select from 'react-select';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { FaArrowLeft } from 'react-icons/fa';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
countries.registerLocale(enLocale);
const countryOptions = Object.entries(countries.getNames('en')).map(([code, name]) => ({
  value: code,
  label: name,
}));

import './cart.css';
import { FaTrashAlt, FaVrCardboard } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { baseUrl } from '@/const';
import { useCurrencyByUserCountry, useCurrencySymbolByUserCountry } from '@/utils/getCurrencySymbolByCountry';

export default function ShoppingCart() {
  const currencySymbol = useCurrencySymbolByUserCountry();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
const [checkoutLoading, setCheckoutLoading] = useState(false);

const [stripeCard, setStripeCard] = useState(false);

const [billingData, setBillingData] = useState({
  name:'',
  street: '',
  postalCode: '',
  city: '',
  country: '',
  companyName: '',
  vatNumber: ''
});


const searchParams = useSearchParams();
 const stripe = useStripe();
   const elements = useElements();
const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // 'card' | 'element'
const [cardSubmitting, setCardSubmitting] = useState(false);
const [stripeRedirectSuccess, setStripeRedirectSuccess] = useState(null);
const [page, setPage] = useState(1);



useEffect(() => {
  const setupIntentClientSecret = searchParams.get('setup_intent_client_secret');
  const redirectStatus = searchParams.get('redirect_status');

  if (redirectStatus) {
    setSelectedPaymentMethod('element'); // 👈 Force switch to PaymentElement UI
  }

  if (redirectStatus === 'succeeded') {
    setStripeRedirectSuccess(true);
    setPage(2);
  } else if (redirectStatus === 'failed') {
    setStripeRedirectSuccess(false);
    toast.error('Payment method setup failed.');
  }

  if (stripe && setupIntentClientSecret && redirectStatus === 'succeeded') {
    (async () => {
      setCardSubmitting(true);
      const { setupIntent, error } = await stripe.retrieveSetupIntent(setupIntentClientSecret);
      // Optional: handle setupIntent or error here
      setCardSubmitting(false);
    })();
  }
}, [stripe]);





useEffect(() => {
  if (user?.invoices?.length) {
    const latestInvoice = user.invoices[0]; // first = latest
    const info = latestInvoice.billingInfo;

    // Match the country for dropdown (still using user.country)
    const matched = countryOptions.find(
      (opt) => opt.label === user.country || opt.value === user.country
    );

    setBillingData({
      name: info.name || '',
      street: info.street || '',
      postalCode: info.postalCode || '',
      city: info.city || '',
      companyName: info.companyName || '',
      vatNumber: info.vatNumber || '',
      country: matched?.label || ''
    });
  }
}, [user?.invoices, user?.country]);

const [vatPercent, setVatPercent] = useState(null);
const [finalPrice, setFinalPrice] = useState(0);
const [vatNote, setVatNote] = useState('');

const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const checkVAT = async () => {
    console.log("vat called");
    const { vatNumber, country } = billingData;
    if (!country) return;
console.log(country);
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
}, [billingData.country, billingData.vatNumber, credits]);



const isBillingComplete = billingData.name &&
  billingData.country &&
  billingData.street &&
  billingData.postalCode;

const isCheckoutDisabled = checkoutLoading || vatPercent === null || !isBillingComplete ||
  (selectedPaymentMethod === 'element' && !stripeCard && stripeRedirectSuccess !== true);

   

useEffect(() => {
  const currency = useCurrencyByUserCountry(); // ✅ get currency
  const pendingCredits = localStorage.getItem('pendingCredits');

  if (pendingCredits) {
    localStorage.removeItem('pendingCredits');
    handleBuyCredits(
      pendingCredits,
      dispatch,
      fetchCart,
      setLoading,
      setCredits,
      currency // ✅ pass currency
    );
  } else {
    fetchCart(setCredits, setLoading, currency); // ✅ pass currency
  }
}, []);


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
             <strong>{credit.credits} credits for {currencySymbol} {credit.amount}</strong>
<span>3D video conversion</span>

            </div>
            <button className="delete-btn"  onClick={() => handleDelete(index, dispatch, setCredits)}>
              <FaTrashAlt color="#fff" />
            </button>
          </div>
        ))
      )}
      
{credits.length > 0 && ( <>
{page === 1 ? (
  <>
      <div className="billing-form">
    <h3 className="billing-title">Billing Information</h3>
  
{stripeRedirectSuccess === true && (
  <p className="stripe-message success">Payment method setup succeeded. You can now proceed.</p>
)}

{stripeRedirectSuccess === false && (
  <p className="stripe-message error">Payment method setup failed. Please try again.</p>
)}

   {user?.wallet?.cards?.length > 0 ? (
  <><div className="payment-method-options">
  <label
    className={`payment-option ${selectedPaymentMethod === 'card' ? 'selected-option' : ''}`}
   onClick={() => {
  setSelectedPaymentMethod('card');
  setPage(2);
}}
  >
    <input
      type="radio"
      name="payment"
      value="card"
      checked={selectedPaymentMethod === 'card'}
      onChange={() => setSelectedPaymentMethod('card')}
    />
    <div className="primary-card">
      <span className="card-label">Primary Card:</span>
      <span className="card-details">
        {user.wallet.cards.find(card => card.isPrimary)?.brand?.toUpperCase()} ••••{' '}
        {user.wallet.cards.find(card => card.isPrimary)?.last4} — Expires{' '}
        {user.wallet.cards.find(card => card.isPrimary)?.expMonth}/
        {user.wallet.cards.find(card => card.isPrimary)?.expYear}
      </span>
    </div>
  </label>
<label
  className={`payment-option ${selectedPaymentMethod === 'element' ? 'selected-option' : ''}`}
  onClick={() => setSelectedPaymentMethod('element')}
>
  <input
    type="radio"
    name="payment"
    value="element"
    checked={selectedPaymentMethod === 'element'}
    onChange={() => setSelectedPaymentMethod('element')}
  />
  <div className="stripe-element-box">
    <h4>Or use another payment method</h4>
    <div className="stripe-box">
      <PaymentElement
        options={{
          fields: {
            billingDetails: {
              name: 'never',
              email: 'never',
              address: 'never',
            },
          },
        }}
        onFocus={() => setSelectedPaymentMethod('element')} // ✅ ensure focus selects the method
        onClick={() => setSelectedPaymentMethod('element')} // ✅ extra safety for click
      />
    </div>
  </div>
</label>
</div>
</>
  
) : (
<div className="payment-method-options">
  <label
    className={`payment-option ${selectedPaymentMethod === 'card' ? 'selected-option' : ''}`}
    onClick={() => setSelectedPaymentMethod('card')}
  >
    <input
      type="radio"
      name="payment"
      value="card"
      checked={selectedPaymentMethod === 'card'}
      onChange={() => setSelectedPaymentMethod('card')}
    />
    <div className="primary-card">
      <span className="card-label">Primary Card:</span>
      <span className="card-details">
        {user.wallet.cards.find(card => card.isPrimary)?.brand?.toUpperCase()} ••••{' '}
        {user.wallet.cards.find(card => card.isPrimary)?.last4} — Expires{' '}
        {user.wallet.cards.find(card => card.isPrimary)?.expMonth}/
        {user.wallet.cards.find(card => card.isPrimary)?.expYear}
      </span>
    </div>
  </label>
<label
  className={`payment-option ${selectedPaymentMethod === 'element' ? 'selected-option' : ''}`}
  onClick={() => setSelectedPaymentMethod('element')}
>
  <input
    type="radio"
    name="payment"
    value="element"
    checked={selectedPaymentMethod === 'element'}
    onChange={() => setSelectedPaymentMethod('element')}
  />
  <div className="stripe-element-box">
    <h4>Or use another payment method</h4>
    <div className="stripe-box">
      <PaymentElement
        options={{
          fields: {
            billingDetails: {
              name: 'never',
              email: 'never',
              address: 'never',
            },
          },
        }}
        onFocus={() => setSelectedPaymentMethod('element')} // ✅ ensure focus selects the method
        onClick={() => setSelectedPaymentMethod('element')} // ✅ extra safety for click
      />
    </div>
  </div>
</label>
</div>

)}
 {selectedPaymentMethod === 'element' && (
<button
  className="checkout-btn"
  onClick={() =>
    handleStripeSubmit({
      stripe,
      elements,
      user,
      dispatch,
      setPage,
      setStripeCard,
      setCardSubmitting,
     billingData,
      isCard: selectedPaymentMethod === 'card'
    })
  }
  disabled={cardSubmitting}
>
  {cardSubmitting ? <div className="spinner-cart" /> : 'Submit'}
</button>

)} 

  </div>

  </>
) : (
  <>
     <div className="billing-form">
<div className='backArrowIconWrap'>
  <FaArrowLeft
  onClick={() => setPage(1)}
  className="backArrowIcon"
/>
</div>

    <h3 className="billing-title">Billing Information</h3>
  
{stripeRedirectSuccess === true && (
  <p className="stripe-message success">Payment method setup succeeded. You can now proceed.</p>
)}

{stripeRedirectSuccess === false && (
  <p className="stripe-message error">Payment method setup failed. Please try again.</p>
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
    {/* <input
      type="text"
      placeholder="City"
      value={billingData.city}
      onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
    /> */}
<Select
  options={countryOptions}
  value={countryOptions.find((opt) => opt.label === billingData.country)}
  onChange={(selected) => {
    setBillingData((prev) => ({
      ...prev,
      country: selected?.label || ''
    }));
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

{credits.length > 0 && (
  <>
    <div className="final-price-box">
      <p className="subtotal-line">
  <span className='colored'>Subtotal:</span>  {currencySymbol} {credits.reduce((sum, c) => sum + c.amount, 0).toFixed(2)}
</p>

{vatPercent !== null && (
  <p className="vat-total-line">
   Total incl. <span>VAT ({vatPercent}%):</span> {currencySymbol} {finalPrice.toFixed(2)}
  </p>
)}

    </div>
  </>
)}



{vatNote && <p className="vat-note">{vatNote}</p>}

      {!loading && credits.length > 0 && (
<button
  className="checkout-btn"
  onClick={() =>
    handleCheckout({
      user,
      credits,
      billingData,
      currencySymbol,
      selectedPaymentMethod,
      stripeCard,
      router,
      dispatch,
      setCheckoutLoading
    })
  }
  disabled={checkoutLoading || isCheckoutDisabled}
>
  {checkoutLoading ? (
    <div className="spinner-cart" />
  ) : (
    'Checkout'
  )}
</button>

      )}

  </>
)}


      </>
      )}
    </div>
  );
}
