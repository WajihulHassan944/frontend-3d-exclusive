'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { ImageIcon, VideoIcon, MoreVertical, Link2 } from 'lucide-react';
import './MediaTable.css';
import { baseUrl } from '@/const';

const MediaTable = ({
  searchQuery = '',
  filterType = 'all',
  selectAll = false,
  onSelectionChange = () => {},
}) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState([]); // ✅ internal selection state

  // 🔹 Fetch media data
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/media/all`);
        const data = await res.json();
        if (res.ok) {
          setMediaItems(data.media || []);
        } else {
          setError(data.message || 'Failed to fetch media');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching media');
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  // 🔹 Filter + search
  const filteredMedia = useMemo(() => {
    return mediaItems.filter((item) => {
      const matchesType =
        filterType === 'all' ||
        item.type === filterType ||
        (filterType === 'external' && item.type === 'external');
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [mediaItems, filterType, searchQuery]);

  // 🔹 Handle "select all" toggle from parent or manually
  useEffect(() => {
    if (selectAll) {
      const allSelected = filteredMedia.map((m) => m._id);
      setSelected(allSelected);
      const selectedItems = filteredMedia.map((m) => ({
        id: m._id,
        url: m.url,
        type: m.type,
      }));
      onSelectionChange(selectedItems);
    } else {
      setSelected([]);
      onSelectionChange([]);
    }
  }, [selectAll, filteredMedia]);

  // 🔹 Handle individual item toggle
  const toggleSelectItem = (id) => {
    const newSelected = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];

    setSelected(newSelected);

    const selectedItems = mediaItems
      .filter((item) => newSelected.includes(item._id))
      .map((item) => ({
        id: item._id,
        url: item.url,
        type: item.type,
      }));

    onSelectionChange(selectedItems);
  };

  // 🔹 Handle header checkbox
  const allSelected =
    filteredMedia.length > 0 &&
    filteredMedia.every((item) => selected.includes(item._id));

  const toggleSelectAll = (checked) => {
    if (checked) {
      const allIds = filteredMedia.map((m) => m._id);
      setSelected(allIds);
      const selectedItems = filteredMedia.map((m) => ({
        id: m._id,
        url: m.url,
        type: m.type,
      }));
      onSelectionChange(selectedItems);
    } else {
      setSelected([]);
      onSelectionChange([]);
    }
  };

  if (loading) return <div className="media-loading">Loading media...</div>;
  if (error) return <div className="media-error">{error}</div>;

  return (
    <div className="media-table-wrapper">
      <table className="media-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="table-checkbox"
                checked={allSelected}
                onChange={(e) => toggleSelectAll(e.target.checked)}
              />
            </th>
            <th>Preview</th>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Dimensions</th>
            <th>Upload Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredMedia.map((item) => (
            <tr key={item._id} className="media-row">
              <td>
                <input
                  type="checkbox"
                  className="table-checkbox"
                  checked={selected.includes(item._id)}
                  onChange={() => toggleSelectItem(item._id)}
                />
              </td>

              <td>
                <div className="preview-cell">
                  {item.type === 'video' ? (
                    <video
                      src={item.url}
                      className="preview-video"
                      preload="metadata"
                      muted
                    />
                  ) : item.type === 'external' ? (
                    <div className="video-placeholder">
                      <Link2 size={22} color="#555" />
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="preview-img"
                    />
                  )}
                </div>
              </td>

              <td>
                <div className="name-cell">
                  <span className="file-name">{item.name}</span>
                  {item.tags?.length > 0 && (
                    <div className="tags">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </td>

              <td className="type-cell-table">
                {item.type === 'image' && <ImageIcon size={18} />}
                {item.type === 'video' && <VideoIcon size={18} />}
                {item.type === 'external' && <Link2 size={18} />}
                <span style={{ textTransform: 'capitalize' }}>
                  {item.platform || item.type}
                </span>
              </td>

              <td>{item.size || 'N/A'}</td>
              <td>{item.dimensions || 'N/A'}</td>
              <td>
                {new Date(item.uploadDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>

              {/* <td className="actions-cell">
                <MoreVertical size={18} color="#555" />
              </td> */}
            </tr>
          ))}

          {filteredMedia.length === 0 && (
            <tr>
              <td colSpan="8" className="no-results">
                No media found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MediaTable;
