'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import './SchedulePriceChangeModal.css';

export default function SchedulePriceChangeModal({ onClose, onSchedule }) {
  const [formData, setFormData] = useState({
    newPrice: '',
    discount: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule?.(formData);
  };

  const formattedStart = formData.startDate
    ? new Date(formData.startDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No start date';

  const formattedEnd = formData.endDate
    ? new Date(formData.endDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No end date';

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Schedule Price Change</h2>
            <p className="modal-subtitle">
              Set up automatic price changes based on date and time
            </p>
          </div>

          <button className="close-btn-unique" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>New Price ($)</label>
              <input
                type="number"
                name="newPrice"
                value={formData.newPrice}
                onChange={handleChange}
                placeholder="65"
              />
            </div>

            <div className="form-group">
              <label>Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>End Date (optional)</label>
              <div className="end-input">
                {formData.endDate ? (
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    
                  />
                ) : (
                  <div
                    className="end-placeholder"
                    onClick={() =>
                      document.querySelector('input[name="endDate"]').showPicker?.()
                    }
                  >
                    No end date
                  </div>
                )}
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  style={{ display: formData.endDate ? 'none' : 'block' }}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Reason</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="e.g., Black Friday Sale"
            />
          </div>

          <div className="preview-box">
            <p className="preview-title">Preview</p>
            <p className="preview-text">
              Price will change from <strong>$65</strong> to{' '}
              <strong className="highlighted">
                ${formData.newPrice ? formData.newPrice : '65'}
              </strong>
              <br />
              Starting {formattedStart} to {formattedEnd}
            </p>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Schedule Price Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
