'use client';

import React from "react";

const TransformedImage = ({ image, className = "immersive-image", imageRef }) => {
  if (!image) return null;

  const t = image.transformations || {};

  return (
    <img
      ref={imageRef}
      src={image?.url}
      alt={image.alt || ""}
      className={className}
      style={{
        transform: `rotate(${t.rotate || 0}deg)`,
        filter: `${t.filter || ""} brightness(${t.filterIntensity || 100}%)`,

        width:
          t.resizeWidth ||
          t.cropWidth ||
          "auto",

        height:
          t.resizeHeight ||
          t.cropHeight ||
          "100%",

        objectFit: "cover",
      }}
    />
  );
};

export default TransformedImage;
