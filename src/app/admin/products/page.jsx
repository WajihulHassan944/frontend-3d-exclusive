"use client";
import React, { useState } from "react";
import "./products.css";
import { GeistSans } from "geist/font/sans";
import withAdminAuth from "@/hooks/withAdminAuth";
import ProductStats from "./ProductStats/ProductStats";
import CreditPackages from "./CreditPackages/CreditPackages";
import PriceSchedules from "./PriceSchedules/PriceSchedules";

const Pages = () => {
const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={`credits-container ${GeistSans.className}`}>
      <div className="credits-header">
        <div>
          <h2>Products</h2>
          <p>Manage your blog content and articles</p>
        </div>
         </div>

<ProductStats refreshKey={refreshKey} />
<CreditPackages statusChanged={handleRefresh} />
<PriceSchedules />
    </div>
  );
};

export default withAdminAuth(Pages);
