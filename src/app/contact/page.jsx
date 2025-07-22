'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import './contact.css';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch(`${baseUrl}/users/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Message sent successfully!');
             toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg('Failed to send message. Please try again.');
             toast.error('Failed to send message. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Something went wrong.');
           toast.error('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="contact-container">
     
      <h2 className="contact-title">Contact</h2>
      <div className="contact-wrapper">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="send-btn" disabled={loading}>
            {loading ? <div className="spinner white"></div> : 'Send'}
          </button>

          {successMsg && <p className="success-msg">{successMsg}</p>}
          {errorMsg && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
