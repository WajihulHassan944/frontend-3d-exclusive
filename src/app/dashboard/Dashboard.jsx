'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js';
import './dashboard.css';
import withAuth from '@/hooks/withAuth';
import WriteReviewSection from './WriteReviewSection/WriteReviewSection';
import { AlertCircle, CheckCircle, Clock,  Download,  UploadCloud } from 'lucide-react';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const { wallet, videos: initialVideos = [] } = user;
  const [videos, setVideos] = useState([]);

useEffect(() => {
  // Load videos from Redux if available
  if (user?.videos?.length) {
    setVideos(user.videos);
  }

  // Setup Pusher
  const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  });

  const channel = pusher.subscribe('exclusive');

  channel.bind('status-update', (data) => {
    if (!data || !data.status || !data.videoId) return;

    setVideos((prev) =>
      prev.map((v) =>
        v._id === data.videoId
          ? {
              ...v,
              status: data.status,
              ...(data.signedUrl ? { convertedUrl: data.signedUrl } : {}),
            }
          : v
      )
    );
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };
}, [user]);

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
                  Processing
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
            </span>

            <span>{new Date(v.startedAt).toLocaleDateString("en-GB")}</span>

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