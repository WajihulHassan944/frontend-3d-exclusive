import React from "react";
import "./AddCoupon.css";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
const NewCoupon = () => {
  return (
    <div className={`add-coupon-container ${GeistSans.className}`}>
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <div><ArrowLeft size={15} />
          <span className="back-text">Back to Coupons</span></div>
          <div> <h2 className="page-title">Add New Coupon</h2>
      <p className="page-subtitle">Create a new discount coupon</p>
</div>
        </div>
        <div className="header-actions">
          <button className="preview-btn">
            <Eye size={16} />
            Preview
          </button>
          <button className="save-btn">
            <Save size={16} />
            Save Coupon
          </button>
        </div>
      </div>

     
      {/* Layout */}
      <div className="coupon-layout">
        <div className="left-section">
          {/* General */}
          <div className="card">
            <h3 className="card-title">General</h3>
          <div className="flexedDiv">
              <div className="form-group">
              <label>Coupon Code</label>
              <input type="text" placeholder="Enter coupon code" className={`${GeistMono.className} specialInput`} />
            </div>
            <div className="form-group">
              <label>Coupon Amount</label>
              <input type="number" defaultValue={0} />
            </div>
          </div>
            <div className="form-group">
              <label>Description</label>
              <textarea placeholder="Describe this coupon for your reference"></textarea>
            </div>
          </div>

          {/* Coupon Data */}
          <div className="card">
            <h3 className="card-title">Coupon Data</h3>
            <label className="blacked">Discount Type</label>
            <div className="discount-types">
              <button className="active">Percentage discount</button>
              <button>Fixed cart discount</button>
              <button>Fixed product discount</button>
            </div>

           <div className="form-check">
  <div className="form-text">
    <label htmlFor="freeShipping">
      Allow free shipping <br />
      <span>Check this box if the coupon grants free shipping</span>
    </label>
  </div>
  <label className="form-toggle">
    <input type="checkbox" id="freeShipping" className="toggle-input" />
    <span className="toggle-slider"></span>
  </label>
</div>


            <div className="form-group">
              <label>Coupon expiry date</label>
              <input type="date" style={{maxWidth:'240px'}} />
            </div>
          </div>
      
          {/* Usage Restriction */}
          <div className="card">
            <h3 className="card-title">Usage Restriction</h3>
          <div className="flexedDiv">
              <div className="form-group">
              <label>Coupon Code</label>
              <input type="text" placeholder="Enter coupon code" />
            </div>
            <div className="form-group">
              <label>Coupon Amount</label>
              <input type="number" defaultValue={0} />
            </div>
          </div>
           <div className="form-check">
  <div className="form-text">
    <label htmlFor="freeShipping">
      Individual use only <br />
      <span>Check this box if the coupon cannot be used in conjunction with other coupons</span>
    </label>
  </div>
  <label className="form-toggle">
    <input type="checkbox" id="freeShipping" className="toggle-input" />
    <span className="toggle-slider"></span>
  </label>
</div>

           <div className="form-check">
  <div className="form-text">
    <label htmlFor="freeShipping">
      Exclude sale items <br />
      <span>Check this box if the coupon should not apply to items on sale</span>
    </label>
  </div>
  <label className="form-toggle">
    <input type="checkbox" id="freeShipping" className="toggle-input" />
    <span className="toggle-slider"></span>
  </label>
</div>

          </div>
      
      
      
        </div>

        {/* Right section */}
        <div className="right-section">
          <div className="card">
            <h3 className="card-title">Usage Limits</h3>
            <div className="form-group">
              <label>Usage limit per coupon</label>
              <input type="text" placeholder="Unlimited usage" />
            </div>
            <div className="form-group">
              <label>Usage limit per user</label>
              <input type="text" placeholder="Unlimited usage" />
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Coupon Preview</h3>
            <div className="coupon-preview">
              <span className={`${GeistMono.className} specialInput`}>COUPON_CODE</span>
              <small>Enter amount</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCoupon;
