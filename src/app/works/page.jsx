'use client';

import Image from 'next/image';
import './works.css';
import { FaCloudUploadAlt, FaMagic, FaDownload, FaVrCardboard } from 'react-icons/fa';

export default function HowItWorks() {
  return (
    <div className="how-container">
      <Image
        src="https://res.cloudinary.com/daflot6fo/image/upload/v1752555158/two-Photoroom_bvwst2.png"
        alt="Xclusive 3D Logo"
        width={160}
        height={80}
        className="how-logo"
      />

      <h2 className="how-title">How 2D to 3D Conversion Works</h2>

      <div className="step">
        <FaCloudUploadAlt className="step-icon" />
        <div>
          <h3>1. Upload your video</h3>
          <p>Choose a 2D video file to upload</p>
        </div>
      </div>

      <div className="step">
        <FaMagic className="step-icon" />
        <div>
          <h3>2. Our AI server converts it to 3D</h3>
          <p>Your video is processed into 3D</p>
        </div>
      </div>

      <div className="step">
        <FaDownload className="step-icon" />
        <div>
          <h3>3. Download your video</h3>
          <p>Once ready, download your new 3D video</p>
        </div>
      </div>

      <div className="step">
        <FaVrCardboard className="step-icon" />
        <div>
          <h3>4. Enjoy your immersive 3D video on your VR glasses</h3>
        </div>
      </div>

      <p className="how-footer">XCLUSIVE 3D.com</p>
    </div>
  );
}
