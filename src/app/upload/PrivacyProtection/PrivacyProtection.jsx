"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Trash2, Eye, ShieldCheck } from "lucide-react";
import "./PrivacyProtection.css";

const iconMap = {
  "Secure encrypted upload": Lock,
  "Automatic deletion after 7 days": Trash2,
  "Only you have access": Eye,
  "Never shared or sold": ShieldCheck,
  "Not used for AI training": ShieldCheck,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const PrivacyProtection = ({ sectionData }) => {
  if (!sectionData) return null;

  const cards = sectionData.cards || [];
  const lastCardIndex = cards.length - 1;

  return (
    <div className="privacy-protection-wrapper">
      <h2
        className="privacy-protection-heading"
        dangerouslySetInnerHTML={{
          __html: sectionData.title
            ?.replace(/\\u003C/g, "<")
            .replace(/\\u003E/g, ">")
            .replace(/className=/g, "class="),
        }}
      />

      {sectionData.description && (
        <p className="privacy-protection-subtext">
          {sectionData.description}
        </p>
      )}

      {/* Top cards (staggered) */}
      <motion.div
        className="privacy-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {cards.slice(0, lastCardIndex).map((card, index) => {
          const IconComponent = iconMap[card.title] || ShieldCheck;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="privacy-card"
            >
              <div className="privacy-icon">
                <IconComponent size={22} />
              </div>
              <div className="privacy-content">
                <h3>{card.title}</h3>
                {card.description && <p>{card.description}</p>}
                {card.subDescription && <a href="#">{card.subDescription}</a>}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Last card (animate ONLY when visible) */}
      {cards[lastCardIndex] && (
        <motion.div
          className="privacy-card privacy-card-full"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="privacy-icon">
            <ShieldCheck size={22} />
          </div>
          <div className="privacy-content">
            <h3>{cards[lastCardIndex].title}</h3>
            {cards[lastCardIndex].description && (
              <p>{cards[lastCardIndex].description}</p>
            )}
            {cards[lastCardIndex].subDescription && (
              <a href="#">{cards[lastCardIndex].subDescription}</a>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PrivacyProtection;
