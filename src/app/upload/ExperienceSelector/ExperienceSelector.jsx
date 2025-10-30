'use client';
import React, { useState } from 'react';
import './ExperienceSelector.css';

export default function ExperienceSelector({ selected, setSelected }) {

  const options = [
    {
      id: 'cinema',
      title: 'Cinema',
      description:
        'Subtle depth for a cinematic experience. Perfect for extended viewing with natural 3D effects like in the cinema.',
    },
    {
      id: 'comfort',
      title: 'Comfort',
      description:
        'Balanced 3D with optimal comfort. Ideal for most users with a perfect mix of depth and eye comfort.',
      recommended: true,
    },
    {
      id: 'aggressive',
      title: 'Aggressive',
      description:
        'Maximum 3D effect for the most intense experience. Spectacular depth effects that truly pop out of the screen.',
    },
  ];

  return (
    <div className="experience-selector">
      <div className="step-header">
        <div className="step-number">2</div>
        <h2 className="step-title">Choose Your 3D Experience</h2>
      </div>

      {options.map((opt) => (
        <div
          key={opt.id}
          className={`experience-option ${
            selected === opt.id ? 'selected' : ''
          }`}
          onClick={() => setSelected(opt.id)}
        >
          <input
            type="radio"
            name="experience"
            checked={selected === opt.id}
            onChange={() => setSelected(opt.id)}
          />
          <div className="option-content">
            <label>
              {opt.title}{' '}
              {opt.recommended && (
                <span className="recommended">(Recommended)</span>
              )}
            </label>
            <p>{opt.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
