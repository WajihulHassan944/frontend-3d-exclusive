'use client';

import React, { useState, useRef, useEffect } from 'react';
import './upload.css';
import { FiCheck, FiUpload } from 'react-icons/fi';
import { baseUrl } from '@/const';
import { useRouter } from 'next/navigation';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FiCheckCircle } from "react-icons/fi";
import toast from 'react-hot-toast';
import ExperienceSelector from './ExperienceSelector/ExperienceSelector';
import ConversionCostBox from './ConversionCostBox/ConversionCostBox';


const Home = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const inputRef = useRef(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
const ipData = useSelector((state) => state.geo.data);

  const [dragActive, setDragActive] = useState(false);
const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
const dispatch = useDispatch();
 const user = useSelector((state) => state.user);
 const [videoMeta, setVideoMeta] = useState(null); // holds calculated info
const [showVideoNote, setShowVideoNote] = useState(false); // controls div
const videoNoteRef = useRef(null);
const [conversionFormat, setConversionFormat] = useState('Full Side by Side');
const [progress, setProgress] = useState(0);
const [threeDExperience, setThreeDExperience] = useState('comfort');
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
let costPerMinute = 1; // default 1080p
if (height >= 4320) {
  costPerMinute = 6; // 8K
} else if (height >= 2160) {
  costPerMinute = 3; // 4K UHD
} else if (height >= 1440) {
  costPerMinute = 2; // 2.7K
} else {
  costPerMinute = 1; // 1080p
}

    const cost = durationMinutes * costPerMinute;

   
    const balance = user?.wallet?.balance || 0;

    setVideoMeta({
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      duration: durationMinutes,
      quality,
      cost,
      balance,
      canProceed: balance >= cost,
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

   // Pricing logic
let costPerMinute = 1; // default 1080p
if (height >= 4320) {
  costPerMinute = 6; // 8K
} else if (height >= 2160) {
  costPerMinute = 3; // 4K UHD
} else if (height >= 1440) {
  costPerMinute = 2; // 2.7K
} else {
  costPerMinute = 1; // 1080p
}

    const cost = durationMinutes * costPerMinute;

    const balance = user?.wallet?.balance || 0;
    
    if (balance < cost) {
      alert(`❌ Not enough credits. You need ${cost} credits for this ${quality} video.`);
      setUploading(false);
      return;
    }

    // ✅ Push GTM event: upload started
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'video_upload_started',
      video_name: videoFile.name,
      quality,
      duration_minutes: durationMinutes,
      credits_required: cost,
      user_id: user?._id || null,
    });

    // ✅ 1. Get signed URL
    const res = await fetch(`${baseUrl}/b2/sign-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        fileName: videoFile.name,
        fileType: videoFile.type,
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
          setProgress(percent);
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

    // ✅ Push GTM event: upload completed
    window.dataLayer.push({
      event: 'video_upload_completed',
      video_name: videoFile.name,
      quality,
      duration_seconds: Math.round(duration),
      credits_used: cost,
      user_id: user?._id || null,
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
        creditsUsed: cost,
        threeDExperience,
        clientInfo:ipData

      }),
    });

    if (!saveRes.ok) throw new Error('Metadata save failed');

    // ✅ Push GTM event: metadata saved
    window.dataLayer.push({
      event: 'video_metadata_saved',
      file_key: key,
      quality,
      conversion_format: conversionFormat,
      credits_used: cost,
    });

    localStorage.removeItem('tempVideoMeta');
    await refreshAndDispatchUser(dispatch);
    router.push('/dashboard');
    toast.success('Upload successful!');

  } catch (err) {
    console.error(err);
    setUploadStatus(`❌ Upload failed: ${err.message}`);

    // ✅ Push GTM event: upload failed
    window.dataLayer.push({
      event: 'video_upload_failed',
      error_message: err.message,
      video_name: videoFile?.name || null,
      user_id: user?._id || null,
    });
  } finally {
    setUploading(false);
  }
};


  return (
    <div className="xclusive-container">
   {/* {isLoggedIn && (
   <center><h1 className='xclusive-header' style={{marginBottom:'100px'}}>Turn your videos into an <span className='highlight'> unforgettable 3D experience</span></h1>
  </center>
)} */}

{/* {!isLoggedIn && ( */}
   <center><h1 className='xclusive-header'>Convert Your Video to <span className='highlight'>3D</span></h1>
   <p className='xclusive-subtext'>Upload your video and customize your 3D conversion settings</p>
  </center>
{/* )} */}

    <center>  <div className="upload-section">
  <div className="step-header">
        <div className="step-number">1</div>
        <h2 className="step-title">Upload Your Video</h2>
      </div>
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
     // Pricing logic
let costPerMinute = 1; // default 1080p
if (height >= 4320) {
  costPerMinute = 6; // 8K
} else if (height >= 2160) {
  costPerMinute = 3; // 4K UHD
} else if (height >= 1440) {
  costPerMinute = 2; // 2.7K
} else {
  costPerMinute = 1; // 1080p
}

      const cost = durationMinutes * costPerMinute;

     
      const balance = user?.wallet?.balance || 0;

      setVideoMeta({
        fileName: file.name,
        fileSize: formatFileSize(file.size),
        duration: durationMinutes,
        quality,
        cost,
        balance,
        canProceed: balance >= cost,
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
        <p><strong>Quality:</strong> {videoMeta.quality}</p>
        <p><strong>Credits Required:</strong> {videoMeta.cost}</p>
        <p><strong>Your Balance:</strong> {videoMeta.balance} credit(s)</p>
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

<ExperienceSelector selected={threeDExperience} setSelected={setThreeDExperience} />

<div className="format-selector" style={{marginBottom:'70px'}}>
  <div className="step-header">
        <div className="step-number">3</div>
        <h2 className="step-title">Choose Output Format</h2>
      </div>

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
  {/* <div
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
  </div> */}

</div>

 <div className="terms-checkbox" onClick={() => setAgreeToTerms(!agreeToTerms)}>
  <div className={`custom-checkbox ${agreeToTerms ? 'checked' : ''}`}>
    {agreeToTerms && <FiCheck size={12} color="#fff" />}
  </div>
  <label style={{color:'#d1d5db', fontWeight:'500'}}>
    I confirm I have the legal right to upload this content and agree to the{' '}
    <a href="/termsandconditions" target="_blank" rel="noopener noreferrer" style={{color:'#c084fc'}}>
      Terms and Conditions
    </a>
  </label>
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
  disabled={uploading || (isLoggedIn && showVideoNote && videoMeta && !videoMeta.canProceed) || !videoFile || !agreeToTerms}
  style={{
  opacity: uploading || (isLoggedIn && showVideoNote && videoMeta && !videoMeta.canProceed) || !videoFile || !agreeToTerms? 0.6 : 1,
  cursor: uploading || (isLoggedIn && showVideoNote && videoMeta && !videoMeta.canProceed) || !videoFile || !agreeToTerms ? 'not-allowed' : 'pointer',
}}

>
  {uploading ? (
    <div className="btn-spinner" />
  ) : (
    'Convert to 3D'
  )}
</button>
{!videoFile && <p className='cautionPara'>Please upload a video file to continue</p>}
<ConversionCostBox credits={videoMeta?.cost} />
  
</div>
</center>

    
    </div>
  );
};

export default Home;
