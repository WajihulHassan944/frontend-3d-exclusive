'use client';

import React, { useState, useRef, useEffect } from 'react';
import './upload.css';
import Image from 'next/image';
import { FiUpload, FiCheck } from 'react-icons/fi';
import { baseUrl } from '@/const';
import { useRouter } from 'next/navigation';
import { refreshAndDispatchUser } from '@/utils/refreshUser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Credits from './credits';
import HomeCredits from './HomeCredits/HomeCredits';
import Whycloud from './Whycloud/Whycloud';
import Whatexpect from './Whatexpect/Whatexpect';


const Home = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const inputRef = useRef(null);
const [dragActive, setDragActive] = useState(false);
const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
const dispatch = useDispatch();
 const user = useSelector((state) => state.user);
 const [videoMeta, setVideoMeta] = useState(null); // holds calculated info
const [showVideoNote, setShowVideoNote] = useState(false); // controls div
const videoNoteRef = useRef(null);

 const router = useRouter();
 useEffect(() => {
  const savedBase64 = localStorage.getItem('tempVideo');
  if (savedBase64 && !videoFile) {
    const byteString = atob(savedBase64.split(',')[1]);
    const mimeString = savedBase64.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], 'saved-temp.mp4', { type: mimeString });
    const fileURL = URL.createObjectURL(blob);

    setVideoFile(file);
    setVideoPreview(fileURL);

    // Run the same metadata logic
    (async () => {
      try {
        const { duration, width, height } = await getVideoMetadata(file);
        const quality = `${height}p`;
        const durationMinutes = Math.ceil(duration / 60);
        const qualityCostMap = {
          "1080p": 1,
          "2.7K": 2,
          "4K": 3,
          "8K": 6,
        };

        if (!qualityCostMap[quality]) {
          setVideoMeta({
            error: `Unsupported video quality (${quality}). Only 1080p, 2.7K, 4K, and 8K are allowed.`,
          });
          setShowVideoNote(true);
          return;
        }

        const cost = durationMinutes * qualityCostMap[quality];
        const hasFreeMinute = user?.hasFreeConversion;
        const isUsingFreeMinute = hasFreeMinute && durationMinutes <= 1;
        const balance = user?.wallet?.balance || 0;

        setVideoMeta({
          fileName: file.name,
          duration: durationMinutes,
          quality,
          cost,
          balance,
          isUsingFreeMinute,
          canProceed: isUsingFreeMinute || balance >= cost,
        });

        setShowVideoNote(true);
        setTimeout(() => {
          videoNoteRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } catch (err) {
        console.error('Metadata extraction error:', err);
        setVideoMeta({ error: 'Failed to read video metadata.' });
        setShowVideoNote(true);
      }
    })();
  }
}, []);


