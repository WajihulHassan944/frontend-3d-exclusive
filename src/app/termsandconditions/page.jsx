'use client';

import React from 'react';
import './termsandconditions.css';
import Image from 'next/image';

const TermsAndConditions = () => {
  return (
    <div className="terms-wrapper">
       <div className='image-div-1'>
              <img
                    src="/logo.png"
                    alt="Xclusive 3D Logo"
                   
                    className="logo-7"
                  />
                  </div>
      <h1 className="terms-title">Terms & Conditions</h1>

      <div className="terms-grid">
        <div className="term-item">
          <h3>1. Consent</h3>
          <p>
            By using our website or services, you agree to these Terms of Service, as well as our Privacy Policy and Cookie Policy. If you do not agree, please do not use our services.
          </p>
        </div>

        <div className="term-item">
          <h3>2. Eligibility</h3>
          <p>
            You must be at least 18 years old to use Xclusive3D. By accepting these Terms, you confirm that you are legally competent and authorized to enter into this agreement.
          </p>
        </div>

        <div className="term-item">
          <h3>3. Commercial Use</h3>
          <p>
            Videos processed through Xclusive3D may be used for both personal and commercial purposes. Xclusive3D does not claim any rights over the final output.However, you are solely responsible for ensuring that you have the necessary rights, including copyrights, to upload and process the video files via our platform.Xclusive3D accepts no liability for any infringement of intellectual property rights as a result of your uploaded content. By using our services, you confirm that you own the content or have obtained explicit permission from the rights holder.
          </p>
    
        </div>

        <div className="term-item">
          <h3>4. Prohibited Content</h3>
          <p>You may not upload or process content that:</p>
          <ul>
            <li>Violates any law or regulation</li>
            <li>Contains violence, hate speech, racism, child abuse, or promotes illegal activity</li>
            <li>Infringes on copyrights, trademarks, or personal privacy</li>
            <li>Contains spam, harmful software, or viruses</li>
          </ul>
        </div>

        <div className="term-item">
          <h3>5. Feedback</h3>
          <p>
           Any feedback you provide may be used by Xclusive3D on a royalty-free, worldwide, and perpetual basis, without any obligation or compensation to you.
          </p>
        </div>

        <div className="term-item">
          <h3>6. Acceptable Use</h3>
          <p>
            You are considered to use Xclusive3D under acceptable use and your content may be freely used by us.
          </p>
        </div>

        <div className="term-item">
          <h3>7. Liability and Indemnification</h3>
          <p>
            You agree to indemnify and hold harmless Xclusive3D from any claims, damages, or legal fees arising from your use of the service or content you upload.
          </p>
        </div>

        <div className="term-item">
          <h3>8. Changes to the Terms</h3>
          <p>
            We reserve the right to modify these Terms at any time. The updated version will take effect upon publication. Continued use of our services constitutes your acceptance of the revised Terms.
          </p>
        </div>

        <div className="term-item">
          <h3>9. Governing Law and Jurisdiction</h3>
          <p>
            These Terms are governed by and construed in accordance with the laws of the Netherlands. Any disputes shall be submitted to the competent court in Amsterdam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
