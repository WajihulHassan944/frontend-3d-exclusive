import React from "react";
import {
  Package,
  TrendingUp,
  CreditCard,
  Users,
  BarChart3,
} from "lucide-react";
import "./OrderStats.css";

const OrderStats = () => {
  return (
    <div className="order-stats-container">
      <div className="order-stats-header">
        <div>
          <h2> <BarChart3 className="analytics-icon" /> Order Analytics</h2>
          <p>Track performance across different time periods</p>
        </div>
        <select className="order-stats-select">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="order-stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Orders</h3>
            <Package className="stat-icon" />
          </div>
          <p className="stat-value">3</p>
          <p className="stat-subtext">This week</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Completed Orders</h3>
            <TrendingUp className="stat-icon" />
          </div>
          <p className="stat-value">1</p>
          <p className="stat-subtext">33% completion rate</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Revenue</h3>
            <CreditCard className="stat-icon" />
          </div>
          <p className="stat-value">€1049.97</p>
          <p className="stat-subtext">This week's revenue</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Avg Order Value</h3>
            <Users className="stat-icon" />
          </div>
          <p className="stat-value">€349.99</p>
          <p className="stat-subtext">Average per order</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStats;
