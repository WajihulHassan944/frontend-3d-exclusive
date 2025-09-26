'use client';

import { useState } from 'react';
import './faq.css';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import Link from 'next/link';


export default function FaqClient({faqs}) {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };


  return (
    <>
      <section className="faq-section">
        <div className="faq-header">
          <h1 className="faq-title">Frequently Asked <span className='highlight'>Questions</span></h1>
         <center> <p className="faq-subtitle">
            Find answers to common questions about our 3D video conversion service
          </p></center>
        </div>

        <ul className="faq-list">
          {faqs.map(({ q, a }, idx) => (
            <li key={idx} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggle(idx)}
                aria-expanded={openIdx === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span>{q}</span>
                {openIdx === idx ? (
                  <FiChevronUp className="chevron-icon" />
                ) : (
                  <FiChevronDown className="chevron-icon" />
                )}
              </button>
              <div
                id={`faq-answer-${idx}`}
                className={`faq-answer ${openIdx === idx ? 'show' : ''}`}
                role="region"
                aria-hidden={openIdx !== idx}
              >
                {a.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>

        {/* Contact Section Below FAQ */}
        <div className="faq-contact-section">
          <h2 className="faq-contact-title">Still have questions?</h2>
          <p className="faq-contact-subtitle">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <Link href="/contact" className="faq-contact-btn">
            Contact Us for Support
          </Link>
        </div>
      </section>
    </>
  );
}
