import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import "./AddOrder.css";
import "../../credits/CreditsTable/AddRemoveCredits/AddRemoveCredits.css";
import { baseUrl } from "@/const";
import toast from "react-hot-toast";
const AddOrder = ({ onClose, onPlaced }) => {
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
    if (!formData.customerName || !formData.email) return;

    try {
      setLoading(true);

      const res = await fetch(`${baseUrl}/wallet/orders/manual-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || "Manual order created successfully.");

        if (onPlaced) onPlaced();
        onClose();
      } else {
        toast.error(data.error || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <button className="btn cancel" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="btn confirm"
            onClick={handleSubmit}
            disabled={!formData.customerName || !formData.email || loading}
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Create Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
