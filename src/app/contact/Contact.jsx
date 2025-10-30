'use client';

import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import './contact.css';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/const';
import { LoaderCircle } from 'lucide-react';

const Contact = ({ page }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [captchaToken, setCaptchaToken] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/users/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captcha: captchaToken }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        router.push('/contact-response');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (err) {
      toast.error('Something went wrong.');
    }

    setLoading(false);
  };

  if (!page) {
    return (
      <div className="loading-container">
        <LoaderCircle className="animate-spin" size={22} />
        <p>Loading contact page...</p>
      </div>
    );
  }

  const contactSection = page.sections?.find(s => s.sectionId === "section-1");
  const responseSection = page.sections?.find(s => s.sectionId === "section-2");

  return (
    <div className="contact-container">
     <h2
  className="contact-title"
  dangerouslySetInnerHTML={{
    __html: (contactSection?.title || "<span className='highlight'>Contact</span> Us")
      .replace(/\\u003C/g, "<")   // decode escaped <
      .replace(/\\u003E/g, ">")   // decode escaped >
      .replace(/className=/g, "class="), // fix JSX to HTML
  }}
/>

      <center>
        <p className='contact-subtitle'>{contactSection?.description}</p>
      </center>

      <div className="contact-sec-outer">
        <div className="contact-sec-wrapper">

          {/* Left: Contact Form */}
          <div className="contact-sec-form-box">
            <h2 className="contact-sec-heading">Send us a <span className='highlight'>message</span></h2>
            <form onSubmit={handleSubmit} className="contact-sec-form">
              <div className="contact-sec-input-row">
                <div className="contact-sec-input-group">
                  <label>Name *</label>
                  <input type="text" name="name" placeholder="Your name"
                    value={formData.name} onChange={handleChange} required />
                </div>
                <div className="contact-sec-input-group">
                  <label>Email *</label>
                  <input type="email" name="email" placeholder="your.email@example.com"
                    value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="contact-sec-input-group">
                <label>Subject *</label>
                <input type="text" name="subject" placeholder="What's this about?"
                  value={formData.subject} onChange={handleChange} required />
              </div>

              <div className="contact-sec-input-group">
                <label>Message *</label>
                <textarea name="message"
                  placeholder="Tell us more about how we can help you…"
                  value={formData.message} onChange={handleChange} required />
              </div>

              <ReCAPTCHA
                sitekey="6LeP9LIrAAAAALThS9pOb4I_aLiSA-3n1kNTzL09"
                onChange={(token) => setCaptchaToken(token)}
              />

              <button type="submit" className="contact-sec-send-btn" disabled={loading}>
                {loading ? <div className="spinner white"></div> : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right: Response Time Section */}
          <div className="contact-sec-info-wrapper">
            <div className="contact-sec-response-box">
              <h2 className="contact-sec-response-title">{responseSection?.title}</h2>
              <p className="contact-sec-response-text">{responseSection?.description}</p>
              <p className="contact-sec-response-hours">{responseSection?.subDescription}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
