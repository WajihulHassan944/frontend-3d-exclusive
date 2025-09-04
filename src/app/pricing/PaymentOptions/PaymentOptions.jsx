import React from "react";
import "./PaymentOptions.css";

const PaymentOptions = () => {
  return (
    <div className="payment-options-container">
      <h1 className="payment-options-title">
        Secure payments powered by Stripe
      </h1>
      <div className="payment-logos">
        <img src="/logos/visa.svg" alt="Visa" />
        <img src="/logos/mastercard.svg" alt="Mastercard" />
        <img src="/logos/amex.svg" alt="American Express" />
        <img src="/logos/apple_pay.svg" alt="Apple Pay" />
        <img src="/logos/bancontact.svg" alt="Ban Contact" />
        <img src="/logos/paypal.svg" alt="PayPal" />
        <img src="/logos/google_pay.svg" alt="Google Pay" />
      </div>
    </div>
  );
};

export default PaymentOptions;
