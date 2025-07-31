import React from 'react';
import './HomeCredits.css';
import Link from 'next/link';
import { FaUpload, FaClock, FaDesktop } from 'react-icons/fa';

const HomeCredits = () => {
  return (
    <div className="credits-container">
      <div className="credit-usage">
        <h2>Credit Usage</h2>
        <div className="usage-list">
          <div className="usage-item">
            <span>1080p</span>
            <span className="credit-count">1 credit</span>
          </div>
          <div className="usage-item">
            <span>2.7K</span>
            <span className="credit-count">2 credits</span>
          </div>
          <div className="usage-item">
            <span>4K</span>
            <span className="credit-count">3 credits</span>
          </div>
           <div className="usage-item">
            <span>8K</span>
            <span className="credit-count">6 credits</span>
          </div>
        </div>
      </div>
  <h2 className="why-heading buycredits">Buy your Credits</h2>
    
      <div className="credit-cards">
       <Link href="/login">
         <div className="credit-card">
          <h3>10 Credits</h3>
          <p className="price">€9</p>
          <p className="per-credit">€0.90 per credit</p>
          <p className="feature-line"><FaDesktop className="icon" /> Up to 2.7K conversion</p>

        </div>
       </Link>

       <Link href="/login">
        <div className="credit-card popular">
          <span className="popular-badge">Most Popular</span>
          <h3>50 Credits</h3>
          <p className="price">€39</p>
          <p className="per-credit">€0.78 per credit</p>
          <p className="feature-line"><FaDesktop className="icon" /> Up to 4K conversion</p>
<p className="feature-line-speacial">Commerical license</p>
        </div>
 </Link>

       <Link href="/login">
        <div className="credit-card">
          <h3>100 Credits</h3>
          <p className="price">€69</p>
          <p className="per-credit">€0.69 per credit</p>
         <div className='special-features'>
           <p className="feature-line-speacial"><FaUpload className="icon" /> Batch uploads</p>
<p className="feature-line-speacial"><FaClock className="icon" /> Priority rendering</p>
<p className="feature-line-speacial"><FaDesktop className="icon" /> Up to 8K conversion</p>
<p className="feature-line-speacial">Commerical license</p>
         </div>

        </div>
         </Link>
      </div>
    </div>
  );
};

export default HomeCredits;
