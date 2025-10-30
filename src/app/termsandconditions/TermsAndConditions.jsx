'use client';

import React from 'react';
import './termsandconditions.css';

export default function TermsAndConditions({ section = [] }) {
  return (
    <div className="terms-wrapper">
      {/* Logo */}
      <div className="image-div-1">
        <img src="/logo.png" alt="Xclusive 3D Logo" className="logo-7" />
      </div>

      {/* Title */}
      <h1 className="terms-title">Terms of Service v2.0 – Xclusive3D</h1>

      <div className="terms-grid">
        {section.length > 0 ? (
          section.map((item) => (
            <div key={item._id} className="term-item">
              {/* Title (with possible HTML tags like <span class='highlight'>) */}
              <h3
                dangerouslySetInnerHTML={{
                  __html: (item.title || '').replace(/\\u003C/g, '<').replace(/\\u003E/g, '>'),
                }}
              />

              {/* Description — preserve line breaks */}
              {item.description?.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}

              {/* Sub-description if exists */}
              {item.subDescription && <p>{item.subDescription}</p>}

              {/* FAQs under a section (if any) */}
              {item.faqs?.length > 0 && (
                <ul className="faq-list">
                  {item.faqs.map((faq, i) => (
                    <li key={i}>
                      <strong>{faq.q}</strong>
                      <p>{faq.a}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>No terms found.</p>
        )}
      </div>
    </div>
  );
}
