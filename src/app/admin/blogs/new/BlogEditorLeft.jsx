import React, { useState, useEffect } from 'react';
import { Image, UploadCloud, X } from 'lucide-react';

const BlogEditorLeft = ({ blogData, onChange }) => {
  const [preview, setPreview] = useState(null);
  const [slugEditedManually, setSlugEditedManually] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange('featuredImage', file);
      setPreview(URL.createObjectURL(file)); // create preview URL
    }
  };

  const removeImage = () => {
    onChange('featuredImage', null);
    setPreview(null);
  };

  // Generate slug automatically from title
  useEffect(() => {
    if (!slugEditedManually && blogData.title) {
      const generatedSlug = blogData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // remove punctuation & emojis
        .trim()
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .slice(0, 80); // limit length

      onChange('slug', generatedSlug);
    }
  }, [blogData.title]);

  // Mark slug as manually edited if user types directly in slug input
  const handleSlugChange = (e) => {
    setSlugEditedManually(true);
    onChange('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'));
  };

  // If blogData.featuredImage is already a URL (editing existing blog)
  useEffect(() => {
    if (blogData.featuredImage && typeof blogData.featuredImage === 'string') {
      setPreview(blogData.featuredImage);
    }
  }, [blogData.featuredImage]);

  return (
    <div className="blog-left">
      <label className="label">Post Title</label>
      <input
        className="input"
        placeholder="Enter title"
        value={blogData.title}
        onChange={(e) => onChange('title', e.target.value)}
      />

      <label className="label">URL Slug</label>
      <input
        className="input"
        placeholder="post-url-slug"
        value={blogData.slug}
        onChange={handleSlugChange}
      />

      <label className="label">Featured Image</label>
      <div className="featured-box">
        {preview ? (
          <div>
            <img
              src={preview}
              alt="Preview"
              className="featured-preview-image"
            />
            <button
              onClick={removeImage}
              type="button"
              className="close-btn-img"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="featured-content">
            <Image size={48} strokeWidth={1.6} className="featured-icon" />
            <p className="featured-text">
              Upload a featured image for your post
            </p>
            <label className="upload-btn">
              <UploadCloud size={16} strokeWidth={1.6} />
              <span>Upload Image</span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </div>

      <label className="label mt-4">Excerpt</label>
      <textarea
        className="textarea"
        placeholder="Brief description of your post..."
        value={blogData.excerpt}
        onChange={(e) => onChange('excerpt', e.target.value)}
      />

      <label className="label mt-4">Content</label>
      <textarea
        className="textarea"
        placeholder="Write your post content here... (Markdown supported)"
        value={blogData.content}
        onChange={(e) => onChange('content', e.target.value)}
      />
    </div>
  );
};

export default BlogEditorLeft;
