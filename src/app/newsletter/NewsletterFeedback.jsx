'use client';

import React from 'react';
import './NewsletterFeedback.css';
import { useSearchParams } from 'next/navigation';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const NewsletterFeedback = () => {
  const searchParams = useSearchParams();
  const unsubscribed = searchParams.get('unsubscribed');

  const isSuccess = unsubscribed === 'success';
  const isFailure = unsubscribed === 'fail';

  return (
    <div className="feedback-wrapper">
      {isSuccess && (
        <div className="feedback-box success">
          <FaCheckCircle className="feedback-icon" />
          <h2 className="feedback-title">Unsubscribed Successfully</h2>
          <p className="feedback-message">
            You've been removed from our newsletter list. We're sad to see you go!
          </p>
        </div>
      )}

      {isFailure && (
        <div className="feedback-box error">
          <FaTimesCircle className="feedback-icon" />
          <h2 className="feedback-title">Unsubscribe Failed</h2>
          <p className="feedback-message">
            Something went wrong while unsubscribing. Please try again later or contact support.
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsletterFeedback;
