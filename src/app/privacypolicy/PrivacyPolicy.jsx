'use client';

import React from 'react';
import './privacypolicy.css';

export default function PrivacyPolicy({ section = [] }) {
  // ✅ Helper to decode escaped HTML safely
  const decodeHtml = (str) =>
    str
      ?.replace(/\\u003C/g, '<')
      .replace(/\\u003E/g, '>')
      .replace(/className=/g, 'class')
      .replace(/&quot;/g, '"');

  return (
    <div className="privacy-container">
      {/* ✅ Centered Logo */}
      <div className="image-div-1" style={{ textAlign: 'center' }}>
        <img src="/logo.png" alt="Xclusive 3D Logo" className="logo-8" />
      </div>

      {/* ✅ Dynamic Sections */}
      <div className="privacy-grid">
        {section.length > 0 ? (
          section.map((item, idx) => (
            <div key={item._id || idx} className="privacy-item">
              {/* ✅ First section uses <h1>, rest use <h3> */}
              {idx === 0 ? (
                <h1
                  className="privacy-title"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(item.title || ''),
                  }}
                />
              ) : (
                <h2
                  dangerouslySetInnerHTML={{
                    __html: decodeHtml(item.title || ''),
                  }}
                />
              )}

              {/* ✅ Description — preserve line breaks */}
              {item.description?.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}

              {/* ✅ Optional sub-description */}
              {item.subDescription && <p>{item.subDescription}</p>}

              {/* ✅ FAQs if present */}
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
          <p>No privacy policy sections found.</p>
        )}
      </div>
    </div>
  );
}
