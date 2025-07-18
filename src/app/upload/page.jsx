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

 const router = useRouter();
 React.useEffect(() => {
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
  }
}, []);


const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file);

  // Save video to localStorage
  const reader = new FileReader();
reader.onloadend = () => {
  localStorage.setItem('tempVideo', reader.result);
};
reader.readAsDataURL(file);


  setVideoFile(file);
  setVideoPreview(fileURL);
  setUploadStatus('');
  setProgress(0);
};

  const triggerInput = () => inputRef.current.click();
const checkAuth = async () => {
  try {
    const res = await fetch(`${baseUrl}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });
    return res.ok;
  } catch {
    return false;
  }
};

const handleUpload = async () => {
  if (!videoFile) return;

  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    router.push('/login');
    return;
  }

  setUploading(true);
  setProgress(0);
  setUploadStatus('');

  const formData = new FormData();
  formData.append('file', videoFile);

  const fakeProgressInterval = simulateProgress(); // ✅ Only here!

  try {
    const res = await fetch(`${baseUrl}/b2/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    clearInterval(fakeProgressInterval);
    setProgress(100);
    setUploading(false);

    const data = await res.json();

    if (res.ok) {
      localStorage.removeItem('tempVideo');
      setUploadStatus('✅ Upload successful!');
      await refreshAndDispatchUser(dispatch);
      router.push('/dashboard');
    } else {
      setUploadStatus(`❌ Upload failed: ${data.error || 'Unknown error'}`);
    }
  } catch (err) {
    clearInterval(fakeProgressInterval);
    setUploading(false);
    setUploadStatus('❌ Upload failed: Network error');
  }
};

const simulateProgress = () => {
  let value = 0;
  const interval = setInterval(() => {
    value += Math.random() * 10;
    setProgress((prev) => Math.min(Math.floor(value), 95));
  }, 300);
  return interval;
};

  return (
    <div className="xclusive-container">
      <div className="xclusive-header">
        <Image
          src="/logo.png"
          alt="Xclusive 3D Logo"
          width={160}
          height={90}
          className="logo-1"
        />
      </div>

      <div className="upload-section">
  {!videoFile && (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="video/*"
        style={{ display: 'none' }}
      />

      {/* Mobile Button */}
      <button className="mobile-upload-btn" onClick={triggerInput}>
        <FiUpload style={{ marginRight: 8 }} /> Upload Video
      </button>

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
        <p>Drag & drop your <br /><strong>video</strong></p>

        {!videoFile && (
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            ref={inputRef}
            style={{ display: 'none' }}
          />
        )}
      </label>
    </>
  )}

  {/* Video preview after selection */}
  {videoPreview && (
    <div className="preview-box">
      <video src={videoPreview} controls width="100%" />
    </div>
  )}

  {uploading && (
    <div className="progress-wrapper">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <span className="progress-text">{progress}%</span>
      <div className="spinner" />
    </div>
  )}

  {uploadStatus && <p className="upload-status">{uploadStatus}</p>}

  {videoFile && !uploading && (
    <button className="convert-btn" onClick={handleUpload}>
      Upload to 3D Cloud
    </button>
  )}
</div>


      <div className="device-info">
        <span>Meta Quest</span>
        <span>|</span>
        <span>Apple Vision Pro</span>
      </div>

      <div className="free-minute">🎁 Get 1 minute of free conversion</div>

      <div className="credits">
        <button>Buy 10 credits € 9</button>
        <button>Buy 50 credits € 39</button>
        <button>Buy 100 credits € 69</button>
      </div>

      <div className="why-cloud">
        <h3>Why convert to 3D in the cloud?</h3>
        <ul>
          <li><FiCheck className="check-icon" style={{ color: '#5fb6b8' }} /> Experience your existing videos in a new immersive way</li>
          <li><FiCheck className="check-icon" style={{ color: '#5fb6b8' }} /> Ready to upload to YouTube</li>
          <li><FiCheck className="check-icon" style={{ color: '#5fb6b8' }} /> High-quality AI cloud conversion</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
