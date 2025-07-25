'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { FiDownload, FiUploadCloud, FiLoader } from 'react-icons/fi';
import './dashboard.css';

export default function Dashboard() {
   const user = useSelector((state) => state.user);
  const {  wallet, videos = [] } = useSelector((state) => state.user);

  const totalVideos = videos.length;
  const processing = videos.filter(v => v.status === 'processing').length;
  const completed = videos.filter(v => v.status === 'completed').length;
  const failed = videos.filter(v => v.status === 'failed').length;

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
          <p className="no-videos"><em>No videos uploaded yet.</em></p>
        ) : (
          videos.map((v, index) => (
            <div key={v._id} className="row row-body">
              <span>{index + 1}</span>
              <span>{v.originalFileName}</span>
              <span className={`pill ${v.status.toLowerCase().replace(/\s/g, '-')}`}>
                {v.status}
              </span>
        <span className="download">
  {v.status === 'completed' ? (
    <Link href={v.b2Url} target="_blank">
      <FiDownload size={20} title="Download" />
    </Link>
  ) : v.status === 'processing' ? (
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
          <Link href="/upload" className="topup-btn">Top Up</Link>
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
