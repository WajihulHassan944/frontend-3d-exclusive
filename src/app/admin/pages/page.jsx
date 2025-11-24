"use client";
import React, { useEffect, useState } from "react";
import "./pages.css";
import { GeistSans } from "geist/font/sans";
import withAdminAuth from "@/hooks/withAdminAuth";
import PagesStats from "./PagesStats/PagesStats";
import PagesList from "./PagesList/PagesList";
import { baseUrl } from "@/const";

const Pages = () => {
  const [isComingSoon, setIsComingSoon] = useState(false);

  // Fetch initial status
  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await fetch(`${baseUrl}/pages/coming-soon/status`);
        const data = await res.json();
        setIsComingSoon(data.isComingSoon);
      } catch (err) {
        console.log("Error fetching coming soon status:", err);
      }
    };

    getStatus();
  }, []);

  // Toggle Handler
  const toggleComingSoon = async () => {
    try {
      const newValue = !isComingSoon;

      await fetch(`${baseUrl}/pages/toggle-coming-soon`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isComingSoon: newValue }),
      });

      setIsComingSoon(newValue);
    } catch (err) {
      console.log("Error toggling coming soon:", err);
    }
  };

  return (
    <div className={`pages-container ${GeistSans.className}`}>
      <div className="pages-header">
        <div>
          <h2>Pages</h2>
          <p>Manage your website pages and content</p>
        </div>

        {/* Toggle Switch */}
        <div className="pages-comingSoonToggle" onClick={toggleComingSoon}>
          <label className="comingSoonToggle-label">Maintenance mode</label>

          <div
            className={`comingSoonToggle-switch ${
              isComingSoon ? "active" : "inactive"
            }`}
          >
            <span className="comingSoonToggle-knob"></span>
          </div>
        </div>
      </div>

      <PagesStats />
      <PagesList />
    </div>
  );
};

export default withAdminAuth(Pages);
