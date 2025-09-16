import React, { useState } from "react";
import { X } from "lucide-react";
import "./AddOrder.css";
import "../../credits/CreditsTable/AddRemoveCredits/AddRemoveCredits.css";
const AddOrder = ({ onClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    companyName: "",
    vatNumber: "",
    address: "",
    country: "",
    amount: 0,
    credits: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Order Created:", formData);
    onClose();
  };

  return (
    <div className="modal-overlay-credits" onClick={onClose}>
      <div className="modal modal-add-order" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3>Add New Order</h3>
          <button className="close-btn-popup" onClick={onClose}>
            <X size={17} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Customer Name *</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>VAT Number</label>
              <input
                type="text"
                name="vatNumber"
                value={formData.vatNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Amount (€) *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Credits *</label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn confirm"
            onClick={handleSubmit}
            disabled={!formData.customerName || !formData.email}
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
