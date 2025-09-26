'use client';

import React from 'react';
import './Whycloud.css';
import { FaRegPlayCircle } from 'react-icons/fa';
import { AiOutlineYoutube } from 'react-icons/ai';
import { FiUpload } from 'react-icons/fi';
import { MdOutlineBolt } from 'react-icons/md';
import { motion } from 'framer-motion';

// Parent container animation (stagger children)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // delay between cards
    },
  },
};

// Each card animation
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Whycloud = () => {
  return (
    <div className="why-cloud-wrapper">
      <h2 className="why-heading">Why convert to 3D at Xclusive3D</h2>

      <motion.div
        className="features"
        variants={containerVariants}
        initial="hidden"
        whileInView="show" // animates only when in viewport
        viewport={{ once: true, amount: 0.2 }} // triggers when 20% in view
      >
        <motion.div className="feature-item" variants={itemVariants}>
          <div className="icon-circle">
            <FaRegPlayCircle className="why-icons" />
          </div>
          <div className="feature-text">
            <h3>Immersive Experience</h3>
            <p>
              Turn your 2D videos into stunning 3D — ready to watch on your Meta Quest or Apple Vision Pro
            </p>
          </div>
        </motion.div>

        <motion.div className="feature-item" variants={itemVariants}>
          <div className="icon-circle">
            <AiOutlineYoutube className="why-icons" />
          </div>
          <div className="feature-text">
            <h3>YouTube Ready</h3>
            <p>Compatible with YouTube 3D</p>
          </div>
        </motion.div>

        <motion.div className="feature-item" variants={itemVariants}>
          <div className="icon-circle">
            <FiUpload className="why-icons" />
          </div>
          <div className="feature-text">
            <h3>Downloadable Files</h3>
            <p>Get your converted 3D video files ready to download</p>
          </div>
        </motion.div>

        <motion.div className="feature-item" variants={itemVariants}>
          <div className="icon-circle">
            <MdOutlineBolt className="why-icons" />
          </div>
          <div className="feature-text">
            <h3>AI Powered</h3>
            <p>High-quality and fast AI cloud conversion</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Whycloud;
