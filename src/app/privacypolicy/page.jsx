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
      <h1>Privacy Policy</h1>

      <p>Welcome to <strong>Xclusive3D.com</strong>. This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our platform to convert 2D videos into immersive 3D experiences.</p>

      <p>By accessing or using Xclusive3D.com, you agree to this Privacy Policy.</p>

      <h2>1. Information We Collect</h2>
      <h3>A. Personal Information</h3>
      <ul>
        <li>Your email address (for login, notifications, and support)</li>
        <li>Your IP address (for fraud prevention and currency detection)</li>
        <li>Purchase and payment data (via Stripe, we do not store credit card details)</li>
      </ul>

      <h3>B. Uploaded Content</h3>
      <ul>
        <li>Videos are uploaded to Backblaze B2 cloud storage</li>
        <li>Metadata like resolution, duration, upload time is collected</li>
        <li>Converted 3D videos are stored securely and linked to your account</li>
      </ul>

      <h3>C. Usage Data</h3>
      <ul>
        <li>Pages visited, conversion history, credit usage</li>
        <li>Error logs and status codes</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and maintain the service</li>
        <li>Send notifications like download links</li>
        <li>Manage credit balances and payment history</li>
        <li>Adjust pricing based on geographic location</li>
        <li>Prevent fraud and improve functionality</li>
      </ul>

      <h2>3. Payments and Third-Party Services</h2>
      <p>We use Stripe for secure payments. Stripe’s privacy policy: <a href="https://stripe.com/privacy" target="_blank" rel="noreferrer">https://stripe.com/privacy</a></p>
      <p>We also use services like Backblaze B2, SendGrid/Mailgun, and GeoIP detection tools.</p>

      <h2>4. Data Sharing and Disclosure</h2>
      <p>We do not sell your data. We share data only with necessary providers or if required by law.</p>

      <h2>5. Data Retention</h2>
      <p>Uploads are kept for 30–60 days. Account metadata retained while the account is active or as required by law. You may request data deletion anytime.</p>

      <h2>6. Cookies & Tracking</h2>
      <p>We may use cookies or local storage to remember preferences and improve the experience. You can disable them in your browser.</p>

      <h2>7. Your Rights</h2>
      <p>You have the right to access, update, delete your data, or object to processing. Contact us to exercise these rights.</p>

      <h2>8. Children’s Privacy</h2>
      <p>We do not knowingly collect data from users under 13. If we learn we have, we will delete it.</p>

      <h2>9. Data Security</h2>
      <p>We use HTTPS, access controls, and secure cloud providers. No system is 100% secure, so we advise strong passwords.</p>

      <h2>10. Changes to This Policy</h2>
      <p>We may update this Privacy Policy. Changes will be posted here with a new “Last Updated” date.</p>

    </div>
  );
};

export default PrivacyPolicy;