const handleFileChange = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file);
  setVideoFile(file);
  setVideoPreview(fileURL);
  setUploadStatus('');
  setProgress(0);
  setShowVideoNote(false);

  // Save video to localStorage
  const reader = new FileReader();
  reader.onloadend = () => {
    localStorage.setItem('tempVideo', reader.result);
  };
  reader.readAsDataURL(file);

  // Get metadata
  try {
    const { duration, width, height } = await getVideoMetadata(file);
    const quality = `${height}p`;
    const durationMinutes = Math.ceil(duration / 60);
    const qualityCostMap = {
      "1080p": 1,
      "2.7K": 2,
      "4K": 3,
      "8K": 6,
    };

    if (!qualityCostMap[quality]) {
      setVideoMeta({
        error: `Unsupported video quality (${quality}). Only 1080p, 2.7K, 4K, and 8K are allowed.`,
      });
      setShowVideoNote(true);
      return;
    }

    const cost = durationMinutes * qualityCostMap[quality];
    const hasFreeMinute = user?.hasFreeConversion;
    const isUsingFreeMinute = hasFreeMinute && durationMinutes <= 1;
    const balance = user?.wallet?.balance || 0;

    setVideoMeta({
      fileName: file.name,
      duration: durationMinutes,
      quality,
      cost,
      balance,
      isUsingFreeMinute,
      canProceed: isUsingFreeMinute || balance >= cost,
    });

    setShowVideoNote(true);
setTimeout(() => {
  videoNoteRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}, 100);

  } catch (err) {
    console.error('Metadata extraction error:', err);
    setVideoMeta({ error: 'Failed to read video metadata.' });
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
const handleUpload = async () => {
  if (!videoFile) return;

  if (!isLoggedIn) {
    router.push('/login');
    return;
  }

  setUploading(true);
  setProgress(0);
  setUploadStatus('');

  try {
    const { duration, width, height } = await getVideoMetadata(videoFile);
    const quality = `${height}p`;
    const durationMinutes = Math.ceil(duration / 60); // round up to nearest minute

    const qualityCostMap = {
      "1080p": 1,
      "2.7K": 2,
      "4K": 3,
      "8K": 6,
    };

    if (!qualityCostMap[quality]) {
      alert("❌ Unsupported video quality. Only 1080p, 2.7K, 4K, and 8K are allowed.");
      setUploading(false);
      return;
    }

    const cost = durationMinutes * qualityCostMap[quality];
    const hasFreeMinute = user?.hasFreeConversion;
    const balance = user?.wallet?.balance || 0;
    const isUsingFreeMinute = hasFreeMinute && durationMinutes <= 1;

    if (isUsingFreeMinute) {
      alert("🎁 Using free 1-minute conversion.");
    } else if (balance < cost) {
      alert(`❌ Not enough credits. You need ${cost} credits for this ${quality} video.`);
      setUploading(false);
      return;
    }

    // ✅ 1. Get signed URL with cost
    const res = await fetch(`${baseUrl}/b2/sign-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        fileName: videoFile.name,
        fileType: videoFile.type,
        usingFreeConversion: isUsingFreeMinute,
        cost, // <-- ✅ now included
      }),
    });

    const { signedUrl, key } = await res.json();

    // 2. Upload
    const uploadRes = await fetch(signedUrl, {
      method: 'PUT',
      body: videoFile,
    });

    if (!uploadRes.ok) throw new Error('Upload to R2 failed');

    // 3. Save metadata
    const saveRes = await fetch(`${baseUrl}/b2/save-metadata`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalFileName: videoFile.name,
        key,
        quality,
        lengthInSeconds: Math.round(duration),
      }),
    });

    if (!saveRes.ok) throw new Error('Metadata save failed');

    localStorage.removeItem('tempVideo');
    setUploadStatus('✅ Upload successful!');
    await refreshAndDispatchUser(dispatch);
    router.push('/dashboard');
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
  <div className="xclusive-header" style={{ marginTop: '30px' }}>
    <Image
      src="/logo.png"
      alt="Xclusive 3D Logo"
      width={160}
      height={90}
      className="logo-1"
    />
  </div>
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
       onDrop={(e) => {
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);
  const file = e.dataTransfer.files?.[0];
  if (file && file.type.startsWith('video/')) {
    const fileURL = URL.createObjectURL(file);

     const reader = new FileReader();
reader.onloadend = () => {
  localStorage.setItem('tempVideo', reader.result);
};
reader.readAsDataURL(file);


    setVideoFile(file);
    setVideoPreview(fileURL);
    setUploadStatus('');
    setProgress(0);
  } else {
    alert('Please drop a valid video file.');
  }
}}
      >
        <div className="upload-icon">
          <FiUpload size={32} />
        </div>
        <h1 className='dropHeading'>Drag & drop your video</h1>
        <p className='dropPara'>Upload your 2D video to convert to 3D</p>

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
  <div
    ref={videoNoteRef}
    className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-md mt-4 text-sm"
  >
    {videoMeta.error ? (
      <p>⚠️ {videoMeta.error}</p>
    ) : (
      <>
        <p><strong>Video:</strong> {videoMeta.fileName}</p>
        <p><strong>Duration:</strong> {videoMeta.duration} minute(s)</p>
        <p><strong>Quality:</strong> {videoMeta.quality}</p>
        <p><strong>Credits Required:</strong> {videoMeta.isUsingFreeMinute ? '0 (using free minute)' : videoMeta.cost}</p>
        <p><strong>Your Balance:</strong> {videoMeta.balance} credit(s)</p>
        {videoMeta.canProceed ? (
          <p className="text-green-700 mt-2 font-medium">
            ✅ You have sufficient credits. You may proceed with the upload.
          </p>
        ) : (
          <p className="text-red-700 mt-2 font-medium">
            ❌ You need <strong>{videoMeta.cost - videoMeta.balance}</strong> more credit(s) to upload this video.
            <br />Please top up your wallet before uploading.
          </p>
        )}
      </>
    )}
  </div>
)}



  {uploadStatus && <p className="upload-status">{uploadStatus}</p>}

 <button
  className="convert-btn"
  onClick={handleUpload}
  disabled={uploading || (isLoggedIn && showVideoNote && videoMeta && !videoMeta.canProceed)}
  style={{
  opacity: uploading || (isLoggedIn && showVideoNote && videoMeta && !videoMeta.canProceed) ? 0.8 : 1,
  cursor: uploading || (isLoggedIn && showVideoNote && videoMeta && !videoMeta.canProceed) ? 'not-allowed' : 'pointer',
}}

>
  {uploading ? (
    <div className="btn-spinner" />
  ) : (
    'Upload to 3D Cloud'
  )}
</button>


  
</div>
</center>

     

      {!isLoggedIn && <center><div className="free-minute">🎁 Get 1 minute of free conversion after registration</div></center>}
{!isLoggedIn && <HomeCredits />}
    {isLoggedIn && <center><Credits /></center>}
    <Whycloud />
    <Whatexpect />
    </div>
  );
};

export default Home;
