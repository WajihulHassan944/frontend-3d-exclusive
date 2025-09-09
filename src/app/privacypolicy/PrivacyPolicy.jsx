'use client';

import React from 'react';
import './privacypolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <div className='image-div'>
        <img
              src="/logo.png"
              alt="Xclusive 3D Logo"
              className="logo-8"
            />
            </div>
      <h1>Privacy Policy – Xclusive3D</h1>
      <p>Last updated: August 7, 2025</p>
      <p>Welcome to <strong>Xclusive3D.com</strong>. This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our platform to convert 2D videos into immersive 3D experiences, in accordance with the General Data Protection Regulation (GDPR) and other applicable privacy laws.</p>

      <p>By accessing or using Xclusive3D.com, you agree to this Privacy Policy.</p>

      <h2>1. Information We Collect</h2>
      <h3>A. Personal Information</h3>
      <ul>
        <li>Your email address (for account access, notifications, and support)</li>
        <li>Your IP address (for fraud prevention, geo-detection, and pricing localization)</li>
        <li>Payment details (processed securely via Stripe — we do not store full credit card information)

</li>
      </ul>

      <h3>B. Uploaded Content</h3>
      <ul>
        <li>Uploaded video files are stored on Cloudflare R2 secure cloud storage</li>
        <li>Metadata such as resolution, duration, file size, and upload timestamps</li>
        <li>Converted 3D output files linked to your account</li>
      </ul>

      <h3>C. Usage Data</h3>
      <ul>
        <li>Pages visited, conversion activity, credit usage</li>
        <li>Error logs, browser type, and status codes</li>
      </ul>

      <h2>2. Legal Basis for Processing</h2>
      <p>We process your personal data based on one or more of the following legal grounds:</p>
      <ul>
        <li>Consent (e.g., when registering or submitting a video)</li>
        <li>Contractual necessity (e.g., to process your payments or deliver conversions)</li>
        <li>Legitimate interest (e.g., fraud prevention and service improvement)</li>
        <li>Legal obligation (e.g., for invoicing and tax compliance)</li>
      </ul>

      <h2>3.  How We Use Your Information</h2>
      <p>We use your data to:</p>
      <ul>
      <li>Provide, maintain, and improve our services</li>
      <li>Process transactions and manage your credit balance</li>
      <li>Send transactional notifications (e.g., download links)</li>
      <li>Detect and prevent fraud or abuse</li>
      <li>Adjust pricing based on region</li>
      <li>Provide customer support</li>
      </ul>
      <h2>4. Payments and Third-Party Services</h2>
      <p>We use Stripe to process payments securely. Stripe’s privacy policy can be found at https://stripe.com/privacy.</p>
      <p>We also integrate with:</p>
      <ul>
        <li>Cloudflare R2 (video and output storage)</li>
        <li>GeoIP providers (currency and tax detection)</li>
      </ul>
      <p>These third parties process data only as necessary to provide their services and under strict confidentiality agreements.</p>
      
      <h2>5. Data Sharing and Disclosure</h2>
      <p>We do not sell, rent, or trade your personal data.</p>
      <p>We may share your information only:</p>
      <ul>
        <li>With service providers under data processing agreements</li>
        <li>To comply with legal obligations or lawful requests</li>
        <li>To protect our rights, users, or platform integrity</li>
      </ul>

      <h2>6. Data Retention</h2>
      <ul>
        <li>Uploaded files are retained for 7-14 days unless deleted earlier by the user</li>
        <li>Account-related data is retained as long as the account is active or required by law</li>
        <li>You may request account or data deletion at any time by contacting us</li>
      </ul>

      <h2>7. Cookies and Tracking Technologies</h2>
      <p>We may use cookies or browser storage to:</p>
      <ul>
        <li>Remember user preferences</li>
        <li>Facilitate login sessions</li>
        <li>Improve site performance and analytics</li>
      </ul>
      <p>You can disable cookies through your browser settings. Some features may not function properly without cookies.</p>
     
      <h2>8. Your Rights (GDPR)</h2>
      <p>As a data subject, you have the right to:</p>
      <ul>
        <li>Access, correct, or delete your personal data</li>
        <li>Withdraw your consent at any time</li>
        <li>Object to processing or request data portability</li>
      </ul>
      <p>To exercise your rights, contact us at privacy@xclusive3d.com</p>
      <h2>9. Children’s Privacy</h2>
      <p>Our services are not intended for children under 18. We do not knowingly collect personal data from children. If we become aware of such collection, we will delete the data immediately.</p>

      <h2>10. Data Security</h2>
      <p>We implement technical and organizational measures such as:</p>
      <ul>
        <li>Encrypted connections (HTTPS)</li>
        <li>Role-based access controls</li>
        <li>Secure cloud infrastructure (e.g., Cloudflair, Stripe)</li>
      </ul>
      <p>While no system is completely secure, we regularly review and improve our safeguards.</p>

      <h2>11. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a new “Last Updated” date. Continued use of our services implies acceptance of the updated terms.</p>
      <p>For any questions or concerns, contact us at  <a href="mailto: info@xclusive3d.com"> info@xclusive3d.com</a></p>
    
    </div>
  );
};

export default PrivacyPolicy;
