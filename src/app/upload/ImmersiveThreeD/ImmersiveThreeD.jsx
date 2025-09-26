import React, { useRef, useState } from "react";
import "./ImmersiveThreeD.css";

const ImmersiveThreeD = () => {
  const imageRef = useRef(null);
  const [labelText, setLabelText] = useState("Hover to interact");

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Smaller multipliers = less tilt
    const rotateX = ((y / height) - 0.5) * 4;
    const rotateY = ((x / width) - 0.5) * -4;

    imageRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      scale(1.02) 
      translateZ(10px)
    `;

    // Change label text on hover
    setLabelText("Experiencing 3D depth");
  };

  const handleMouseLeave = () => {
    imageRef.current.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale(1) translateZ(0)";

    // Revert label text
    setLabelText("Hover to interact");
  };

  return (
    <div className="immersive-section">
      {/* Title */}
      <h2 className="immersive-title"><span className='highlight'>Experience</span> 3D Video <span className="orange">Magic</span></h2>
      <p className="immersive-subtitle">
        Move your mouse over the image below to see how we transform flat 2D videos
        into immersive 3D experiences. This is what your content will look like after
        conversion.
      </p>

      {/* Interactive Whale Image */}
      <div
        className="immersive-image-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imageRef}
          src="/Immersive/whale-3d-demo.jpg"
          alt="3D Whale Demo"
          className="immersive-image"
        />

        {/* Top right overlay */}
        <div className="hover-label">
          <span className="greenDot"></span>
          {labelText}
        </div>

        {/* Center overlay with icon + text */}
        <div className="hover-overlay">
          <div className="mouse-icon">🖱</div>
          <div className="hover-text-main">Move your mouse here</div>
          <div className="hover-text-sub">See the 3D depth effect</div>
        </div>
      </div>

      <center><p className="immersive-caption">
        This interactive demo shows how your 2D videos will gain realistic depth and
        dimension after our AI conversion process.
      </p></center>

      {/* VR Compatibility Block */}
      <center>
        <div className="vr-box">
        <div className="vr-image">
          <img src="/Immersive/vr.png" alt="VR Experience" />
        </div>
        <div className="vr-text">
          <h3><span className='highlight'>Compatible</span> with VR Headsets</h3>
          <p>
            View your converted 3D videos with these VR headsets for the ultimate immersive
            experience:
          </p>

          <div className="vr-cards">
            <div className="vr-card">
              <strong>Meta Quest</strong>
              <p>Quest 2, 3(S) & Pro</p>
              <a href="#">Full Side-by-Side support</a>
            </div>
            <div className="vr-card">
              <strong>Apple Vision Pro</strong>
              <a href="#">MV-HEVC support</a>
            </div>
            <div className="vr-card">
              <strong>Pico 4 Ultra</strong>
              <a href="#">MV-HEVC support</a>
            </div>
          </div>

          <p className="vr-note">
            *VR headset required to experience the full 3D depth effect
          </p>
        </div>
      </div>
      </center>
    </div>
  );
};

export default ImmersiveThreeD;
