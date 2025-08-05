import React, { useState } from 'react';
import './NewsletterSignup.css';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';

const NewsletterSignup = () => {
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

  return (
    <div className="newsletter-section">
      <h2 className="newsletter-heading">Stay up to date</h2>
      <p className="newsletter-subheading">
        Get the latest updates about 3D video technology and exclusive offers
      </p>

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
            {loading ? 'Submitting...' : 'Keep me up to date'}
          </button>
        </form>
        <p className="newsletter-note">
          We respect your privacy. You can unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
