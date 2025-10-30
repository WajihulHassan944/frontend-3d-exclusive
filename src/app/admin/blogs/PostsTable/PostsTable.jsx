'use client';
import React, { useEffect, useState, useRef } from 'react';
import { FiSearch, FiEye, FiFileText, FiCalendar } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { User } from 'lucide-react';
import toast from 'react-hot-toast';
import './PostsTable.css';
import { baseUrl } from '@/const';
import Link from 'next/link';

const categoryOptions = [
  'Tutorials',
  'Getting Started',
  'Advanced',
  'Pricing',
  'Guide',
  'News',
  'Updates',
  'Insights'
];

const PostsTable = ({refreshKey, onDeleted}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'All Status',
    category: 'All Categories',
  });
  const menuRef = useRef(null);

  // --- Fetch blogs ---
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/blogs/all`, {
        cache: 'no-store',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setPosts(data.blogs);
      } else {
        toast.error('Failed to load blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
      toast.error('Error fetching blogs');
    } finally {
      setLoading(false);
    }
  };

  // --- Delete handler ---
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevent dropdown from closing
    if (!confirm('Are you sure you want to delete this blog?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${baseUrl}/blogs/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        setPosts((prev) => prev.filter((p) => p._id !== id));
        toast.success('Blog deleted successfully');
            if(onDeleted) onDeleted();
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Something went wrong');
    } finally {
      setDeletingId(null);
      setActiveMenu(null);
    }
  };

  // --- Filtered Posts ---
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const matchesStatus =
      filters.status === 'All Status' ||
      post.status.toLowerCase() === filters.status.toLowerCase();
    const matchesCategory =
      filters.category === 'All Categories' ||
      post.categories.includes(filters.category);
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // --- Click outside to close menu ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [refreshKey]);

  return (
    <div className="posts-wrapper">

      {/* Search + Filters */}
      <div className="posts-header">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search posts..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>
        <div className="filter-dropdowns">
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Scheduled</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option>All Categories</option>
            {categoryOptions.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="posts-table">
        <div className="table-header">
          <div>Title</div>
          <div>Author</div>
          <div>Categories</div>
          <div>Status</div>
          <div>Date</div>
          <div>Stats</div>
        </div>

      {loading ? (
  Array.from({ length: 5 }).map((_, idx) => (
    <div key={idx} className="table-row skeleton-line">
      {Array.from({ length: 6 }).map((_, colIdx) => (
        <div key={colIdx} className="skeleton-loader"></div>
      ))}
    </div>
  ))
) : filteredPosts.length === 0 ? (
  <p className="no-posts">No blogs found.</p>
) : (
          filteredPosts.map((post, idx) => (
            <div key={post._id} className="table-row">
              <div className="post-title">
                <div
                  className="thumb"
                  style={{
                    backgroundImage: `url(${post.featuredImage || '/placeholder.jpg'})`,
                    
                  }}
                ></div>
                <div className="title-text">
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                </div>
              </div>

              <div className="post-author">
                <span>
                  <User size={17} />
                </span>{' '}
                {post.author?.firstName} {post.author?.lastName}
              </div>

              <div className="post-categories">
                {post.categories.map((cat, i) => (
                  <span key={i} className="cat-badge">
                    {cat}
                  </span>
                ))}
              </div>

              <div className={`post-status ${post.status.toLowerCase()}`}>
                {post.status}
              </div>

              <div className="post-date">
                <FiCalendar />{' '}
                {new Date(post.publishDate || post.createdAt).toLocaleDateString()}
              </div>

              <div className="post-stats">
                <FiEye /> {post.views || 0} &nbsp; <FiFileText />{' '}
                {post.commentsCount || 0}
              </div>

              <div className="post-menu" ref={menuRef}>
                <BsThreeDotsVertical
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(activeMenu === idx ? null : idx);
                  }}
                  className="menu-icon"
                />
                {activeMenu === idx && (
                  <div
                    className="dropdown-menu unique-dropdown" ref={menuRef}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="delete-btn"
                      onClick={(e) => handleDelete(e, post._id)}
                      disabled={deletingId === post._id}
                    >
                      {deletingId === post._id ? (
                        <div className="spinner-del"></div>
                      ) : (
                        'Delete'
                      )}
                    </button>
                   <Link href={`/admin/blogs/new?id=${post._id}`} className="update-link">
      Update
    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostsTable;
