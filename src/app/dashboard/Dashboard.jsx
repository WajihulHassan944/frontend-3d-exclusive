'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js';
import { FiDownload, FiUploadCloud, FiLoader } from 'react-icons/fi';
import './dashboard.css';

export default function Dashboard() {
  const user = useSelector((state) => state.user);
  const { wallet, videos: initialVideos = [] } = user;
  const [videos, setVideos] = useState([]);

useEffect(() => {
  // Load videos from Redux if available
  if (user?.videos?.length) {
    setVideos(user.videos);
  } else {
    // Fallback to fetch from backend on refresh
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => {
        if (data?.videos) setVideos(data.videos);
      })
      .catch(err => console.error('❌ Failed to fetch videos:', err));
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
  const processing = videos.filter((v) => (v.status === 'processing' || v.status === 'pending' || v.status === 'uploaded')).length;
  const completed = videos.filter((v) => v.status === 'completed').length;
  const failed = videos.filter((v) => v.status === 'failed').length;

  return (
    <main className="dashboard">
      <Image
        src="/logo.png"
        alt="Xclusive 3D Logo"
        width={160}
        height={100}
        className="dashboard-logo"
      />

      <h2 className="title">Dashboard</h2>

      {/* Videos Table */}
      <section className="card-1">
        <header className="row row-head">
          <span>Sr.</span>
          <span>Video</span>
          <span>Status</span>
          <span>Download</span>
        </header>

        {videos.length === 0 ? (
          <p className="no-videos">
            <em>No videos uploaded yet.</em>
          </p>
        ) : (
          videos.map((v, index) => (
            <div key={v._id} className="row row-body">
              <span>{index + 1}</span>
              <span>{v.originalFileName}</span>
              <span
                className={`pill ${v.status.toLowerCase().replace(/\s/g, '-')}`}
              >
                {v.status}
              </span>
              <span className="download">
                {v.status === 'completed' ? (
                  <Link href={v.convertedUrl} target="_blank">
                    <FiDownload size={20} title="Download" />
                  </Link>
                ) : v.status === 'processing' || v.status === 'pending' ? (
                  <FiLoader size={20} title="Processing" className="spinning" />
                ) : (
                  <FiUploadCloud size={20} title="Uploaded" />
                )}
              </span>
            </div>
          ))
        )}
      </section>

      {/* Credits + Profile Cards */}
      <div className="row-2cards">
        <section className="card-1 credits-card">
          <h3>Credits</h3>
          <p className="count">Credits: {wallet?.balance ?? 0}</p>
          <Link href="/pricing" className="topup-btn">
            Top Up
          </Link>
        </section>

        <section className="card-1 profile-card">
          <h3>Your Profile</h3>
          <p>Total Videos: {totalVideos}</p>
          <p>Processing: {processing}</p>
          <p>Completed: {completed}</p>
          <p>Failed: {failed}</p>
        </section>
      </div>
    </main>
  );
}
