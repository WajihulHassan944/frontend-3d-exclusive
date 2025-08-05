'use client';

import React, { useState, useEffect } from 'react';
import { baseUrl } from '@/const';
import { useSelector } from 'react-redux';
import "./NewsletterToggle.css";

const NewsletterToggle = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.newsletterOptIn !== undefined) {
      setIsSubscribed(user.newsletterOptIn);
    }
  }, [user]);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/users/toggle-newsletter`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setIsSubscribed(data.newsletterOptIn);
      } else {
        alert('Failed to update preference');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating preference');
    }
    setLoading(false);
  };

  return (
  <div className="newsletter-toggle">
  <label className="toggle-label">
    <span className="toggle-text">Newsletter Subscription</span>
    <div className="toggle-control">
      <div
        className={`toggle-switch ${isSubscribed ? 'active' : ''}`}
        onClick={handleToggle}
      >
        <div className="toggle-thumb" />
      </div>
      {loading && <div className="toggle-spinner" />}
    </div>
  </label>
</div>

  );
};

export default NewsletterToggle;
