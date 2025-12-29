import React, { useEffect } from 'react';
import './Whatexpect.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWebsiteMedia } from '@/redux/features/websiteMedia';
import { getVimeoEmbedUrl } from '@/utils/getVimeoEmbedUrl';

const Whatexpect = ({ sectionData }) => {
  const dispatch = useDispatch();
  const { media } = useSelector(state => state.websiteMedia);

  useEffect(() => {
    dispatch(fetchWebsiteMedia());
  }, [dispatch]);

  if (!sectionData) return null;

  // Find the video with identifier "what-to-expect"
 const videoItem = media.find(
  item =>
    item.identifier?.toLowerCase().trim() ===
    "what-you-can-expect"
);
  let finalVideoUrl = null;

// ✅ UPDATED PART ONLY

// Build final embed URL (ensure sound + controls)
if (videoItem) {
  if (videoItem.platform === "vimeo") {
    finalVideoUrl = `${getVimeoEmbedUrl(videoItem.url)}?muted=0&controls=1&autoplay=0`;
  } else if (videoItem.platform === "youtube") {
    const videoId = new URL(videoItem.url).searchParams.get("v");
    finalVideoUrl = `https://www.youtube.com/embed/${videoId}?controls=1&mute=0&autoplay=0`;
  } else {
    finalVideoUrl = videoItem.url;
  }
}

  return (
    <div className="expect-wrapper">
      <h2
        className="expect-heading"
        dangerouslySetInnerHTML={{
          __html: sectionData.title
            ?.replace(/\\u003C/g, "<")
            .replace(/\\u003E/g, ">")
            .replace(/className=/g, "class="),
        }}
      />

      {sectionData.description && (
        <p className="expect-subtext">{sectionData.description}</p>
      )}

      <div className="video-container">

        {/* If Vimeo or YouTube → iframe */}
        {finalVideoUrl?.includes("embed") || finalVideoUrl?.includes("vimeo.com") ? (
    
<iframe
  src={finalVideoUrl}
  title="What to Expect Video"
  frameBorder="0"
  allow="autoplay; encrypted-media; picture-in-picture"
  allowFullScreen
></iframe>

        ) : (
          // Fallback direct video file
          <video src={finalVideoUrl} controls />
        )}
      </div>
    </div>
  );
};

export default Whatexpect;
