'use client';
import React, { useState } from 'react';
import './FormatSection.css';
import { FaRegFileVideo } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import { FilePlay } from 'lucide-react';

export default function FormatSection() {
  const [activePreset, setActivePreset] = useState('cinema');

  return (
    <div className="format-section">
      <div className="format-container">
        <h2 className="format-heading">Available Formats</h2>
        <p className="format-subheading">Choose the format that matches your device</p>

        <div className="format-list">
          <div className="format-card">
            <FilePlay className="format-icon" />
            <div>
              <h3 className="format-label">Full Side-by-Side (SBS)</h3>
              <p className="format-text">
                Universal format compatible with Meta Quest, Samsung XR, PlayStation VR, and all other VR headsets.
              </p>
            </div>
          </div>

          <div className="format-card" style={{opacity:'0.3'}}>
            <FilePlay className="format-icon pink" />
            <div>
              <h3 className="format-label">MV-HEVC Spatial Video <span className='comingSoonLabel'>Coming Soon</span></h3>
              <p className="format-text">
                Optimized format specifically for Apple Vision Pro with superior compression and quality.
              </p>
            </div>
          </div>
        </div>
      </div>

      <center>
        <div className="preset-tabs">
        <button
          className={`preset-tab ${activePreset === 'cinema' ? 'active' : ''}`}
          onClick={() => setActivePreset('cinema')}
        >
          Cinema
        </button>
        <button
          className={`preset-tab ${activePreset === 'comfort' ? 'active' : ''}`}
          onClick={() => setActivePreset('comfort')}
        >
          Comfort
        </button>
        <button
          className={`preset-tab ${activePreset === 'aggressive' ? 'active' : ''}`}
          onClick={() => setActivePreset('aggressive')}
        >
          Aggressive
        </button>
      </div>

      </center>
      <div className="preset-box">
        {activePreset === 'cinema' && (
          <>
            <h3 className="preset-title">Cinema Preset</h3>
            <p className="preset-desc">Perfect for movies and series - balanced depth and comfort</p>
            <p className="preset-info">
              <FiEye className="eye-icon" /> Moderate depth, smooth transitions, optimal for long viewing
            </p>
          </>
        )}

        {activePreset === 'comfort' && (
          <>
            <h3 className="preset-title">Comfort Preset</h3>
            <p className="preset-desc">Ideal for extended viewing - subtle 3D experience</p>
            <p className="preset-info">
              <FiEye className="eye-icon" /> Gentle depth, minimal eye strain, perfect for beginners
            </p>
          </>
        )}

        {activePreset === 'aggressive' && (
          <>
            <h3 className="preset-title">Aggressive Preset</h3>
            <p className="preset-desc">Maximum depth effect - intense 3D experience</p>
            <p className="preset-info">
              <FiEye className="eye-icon" /> Maximum depth, dramatic effect, for experienced users
            </p>
          </>
        )}
      </div>
    </div>
  );
}
