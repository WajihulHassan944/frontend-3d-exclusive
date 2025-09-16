import React, { useState } from "react";
import { X } from "lucide-react"; // 👈 import the icon
import "./AddRemoveCredits.css";

const AddRemoveCredits = ({ actionType, customer, onClose }) => {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    alert(
      `${actionType === "add" ? "Added" : "Removed"} ${amount} credits for ${customer}`
    );
    onClose();
  };

  return (
    <div className="modal-overlay-credits" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{actionType === "add" ? "Add Credits" : "Remove Credits"}</h3>
          <button className="close-btn-popup" onClick={onClose}>
            <X size={17} /> {/* 👈 Lucide close icon */}
          </button>
        </div>

        <div className="modal-body">
          <label>Credit Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            
          />

          <label>Reason (Optional)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
           
          />
        </div>

        <div className="modal-footer">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn confirm"
            onClick={handleSubmit}
            disabled={!amount}
          >
            {actionType === "add" ? "Add Credits" : "Remove Credits"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRemoveCredits;
