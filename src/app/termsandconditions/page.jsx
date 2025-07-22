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
            By using our website or services, you agree to these Terms of Service, as well as our Privacy Policy and Cookie Policy. If you do not agree, we kindly ask you not to use our services.
          </p>
        </div>

        <div className="term-item">
          <h3>2. Eligibility</h3>
          <p>
            You must be at least 19 years old to use Xclusive-3D. By agreeing to these Terms, you confirm that you are legally competent and authorized to enter into this agreement.
          </p>
        </div>

        <div className="term-item">
          <h3>3. Commercial Use</h3>
          <p>
            The videos you generate via Xclusive 3D may be used for both personal and commercial purposes. Xclusive 3D does not retain any rights to the final result of the content you process.
          </p>
          <p>
            However, it is solely your responsibility to ensure that you possess all necessary rights, including copyright, for uploading and processing the video files through our services.
          </p>
          <p>
            Xclusive-3D accepts no liability for any infringement of third-party intellectual property rights resulting from the content you upload or process.
          </p>
          <p>
            By using our services, you declare that you are the rightful owner of the submitted material or that you have obtained explicit authorization for its use.
          </p>
        </div>

        <div className="term-item">
          <h3>4. Prohibited Content</h3>
          <p>You are not allowed to upload or process content that:</p>
          <ul>
            <li>Violates the law</li>
            <li>Contains violence, hate speech, racism, child abuse, or illegal activity</li>
            <li>Infringes on copyrights or privacy</li>
            <li>Is harmful, contains spam, or spreads viruses</li>
          </ul>
        </div>

        <div className="term-item">
          <h3>5. Feedback</h3>
          <p>
            Any feedback you provide to Xclusive3D may be freely used by us.
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
            You agree to indemnify Xclusive3D and may be freely used by Xclusive-3D.
          </p>
        </div>

        <div className="term-item">
          <h3>8. Changes to the Terms</h3>
          <p>
            We may update these Terms at any time. The revised version will apply as of publication. Continued use of our services after changes means you accept the updated Terms.
          </p>
        </div>

        <div className="term-item">
          <h3>9. Governing Law and Jurisdiction</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the applicable region.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
