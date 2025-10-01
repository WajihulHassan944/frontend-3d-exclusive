'use client';

import React, { useState, useRef, useEffect } from 'react';
import './upload.css';
import { FiUpload } from 'react-icons/fi';
import { baseUrl } from '@/const';
import { useRouter } from 'next/navigation';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Whycloud from './Whycloud/Whycloud';
import Whatexpect from './Whatexpect/Whatexpect';
import { FiCheckCircle } from "react-icons/fi";
import PricingSectionInPricing from '../pricing/PricingSection/PricingSection';
import CustomerTestimonials from './CustomerTestimonials/CustomerTestimonials';
import NewsletterSignup from './NewsletterSignup/NewsletterSignup';
import ImmersiveThreeD from './ImmersiveThreeD/ImmersiveThreeD';
import toast from 'react-hot-toast';


const Home = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const inputRef = useRef(null);
const [dragActive, setDragActive] = useState(false);
const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
const dispatch = useDispatch();
 const user = useSelector((state) => state.user);
 const [videoMeta, setVideoMeta] = useState(null); // holds calculated info
const [showVideoNote, setShowVideoNote] = useState(false); // controls div
const videoNoteRef = useRef(null);
const [conversionFormat, setConversionFormat] = useState('Full Side by Side');
const [progress, setProgress] = useState(0);
 const router = useRouter();
// inside Home component

useEffect(() => {
  // Try restoring metadata from localStorage (not actual file)
  const savedMeta = localStorage.getItem("tempVideoMeta");
  if (savedMeta && !videoFile) {
    try {
      const { name, size, type } = JSON.parse(savedMeta);

      // Show only filename & placeholder message until user reselects
      setVideoMeta({
        fileName: name,
        fileSize: formatFileSize(size),
        type,
        error: "Please reselect the video file to continue.",
      });

      setShowVideoNote(true);
    } catch (err) {
      console.error("Failed to parse saved video metadata:", err);
      localStorage.removeItem("tempVideoMeta");
    }
  }
}, [videoFile]);

const handleFileChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // URL for preview
  const fileURL = URL.createObjectURL(file);
  setVideoFile(file);
  setVideoPreview(fileURL);
  setUploadStatus("");
  setShowVideoNote(false);

  // Save metadata only (not file!)
  localStorage.setItem(
    "tempVideoMeta",
    JSON.stringify({ name: file.name, size: file.size, type: file.type })
  );

  // Extract video metadata (duration, resolution, etc.)
  try {
    const { duration, width, height } = await getVideoMetadata(file);
    const quality = `${height}p`;
    const durationMinutes = Math.ceil(duration / 60);

    // Pricing logic
    let costPerMinute = 1;
    if (height >= 2160 && height < 4320) costPerMinute = 6;
    const cost = durationMinutes * costPerMinute;

    const hasFreeMinute =
      user?.hasFreeConversion &&
      user?.newsletterOptIn === true &&
      height < 4320; // disallow 8K free
    const isUsingFreeMinute = hasFreeMinute && durationMinutes <= 1;

    const balance = user?.wallet?.balance || 0;

    setVideoMeta({
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      duration: durationMinutes,
      quality,
      cost,
      balance,
      isUsingFreeMinute,
      canProceed: isUsingFreeMinute || balance >= cost,
    });

    setShowVideoNote(true);
    setTimeout(() => {
      videoNoteRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  } catch (err) {
    console.error("Metadata extraction error:", err);
    setVideoMeta({ error: "Failed to read video metadata." });
    setShowVideoNote(true);
  }
};


  const getVideoMetadata = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');

    video.preload = 'metadata';
    video.src = url;

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      const duration = video.duration;
      const width = video.videoWidth;
      const height = video.videoHeight;
      resolve({ duration, width, height });
    };

    video.onerror = () => {
      reject(new Error('Failed to load video metadata'));
    };
  });
  function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}


