'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import './Processing3D.css';

const Processing3D = () => {
  return (
    <div className="p3d-wrapper">
      <div className="p3d-ring">
        <Sparkles className="p3d-icon" size={30} />
      </div>

      <h2 className="p3d-title">
        Creating your 3D video...
      </h2>

      <p className="p3d-subtitle">
        AI is analyzing depth and generating 3D effect
      </p>
    </div>
  );
};

export default Processing3D;
