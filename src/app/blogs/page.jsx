'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import './blogs.css';

const blogs = [
  {
    title: "🌀 How 2D to 3D Video Conversion Works – and Why It's So Demanding",
    type: "Tutorial",
    date: "1/15/2024",
    readTime: "8 min",
    summary:
      "A deep dive into the AI-driven pipeline that transforms flat videos into immersive 3D experiences, and why it requires serious...",
    image: "/blogs/one.jpg",
    path: "/blogs/vr-conversion-process",
  },
  {
    title: "🚀 Unlocking the Power of 3D Video in Business: Training, VR, and...",
    type: "Insights",
    date: "1/10/2024",
    readTime: "6 min",
    summary:
      "How 3D video technology is revolutionizing business training, marketing, and communication across industries.",
    image: "/blogs/two.jpg",
    path: "/blogs/vr-client-expectations",
  },
  {
    title:
      "🕶️ How to Watch Full Side-by-Side and MV-HEVC 3D Videos from...",
    type: "Tutorial",
    date: "1/8/2024",
    readTime: "7 min",
    summary:
      "At Xclusive3D.com, we transform your regular 2D videos into immersive 3D experiences. Once you've downloaded your converted...",
    image: "/blogs/three.jpg",
    path: "/blogs/vr-business-advantages",
  },
  {
    title: "🎥 Full Side-by-Side vs MV-HEVC: What's the Difference – and When...",
    type: "Technology",
    date: "1/5/2024",
    readTime: "6 min",
    summary:
      "Understanding the differences between Full SBS and MV-HEVC formats for 3D video content.",
    image: "/blogs/four.jpg",
    path: "/blogs/top-vr-applications",
  },
  {
    title: "🔮 The Future Is in 3D: Why 3D Video Is the Missing Link for VR",
    type: "Business",
    date: "1/3/2024",
    readTime: "6 min",
    summary:
      "Exploring how 3D video technology is transforming VR experiences and bridging the gap between passive viewing and active...",
    image: "/blogs/five.jpg",
    path: "/blogs/vr-business-opportunities",
  },
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="blog-section">
      <h1 className="blog-title">VR 3D Content Blog</h1>
     <center> <p className="blog-subtitle">
        Discover everything about 3D content for Meta Quest and Apple Vision Pro. From conversion to implementation.
      </p></center>

      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card" onClick={() => router.push(blog.path)}>
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <div className="blog-meta">
                <span className={`blog-tag ${blog.type.toLowerCase()}`}>{blog.type}</span>
                <span>📅 {blog.date}</span>
                <span>⏱ {blog.readTime}</span>
              </div>
              <h3 className="blog-heading">{blog.title}</h3>
              <p className="blog-summary">{blog.summary}</p>
              <p className="blog-readmore">Read more →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
