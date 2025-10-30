"use client";
import React, { useEffect, useState } from "react";
import { Box, Check, Edit, Calendar } from "lucide-react";
import "./CreditPackages.css";
import EditProductModal from "../EditProductModal/EditProductModal";
import SchedulePriceChangeModal from "../SchedulePriceChangeModal/SchedulePriceChangeModal";
import { baseUrl } from "@/const";
const CreditPackages = ({statusChanged}) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/products`);
        const data = await res.json();
if (data.success && Array.isArray(data.products)) {
  let ordered = data.products || [];
  setPackages(ordered);
} else {
  setError("Failed to load products");
}
      } catch (err) {
        setError("Something went wrong fetching products");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleSchedule = (product) => {
    setSelectedProduct(product);
    setShowScheduleModal(true);
  };


    const handleSave = async (updatedProduct) => {
    try {
      const res = await fetch(`${baseUrl}/products/${selectedProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (data.success) {
        setPackages((prev) =>
          prev.map((p) =>
            p._id === selectedProduct._id ? { ...p, ...updatedProduct } : p
          )
        );
        setShowEditModal(false);
        statusChanged();
      } else {
        console.error("Failed to update product:", data.message);
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };
return (
  <div className="credit-packages">
    <h2 className="credit-title">Credit Packages</h2>

    {error && <p className="error">{error}</p>}

    <div className="credit-grid">
      {(
        !loading && !error
          ? (() => {
              if (!packages || packages.length === 0) return [];

              // Separate popular and others
              const popular = packages.filter((p) => p?.isPopular);
              const others = packages.filter((p) => !p?.isPopular);

              // If exactly one popular package → move it to 2nd position
              if (popular.length === 1) {
                const [singlePopular] = popular;
                const ordered = [];

                // If only one "other" exists, just append popular at the end
                if (others.length === 1) {
                  ordered.push(others[0]);
                  ordered.push(singlePopular);
                } else {
                  ordered.push(others[0]); // first
                  ordered.push(singlePopular); // middle (popular)
                  ordered.push(...others.slice(1)); // rest
                }

                return ordered.filter(Boolean);
              }

              // Otherwise (0 or multiple popular) → keep natural order
              return packages;
            })()
          : Array(3).fill({})
      ).map((pkg, index) => (
        <div
          key={pkg?._id || index}
          className={`credit-card ${
            (pkg?.isPopular) ? "popular" : ""
          }`}
        >
          {(pkg?.isPopular) && (
            <span className="badge">MOST POPULAR</span>
          )}

          <h3 className="pkg-title">
            {loading ? <span className="skeleton-loader" /> : pkg?.name}
          </h3>

          <p className="pkg-desc">
            {loading ? <span className="skeleton-loader" /> : pkg?.description}
          </p>

          <h1 className="pkg-price">
            {loading ? (
              <span className="skeleton-loader" />
            ) : pkg?.originalPriceEUR ? (
              <span className="old-price">€{pkg.originalPriceEUR}</span>
            ) : (
              <span>€{pkg?.priceEUR}</span>
            )}
          </h1>

          <div className="pkg-credits">
            <Box size={20} />
            {loading ? (
              <span className="skeleton-loader" />
            ) : (
              <span>{pkg?.credits} Credits</span>
            )}
          </div>

          <ul className="pkg-features">
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <li key={i}>
                      <span className="skeleton-loader" style={{ width: "80%" }} />
                    </li>
                  ))
              : pkg?.features?.map((feat, i) => (
                  <li key={i}>
                    <Check size={18} />
                    {feat}
                  </li>
                ))}
          </ul>

          <div className="divider"></div>

         <div className="pkg-status">
  {loading ? (
    <span className="skeleton-loader" style={{ width: "60px" }} />
  ) : pkg?.isActive === false ? (
    <span className="inactive-badge">Inactive</span>
  ) : (
    <span className="active-badge">Active</span>
  )}
</div>


          <div className="pkg-actions">
            <button
              className="btn"
              onClick={() => !loading && handleEdit(pkg)}
              disabled={loading}
            >
              <Edit size={16} />
              {loading ? <span className="skeleton-loader" /> : "Edit"}
            </button>
            <button
              className="btn"
              onClick={() => !loading && handleSchedule(pkg)}
              disabled
              style={{ opacity: "0.6", cursor: "not-allowed" }}
            >
              <Calendar size={16} />
              Schedule
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Placeholder Modals */}
    {showEditModal && (
      <EditProductModal
        product={selectedProduct}
        onClose={() => setShowEditModal(false)}
        onSave={handleSave}
      />
    )}

    {showScheduleModal && (
      <SchedulePriceChangeModal
        product={selectedProduct}
        onClose={() => setShowScheduleModal(false)}
      />
    )}
  </div>
);

};

export default CreditPackages;
