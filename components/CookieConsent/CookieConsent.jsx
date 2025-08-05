'use client';

import React, { useEffect, useState } from 'react';
import "./CookieConsent.css";
const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (accepted) => {
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <p className="cookie-message">We use cookies to improve your experience. Do you accept?</p>
      <div className="cookie-actions">
        <button className="cookie-btn accept" onClick={() => handleConsent(true)}>Accept</button>
        <button className="cookie-btn reject" onClick={() => handleConsent(false)}>Reject</button>
      </div>
    </div>
  );
};

export default CookieConsent;
