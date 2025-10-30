import React from "react";
import { Download } from "lucide-react";
import "./DownloadSamples.css";

const DownloadSamples = () => {
  return (
    <div className="samples-container">
     <center>
       <div className="samples-grid">
        {/* Card 1 */}
        <div className="sample-card">
          <h3 className="sample-title">Full Side-by-Side</h3>
          <p className="sample-subtitle">All VR Headsets</p>
          <p className="sample-size">
            <span>File Size:</span> 130 MB
          </p>
          <button className="download-btn">
            <Download className="download-icon" size={18} />
            Download Sample
          </button>
        </div>

        {/* Card 2 */}
        <div className="sample-card">
          <h3 className="sample-title">MV-HEVC Spatial</h3>
          <p className="sample-subtitle">Apple Vision Pro</p>
          <p className="sample-size">
            <span>File Size:</span> 100 MB
          </p>
          <button className="download-btn">
            <Download className="download-icon" size={18} />
            Download Sample
          </button>
        </div>
      </div>

     </center>
      {/* How to View Section */}
      <div className="how-to-view">
        <h2 className="how-to-view-title">How to View</h2>
        <ol className="how-to-view-list">
          <li>Download the sample file that matches your device</li>
          <li>Transfer the file to your VR headset</li>
          <li>Open the file in your headset's video player</li>
          <li>Experience the aggressive preset in 3D</li>
        </ol>
      </div>
    </div>
  );
};

export default DownloadSamples;
