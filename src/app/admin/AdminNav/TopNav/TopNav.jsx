import React from "react";
import "./TopNav.css";

const TopNav = ({ isSidebarOpen }) => {
  return (
    <div className={`top-nav ${isSidebarOpen ? "shifted" : "full"}`}>
      <div className="top-nav-left">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's an overview of your business.</p>
      </div>
      <div className="top-nav-right">
        <div className="user-info">
          <div>
            <h4>Admin User</h4>
            <p>admin@company.com</p>
          </div>
          <div className="user-avatar">AU</div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
