'use client';
import React, { useEffect, useState } from 'react';
import "../blogDetails.css";
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { baseUrl } from '@/const';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWebsiteMedia } from '@/redux/features/websiteMedia';

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
const dispatch = useDispatch();
 const { media } = useSelector(state => state.websiteMedia);
  useEffect(() => {
    dispatch(fetchWebsiteMedia());
  }, [dispatch]);
// Get dynamic images
const featuredImage = media?.find(m => m.identifier === slug);

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${baseUrl}/blogs/get-blog-with-slug-url/${slug}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.blog);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="blogDetailsContainer">
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blogDetailsContainer">
        <p>Blog not found.</p>
        <Link href="/blogs" className="backLink">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="blogDetailsContainer">
      <div className="backLink">
        <Link href="/blogs">← Back to Blog</Link>
      </div>

      <div className="metaData">
        <span className="tag">{blog.categories?.[0] || 'General'}</span>
        <span className="date">📅 {new Date(blog.publishDate).toLocaleDateString()}</span>
        <span className="time">⏱️ 5 min</span>
        <span className="views">👁 {blog.views || 0} views</span>
      </div>

      <h1 className="title">{blog.title}</h1>

      {blog.excerpt && (
        <p className="subheading">{blog.excerpt}</p>
      )}

      {blog.featuredImage && (
        <div className="blogImageWrapper">
        <center> <Image
  src={featuredImage?.url}
  alt={blog.title}
  width={featuredImage.transformations.resizeWidth || 1200}
  height={featuredImage.transformations.resizeHeight || 700}
  className="blogImage"
  style={{
    transform: `rotate(${featuredImage.transformations.rotate || 0}deg)`,
    filter: `${featuredImage.transformations.filter || ""} brightness(${featuredImage.transformations.filterIntensity || 100}%)`,
    width: featuredImage.transformations.resizeWidth || featuredImage.transformations.cropWidth || "auto",
    height: featuredImage.transformations.resizeHeight || featuredImage.transformations.cropHeight || "auto",
    
  }}
/></center>
        </div>
      )}

      <div className="blogContent">
        {/* Convert plain text or Markdown content safely */}
  <div
  className="blog-text"
  dangerouslySetInnerHTML={{
    __html: blog.content
      // Add <h2> to the first line
      .replace(/^([^\r\n]+)/, "<h2>$1</h2>")
      // Add <h3> to emoji-started headings
      .replace(/\r\n\r\n([🎥🧠🖥️🔒🚀💡].+?)\r\n/g, "<h3>$1</h3>")
      // Detect any tab-separated table block and convert dynamically
      .replace(
        /((?:[^\r\n]+\t[^\r\n]+(?:\r\n|$))+)/g,
        (match) => {
          const lines = match
            .trim()
            .split(/\r\n/)
            .filter((line) => line.trim() !== "");

          if (lines.length < 2) return match; // skip if not at least header + one row

          const headers = lines[0].split("\t");
          const rows = lines.slice(1);

          const headerHTML = `<tr>${headers
            .map((h) => `<th>${h.trim()}</th>`)
            .join("")}</tr>`;

          const bodyHTML = rows
            .map(
              (row) =>
                `<tr>${row
                  .split("\t")
                  .map((cell) => `<td>${cell.trim()}</td>`)
                  .join("")}</tr>`
            )
            .join("");

          return `<table class="formatTable"><thead>${headerHTML}</thead><tbody>${bodyHTML}</tbody></table>`;
        }
      )
      // Convert remaining line breaks to <br>
      .replace(/\r\n/g, "<br/>"),
  }}
/>


        <Link className="ctaButton" href="/signup">
          Get Started with Your VR Project
        </Link>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
