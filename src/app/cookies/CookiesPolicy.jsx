'use client';

import React from 'react';
import './cookies.css';

export default function CookiesPolicy({ section = [] }) {
  // ✅ Decode HTML, convert markdown, and fix React className to HTML class
  const decodeHtml = (str) =>
    str
      ?.replace(/\\u003C/g, '<')
      .replace(/\\u003E/g, '>')
      // handle both single and double quotes for className
      .replace(/className=['"]([^'"]+)['"]/g, 'class="$1"')
      .replace(/&quot;/g, '"')
      // Convert **bold** to <strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert *italic* to <em>
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

  return (
    <div className="cookies-container">
      {/* Logo */}
      <center>
        <div className="image-div-1">
          <img src="/logo.png" alt="Xclusive 3D Logo" className="cookies-logo" />
        </div>
      </center>

      <div className="cookies-content">
        {section.length > 0 ? (
          section.map((item, idx) => (
            <div key={item._id || idx} className="cookies-item">
              {/* First section title as <h1> */}
              {idx === 0 ? (
                <h1
                  className="cookies-title"
                  dangerouslySetInnerHTML={{ __html: decodeHtml(item.title || '') }}
                />
              ) : (
                <h3
                  dangerouslySetInnerHTML={{ __html: decodeHtml(item.title || '') }}
                />
              )}

              {/* Description with HTML + markdown + class fix */}
              {item.description && (
                <p
                  className="cookies-description"
                  dangerouslySetInnerHTML={{ __html: decodeHtml(item.description) }}
                />
              )}

              {/* Sub-description with HTML + markdown + class fix */}
              {item.subDescription && (
                <p
                  className="cookies-subdescription"
                  dangerouslySetInnerHTML={{ __html: decodeHtml(item.subDescription) }}
                />
              )}

              {/* FAQs if present */}
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
          <p>No cookie policy sections found.</p>
        )}
      </div>
    </div>
  );
}
