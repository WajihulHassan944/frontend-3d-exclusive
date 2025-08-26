'use client';
import React, { useEffect, useState } from 'react';
import { fetchCart } from '@/utils/cart/fetchCart';
import { handleDelete } from '@/utils/cart/handleDelete';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Select from 'react-select';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { FaArrowLeft } from 'react-icons/fa';
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
import { handleBuyCredits } from '@/utils/cart/handleBuyCredits';
import ShoppingCart from './cart';
import { handleCheckout } from '@/utils/cart/handleCheckout';

const stripePromise = loadStripe(
  'pk_test_51RvNstHpow7HoYZUY8RVBmICJzKPjKo4syjNfAi0l8VKntIqABVgpemRKlkjthFOmN4gfAqLAJPKlGoSZD0N6vt000DBZMHq3k'
);
export default function CartPage() {

const currency = useCurrencyByUserCountry(); // ✅ get currency
const currencySymbol = currency.symbol;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
    const [clientSecret, setClientSecret] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
const [loadingPaymentIntent, setLoadingPaymentIntent] = useState(false);
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


const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); 
const [cardSubmitting, setCardSubmitting] = useState(false);
const [page, setPage] = useState(1);
const [stripeRedirectSuccess, setStripeRedirectSuccess] = useState(null);

const searchParams = useSearchParams();



useEffect(() => {
  const redirectStatus = searchParams.get('redirect_status');

  if (redirectStatus === 'succeeded') {
    setStripeRedirectSuccess(true);
    setPage(3);
  } else if (redirectStatus === 'failed') {
    setStripeRedirectSuccess(false);
    toast.error('Payment method setup failed.');
  }

}, [searchParams]);





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
  useEffect(() => {
        if (!currency?.code || !currency?.symbol) {
      // ⚡ Don't fetch until currency is loaded
      return;
    }
    const pendingCredits = localStorage.getItem('pendingCredits');

    if (pendingCredits) {
      localStorage.removeItem('pendingCredits');
      handleBuyCredits(
        pendingCredits,
        dispatch,
        fetchCart,
        setLoading,
        setCredits,
        currency // ✅ use it here
      );
    } else {
      fetchCart(setCredits, setLoading, currency); // ✅ use it here
    }
  }, [currency]);
const fetchClientSecret = async () => {
  try {
    setLoadingPaymentIntent(true); // start spinner

    // 🌍 Detect country on frontend
    const geoRes = await fetch(`https://ipwho.is/`);
    const geoData = await geoRes.json();
    const userCountry = geoData?.country_code || 'NL';

    const res = await fetch(`${baseUrl}/wallet/create-payment-intent-all-methods`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        amount: finalPrice,
        countryCode: userCountry, // send detected country
        currencyCode:currency.code,
      }),
    });

    const data = await res.json();
    if (data?.clientSecret) {
      setClientSecret(data.clientSecret);
      setPaymentMethods(data.paymentMethods || []);
    }
  } catch (error) {
    console.error('❌ Error fetching client secret:', error);
  } finally {
    setLoadingPaymentIntent(false); // stop spinner
  }
};


 useEffect(() => {
      if (page === 2 && finalPrice > 0) {
        fetchClientSecret();
      }
  }, [page, finalPrice]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
    // ✅ Hide name, email, and address fields
    fields: {
      billingDetails: {
        name: 'never',
        email: 'never',
        address: 'never',
      },
    },
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
  onClick={() => {
    // Save billing data to local storage
    localStorage.setItem('billingData', JSON.stringify(billingData));

    setPage(2);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }}
  disabled={!isBillingComplete}
>
  Proceed to checkout
</button>


      )}

  </>
)  : page === 2 ? (
   <>
    {loadingPaymentIntent ? (
      <div className="spinner-cart" /> 
    ) : clientSecret && isBillingComplete ? (
      <Elements stripe={stripePromise} options={options}>
        <ShoppingCart
          availableMethods={paymentMethods}
          billingData={billingData}
          setPage={setPage}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
      </Elements>
    ) : null}
  </>

) : page === 3 ? (
 <div className="billing-form">
 {stripeRedirectSuccess === false && (
  <div className='backArrowIconWrap'>
    <FaArrowLeft
    onClick={() => setPage(1)}
    className="backArrowIcon"
  />
  </div>
 )}
  <h3 className="billing-title">Payment</h3>
  
{selectedPaymentMethod === "card" && (
  <p className="stripe-message success">Payment method primary card selected. You can now confirm.</p>
)}
{stripeRedirectSuccess === true && (
  <p className="stripe-message success">Payment method setup succeeded. You can now confirm.</p>
)}

{stripeRedirectSuccess === false && (
  <p className="stripe-message error">Payment method setup failed. Please try again.</p>
)}

{!loading && (
<button
  className="checkout-btn"
  onClick={() =>
    handleCheckout({
      user,
      credits,
      billingData,
      currencySymbol,
      selectedPaymentMethod,
      router,
      dispatch,
      setCheckoutLoading
    })
  }
  disabled={stripeRedirectSuccess === false}
>
  {checkoutLoading ? (
    <div className="spinner-cart" />
  ) : (
    'Proceed'
  )}
</button>
   )}

 </div>

) : null}


      </>
      )}
    </div>
  );
}
