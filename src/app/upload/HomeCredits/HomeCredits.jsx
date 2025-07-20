import React from 'react';
import './HomeCredits.css';

const HomeCredits = () => {
  return (
    <div className="credits-container">
      <div className="credit-usage">
        <h2>Credit Usage</h2>
        <div className="usage-list">
          <div className="usage-item">
            <span>1 minute 1080p</span>
            <span className="credit-count">1 credit</span>
          </div>
          <div className="usage-item">
            <span>1 minute 2.7K</span>
            <span className="credit-count">2 credits</span>
          </div>
          <div className="usage-item">
            <span>1 minute 4K</span>
            <span className="credit-count">3 credits</span>
          </div>
        </div>
      </div>

      <div className="credit-cards">
        <div className="credit-card">
          <h3>10 Credits</h3>
          <p className="price">€9</p>
          <p className="per-credit">€0.90 per credit</p>
        </div>

        <div className="credit-card popular">
          <span className="popular-badge">Most Popular</span>
          <h3>50 Credits</h3>
          <p className="price">€39</p>
          <p className="per-credit">€0.78 per credit</p>
        </div>

        <div className="credit-card">
          <h3>100 Credits</h3>
          <p className="price">€69</p>
          <p className="per-credit">€0.69 per credit</p>
        </div>
      </div>
    </div>
  );
};

export default HomeCredits;
