"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./HowItWorks.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchWebsiteMedia } from "@/redux/features/websiteMedia";
import TransformedImage from "@/utils/TransformedImage";
const textVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.7, // ⏱️ 1 second after text
      ease: "easeOut",
    },
  },
};


const HowItWorks = ({ sectionData }) => {
  const dispatch = useDispatch();
  const { media } = useSelector(state => state.websiteMedia);

  useEffect(() => {
    dispatch(fetchWebsiteMedia());
  }, [dispatch]);

  const [dividerPos, setDividerPos] = useState(50);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  const startDrag = () => (isDragging.current = true);
  const stopDrag = () => (isDragging.current = false);

  const onDrag = (e) => {
    if (!isDragging.current || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
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
  const step1Img = media?.find(m => m.identifier === "how-it-works-first-img");
  const step2Overlay = media?.find(m => m.identifier === "how-it-works-second-img");
  const step3Img = media?.find(m => m.identifier === "how-it-works-third-img");

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
  <motion.div
    className="howItWorks-content"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    <motion.div
      className="howItWorks-text"
      variants={textVariants}
    >
      <h1 className="step-number">1</h1>
      <h3 className="step-title">{steps[0].title}</h3>
      <p className="step-description">{steps[0].description}</p>
    </motion.div>

    <motion.div
      className="howItWorks-image"
      variants={imageVariants}
    >
      <TransformedImage image={step1Img} />
    </motion.div>
  </motion.div>
)}

      {/* Step 2 */}
{steps[1] && (
  <motion.div
    className="howItWorks-content"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    <motion.div
      className="howItWorks-image"
      variants={imageVariants}
    >
      <div className="comparison-container" ref={sliderRef}>
        <img
          src={step2Overlay?.url}
          alt="Original"
          className="comparison-img"
        />

        <img
          src={step1Img?.url}
          alt="Depth Map"
          className="comparison-img overlay-img"
          style={{ clipPath: `inset(0 ${100 - dividerPos}% 0 0)` }}
        />

        <div
          className="comparison-handle"
          style={{ left: `${dividerPos}%` }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        >
          <div className="pause-icon" />
        </div>

        <span className="label label-left">Original</span>
        <span className="label label-right">Depth Map</span>
      </div>
    </motion.div>

    <motion.div
      className="howItWorks-text"
      variants={textVariants}
    >
      <h1 className="step-number">2</h1>
      <h3 className="step-title">{steps[1].title}</h3>
      <p className="step-description">{steps[1].description}</p>
    </motion.div>
  </motion.div>
)}

      {/* Step 3 */}
{steps[2] && (
  <motion.div
    className="howItWorks-content"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    <motion.div
      className="howItWorks-text"
      variants={textVariants}
    >
      <h1 className="step-number">3</h1>
      <h3 className="step-title">{steps[2].title}</h3>
      <p className="step-description">{steps[2].description}</p>
    </motion.div>

    <motion.div
      className="howItWorks-image"
      variants={imageVariants}
    >
      <TransformedImage image={step3Img} />
    </motion.div>
  </motion.div>
)}
    </div>
  );
};

export default HowItWorks;
