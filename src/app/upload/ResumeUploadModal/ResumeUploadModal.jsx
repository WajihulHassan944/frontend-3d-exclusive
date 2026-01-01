'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import "./ResumeUploadModal.css";

const ResumeUploadModal = ({ fileName, onResume, onClose }) => {
  const [showProceedStep, setShowProceedStep] = useState(false);

  const handleResumeClick = () => {
    setShowProceedStep(true);
  };

  const handleProceedClick = () => {
    onResume();
  };

  return (
    <div className="resume-modal-backdrop">
      <div className="resume-modal">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <h2>
          {showProceedStep
            ? 'Reselect Video to Continue'
            : 'Resume Last Upload?'}
        </h2>

        <p>
          {showProceedStep
            ? 'Please reselect the same video file to continue uploading remaining parts:'
            : 'You have an unfinished upload for:'}
        </p>

        {showProceedStep && (
          <p className="file-name">{fileName}</p>
        )}

        {!showProceedStep && (
          <p className="file-name">{fileName}</p>
        )}

        <div className="modal-actions">
          {!showProceedStep ? (
            <button className="resume-btn" onClick={handleResumeClick}>
              Resume Upload
            </button>
          ) : (
            <button className="resume-btn" onClick={handleProceedClick}>
              Proceed?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadModal;
