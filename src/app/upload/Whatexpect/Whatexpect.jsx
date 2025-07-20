import React from 'react';
import './Whatexpect.css';

const Whatexpect = () => {
  return (
    <div className="expect-wrapper">
      <h2 className="expect-heading">What you can expect?</h2>
      <p className="expect-subtext">Watch this video with your VR Headset in 3D</p>
      <div className="video-container">
        <iframe
          src="https://www.youtube.com/embed/76MVs_AkjTY?si=fJiLDbgeLkNKI1LS"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Whatexpect;
