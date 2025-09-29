
'use client';
import React, { useEffect, useState } from "react";
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
import withAdminAuth from "@/hooks/withAdminAuth";
import { GeistSans } from "geist/font/sans";
import "./admin.css";
import { baseUrl } from "@/const";
const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${baseUrl}/b2/conversion-dashboard`);
        const data = await res.json();
        if (data.success) {
          setDashboard(data.dashboard);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className={`dashboard ${GeistSans.className}`}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className={`dashboard ${GeistSans.className}`}>
        <p>Failed to load dashboard data</p>
      </div>
    );
  }

  const { stats, recentOrders } = dashboard;

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
              <b>{stats?.inProgress || 0}</b>
            </span>

            <span className="status queued">
              <span className="label queued">
                <Clock className="status-icon" /> <span>Queued</span>
              </span>
              <b>{stats?.queued || 0}</b>
            </span>

            <span className="status completed">
              <span className="label completed">
                <CheckCircle className="status-icon" /> <span>Completed</span>
              </span>
              <b>{stats?.completed || 0}</b>
            </span>

            <span className="status failed">
              <span className="label failed">
                <XCircle className="status-icon" /> <span>Failed</span>
              </span>
              <b>{stats?.failed || 0}</b>
            </span>
          </div>

          <div className="progress-row">
            <span>Completion Rate</span>
            <span>{stats?.completionRate || "0%"}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: stats?.completionRate || "0%" }}
            ></div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="orders-card">
          <h3>Recent Orders</h3>
          <ul>
            {recentOrders?.length > 0 ? (
              recentOrders.map((order) => (
                <li key={order._id}>
                  <div className="order-left">
                    <strong>{order.customer || "Unknown"}</strong>
                    <span>
                      {order.orderId} • {order.timeAgo}
                    </span>
                  </div>
                  <div className="order-right">
                    <b>
                      {order.currency}
                      {order.amount}
                    </b>
                    <span
                      className={`order-status ${order.status?.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </li>
              ))
            ) : (
              <li>No recent orders</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(Dashboard);
