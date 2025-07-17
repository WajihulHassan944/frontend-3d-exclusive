'use client';

import React from 'react';
import Image from 'next/image';
import './contact.css';

const ContactForm = () => {
  return (
    <div className="contact-container">
      <Image
        src="/logo.png"
        alt="Xclusive 3D Logo"
        width={140}
        height={90}
        className="logo-6"
      />
      <h2 className="contact-title">Contact</h2>
      <div className="contact-wrapper">
        <form className="contact-form">
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="First name" required />
          <input type="text" placeholder="Last name" required />
          <textarea placeholder="How can we help you?" rows="4" required></textarea>
          <button type="submit" className="send-btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
