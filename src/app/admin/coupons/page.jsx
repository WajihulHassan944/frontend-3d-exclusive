"use client";
import React from "react";
import "./coupons.css";
import { Tag, CalendarCheck, DollarSign, Percent, Copy, Edit, Trash2 } from "lucide-react";
import { Search } from "lucide-react";
import { GeistSans } from "geist/font/sans";

const Coupons = () => {
  const coupons = [
    {
      code: "WELCOME10",
      type: "Percentage",
      amount: "10%",
      description: "Welcome discount for new customers",
      usage: "45/100",
      expiry: "2024-12-31",
      status: "Active",
    },
    {
      code: "SAVE20",
      type: "Fixed",
      amount: "$20.00",
      description: "Fixed discount on cart total",
      usage: "12/50",
      expiry: "2024-10-15",
      status: "Active",
    },
    {
      code: "FREESHIP",
      type: "Shipping",
      amount: "Free",
      description: "Free shipping coupon",
      usage: "89/200",
      expiry: "2024-11-30",
      status: "Active",
    },
  ];

  return (
    <div className={`coupons-container ${GeistSans.className}`}>
      <div className="coupons-header">
        <div>
          <h2>Coupons</h2>
          <p>Manage discount coupons and promotional codes</p>
        </div>
        <button className="add-btn"><span className="btn-plus">+</span> Add New Coupon</button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <Tag className="icon tag" />
          <div>
            <p>Total Coupons</p>
            <h3>24</h3>
          </div>
        </div>
        <div className="stat-card">
          <CalendarCheck className="icon calendar" />
          <div>
            <p>Active Coupons</p>
             <h3>18</h3>
          </div>
        </div>
        <div className="stat-card">
          <DollarSign className="icon dollar" />
          <div>
            <p>Total Savings</p>
            <h3>$12,450</h3>
          </div>
        </div>
        <div className="stat-card">
          <Percent className="icon percent" />
          <div>
            <p>Usage Rate</p>
            <h3>68%</h3>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="search-bar">
  <Search className="search-icon" size={18} />
  <input type="text" placeholder="Search coupons..." />
</div>

      {/* Coupons Table */}
      <div className="table-container">
        <h3>All Coupons</h3>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Usage</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c, i) => (
              <tr key={i}>
                <td>{c.code}</td>
                <td>{c.type}</td>
                <td>{c.amount}</td>
                <td>{c.description}</td>
                <td>{c.usage}</td>
                <td>{c.expiry}</td>
                <td>
                  <span className="status active">{c.status}</span>
                </td>
                <td className="actions">
                  <Copy size={18} className="action-icon" />
                  <Edit size={18} className="action-icon" />
                  <Trash2 size={18} className="action-icon delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coupons;
