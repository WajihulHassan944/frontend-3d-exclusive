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
import ResumeUploadModal from './ResumeUploadModal/ResumeUploadModal';

const CHUNK_SIZE = 25 * 1024 * 1024;        // 25 MB 
const MULTIPART_THRESHOLD = 500 * 1024 * 1024; // trigger multipart only above 500 MB

const Home = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const inputRef = useRef(null);
const progressRef = useRef(null);

  const [agreeToTerms, setAgreeToTerms] = useState(false);
const ipData = useSelector((state) => state.geo.data);
const [showResumeModal, setShowResumeModal] = useState(false);
const [resumeFileName, setResumeFileName] = useState('');

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
useEffect(() => {
  const savedUpload = localStorage.getItem('multipartUpload');
  if (savedUpload) {
    try {
      const { key } = JSON.parse(savedUpload);
      if (key) {
        // Show modal asking to resume
        const savedMeta = JSON.parse(localStorage.getItem('tempVideoMeta') || '{}');
        setResumeFileName(savedMeta.name || 'Unknown File');
        setShowResumeModal(true);
      }
    } catch (err) {
      console.error('Failed to parse saved upload:', err);
      localStorage.removeItem('multipartUpload');
    }
  }
}, []);
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
    if (height >= 4320) costPerMinute = 6;
    else if (height >= 2160) costPerMinute = 3;
    else if (height >= 1440) costPerMinute = 2;

    const cost = durationMinutes * costPerMinute;
    const balance = user?.wallet?.balance || 0;

    // ✅ Set full video metadata (same for normal & resume)
    setVideoMeta({
      fileName: file.name,
      fileSize: formatFileSize(file.size),
      duration: durationMinutes,
      quality,
      cost,
      balance,
      canProceed: balance >= cost,
      error: null, // clear any previous error
    });

    setShowVideoNote(true);
    setTimeout(() => {
      videoNoteRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);

    // Check if a multipartUpload exists (resume)
    const savedUpload = JSON.parse(localStorage.getItem('multipartUpload') || '{}');
    if (savedUpload?.uploadId && savedUpload?.key) {
      // Automatically resume upload using the newly selected file
      setShowResumeModal(false); // hide modal
      toast('Resuming upload automatically...');
      setAgreeToTerms(true);
setTimeout(() => {
    progressRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 100);
      // Resume upload with full metadata now set
      await handleUpload(true, file); // pass the file directly
      return; // skip re-processing
    }
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

const handleUpload = async (resume = false, fileParam = null) => {
  const savedUpload = JSON.parse(localStorage.getItem('multipartUpload') || '{}');
  const fileToUse = fileParam || videoFile; // Use passed file or fallback to state

  if (!fileToUse) {
    console.log("No file to upload!");
    inputRef.current?.click();
    return;
  }

  console.log("Using file:", fileToUse.name);

  // Resume mode detected
  if (resume && savedUpload?.uploadId && savedUpload?.key) {
    console.log('🔁 Resuming upload from localStorage');
    // No need to check fileToUse here because we already have it
  } else {
    // Normal upload: abort if no file selected
    if (!fileToUse) return;
  }

  if (!isLoggedIn) {
    router.push('/signup');
    return;
  }

  console.log("reached2");
  setUploading(true);
  setUploadStatus('');
  setProgress(0);

  try {
    console.log('📁 Selected file:', fileToUse.name);
    console.log(
      '📦 File size:',
      (fileToUse.size / 1024 / 1024).toFixed(2),
      'MB'
    );

    const { duration, height } = await getVideoMetadata(fileToUse);
    const quality = `${height}p`;
    const durationMinutes = Math.ceil(duration / 60);

    // 🔢 Pricing logic
    let costPerMinute = 1;
    if (height >= 4320) costPerMinute = 6;
    else if (height >= 2160) costPerMinute = 3;
    else if (height >= 1440) costPerMinute = 2;

    const cost = durationMinutes * costPerMinute;
    const balance = user?.wallet?.balance || 0;

    if (balance < cost) {
      alert(`❌ Not enough credits. You need ${cost} credits for this ${quality} video.`);
      setUploading(false);
      return;
    }

    console.log('💳 Credits required:', cost);

    // 📊 GTM event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'video_upload_started',
      video_name: fileToUse.name,
      quality,
      duration_minutes: durationMinutes,
      credits_required: cost,
      user_id: user?._id || null,
    });

    let key;

    /* =====================================================
       🟢 SMALL FILE → SINGLE PUT
    ====================================================== */
    if (fileToUse.size < MULTIPART_THRESHOLD) {
      console.log('🟢 Using SINGLE PUT upload');

      const res = await fetch(`${baseUrl}/b2/sign-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          fileName: fileToUse.name,
          fileType: fileToUse.type,
          cost,
        }),
      });

      const { signedUrl, key: objectKey } = await res.json();
      key = objectKey;

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedUrl);

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        xhr.onload = () =>
          xhr.status >= 200 && xhr.status < 300
            ? resolve()
            : reject(new Error('Upload failed'));

        xhr.onerror = () => reject(new Error('Upload error'));
        xhr.send(fileToUse);
      });
    }

    /* =====================================================
       🔵 LARGE FILE → MULTIPART (RESUME ENABLED)
    ====================================================== */
    else {
      console.log('🔵 Using MULTIPART upload');

      const saved = JSON.parse(localStorage.getItem('multipartUpload') || '{}');

      let uploadId = saved.uploadId;
      key = saved.key;
      let uploadedParts = saved.uploadedParts || [];

      // 🔁 Resume OR Init
      if (uploadId && key) {
        console.log('🔁 Resuming multipart upload');
      } else {
        console.log('🚀 Initializing multipart upload...');
        const initRes = await fetch(`${baseUrl}/b2/multipart/init`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            fileName: fileToUse.name,
            fileType: fileToUse.type,
            cost,
          }),
        });

        const initData = await initRes.json();
        uploadId = initData.uploadId;
        key = initData.key;
        uploadedParts = [];

        localStorage.setItem(
          'multipartUpload',
          JSON.stringify({ uploadId, key, uploadedParts })
        );
      }

      console.log('🆔 UploadId:', uploadId);
      console.log('🗂 Object key:', key);

      const totalChunks = Math.ceil(fileToUse.size / CHUNK_SIZE);
      console.log('🧩 Total chunks:', totalChunks);

      const uploadedMap = new Map(
        uploadedParts.map((p) => [p.PartNumber, p.ETag])
      );

      let uploadedBytes = uploadedParts.reduce((sum, p) => {
        const start = (p.PartNumber - 1) * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, fileToUse.size);
        return sum + (end - start);
      }, 0);

      for (let partNumber = 1; partNumber <= totalChunks; partNumber++) {
        if (uploadedMap.has(partNumber)) {
          console.log(`⏭️ Skipping already uploaded chunk ${partNumber}`);
          continue;
        }

        const start = (partNumber - 1) * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, fileToUse.size);
        const chunk = fileToUse.slice(start, end);

        console.log(
          `⬆️ Uploading chunk ${partNumber}/${totalChunks} (${(
            chunk.size / 1024 / 1024
          ).toFixed(2)} MB)`
        );

        const signRes = await fetch(`${baseUrl}/b2/multipart/sign-part`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ key, uploadId, partNumber }),
        });

        const { signedUrl } = await signRes.json();

        const etag = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('PUT', signedUrl);

          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              setProgress(
                Math.round(
                  ((uploadedBytes + e.loaded) / fileToUse.size) * 100
                )
              );
            }
          };

          xhr.onload = () => {
            uploadedBytes += chunk.size;
            resolve(xhr.getResponseHeader('ETag'));
          };

          xhr.onerror = () => reject(new Error('Chunk upload failed'));
          xhr.send(chunk);
        });

        uploadedParts.push({ ETag: etag, PartNumber: partNumber });

        localStorage.setItem(
          'multipartUpload',
          JSON.stringify({ uploadId, key, uploadedParts })
        );

        console.log(`✅ Chunk ${partNumber} uploaded`);
      }

      console.log('📦 Completing multipart upload...');
      await fetch(`${baseUrl}/b2/multipart/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ key, uploadId, parts: uploadedParts }),
      });

      localStorage.removeItem('multipartUpload');
      console.log('🎉 Multipart upload completed');
      console.log('🧹 multipartUpload removed from localStorage');
    }

    // 📊 GTM completed
    window.dataLayer.push({
      event: 'video_upload_completed',
      video_name: fileToUse.name,
      quality,
      duration_seconds: Math.round(duration),
      credits_used: cost,
      user_id: user?._id || null,
    });

    // 📝 Save metadata
    const saveRes = await fetch(`${baseUrl}/b2/save-metadata`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalFileName: fileToUse.name,
        key,
        quality,
        lengthInSeconds: Math.round(duration),
        conversionFormat,
        fileSize: formatFileSize(fileToUse.size),
        creditsUsed: cost,
        threeDExperience,
        clientInfo: ipData,
      }),
    });

    if (!saveRes.ok) throw new Error('Metadata save failed');

    await refreshAndDispatchUser(dispatch);
    localStorage.removeItem('multipartUpload');
localStorage.removeItem('tempVideoMeta');
    router.push('/dashboard');
    toast.success('Upload successful!');
  } catch (err) {
    console.error('❌ Upload error:', err);
    setUploadStatus(`❌ Upload failed: ${err.message}`);
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
  <div className="upload-progress-container-new" ref={progressRef}>
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
{showResumeModal && (
  <ResumeUploadModal
    fileName={resumeFileName}
    onResume={() => {
      setShowResumeModal(false);
      handleUpload(true);
    }}
    onClose={() => {
      setShowResumeModal(false);
      localStorage.removeItem('multipartUpload');
    }}
  />
)}

    
    </div>
  );
};

export default Home;
