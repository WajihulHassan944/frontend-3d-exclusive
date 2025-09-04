'use client';

import React from 'react';
import './termsandconditions.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-wrapper">
      <div className="image-div-1">
        <img
          src="/logo.png"
          alt="Xclusive 3D Logo"
          className="logo-7"
        />
      </div>

      <h1 className="terms-title">Terms of Service v2.0 – Xclusive3D</h1>

      <div className="terms-grid">

        <div className="term-item">
          <h3>1. Consent</h3>
          <p>
            By using our website or services, you agree to these Terms of Service,
            as well as our Privacy Policy and Cookie Policy. If you do not agree,
            please do not use our services.
          </p>
        </div>

        <div className="term-item">
          <h3>2. Eligibility</h3>
          <p>
            You must be at least 18 years old to use Xclusive3D. By accepting these
            Terms, you confirm that you are legally competent and authorized to enter
            into this agreement.
          </p>
        </div>

        <div className="term-item">
          <h3>3. Commercial Use</h3>
          <p>
            Videos processed through Xclusive3D may be used for both personal and
            commercial purposes. Xclusive3D does not claim any rights over the final output.
            However, you are solely responsible for ensuring that you have the necessary rights,
            including copyrights, to upload and process the video files via our platform.
            For more details on your responsibilities and the consequences of copyright
            infringement, see Article 10 (Upload of Content & Copyright).
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
            Any feedback you provide may be used by Xclusive3D on a royalty-free,
            worldwide, and perpetual basis, without any obligation or compensation to you.
          </p>
        </div>

        <div className="term-item">
          <h3>6. Acceptable Use</h3>
          <p>
            You are considered to use Xclusive3D under acceptable use and your
            content may be freely used by us.
          </p>
        </div>

        <div className="term-item">
          <h3>7. Credits</h3>
          <ul>
            <li><strong>Definition:</strong> Credits are digital units purchased by you to access and use Xclusive3D services. Credits have no monetary value and cannot be exchanged for money or other forms of compensation.</li>
            <li><strong>Validity:</strong> Credits are valid for 12 months from the date of purchase. After this period, unused credits automatically expire.</li>
            <li><strong>No Refunds:</strong> Unused or expired credits are non-refundable under any circumstances, including but not limited to account termination, service discontinuation, or failure to use the credits within the validity period.</li>
            <li><strong>Changes:</strong> Xclusive3D reserves the right to adjust the pricing of credits or the number of credits required per service. These changes do not affect previously purchased credits but may impact their future use.</li>
            <li><strong>Risks:</strong> The use of credits is at your own risk. Xclusive3D is not liable for expired credits, price adjustments, or changes in the availability or functionality of credit-based services.</li>
          </ul>
        </div>

        <div className="term-item">
          <h3>8. Liability and Indemnification</h3>
          <p>
            You agree to indemnify and hold harmless Xclusive3D from any claims,
            damages, or legal fees arising from your use of the service or content you upload.
          </p>
        </div>

        <div className="term-item">
          <h3>9. Changes to the Terms</h3>
          <p>
            We reserve the right to modify these Terms at any time. The updated
            version will take effect upon publication. Continued use of our services
            constitutes your acceptance of the revised Terms.
          </p>
        </div>

        <div className="term-item">
          <h3>10. Upload of Content & Copyright</h3>
          <h4>10.1 User Responsibility</h4>
          <p>
            You guarantee that you own all rights or hold valid licenses and permissions
            to upload and process any content via Xclusive3D. Uploading copyrighted
            material without authorization is strictly prohibited.
          </p>
          <h4>10.2 Prevention and Handling</h4>
          <p>
            Xclusive3D reserves the right to review, block, or suspend processing of
            content that is suspected of copyright infringement. We may also request
            additional proof of rights from the user.
          </p>
          <h4>10.3 Consequences of Violation</h4>
          <p>
            In the event of copyright infringement, Xclusive3D may suspend or
            terminate your account, refuse processing results, or remove related content.
          </p>
          <h4>10.4 Review and Objection</h4>
          <p>
            Users may request a review of a block or removal if they can provide
            sufficient evidence that they hold the necessary rights to the content.
          </p>
        </div>

        <div className="term-item">
          <h3>11. Storage and Retention</h3>
          <p>
            Processed videos and uploaded files are stored on our servers for a
            maximum of 7 calendar days after completion of processing. After this
            period, the files will be automatically deleted and cannot be recovered.
            Xclusive3D is not responsible for any loss of files due to expiration of this
            storage period. It is the sole responsibility of the user to download and
            back up their files within the given timeframe.
          </p>
        </div>

        <div className="term-item">
          <h3>12. Governing Law and Jurisdiction</h3>
          <p>
            These Terms are governed by and construed in accordance with the laws
            of the Netherlands. Any disputes shall be submitted to the competent
            court in Amsterdam.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
