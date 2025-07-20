import React from 'react';
import './Whycloud.css';
import { FaPlay, FaYoutube, FaBolt } from 'react-icons/fa';

const Whycloud = () => {
  return (
    <div className="why-cloud-wrapper">
      <h2 className="why-heading">Why convert to 3D in the cloud?</h2>
      <div className="features">
        <div className="feature-item">
          <div className="icon-circle">
            <FaPlay />
          </div>
          <div className="feature-text">
            <h3>Immersive Experience</h3>
            <p>Experience your videos in immersive 3D</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="icon-circle">
            <FaYoutube />
          </div>
          <div className="feature-text">
            <h3>YouTube Ready</h3>
            <p>Compatible with YouTube 3D</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="icon-circle">
            <FaBolt />
          </div>
          <div className="feature-text">
            <h3>AI Powered</h3>
            <p>High-quality and fast AI cloud conversion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whycloud;
