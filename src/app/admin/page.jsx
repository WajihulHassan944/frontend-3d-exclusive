'use client';
import React from "react";

import {
  ShoppingCart,
  Users,
  LineChart,
  DollarSign,
  Loader,
   Clock,
  CheckCircle,
  XCircle,

} from "lucide-react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { GeistSans } from "geist/font/sans";
import "./admin.css";
import withAdminAuth from "@/hooks/withAdminAuth";

const Dashboard = () => {
  return (
    <div className={`dashboard ${GeistSans.className}`}>
      {/* Top Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Revenue This Month</h3>
           <DollarSign className="stat-icon" />
          </div>
          <p className="stat-value">€45,230</p>
          <p className="stat-change"><span className="positive"><FaArrowTrendUp /> 12.5%</span> vs last month</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Orders Today</h3>
            <ShoppingCart className="stat-icon" />
          </div>
          <p className="stat-value">23</p>
          <p className="stat-change"><span className="negative"><FaArrowTrendDown /> 2.1%</span> vs yesterday</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Conversion Rate</h3>
           <LineChart className="stat-icon" />
          </div>
          <p className="stat-value">3.2%</p>
          <p className="stat-change"><span className="positive"><FaArrowTrendUp /> 0.8%</span> this week</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Live Visitors</h3>
            <Users className="stat-icon" />
          </div>
          <p className="stat-value">147</p>
          <p className="stat-change"><span className="positive">●</span> Real-time active</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-grid">
        {/* RunPod AI Conversions */}
     <div className="conversion-card">
  <h3>RunPod AI Conversions</h3>
  <div className="conversion-status">
    <span className="status in-progress">
      <span className="label in-progress">
      <Loader className="status-icon rotate" /> <span>In Progress</span>
      </span>
      <b>5</b>
    </span>

    <span className="status queued">
      <span className="label queued">
       <Clock className="status-icon" /> <span>Queued</span>
      </span>
      <b>12</b>
    </span>

    <span className="status completed">
      <span className="label completed">
       <CheckCircle className="status-icon" /> <span>Completed</span>
      </span>
      <b>89</b>
    </span>

    <span className="status failed">
      <span className="label failed">
       <XCircle className="status-icon" /> <span>Failed</span>
      </span>
      <b>3</b>
    </span>
  </div>

  <div className="progress-row">
    <span>Completion Rate</span>
    <span>97%</span>
  </div>
  <div className="progress-bar">
    <div className="progress" style={{ width: "97%" }}></div>
  </div>
</div>

        {/* Recent Orders */}
        <div className="orders-card">
          <h3>Recent Orders</h3>
          <ul>
            <li>
              <div className="order-left">
                <strong>John Johnson</strong>
                <span>#12345 • 2 min ago</span>
              </div>
              <div className="order-right">
                <b>€89.99</b>
                <span className="order-status completed">completed</span>
              </div>
            </li>
            <li>
              <div className="order-left">
                <strong>Marie de Vries</strong>
                <span>#12344 • 5 min ago</span>
              </div>
              <div className="order-right">
                <b>€156.50</b>
                <span className="order-status processing">processing</span>
              </div>
            </li>
            <li>
              <div className="order-left">
                <strong>Peter Baker</strong>
                <span>#12343 • 12 min ago</span>
              </div>
              <div className="order-right">
                <b>€45.00</b>
                <span className="order-status completed">completed</span>
              </div>
            </li>
            <li>
              <div className="order-left">
                <strong>Lisa van Dam</strong>
                <span>#12342 • 18 min ago</span>
              </div>
              <div className="order-right">
                <b>€203.25</b>
                <span className="order-status pending">pending</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(Dashboard);
