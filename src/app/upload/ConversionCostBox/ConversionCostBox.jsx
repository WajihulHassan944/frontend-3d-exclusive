'use client';
import React from 'react';
import './ConversionCostBox.css';

export default function ConversionCostBox({credits}) {
  return (
    <div className="conversion-cost-box">
      <div className="cost-info">
        <h4>Conversion Cost</h4>
        <p>Based on your selected options</p>
      </div>
<div className="cost-value">
  <span className="credits">{credits}</span>
  <span className="label">{credits === 1 ? "credit" : "credits"}</span>
</div>

    </div>
  );
}
