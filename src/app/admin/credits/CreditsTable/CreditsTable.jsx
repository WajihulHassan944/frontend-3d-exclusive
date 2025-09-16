'use client';
import React, { useState } from "react";
import { Search } from "lucide-react";
import "./CreditsTable.css";
import AddRemoveCredits from "./AddRemoveCredits/AddRemoveCredits";

const CreditsTable = () => {

    const [showPopup, setShowPopup] = useState(false);
  const [actionType, setActionType] = useState(null); 
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleOpenPopup = (type, customer) => {
    setActionType(type);
    setSelectedCustomer(customer);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setActionType(null);
    setSelectedCustomer(null);
  };

  return (
    <div>
      {/* Search */}
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="Search customers..." />
      </div>

      {/* Credits Table */}
      <div className="table-container">
        <h3>Customer Credits</h3>
        <p className="subtitle">
          Monitor and manage customer credit balances and expiry dates
        </p>

        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Company</th>
              <th>Credits Usage</th>
              <th>Remaining</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="customer">
                  <span className="customer-name">John Doe</span>
                  <span className="customer-email">john@example.com</span>
                </div>
              </td>
              <td>Acme Corp</td>
              <td>
                250 / 1000 <span className="usage-percent">25%</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "25%" }}></div>
                </div>
              </td>
              <td>750</td>
              <td>2025-01-15</td>
              <td>
                <span className="status active">Active</span>
              </td>
              <td className="actions">
                <button className="btn add">+ Add</button>
                <button className="btn remove">− Remove</button>
              </td>
            </tr>

            <tr>
              <td>
                <div className="customer">
                  <span className="customer-name">Jane Smith</span>
                  <span className="customer-email">jane@techstart.com</span>
                </div>
              </td>
              <td>TechStart Ltd</td>
              <td>
                1800 / 2500 <span className="usage-percent">72%</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "72%" }}></div>
                </div>
              </td>
              <td>700</td>
              <td>2025-02-01</td>
              <td>
                <span className="status active">Active</span>
              </td>
              <td className="actions">
                <button className="btn add">+ Add</button>
                <button className="btn remove">− Remove</button>
              </td>
            </tr>

            <tr>
              <td>
                <div className="customer">
                  <span className="customer-name">Mike Johnson</span>
                  <span className="customer-email">mike@designco.nl</span>
                </div>
              </td>
              <td>Design Co</td>
              <td>
                480 / 500 <span className="usage-percent">96%</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "96%" }}></div>
                </div>
              </td>
              <td>20</td>
              <td>
                2024-12-01
                <div className="expiry-warning">⚠ Expires in 30 days</div>
              </td>
              <td>
                <span className="status expiring">Expiring Soon</span>
              </td>
              <td className="actions">
                <button className="btn add" onClick={() => handleOpenPopup("add", "John Doe")}>+ Add</button>
                <button className="btn remove" onClick={() => handleOpenPopup("remove", "John Doe")}>− Remove</button>
              </td>
            </tr>

            <tr>
              <td>
                <div className="customer">
                  <span className="customer-name">Sarah Wilson</span>
                  <span className="customer-email">sarah@startup.io</span>
                </div>
              </td>
              <td>Startup Inc</td>
              <td>
                1500 / 1500 <span className="usage-percent">100%</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: "100%" }}></div>
                </div>
              </td>
              <td>0</td>
              <td>
                2024-06-15
                <div className="expiry-error">⚠ Expired</div>
              </td>
              <td>
                <span className="status expired">Expired</span>
              </td>
              <td className="actions">
                <button className="btn add" onClick={() => handleOpenPopup("add", "John Doe")}>+ Add</button>
                <button className="btn remove" disabled>− Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
       {showPopup && (
        <AddRemoveCredits
          actionType={actionType}
          customer={selectedCustomer}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default CreditsTable;
