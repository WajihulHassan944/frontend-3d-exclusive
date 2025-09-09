import React from "react";

const UsageRestrictionCard = ({ formData, setFormData }) => {
  return (
    <div className="card">
      <h3 className="card-title">Usage Restriction</h3>
      <div className="flexedDiv">
        <div className="form-group">
          <label>Restriction Code</label>
          <input
            type="text"
            placeholder="Enter restriction code"
            value={formData.restrictionCode}
            onChange={(e) =>
              setFormData({ ...formData, restrictionCode: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Restriction Amount</label>
          <input
            type="number"
            value={formData.restrictionAmount}
            onChange={(e) =>
              setFormData({
                ...formData,
                restrictionAmount: Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      <div className="form-check">
        <div className="form-text">
          <label htmlFor="individualUse">
            Individual use only <br />
            <span>Coupon cannot be used with other coupons</span>
          </label>
        </div>
        <label className="form-toggle">
          <input
            type="checkbox"
            id="individualUse"
            checked={formData.individualUse}
             className="toggle-input"
            onChange={(e) =>
              setFormData({ ...formData, individualUse: e.target.checked })
            }
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="form-check">
        <div className="form-text">
          <label htmlFor="excludeSale">
            Exclude sale items <br />
            <span>Coupon will not apply to sale items</span>
          </label>
        </div>
        <label className="form-toggle">
          <input
            type="checkbox"
            id="excludeSale"
             className="toggle-input"
            checked={formData.excludeSale}
            onChange={(e) =>
              setFormData({ ...formData, excludeSale: e.target.checked })
            }
          />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>
  );
};

export default UsageRestrictionCard;
