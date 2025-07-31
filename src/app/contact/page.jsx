'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import './contact.css';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
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

          <button type="submit" className="contact-sec-send-btn" disabled={loading}>
            {loading ? <div className="spinner white"></div> : 'Send Message'}
          </button>
        </form>
      </div>

      {/* Right: Contact Info and Response Time */}
      <div className="contact-sec-info-wrapper">
        <div className="contact-sec-info-grid">
          
          {/* Info Card 1 */}
          <div className="contact-sec-info-box">
          <h2 className="contact-sec-heading">Get in touch</h2>
        
            <div className="contact-sec-info-item">
              <div className="contact-sec-info-icon">
                <FaEnvelope />
              </div>
              <div>
                <strong>Email</strong>
                <p>support@xclusive3d.com</p>
              </div>
            </div>
            <div className="contact-sec-info-item">
              <div className="contact-sec-info-icon">
                <FaPhoneAlt />
              </div>
              <div>
                <strong>Phone</strong>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
             <div className="contact-sec-info-item">
              <div className="contact-sec-info-icon">
                <FaMapMarkerAlt />
              </div>
              <div>
               <strong>Office</strong>
                <p>San Francisco, CA<br />United States</p>
              </div>
            </div>
          </div>

        
        </div>

        {/* Response Time */}
        <div className="contact-sec-response-box">
          <h2 className="contact-sec-response-title">Response Time</h2>
          <p className="contact-sec-response-text">
            We typically respond to all inquiries within 24 hours during business days.
          </p>
          <p className="contact-sec-response-hours">
            Business hours: Monday - Friday, 9:00 AM - 6:00 PM PST
          </p>
        </div>
      </div>
    </div>
  </div>

      






    </div>
  );
};

export default ContactForm;
