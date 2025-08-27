'use client';

import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import './contact.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
const [captchaToken, setCaptchaToken] = useState("");
const router = useRouter();
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

  if (!captchaToken) {
  toast.error("Please complete the CAPTCHA.");
  setLoading(false);
  return;
}

try {
  const res = await fetch(`${baseUrl}/users/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formData, captcha: captchaToken }), // send token
   });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Message sent successfully!');
             toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        router.push('/contact-response');
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
     
      <h2 className="contact-title">Contact Us</h2>
     <center> <p className='contact-subtitle'>Have questions about our 3D video conversion service? We're here to help!</p></center>
      


  <div className="contact-sec-outer">
    <div className="contact-sec-wrapper">
      
      {/* Left: Contact Form */}
      <div className="contact-sec-form-box">
        <h2 className="contact-sec-heading">Send us a message</h2>
        <form onSubmit={handleSubmit} className="contact-sec-form">
          <div className="contact-sec-input-row">
            <div className="contact-sec-input-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-sec-input-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="contact-sec-input-group">
            <label>Subject *</label>
            <input
              type="text"
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-sec-input-group">
            <label>Message *</label>
            <textarea
              name="message"
              placeholder="Tell us more about how we can help you…"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
<ReCAPTCHA
  sitekey="6LeP9LIrAAAAALThS9pOb4I_aLiSA-3n1kNTzL09" // replace with real key
  onChange={(token) => setCaptchaToken(token)}
/>
          <button type="submit" className="contact-sec-send-btn" disabled={loading}>
            {loading ? <div className="spinner white"></div> : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Right: Contact Info and Response Time */}
      <div className="contact-sec-info-wrapper">
       

        {/* Response Time */}
        <div className="contact-sec-response-box">
          <h2 className="contact-sec-response-title">Response Time</h2>
          <p className="contact-sec-response-text">
            We typically respond to all inquiries within 24 hours during business days.
          </p>
          <p className="contact-sec-response-hours">
            Business hours: Monday - Friday, 9:00 AM - 6:00 PM CEST
          </p>
        </div>
      </div>
    </div>
  </div>

      






    </div>
  );
};

export default ContactForm;
