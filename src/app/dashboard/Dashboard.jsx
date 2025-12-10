'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js';
import './dashboard.css';
import withAuth from '@/hooks/withAuth';
import WriteReviewSection from './WriteReviewSection/WriteReviewSection';
import { AlertCircle, CheckCircle, Clock,  Download,  UploadCloud, XCircle } from 'lucide-react';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const { wallet, videos: initialVideos = [] } = user;
  const [videos, setVideos] = useState([]);
 useEffect(() => {
  if (user?.videos?.length) {
    setVideos(user.videos);
  }

  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  });

  const channel = pusher.subscribe("exclusive");

  channel.bind("status-update", (data) => {
    console.log("📡 Incoming Pusher Update:", data);

    if (!data || !data.status || !data.videoId) return;

    setVideos((prev) =>
      prev.map((v) => {
        if (v._id !== data.videoId) return v;

        const updated = {
          ...v,
          status: data.status,
          progress: data.progress ?? v.progress,
          errorMessage: data.errorMessage ?? v.errorMessage,
          creditsUsed: data.creditsUsed ?? v.creditsUsed,
          quality: data.quality ?? v.quality,
          startedAt: data.startedAt ?? v.startedAt,
          ...(data.signedUrl ? { convertedUrl: data.signedUrl } : {}),
        };

        console.log("🔄 Video Updated:", updated);
        return updated;
      })
    );
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };
}, []); // ✅ RUN ONCE, NOT ON EVERY USER CHANGE

  const totalVideos = videos.length;
  const completed = videos.filter((v) => v.status === 'completed').length;
  const hasPendingReview = user?.invoices?.some(inv => inv.reviewGiven === false);
  
return (
  <main className="dashboard">
    <h2 className="dashboard-title">Dashboard</h2>
    <p className="dashboard-subtitle">Manage your conversions and credits</p>

    {/* Stats Cards */}
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Available Credits</h3>
        <p className="stat-value">{wallet?.balance ?? 0}</p>
        <Link href="/pricing" className="stat-btn">Buy More Credits</Link>
      </div>

      <div className="stat-card">
        <h3>Total Conversions</h3>
        <p className="stat-value">{videos.length}</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p className="stat-value completed">
          {videos.filter((v) => v.status === "completed").length}
        </p>
      </div>
    </div>

    {/* Videos Table */}
    <section className="table-section">
      <h3 className="section-title">Your Conversions</h3>

      <div className="table-header">
        <span>Video</span>
        <span>Status</span>
        <span>Date</span>
        <span>Action</span>
      </div>

      {videos.length === 0 ? (
        <p className="no-videos">
          <em>No videos uploaded yet.</em>
        </p>
      ) : (
        videos.map((v) => (
          <div key={v._id} className="table-row">
            <span>{v.originalFileName}</span>
<span className={`status-pill ${v.status.toLowerCase()}`}>

  {v.status === "pending" && (
    <>
      <Clock className="status-icon pending" size={16} />
      Pending
    </>
  )}

  {v.status === "processing" && (
    <>
      <Clock className="status-icon processing" />

      <span className="processing-text">
        Processing
        {v.estimatedProcessingTime && (
          <span className="info-wrapper">
            <AlertCircle className="info-icon" size={14} />
            <span className="info-tooltip">
              Total Expected Processing Time: {(() => {
                const totalMinutes = v.estimatedProcessingTime || 0;
                const totalSeconds = Math.round(totalMinutes * 60);

                const hrs = Math.floor(totalSeconds / 3600);
                const mins = Math.floor((totalSeconds % 3600) / 60);
                const secs = totalSeconds % 60;

                if (hrs > 0) return `${hrs}h ${mins}m`;
                if (mins > 0) return `${mins}m ${secs}s`;
                return `${secs}s`;
              })()}
            </span>
          </span>
        )}
      </span>
    </>
  )}

  {v.status === "completed" && (
    <>
      <CheckCircle className="status-icon completed" size={16} />
      Completed
    </>
  )}

  {v.status === "expired" && (
    <>
      <AlertCircle className="status-icon expired" size={16} />
      Expired
    </>
  )}

  {v.status === "uploaded" && (
    <>
      <UploadCloud className="status-icon uploaded" size={16} />
      Uploaded
    </>
  )}

  {/* ✅ NEW: QUEUED */}
  {v.status === "queued" && (
    <>
      <Clock className="status-icon queued" size={16} />
      Queued
    </>
  )}

  {/* ✅ NEW: FAILED */}
  {v.status === "failed" && (
  <>
    <XCircle className="status-icon failed" size={16} />
    Failed
    {v.errorMessage && (
      <span className="info-wrapper">
        <AlertCircle className="info-icon" size={14} />
        <span className="info-tooltip">
          Error: {v.errorMessage}
        </span>
      </span>
    )}
  </>
)}

</span>

            <span>{new Date(v.createdAt).toLocaleDateString("en-GB")}</span>

            <span className="action-cell">
              {v.status === "completed" ? (
                <Link
                  href={v.convertedUrl}
                  target="_blank"
                  className="download-btn"
                >
                  <Download className="download-icon" size={16} />
                  Download
                </Link>
              ) : v.status === "processing" ? (
                <span className="processing">Processing...</span>
              ) : v.status === "pending" ? (
                <span className="pending">N/A</span>
              ) : v.status === "expired" ? (
                <span className="expired">N/A</span>
              ) : (
                <span className="pending">N/A</span>
              )}
            </span>
          </div>
        ))
      )}
    </section>

{hasPendingReview && <WriteReviewSection />}

  </main>
);



  
}
export default withAuth(Dashboard);