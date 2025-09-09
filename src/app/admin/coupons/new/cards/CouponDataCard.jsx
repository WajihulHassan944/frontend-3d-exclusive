import React from "react";

const CouponDataCard = ({ formData, setFormData }) => {
  const handleDiscountType = (type) =>
    setFormData({ ...formData, discountType: type });

  return (
    <div className="card">
      <h3 className="card-title">Coupon Data</h3>
      <label className="blacked">Discount Type</label>
      <div className="discount-types">
        {["percentage", "cart", "product"].map((type) => (
          <button
            key={type}
            className={formData.discountType === type ? "active" : ""}
            onClick={() => handleDiscountType(type)}
            type="button"
          >
            {type === "percentage"
              ? "Percentage discount"
              : type === "cart"
              ? "Fixed cart discount"
              : "Fixed product discount"}
          </button>
        ))}
      </div>

      <div className="form-check">
        <div className="form-text">
          <label htmlFor="freeShipping">
            Allow free shipping <br />
            <span>Check this if the coupon grants free shipping</span>
          </label>
        </div>
        <label className="form-toggle">
          <input
            type="checkbox"
            id="freeShipping"
            className="toggle-input"
            checked={formData.freeShipping}
            onChange={(e) =>
              setFormData({ ...formData, freeShipping: e.target.checked })
            }
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="form-group">
        <label>Coupon expiry date</label>
        <input
          type="date"
          style={{ maxWidth: "240px" }}
          value={formData.expiryDate}
          onChange={(e) =>
            setFormData({ ...formData, expiryDate: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default CouponDataCard;
