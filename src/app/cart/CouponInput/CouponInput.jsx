import React, { useState } from 'react'
import "./CouponInput.css";
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
const CouponInput = ({ onValidate }) => {
  const [coupon, setCoupon] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
const handleApply = async () => {
    if (!coupon.trim()) {
      toast.error("Please enter a coupon code first.");
      return;
    }
  try {
    setLoading(true);
    const res = await fetch(`${baseUrl}/coupons/validate-coupon`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: coupon }),
      credentials: 'include',
    });

    const data = await res.json();

    if (data.success) {
      onValidate(data.coupon);  // send full coupon object up
      setError("");
    } else {
      onValidate(null);         // tell parent to reset discount
      setError(data.message || "Invalid coupon");
    }
  } catch (err) {
    console.error("Coupon validation error:", err);
    setError("Error validating coupon");
  }finally{
    setLoading(false);
  }
};

return (
  <div>
    <div className="coupon-input-container">
      <input
        type="text"
        placeholder="Enter coupon code"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        className="coupon-input"
      />
      <button
        type="button"
        onClick={handleApply}
        className="coupon-btn"
        disabled={loading}
      >
        {loading ? "Checking..." : "Apply"}
      </button>
    </div>

    {error && <p className="coupon-error">{error}</p>}
    {/* {!error && !loading && coupon && (
      <p className="coupon-success">Coupon applied successfully</p>
    )} */}
  </div>
)
}

export default CouponInput
