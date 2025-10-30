'use client';
import React, { useState } from 'react';
import './NewsletterSignup.css';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';

const NewsletterSignup = ({ sectionData }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/users/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        toast.error(data.message || 'Subscription failed.');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!sectionData) return null;

  return (
    <div className="newsletter-section">
      {/* ✅ Dynamic Title */}
      <h2
        className="newsletter-heading"
        dangerouslySetInnerHTML={{
          __html: sectionData.title
            ?.replace(/\\u003C/g, "<")
            .replace(/\\u003E/g, ">")
            .replace(/className=/g, "class="),
        }}
      />

      {/* ✅ Dynamic Description */}
      {sectionData.description && (
        <p className="newsletter-subheading">{sectionData.description}</p>
      )}

      {/* ✅ Form (same logic as before) */}
      <div className="newsletter-form-container">
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address..."
            className="newsletter-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="newsletter-button"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Unlock 3D tips & Xclusive offers'}
          </button>
        </form>

        {/* ✅ Dynamic subDescription */}
        {sectionData.subDescription && (
          <p className="newsletter-note">{sectionData.subDescription}</p>
        )}
      </div>
    </div>
  );
};

export default NewsletterSignup;
