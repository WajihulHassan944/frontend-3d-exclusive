'use client';

import React from 'react';
import './StepEnterEmail.css';
import { Mail, Sparkles } from 'lucide-react';
import { FiCheck } from 'react-icons/fi';

const StepEnterEmail = ({
  email,
  agreed,
  onEmailChange,
  onAgreeChange,
  onNext,
}) => {
  const isDisabled = !email || !agreed;

  return (
    <div className="ste-wrapper">

      {/* Info box */}
      <div className="ste-info">
        <div className="ste-info-icon">
          <Mail size={18} />
        </div>
        <div>
          <h4>Why do we need your email?</h4>
          <p>
            Your converted 3D video will be sent to this email address.
            Without a valid email, you won't receive your free conversion!
          </p>
        </div>
      </div>

      {/* Email input */}
      <div className="ste-field">
        <label>Your email address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <span className="ste-hint">
          Your converted video will be sent to this address
        </span>
      </div>

      {/* Terms checkbox */}
      <label className="ste-tos-wrap">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => onAgreeChange(e.target.checked)}
          className="ste-tos-native"
        />

        <span className={`ste-tos-box ${agreed ? 'checked' : ''}`}>
          <FiCheck size={14} />
        </span>

        <span className="ste-tos-text">
          I agree to the <a href="#">Terms of Service</a> and confirm that I have
          entered a valid email address to receive my converted video.
        </span>
      </label>

      {/* Button */}
      <button
        className="ste-btn"
        disabled={isDisabled}
        onClick={onNext}
      >
        <Sparkles size={18} />
        Start Free Trial
      </button>

    </div>
  );
};

export default StepEnterEmail;
