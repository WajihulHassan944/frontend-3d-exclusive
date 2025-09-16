import React from "react";
import { Search, CheckCircle, RefreshCcw, Clock, AlertCircle, PauseCircle } from "lucide-react";
import "./ConversionTable.css";

const ConversionTable = () => {
  return (
    <div>
      {/* Search */}
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="Search conversions..." />
      </div>

      {/* Table Container */}
      <div className="table-container">
        <h3>Conversion Queue</h3>
        <p className="subtitle">
          Track all conversion jobs and their current status
        </p>

        {/* Tabs */}
        <div className="tabs">
          <button className="tab active">All (5)</button>
          <button className="tab">Processing (1)</button>
          <button className="tab">Queued (1)</button>
          <button className="tab">Completed (1)</button>
          <button className="tab">Errors (1)</button>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Customer</th>
              <th>File</th>
              <th>Type</th>
              <th>Progress</th>
              <th>Credits</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Completed */}
            <tr>
              <td>
                <span className="status completed">
                  <CheckCircle size={14} /> completed
                </span>
              </td>
              <td>
                <div className="customer">
                  <span className="customer-name">John Doe</span>
                  <span className="customer-email">john@example.com</span>
                </div>
              </td>
              <td>presentation.mp4<br /><span className="file-size">125 MB</span></td>
              <td>Video to Audio</td>
              <td>100%</td>
              <td>25</td>
              <td>5m 22s</td>
              <td></td>
            </tr>

            {/* Processing */}
            <tr>
              <td>
                <span className="status processing">
                  <RefreshCcw size={14} /> processing
                </span>
              </td>
              <td>
                <div className="customer">
                  <span className="customer-name">Jane Smith</span>
                  <span className="customer-email">jane@techstart.com</span>
                </div>
              </td>
              <td>podcast_episode.wav<br /><span className="file-size">89 MB</span></td>
              <td>Audio Enhancement</td>
              <td>
                65%
                <div className="progress-bar">
                  <div className="progress" style={{ width: "65%" }}></div>
                </div>
              </td>
              <td>15</td>
              <td>In progress...</td>
              <td></td>
            </tr>

            {/* Queued */}
            <tr>
              <td>
                <span className="status queued">
                  <Clock size={14} /> queued
                </span>
              </td>
              <td>
                <div className="customer">
                  <span className="customer-name">Mike Johnson</span>
                  <span className="customer-email">mike@designco.nl</span>
                </div>
              </td>
              <td>logo_design.png<br /><span className="file-size">2.5 MB</span></td>
              <td>Image Upscaling</td>
              <td>Waiting</td>
              <td>5</td>
              <td>-</td>
              <td></td>
            </tr>

            {/* Error */}
            <tr>
              <td>
                <span className="status error">
                  <AlertCircle size={14} /> error
                </span>
              </td>
              <td>
                <div className="customer">
                  <span className="customer-name">Sarah Wilson</span>
                  <span className="customer-email">sarah@startup.io</span>
                </div>
              </td>
              <td>marketing_video.mov<br /><span className="file-size">450 MB</span></td>
              <td>Video Compression</td>
              <td>Failed</td>
              <td>0</td>
              <td>Failed</td>
              <td><button className="btn retry"><RefreshCcw size={12} /> Retry</button></td>
            </tr>

            {/* Pending */}
            <tr>
              <td>
                <span className="status pending">
                  <PauseCircle size={14} /> pending
                </span>
              </td>
              <td>
                <div className="customer">
                  <span className="customer-name">Alex Brown</span>
                  <span className="customer-email">alex@creative.com</span>
                </div>
              </td>
              <td>interview.mp3<br /><span className="file-size">67 MB</span></td>
              <td>Audio Transcription</td>
              <td>Waiting</td>
              <td>20</td>
              <td>-</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {/* Error Details */}
        <div className="error-details">
         <AlertCircle size={16} />
          <p>
            <strong>CONV-004 - marketing_video.mov</strong>
            <span>File format not supported. Please use MP4, AVI, or MOV format.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversionTable;
