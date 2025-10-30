"use client";
import React, { useState } from "react";
import "./EditProductModal.css";

export default function EditProductModal({ onClose, onSave, product }) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    credits: product?.credits || "",
    priceEUR: product?.priceEUR || "",
    originalPriceEUR: product?.originalPriceEUR || "",
    description: product?.description || "",
    features: product?.features?.join("\n") || "",
    isPopular: product?.isPopular || false,
    packageType: product?.packageType || "Standard",
    isActive: product?.isActive ?? true,
    localizedPricing: product?.localizedPricing || [],
  });

  const [showLocalized, setShowLocalized] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLocalizedChange = (index, field, value) => {
    const updated = [...formData.localizedPricing];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      localizedPricing: updated,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...formData,
      features: formData.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    };
    onSave?.(updated);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2 className="modal-title">Edit Product</h2>
        <p className="modal-subtitle">Update product details and pricing</p>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Row 1: Name & Credits */}
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Pro Package"
              />
            </div>
            <div className="form-group">
              <label>Credits</label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                placeholder="50"
              />
            </div>
          </div>

          {/* Row 2: Price & Original Price */}
          <div className="form-row">
            <div className="form-group">
              <label>Price (€)</label>
              <input
                type="number"
                name="originalPriceEUR"
                value={formData.originalPriceEUR}
                onChange={handleChange}
                placeholder="135"
              />
            </div>
            <div className="form-group">
              <label>Strike Through Price (€)</label>
              <input
                type="number"
                name="priceEUR"
                value={formData.priceEUR}
                onChange={handleChange}
                placeholder="110"
              />
            </div>
          </div>

          {/* 💠 Localized pricing link */}
          <p
            className="localized-toggle"
            onClick={() => setShowLocalized((prev) => !prev)}
          >
            {showLocalized ? "Hide localized pricing" : "Edit localized pricing"}
          </p>

          {/* Conditionally render localized pricing fields */}
          {showLocalized && (
            <div className="localized-section">
              {formData.localizedPricing.length > 0 ? (
                formData.localizedPricing.map((lp, index) => (
                  <div className="localized-row" key={index}>
                    <span className="currency-label">{lp.currency}</span>
                    <input
                      type="number"
                      value={lp.price}
                      onChange={(e) =>
                        handleLocalizedChange(index, "price", e.target.value)
                      }
                    />
                  </div>
                ))
              ) : (
                <p className="no-localized">No localized pricing available</p>
              )}
            </div>
          )}

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              placeholder="Best value for power users"
            />
          </div>

          {/* Features */}
          <div className="form-group">
            <label>Features (one per line)</label>
            <textarea
              name="features"
              rows="4"
              value={formData.features}
              onChange={handleChange}
              placeholder="Up to 6K conversion"
            />
          </div>

          {/* Toggles */}
          <div className="form-toggles">
            <div className="toggle-item">
              <label>Mark as Popular</label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="isPopular"
                  checked={formData.isPopular === true}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isPopular: e.target.checked ? true : false,
                    }))
                  }
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="toggle-item">
              <label>Active</label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