const handleUpload = async () => {
  if (!videoFile) return;

  if (!isLoggedIn) {
    router.push('/signup');
    return;
  }

  setUploading(true);
  setUploadStatus('');
  setProgress(0);

  try {
    const { duration, width, height } = await getVideoMetadata(videoFile);
    const quality = `${height}p`;
    const durationMinutes = Math.ceil(duration / 60);

    let costPerMinute = 1;
    if (height >= 2160 && height < 4320) {
      costPerMinute = 6;
    }
    const cost = durationMinutes * costPerMinute;

    const balance = user?.wallet?.balance || 0;
    const hasFreeMinute =
      user?.hasFreeConversion &&
      user?.newsletterOptIn === true &&
      height < 4320;

    const isUsingFreeMinute = hasFreeMinute && durationMinutes <= 1;

    if (isUsingFreeMinute) {
      alert("🎁 Using free 1-minute conversion.");
    } else if (balance < cost) {
      alert(`❌ Not enough credits. You need ${cost} credits for this ${quality} video.`);
      setUploading(false);
      return;
    }

    // ✅ 1. Get signed URL
    const res = await fetch(`${baseUrl}/b2/sign-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        fileName: videoFile.name,
        fileType: videoFile.type,
        usingFreeConversion: isUsingFreeMinute,
        cost,
      }),
    });

    const { signedUrl, key } = await res.json();

    // ✅ 2. Upload with progress tracking
    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", signedUrl);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent); // <-- Update state
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error("Upload failed"));
        }
      };

      xhr.onerror = () => reject(new Error("Upload error"));
      xhr.send(videoFile);
    });

    // ✅ 3. Save metadata
    const saveRes = await fetch(`${baseUrl}/b2/save-metadata`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalFileName: videoFile.name,
        key,
        quality,
        lengthInSeconds: Math.round(duration),
        conversionFormat,
        fileSize: formatFileSize(videoFile.size),
        creditsUsed: isUsingFreeMinute ? 0 : cost,
      }),
    });

    if (!saveRes.ok) throw new Error('Metadata save failed');

    localStorage.removeItem('tempVideoMeta');
    await refreshAndDispatchUser(dispatch);
    router.push('/dashboard');
     toast.success('Upload successful!');
   
  } catch (err) {
    console.error(err);
    setUploadStatus(`❌ Upload failed: ${err.message}`);
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="xclusive-container">
   {isLoggedIn && (
   <center><h1 className='xclusive-header'>Turn your videos into an <span className='highlight'> unforgettable 3D experience</span></h1>
  </center>
)}

    <center>  <div className="upload-section">
 
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="video/*"
        style={{ display: 'none' }}
      />


      {/* Desktop Drop Zone */}
      <label
        className={`upload-box desktop-only ${dragActive ? 'dragging' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
        }}
  onDrop={async (e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);

  const file = e.dataTransfer.files?.[0];
  if (file && file.type.startsWith("video/")) {
    const fileURL = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoPreview(fileURL);
    setUploadStatus("");
    setShowVideoNote(false);

    // ✅ Save metadata only (not base64!)
    localStorage.setItem(
      "tempVideoMeta",
      JSON.stringify({ name: file.name, size: file.size, type: file.type })
    );

    try {
      const { duration, width, height } = await getVideoMetadata(file);
      const quality = `${height}p`;
      const durationMinutes = Math.ceil(duration / 60);

      // Pricing logic
      let costPerMinute = 1;
      if (height >= 2160 && height < 4320) costPerMinute = 6;
      const cost = durationMinutes * costPerMinute;

      const hasFreeMinute =
        user?.hasFreeConversion &&
        user?.newsletterOptIn === true &&
        height < 4320;
      const isUsingFreeMinute = hasFreeMinute && durationMinutes <= 1;

      const balance = user?.wallet?.balance || 0;

      setVideoMeta({
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        duration: durationMinutes,
        quality,
        cost,
        balance,
        isUsingFreeMinute,
        canProceed: isUsingFreeMinute || balance >= cost,
      });

      setShowVideoNote(true);
      setTimeout(() => {
        videoNoteRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    } catch (err) {
      console.error("Metadata extraction error:", err);
      setVideoMeta({ error: "Failed to read video metadata." });
      setShowVideoNote(true);
    }
  } else {
    alert("Please drop a valid video file.");
  }
}}

      >
        <div className="upload-icon">
          <FiUpload size={32} />
        </div>
        <h1 className='dropHeading'>Drag & drop your video</h1>
        <p className='dropPara'>Upload your video for 3D conversion or enhancement</p>
         <p className='dropPara'>Supports all formats: MP4, MOV, AVI, MKV, old film formats, and more</p>
        <button className='upload-input-btn' onClick={() => inputRef.current?.click()}>Choose File</button>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            ref={inputRef}
            style={{ display: 'none' }}
          />
      </label>
    </>


  {/* Video preview after selection */}
  {videoPreview && (
    <div className="preview-box">
      <video src={videoPreview} controls width="100%" />
    </div>
  )}
 {showVideoNote && videoMeta && isLoggedIn && (
  <div ref={videoNoteRef} className="video-meta-card">
    {videoMeta.error ? (
      <p>⚠️ {videoMeta.error}</p>
    ) : (
      <>
        <p><strong>Video:</strong> {videoMeta.fileName}</p>
        {/* <p><strong>Quality:</strong> {videoMeta.quality}</p> */}
        <p><strong>Credits Required:</strong> {videoMeta.isUsingFreeMinute ? '0 (using free minute)' : videoMeta.cost}</p>
        <p><strong>Your Balance:</strong> {videoMeta.balance} credit(s)</p>
         <p><strong>1 min Free Conversion:</strong> {user.hasFreeConversion ? "Not Used": "Availed"}</p>
        {videoMeta.canProceed ? (
      <p className="meta-success">
  <FiCheckCircle className="meta-icon" />
  You have sufficient credits. You may proceed with the upload.
</p>

        ) : (
          <p className="meta-error">
            ❌ You need <strong>{videoMeta.cost - videoMeta.balance}</strong> more credit(s) to upload this video.
            <br />Please top up your wallet before uploading.
          </p>
        )}
      </>
    )}
  </div>
)}



  {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
<div className="format-selector">
  <p className="format-title">Choose conversion format</p>
    <div
    className={`format-option ${conversionFormat === 'Full Side by Side' ? 'selected' : ''}`}
    onClick={() => setConversionFormat('Full Side by Side')}
  >
    <input
      type="radio"
      name="conversionFormat"
      checked={conversionFormat === 'Full Side by Side'}
      readOnly
    />
    <label>Full Side by Side <span>(compatible with Meta Quest and YouTube 3D)</span></label>
  </div>
  <div
    className={`format-option ${conversionFormat === 'MV-HEVC' ? 'selected' : ''}`}
    onClick={() => setConversionFormat('MV-HEVC')}
  >
    <input
      type="radio"
      name="conversionFormat"
      checked={conversionFormat === 'MV-HEVC'}
      readOnly
    />
    <label>Spatial Video <span>(MV-HEVC format compatible with Apple Vision Pro)</span></label>
  </div>

</div>


{uploading && (
  <div className="upload-progress-container-new">
    <div 
      className="upload-progress-bar-new"
      style={{
        width: `${progress}%`,
        borderRadius: progress === 100 
          ? "10px"          // fully rounded if 100%
          : "10px 0 0 10px" // only left rounded while loading
      }}
    >
      <span className="upload-progress-thumb">{progress}%</span>
    </div>
  </div>
)}



 <button
  className="convert-btn"
  onClick={handleUpload}
  disabled={uploading || (isLoggedIn && showVideoNote && videoMeta && !videoMeta.canProceed) || !videoFile}
  style={{
  opacity: uploading || (isLoggedIn && showVideoNote && videoMeta && !videoMeta.canProceed) || !videoFile? 0.6 : 1,
  cursor: uploading || (isLoggedIn && showVideoNote && videoMeta && !videoMeta.canProceed) || !videoFile ? 'not-allowed' : 'pointer',
}}

>
  {uploading ? (
    <div className="btn-spinner" />
  ) : (
    'Convert to 3D'
  )}
</button>


  
</div>
</center>

     

{/* {isLoggedIn && <center><Credits /></center>} */}
    <PricingSectionInPricing />
    <Whycloud />
    <CustomerTestimonials />
    <ImmersiveThreeD />
    <Whatexpect />
    <NewsletterSignup />
    </div>
  );
};

export default Home;
