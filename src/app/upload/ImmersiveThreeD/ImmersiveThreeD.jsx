'use client';

import React, { useEffect, useRef, useState } from "react";
import "./ImmersiveThreeD.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchWebsiteMedia } from "@/redux/features/websiteMedia";
import TransformedImage from "@/utils/TransformedImage";

const ImmersiveThreeD = ({ sectionData }) => {
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const [labelText, setLabelText] = useState("Hover to interact");
const { media } = useSelector(state => state.websiteMedia);
  useEffect(() => {
    dispatch(fetchWebsiteMedia());
  }, [dispatch]);
// Get dynamic images
const whaleImage = media?.find(m => m.identifier === "whale-3d-demo");
const vrImage = media?.find(m => m.identifier === "Experience-3D-Magic-Vr");

  if (!sectionData) return null;

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y / height) - 0.5) * 4;
    const rotateY = ((x / width) - 0.5) * -4;

    imageRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.02)
      translateZ(10px)
    `;
    setLabelText("Experiencing 3D depth");
  };

  const handleMouseLeave = () => {
    imageRef.current.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale(1) translateZ(0)";
    setLabelText("Hover to interact");
  };

  return (
    <div className="immersive-section">
      {/* Title */}
      <h2
        className="immersive-title"
        dangerouslySetInnerHTML={{
            __html: (sectionData?.title ||
              'Start now with your <span class="highlight">immersive 3D</span> experience')
              .replace(/\\u003C/g, '<')
              .replace(/\\u003E/g, '>')
              .replace(/className=/g, 'class='),
        }}
      />
      <p className="immersive-subtitle">{sectionData.description}</p>

      {/* Interactive Image */}
      <div
        className="immersive-image-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
     <img
  ref={imageRef}
  src={whaleImage?.url || "/Immersive/whale-3d-demo.jpg"}
  alt={whaleImage?.alt || "3D Whale Demo"}
  className="immersive-image"
  style={{
    transform: `rotate(${whaleImage?.transformations?.rotate || 0}deg)`,
    filter: `${whaleImage?.transformations?.filter || ""} brightness(${whaleImage?.transformations?.filterIntensity || 100}%)`,

    width:
      whaleImage?.transformations?.resizeWidth ||
      whaleImage?.transformations?.cropWidth ||
      "auto",

    height:
      whaleImage?.transformations?.resizeHeight ||
      whaleImage?.transformations?.cropHeight ||
      "550px",

    objectFit: "cover",
  }}
/>


        <div className="hover-label">
          <span className="greenDot"></span>
          {labelText}
        </div>
        <div className="hover-overlay">
          <div className="mouse-icon">🖱</div>
          <div className="hover-text-main">Move your mouse here</div>
          <div className="hover-text-sub">See the 3D depth effect</div>
        </div>
      </div>

      <center>
        <p className="immersive-caption">{sectionData.subDescription}</p>
      </center>

      {/* VR Compatibility Block */}
      {sectionData.subSection && (
        <center>
          <div className="vr-box">
            <div className="vr-image">
            <TransformedImage image={vrImage} />


            </div>
            <div className="vr-text">
              <h3
                dangerouslySetInnerHTML={{
                  __html: sectionData.subSection.title.replace(/\\u003C/g, '<')
              .replace(/\\u003E/g, '>')
              .replace(/className=/g, 'class='),
                }}
              />
              <p>{sectionData.subSection.description}</p>

              {sectionData.subSection.cards?.some(card => card.description) && (
  <div className="vr-cards">
    {sectionData.subSection.cards.map((card) =>
      card.description ? (
        <div className="vr-card" key={card._id}>
          <strong>{card.title}</strong>
          <p>{card.description}</p>
          {card.subDescription && <a href="#">{card.subDescription}</a>}
        </div>
      ) : null
    )}
  </div>
)}


              <p className="vr-note">{sectionData.subSection.subDescription}</p>
            </div>
          </div>
        </center>
      )}
    </div>
  );
};

export default ImmersiveThreeD;
