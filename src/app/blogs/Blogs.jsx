'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './blogs.css';
import { baseUrl } from '@/const';

const Blogs = ({ section }) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${baseUrl}/blogs/all`);
        const data = await res.json();
        if (data.success) {
          const publishedBlogs = data.blogs.filter(
            (b) => b.status?.toLowerCase() === 'published'
          );
          setBlogs(publishedBlogs);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="blog-section">
      <h1
        className="blog-title"
        dangerouslySetInnerHTML={{
          __html: (section?.title || "Learn more about <span class='highlight'>3D video</span>")
            .replace(/\\u003C/g, "<")
            .replace(/\\u003E/g, ">")
            .replace(/className=/g, "class="),
        }}
      />

      <center>
        <p className="blog-subtitle">{section?.description || "Discover everything about 3D content for Meta Quest and Apple Vision Pro. From conversion to implementation."}</p>
      </center>

      <div className="blog-grid">
        {loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="blog-card"
              onClick={() => router.push(`/blogs/${blog.slug}`)}
            >
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="blog-image"
              />
              <div className="blog-content">
                <div className="blog-meta">
                  <span className={`blog-tag ${blog.categories?.[0]?.toLowerCase() || 'general'}`}>
                    {blog.categories?.[0] || 'General'}
                  </span>
                  <span>📅 {new Date(blog.publishDate).toLocaleDateString()}</span>
                  <span>⏱ 5 min</span>
                </div>
                <h3 className="blog-heading">
                  {blog.title.length > 66
                    ? blog.title.slice(0, 66) + '...'
                    : blog.title}
                </h3>
                <p className="blog-summary">
                  {blog.excerpt.length > 123
                    ? blog.excerpt.slice(0, 123) + '...'
                    : blog.excerpt}
                </p>
                <p className="blog-readmore">Read more →</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Blogs;
