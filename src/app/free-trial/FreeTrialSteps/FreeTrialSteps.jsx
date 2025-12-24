'use client';

import React, { useState } from 'react';
import './FreeTrialSteps.css';
import StepEnterEmail from './StepEnterEmail/StepEnterEmail';
import StepGetResult from './StepGetResult/StepGetResult';
import StepUploadVideo from './StepUploadVideo/StepUploadVideo';
import toast from 'react-hot-toast';

const FreeTrialSteps = () => {
  const [activeStep, setActiveStep] = useState(1);
const [discountCode, setDiscountCode] = useState("");

  // 🔹 lifted states
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <section className="fts-wrapper">
      <div className="fts-card">

        {/* Steps Header */}
        <div className="fts-steps">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`fts-step ${step <= activeStep ? 'active' : ''}`}
              >
                <span className="fts-step-circle">{step}</span>
                <span className="fts-step-label">
                  {step === 1 && 'Enter Email'}
                  {step === 2 && 'Upload Video'}
                  {step === 3 && 'Get Result'}
                </span>
              </div>
              {step !== 3 && <span className="fts-arrow">→</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Step Content */}
        <div className="fts-content">
          {activeStep === 1 && (
            <StepEnterEmail
              email={email}
              agreed={agreed}
              onEmailChange={setEmail}
              onAgreeChange={setAgreed}
              onNext={() => setActiveStep(2)}
            />
          )}

       {activeStep === 2 && (
  <StepUploadVideo
    email={email}
    onFreeTrialSuccess={(data) => {
      setDiscountCode(data.discountCode); // ✅ store coupon
      setActiveStep(3);
    }}
    onFreeTrialAlreadyUsed={() => {
      toast.error("Free trial already used. Please continue with full signup.");
      setActiveStep(1);
    }}
  />
)}



        {activeStep === 3 && <StepGetResult discountCode={discountCode} />}

        </div>

      </div>
    </section>
  );
};

export default FreeTrialSteps;
