"use client";
import React from "react";
import { Calendar, Trash2 } from "lucide-react";
import "./PriceSchedules.css";

const PriceSchedules = () => {
  const schedules = [
    {
      product: "Pro Package",
      newPrice: "$55",
      discount: "15% off",
      period: {
        start: "Feb 1, 2024",
        end: "Feb 14, 2024",
      },
      reason: "Valentine's Day Sale",
      status: "Active",
    },
    {
      product: "Business Package",
      newPrice: "$120",
      discount: "15% off",
      period: {
        start: "Mar 1, 2024",
        end: "Mar 31, 2024",
      },
      reason: "Spring Promotion",
      status: "Scheduled",
    },
  ];

  return (
    <div className="price-schedules" style={{cursor:'not-allowed', opacity:'0.6'}}>
      <h2 className="price-title">Price Schedules</h2>

      <div className="table-wrapper">
        <table className="price-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>New Price</th>
              <th>Discount</th>
              <th>Period</th>
              <th>Reason</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {schedules.map((item, index) => (
              <tr key={index}>
                <td className="product-name">{item.product}</td>
                <td className="price-value">{item.newPrice}</td>
                <td>
                  <span className="discount-badge">% {item.discount}</span>
                </td>
                <td className="period">
                  <Calendar size={16} />
                  <div>
                    <span>{item.period.start}</span>
                    <span className="to-text">to {item.period.end}</span>
                  </div>
                </td>
                <td>{item.reason}</td>
                <td>
                  <span
                    className={`status-badge ${
                      item.status === "Active" ? "active" : "scheduled"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="delete-btn">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceSchedules;
