import React from "react";
import "./Whatexpect.css";

const Whatexpect = ({ sectionData }) => {
  if (!sectionData) return null;

  return (
    <div className="expect-wrapper">
      {/* Title (renders HTML safely) */}
      <h2
        className="expect-heading"
        dangerouslySetInnerHTML={{
          __html: sectionData.title
            ?.replace(/\\u003C/g, "<")
            .replace(/\\u003E/g, ">")
            .replace(/className=/g, "class="),
        }}
      />

      {/* Description */}
      {sectionData.description && (
        <p className="expect-subtext">{sectionData.description}</p>
      )}

      {/* Video */}
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
