"use client";

import React, { useRef, useState } from "react";
import "./StepUploadVideo.css";
import { Clock, Upload } from "lucide-react";
import Processing3D from "./Processing3D/Processing3D";
import SelectTenSeconds from "./SelectTenSeconds/SelectTenSeconds";
import { baseUrl } from "@/const";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Pusher from "pusher-js";


const StepUploadVideo = ({ email, onFreeTrialSuccess, onFreeTrialAlreadyUsed }) => {
  const [processing, setProcessing] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
const [finalVideo, setFinalVideo] = useState(null);
  const fileInputRef = useRef(null);
const ipData = useSelector((state) => state.geo.data);
const [freeTrialVideoId, setFreeTrialVideoId] = useState(null);
const [freeTrialDiscountCode, setFreeTrialDiscountCode] = useState(null);

useEffect(() => {
  if (processing) {
    window.scrollBy({
      top: -400, // ⬆️ scroll up a little (tweak if needed)
      behavior: "smooth",
    });
  }
}, [processing]);

useEffect(() => {
  if (!processing || !freeTrialVideoId) return;

  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  });

  const channel = pusher.subscribe("exclusive");

  channel.bind("status-update", (data) => {
    // ❌ Ignore other videos
    if (!data || data.videoId !== freeTrialVideoId) return;

    // ✅ THIS video only
    if (data.status === "completed") {
       onFreeTrialSuccess?.({
    ...data,
    discountCode: freeTrialDiscountCode,
  });
      setProcessing(false);

      if (data.signedUrl) {
        setFinalVideo(data.signedUrl);
      }

    }

    if (data.status === "failed") {
      setProcessing(false);
      toast.error(data.errorMessage || "Conversion failed");
    }
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
    pusher.disconnect();
  };
}, [processing, freeTrialVideoId]);

  const handleResetVideo = () => {
  setVideoFile(null);
  setFinalVideo(null);
  setProcessing(false);
};
// Drag & Drop Handlers
const handleDragOver = (e) => e.preventDefault();
const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files?.[0];
  if (file) setVideoFile(file);
};

const getVideoMetadata = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");

    video.preload = "metadata";
    video.src = url;

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };

    video.onerror = () => {
      reject(new Error("Failed to load video metadata"));
    };
  });

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i]
  );
};


const trimVideo = (file, start, end) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.muted = true;
    video.playsInline = true;

    video.onloadedmetadata = async () => {
      video.currentTime = start;
    };

    video.onseeked = async () => {
      const stream = video.captureStream();
      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9",
      });

      const chunks = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const trimmedFile = new File([blob], "trimmed-video.webm", {
          type: "video/webm",
        });
        URL.revokeObjectURL(video.src);
        resolve(trimmedFile);
      };

      recorder.start();
      await video.play(); // 🔥 MUST PLAY while recording

      setTimeout(() => {
        recorder.stop();
        video.pause();
      }, (end - start) * 1000);
    };
  });
};

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

const handleConvert = async (start, end) => {
  setProcessing(true);

  try {
    // 1️⃣ Trim video
    const trimmed = await trimVideo(videoFile, start, end);
    setFinalVideo(trimmed);

    // 2️⃣ Extract metadata
    const meta = await getVideoMetadata(trimmed);

    // 3️⃣ Request signed URL (free trial API)
    const res = await fetch(
      `${baseUrl}/b2/free-trial/upload-url`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fileName: trimmed.name,
          fileType: trimmed.type,
          lengthInSeconds: Math.round(meta.duration),
          fileSize: formatFileSize(trimmed.size),
          conversionFormat: "MV-HEVC",
          quality: `${meta.height}p`,
          threeDExperience: "Comfort",
          clientInfo:ipData
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");
setFreeTrialVideoId(data.videoId);
setFreeTrialDiscountCode(data.discountCode);
    await fetch(data.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": trimmed.type },
      body: trimmed,
    });
toast.success('Video Uploaded');
console.log(data);

   } catch (err) {
  console.error("Free trial error:", err);

  const message = err.message || "Free trial failed";

  // 🚫 Free trial already used → go back to Step 1
  if (message.toLowerCase().includes("free trial already used")) {
    setProcessing(false);
    setVideoFile(null);
    onFreeTrialAlreadyUsed?.(); // ✅ inform parent
    return;
  }

  toast.error(message);
  setProcessing(false);
}

};


  if (processing) return <Processing3D />;

  if (videoFile) {
    return (
      <SelectTenSeconds
        videoFile={videoFile}
          onConvert={handleConvert}
      onResetVideo={handleResetVideo}
      />
    );
  }

  return (
    <div className="suv-wrapper">
      <div className="suv-header-icon">
        <Clock size={50} />
      </div>

      <h2 className="suv-title">Upload your video</h2>
      <p className="suv-subtitle">
        Then select which 10 seconds to convert to 3D
      </p>

<div
  className="suv-dropzone"
  onDragOver={handleDragOver}
  onDrop={handleDrop}
>

        <div className="suv-upload-icon">
          <Upload size={36} />
        </div>

        <h3>Drag &amp; drop your video</h3>
        <p>Upload your video for 3D conversion or enhancement</p>

        {/* ✅ FIX HERE */}
        <button
          className="suv-choose-btn"
          onClick={() => fileInputRef.current.click()}
        >
          Choose File
        </button>

        <input
          ref={fileInputRef}
          type="file"
          className="suv-file-input"
          accept="video/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default StepUploadVideo;
