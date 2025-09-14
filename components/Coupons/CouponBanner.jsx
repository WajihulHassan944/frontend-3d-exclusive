import React, { useState, useEffect } from "react";
import "./CouponBanner.css";
import { Copy, X, Check } from "lucide-react";
import { baseUrl } from "@/const";

const CouponBanner = () => {
  const [visible, setVisible] = useState(true);
  const [copiedId, setCopiedId] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch(`${baseUrl}/coupons/valid`);
        const data = await res.json();
        if (data.success) setCoupons(data.data);
      } catch (err) {
        console.error("Failed to fetch coupons:", err);
      }
    };
    fetchCoupons();
  }, []);

  // Rotate coupons
  useEffect(() => {
    if (coupons.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % coupons.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [coupons]);

  const handleCopy = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!visible || coupons.length === 0) return null;

  const currentCoupon = coupons[currentIndex];

  return (
    <div className="coupon-banner">
      <div
        key={currentCoupon._id} // 👈 important for re-mounting animation
        className="coupon-slide"
      >
        <div className="flexedDiv">
          <p className="coupon-text">{currentCoupon.description}</p>
          <span className="coupon-code">
            Code: <span className="code">{currentCoupon.code}</span>
            {copiedId === currentCoupon._id ? (
              <Check size={15} className="copy-icon" />
            ) : (
              <Copy
                size={15}
                className="copy-icon"
                onClick={() =>
                  handleCopy(currentCoupon.code, currentCoupon._id)
                }
              />
            )}
          </span>
        </div>
      </div>
      <X size={16} className="close-icon" onClick={() => setVisible(false)} />
    </div>
  );
};

export default CouponBanner;
