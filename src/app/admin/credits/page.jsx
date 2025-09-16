"use client";
import React from "react";
import "./credits.css";
import { GeistSans } from "geist/font/sans";
import withAdminAuth from "@/hooks/withAdminAuth";
import CreditsStats from "./CreditsStats/CreditsStats";
import CreditsTable from "./CreditsTable/CreditsTable";

const Credits = () => {

  return (
    <div className={`credits-container ${GeistSans.className}`}>
      <div className="credits-header">
        <div>
          <h2>Credits Management</h2>
          <p>Track customer credits, manage expiry dates, and adjust balances</p>
        </div>
      </div>

<CreditsStats />
<CreditsTable />
    </div>
  );
};

export default withAdminAuth(Credits);
