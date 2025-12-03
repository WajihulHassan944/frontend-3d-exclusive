import React, { useEffect } from "react";
import "./Whatexpect.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchWebsiteMedia } from "@/redux/features/websiteMedia";

const Whatexpect = ({ sectionData }) => {
  if (!sectionData) return null;
const dispatch = useDispatch();
  const { media } = useSelector(state => state.websiteMedia);
  useEffect(() => {
    dispatch(fetchWebsiteMedia());
  }, [dispatch]);
// Get dynamic images
const iframeUrl = media?.find(m => m.identifier === "What-you-can-expect");

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
  src={iframeUrl?.url}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowFullScreen
  style={{
    transform: `rotate(${iframeUrl?.transformations?.rotate || 0}deg)`,
    filter: `${iframeUrl?.transformations?.filter || ""} brightness(${iframeUrl?.transformations?.filterIntensity || 100}%)`,
    width:
      iframeUrl?.transformations?.resizeWidth ||
      iframeUrl?.transformations?.cropWidth ||
      "100%",
    height:
      iframeUrl?.transformations?.resizeHeight ||
      iframeUrl?.transformations?.cropHeight ||
      "500px",
    objectFit: "cover",
  }}
></iframe>

      </div>
    </div>
  );
};

export default Whatexpect;
