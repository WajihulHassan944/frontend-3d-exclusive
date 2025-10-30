'use client';
import React from "react";
import "./CTASection.css";
import { useRouter } from "next/navigation";

const CTASection = () => {
  const router = useRouter();
  return (
    <div className="cta-container">
      <div className="cta-box">
        <h2 className="cta-title">Ready to convert your own videos?</h2>
        <p className="cta-subtitle">
          Start converting your 2D videos into breathtaking 3D content today
        </p>
        <button className="cta-button" onClick={()=>router.push('/upload')}>Start Now</button>
      </div>
    </div>
  );
};

export default CTASection;
