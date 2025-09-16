import React from "react";
import {
  TrendingDown,
  CreditCard,
  Users,
  Clock,
} from "lucide-react";
import "./CreditsStats.css";

const CreditsStats = () => {
  return (
      <div className="credits-stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Active Credits</h3>
            <CreditCard className="stat-icon" />
          </div>
          <p className="stat-value">1,470</p>
          <p className="stat-subtext">Across all customers</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Expiring Soon</h3>
            <Clock className="stat-icon" />
          </div>
          <p className="stat-value" style={{color:'#d08700'}}>1</p>
          <p className="stat-subtext">Credits expire within 30 days</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Expired Credits</h3>
            <TrendingDown className="stat-icon" />
          </div>
          <p className="stat-value" style={{color:'#e7000b'}}>1</p>
          <p className="stat-subtext">Customers with expired credits</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Customers</h3>
            <Users className="stat-icon" />
          </div>
          <p className="stat-value">3</p>
          <p className="stat-subtext">With credit balances</p>
        </div>
      </div>
  );
};

export default CreditsStats;
