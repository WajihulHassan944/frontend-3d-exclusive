import React from "react";
import {
  CheckCircle,
  RefreshCcw,
  Clock,
  AlertCircle,
  Play,
} from "lucide-react";
import "./ConversionStats.css";

const ConversionStats = () => {
  return (
    <div className="conversion-stats-grid">
      {/* Total Conversions */}
      <div className="stat-card">
        <div className="stat-header">
          <h3>Total Conversions</h3>
          <Play className="stat-icon" />
        </div>
        <p className="stat-value">5</p>
        <p className="stat-subtext">All time</p>
      </div>

      {/* Completed */}
      <div className="stat-card">
        <div className="stat-header">
          <h3>Completed</h3>
          <CheckCircle className="stat-icon success" />
        </div>
        <p className="stat-value success">1</p>
        <p className="stat-subtext">20% success rate</p>
      </div>

      {/* Processing */}
      <div className="stat-card">
        <div className="stat-header">
          <h3>Processing</h3>
          <RefreshCcw className="stat-icon processing" />
        </div>
        <p className="stat-value processing">1</p>
        <p className="stat-subtext">Currently active</p>
      </div>

      {/* In Queue */}
      <div className="stat-card">
        <div className="stat-header">
          <h3>In Queue</h3>
          <Clock className="stat-icon queue" />
        </div>
        <p className="stat-value queue">2</p>
        <p className="stat-subtext">Waiting to process</p>
      </div>

      {/* Errors */}
      <div className="stat-card">
        <div className="stat-header">
          <h3>Errors</h3>
          <AlertCircle className="stat-icon error" />
        </div>
        <p className="stat-value error">1</p>
        <p className="stat-subtext">Need attention</p>
      </div>
    </div>
  );
};

export default ConversionStats;
