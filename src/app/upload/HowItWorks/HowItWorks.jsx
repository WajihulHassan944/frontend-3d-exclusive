'use client';

import React, { useState, useRef, useEffect } from "react";
import "./HowItWorks.css";

const HowItWorks = ({ sectionData }) => {
  const [dividerPos, setDividerPos] = useState(50);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  const startDrag = () => (isDragging.current = true);
  const stopDrag = () => (isDragging.current = false);

  const onDrag = (e) => {
    if (!isDragging.current || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX; // support touch
    if (clientX === undefined) return;

    const x = ((clientX - rect.left) / rect.width) * 100;
    setDividerPos(Math.min(100, Math.max(0, x)));
  };

  useEffect(() => {
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("touchend", stopDrag);
    window.addEventListener("touchmove", onDrag);

    return () => {
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("touchend", stopDrag);
      window.removeEventListener("touchmove", onDrag);
    };
  }, []);

  if (!sectionData) return null;

  const steps = sectionData.subSection?.cards || [];

  return (
    <div className="howItWorksWrapper">
      <h2
        className="howItWorks-heading"
        dangerouslySetInnerHTML={{
          __html: sectionData.title
            ?.replace(/\\u003C/g, "<")
            .replace(/\\u003E/g, ">")
            .replace(/className=/g, "class="),
        }}
      />

      {/* Step 1 */}
      {steps[0] && (
        <div className="howItWorks-content">
          <div className="howItWorks-text">
            <h1 className="step-number">1</h1>
            <h3 className="step-title">{steps[0].title}</h3>
            <p className="step-description">{steps[0].description}</p>
          </div>
          <div className="howItWorks-image">
            <img src="/assets/how-it-works-one.jpg" alt={steps[0].title} />
          </div>
        </div>
      )}

      {/* Step 2 - Comparison Slider */}
      {steps[1] && (
        <div className="howItWorks-content">
          <div className="howItWorks-image">
            <div className="comparison-container" ref={sliderRef}>
  {/* Background Image */}
  <img
    src="/assets/how-it-works-two.jpg"
    alt="Original"
    className="comparison-img"
  />

  {/* Overlay Image (static, clipped) */}
  <img
    src="/assets/how-it-works-one.jpg"
    alt="Depth Map"
    className="comparison-img overlay-img"
    style={{ clipPath: `inset(0 ${100 - dividerPos}% 0 0)` }}
  />

  {/* Divider / Handle */}
  <div
    className="comparison-handle"
    style={{ left: `${dividerPos}%` }}
    onMouseDown={startDrag}
    onTouchStart={startDrag}
  >
    <div className="pause-icon"></div>
  </div>

  {/* Labels */}
  <span className="label label-left">Original</span>
  <span className="label label-right">Depth Map</span>
</div>

          </div>
          <div className="howItWorks-text">
            <h1 className="step-number">2</h1>
            <h3 className="step-title">{steps[1].title}</h3>
            <p className="step-description">{steps[1].description}</p>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {steps[2] && (
        <div className="howItWorks-content">
          <div className="howItWorks-text">
            <h1 className="step-number">3</h1>
            <h3 className="step-title">{steps[2].title}</h3>
            <p className="step-description">{steps[2].description}</p>
          </div>
          <div className="howItWorks-image">
            <img src="/assets/how-it-works-three.jpg" alt={steps[2].title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HowItWorks;
