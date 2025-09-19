import React, { useEffect, useState } from "react";
import {
  Package,
  TrendingUp,
  CreditCard,
  Users,
  BarChart3,
} from "lucide-react";
import "./OrderStats.css";
import { baseUrl } from "@/const";

const OrderStats = ({refreshKey}) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("thisWeek"); // default
  const [error, setError] = useState(null);

  const fetchStats = async (selectedPeriod) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${baseUrl}/wallet/orders-stats?period=${selectedPeriod}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to load stats");

      setStats(data);
    } catch (err) {
      console.error("❌ Error fetching stats:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(period);
  }, [period, refreshKey]);

  return (
    <div className="order-stats-container">
      <div className="order-stats-header">
        <div>
          <h2>
            <BarChart3 className="analytics-icon" /> Order Analytics
          </h2>
          <p>Track performance across different time periods</p>
        </div>
        <select
          className="order-stats-select"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="thisWeek">This Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="thisMonth">This Month</option>
        </select>
      </div>

      {error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="order-stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Orders</h3>
              <Package className="stat-icon" />
            </div>
            <p className="stat-value">
              {loading ? (
                <span className="skeleton-loader" />
              ) : (
                stats?.totalOrders || 0
              )}
            </p>
            <p className="stat-subtext">{period.replace(/([A-Z])/g, " $1")}</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Completed Orders</h3>
              <TrendingUp className="stat-icon" />
            </div>
            <p className="stat-value">
              {loading ? (
                <span className="skeleton-loader" />
              ) : (
                100
              )}
            </p>
            <p className="stat-subtext">
              {loading ? (
                <span className="skeleton-loader" />
              ) : (
                `100% placed successfully`
              )}
            </p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Revenue</h3>
              <CreditCard className="stat-icon" />
            </div>
         <p className="stat-value">
  {loading ? (
    <span className="skeleton-loader" />
  ) : (
    `€${Number(stats?.totalRevenue || 0).toFixed(2)}`
  )}
</p>

            <p className="stat-subtext">{period.replace(/([A-Z])/g, " $1")} revenue</p>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Avg Order Value</h3>
              <Users className="stat-icon" />
            </div>
          <p className="stat-value">
  {loading ? (
    <span className="skeleton-loader" />
  ) : (
    `€${Number(stats?.avgOrderValue || 0).toFixed(2)}`
  )}
</p>
            <p className="stat-subtext">Average per order</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStats;
