"use client";
import React, { useState } from "react";
import "./pages.css";
import { GeistSans } from "geist/font/sans";
import withAdminAuth from "@/hooks/withAdminAuth";
import PagesStats from "./PagesStats/PagesStats";
import PagesList from "./PagesList/PagesList";

const Pages = () => {
const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={`credits-container ${GeistSans.className}`}>
      <div className="credits-header">
        <div>
          <h2>Pages</h2>
          <p>Manage your website pages and content</p>
        </div>
      </div>

<PagesStats refreshKey={refreshKey} />
<PagesList />
    </div>
  );
};

export default withAdminAuth(Pages);
