'use client';

import React, { useEffect, useRef, useState } from 'react';
import './SelectTenSeconds.css';
import { Clock, Play, Pause, Sparkles } from 'lucide-react';

const SELECT_DURATION = 10;

const SelectTenSeconds = ({ videoFile, onConvert, onResetVideo, }) => {
  const videoRef = useRef(null);
  const trackRef = useRef(null);
  const dragOffsetRef = useRef(0);
  const videoUrlRef = useRef(null);
  const pauseTimeRef = useRef(null);

  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const end = Math.min(start + SELECT_DURATION, duration);

  /* ================= VIDEO SOURCE ================= */

  useEffect(() => {
    if (!videoFile || !videoRef.current) return;

    const url = URL.createObjectURL(videoFile);
    videoUrlRef.current = url;

    const video = videoRef.current;
    video.src = url;
    video.load();

    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  /* ================= LOAD METADATA ================= */

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setDuration(Math.floor(video.duration));
      video.currentTime = 0;
    };

    video.addEventListener('loadedmetadata', onLoaded);
    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  /* ================= LOOP + PLAYHEAD ================= */

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isPlaying) return;

    const onTimeUpdate = () => {
      if (video.currentTime >= end) {
        video.currentTime = start;
      }
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, [isPlaying, start, end]);

  /* ================= DRAG LOGIC ================= */

  const onMouseDown = (e) => {
    if (!trackRef.current || duration === 0) return;

    // 🔥 Forget last paused frame
    pauseTimeRef.current = null;

    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const selectedLeftPx = (start / duration) * rect.width;

    dragOffsetRef.current = clickX - selectedLeftPx;
    setIsDragging(true);

    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

// 🔹 updated onMouseMove
const onMouseMove = (e) => {
  if (!isDragging || !trackRef.current || duration === 0) return;

  const rect = trackRef.current.getBoundingClientRect();
  let x = e.clientX - rect.left - dragOffsetRef.current;

  x = Math.max(0, Math.min(x, rect.width));

  // ✅ calculate maxStart safely for short videos
  const maxStart = Math.max(0, duration - SELECT_DURATION);
  let newStart = (x / rect.width) * duration;
  newStart = Math.min(newStart, maxStart);

  setStart(newStart);

  if (videoRef.current) {
    videoRef.current.currentTime = newStart;
    setCurrentTime(newStart);
  }
};

  const onMouseUp = () => {
    setIsDragging(false);
    dragOffsetRef.current = 0;
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  });

  /* ================= PLAY / PAUSE ================= */

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (!isPlaying) {
        let resumeTime = pauseTimeRef.current;

        if (
          resumeTime == null ||
          resumeTime < start ||
          resumeTime >= end
        ) {
          resumeTime = start;
        }

        video.currentTime = resumeTime;
        video.muted = true;
        await video.play();
        setIsPlaying(true);
      } else {
        pauseTimeRef.current = video.currentTime;
        video.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.warn('Play failed:', err);
    }
  };

  /* ================= UI HELPERS ================= */

  // ================= UI HELPERS =================
const startPercent = duration ? (start / duration) * 100 : 0;

// ✅ fix width for short videos
const widthPercent = duration
  ? (Math.min(SELECT_DURATION, duration - start) / duration) * 100
  : 0;

const playheadPercent = duration
  ? Math.min(
      Math.max((currentTime / duration) * 100, startPercent),
      startPercent + widthPercent
    )
  : 0;

  const format = (s) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  /* ================= RENDER ================= */

  return (
    <div className="select-ten-wrapper">

      <div className="select-ten-header">
        <div className="clock-circle">
          <Clock size={50} strokeWidth={2.2} />
        </div>
        <h2>Select your 10 seconds</h2>
        <p>Use the slider to choose which part to convert for free</p>
      </div>

      <div className="video-card">
        <video
          ref={videoRef}
          className="video-preview"
          muted
          playsInline
          preload="metadata"
        />

        <div className="play-overlay" onClick={togglePlay}>
          <div className="play-circle">
            {isPlaying ? (
              <Pause size={26} fill="white" stroke="white" />
            ) : (
              <Play size={26} fill="white" stroke="white" />
            )}
          </div>
        </div>

        <div className="video-info">
          <span>Selected: {format(start)} – {format(end)}</span>
          <span className="free-badge">10 sec FREE</span>
        </div>
      </div>

      {/* ===== SLIDER WRAP (UNCHANGED STRUCTURE) ===== */}
      <div className="slider-wrap">
        <div className="slider-track" ref={trackRef}>

          <div
            className="slider-selected"
            style={{
              left: `${startPercent}%`,
              width: `${widthPercent}%`,
            }}
            onMouseDown={onMouseDown}
          />

          {/* 🔥 PLAYHEAD */}
          {isPlaying && (
            <div
              className="slider-playhead"
              style={{ left: `${playheadPercent}%` }}
            />
          )}

          <div
            className="slider-handle left"
            style={{ left: `calc(${startPercent}% - 7px)` }}
          >
            <span />
            <div className="grip">
              <span />
              <span />
              <span />
            </div>
            <span />
          </div>

          <div
            className="slider-handle right"
            style={{ left: `calc(${startPercent + widthPercent}% - 7px)` }}
          >
            <span />
            <div className="grip">
              <span />
              <span />
              <span />
            </div>
            <span />
          </div>

        </div>

        <div className="slider-meta">
          <span>0:00</span>
          <span className="slider-hint">⬍ Drag handles to select your 10 seconds</span>
          <span>{format(duration)}</span>
        </div>
      </div>
{/* FOOTER */}
      <div className="footer-row">
        <button className="choose-btn" onClick={onResetVideo}>← Choose different video</button>
      </div>
      <button className="convert-btn" onClick={() => onConvert(start, end)}>
        <Sparkles size={20} />
        Convert {format(start)} – {format(end)} to 3D (Free)
      </button>

    </div>
  );
};

export default SelectTenSeconds;
