import React from "react";
import { Lock, Trash2, Eye, ShieldCheck } from "lucide-react";
import "./PrivacyProtection.css";

// Map card titles to icons
const iconMap = {
  "Secure encrypted upload": Lock,
  "Automatic deletion after 7 days": Trash2,
  "Only you have access": Eye,
  "Never shared or sold": ShieldCheck,
  "Not used for AI training": ShieldCheck,
};

const PrivacyProtection = ({ sectionData }) => {
  if (!sectionData) return null;

  return (
    <div className="privacy-protection-wrapper">
      {/* Title */}
      <h2
        className="privacy-protection-heading"
        dangerouslySetInnerHTML={{
          __html: sectionData.title
            ?.replace(/\\u003C/g, "<")
            .replace(/\\u003E/g, ">")
            .replace(/className=/g, "class="),
        }}
      />

      {/* Description */}
      {sectionData.description && (
        <p className="privacy-protection-subtext">{sectionData.description}</p>
      )}

      {/* Cards */}
      <div className="privacy-grid">
        {sectionData.cards?.map((card, index) => {
          // Use mapped icon or fallback
          const IconComponent = iconMap[card.title] || ShieldCheck;
          const isFullWidth = card.title === "Not used for AI training";

          return (
            <div
              key={index}
              className={`privacy-card ${isFullWidth ? "privacy-card-full" : ""}`}
            >
              <div className="privacy-icon">
                <IconComponent size={22} />
              </div>
              <div className="privacy-content">
                <h3>{card.title}</h3>
                {card.description && <p>{card.description}</p>}
                {card.subDescription && <a href="#">{card.subDescription}</a>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrivacyProtection;
