"use client";
import React from "react";
import "./conversions.css";
import { GeistSans } from "geist/font/sans";
import withAdminAuth from "@/hooks/withAdminAuth";
import ConversionStats from "./ConversionStats/ConversionStats";
import {RefreshCcw} from "lucide-react";
import ConversionTable from "./ConversionTable/ConversionTable";
const Conversions = () => {

  return (
    <div className={`conversions-container ${GeistSans.className}`}>
      <div className="conversions-header">
        <div>
          <h2>Conversions Tracking</h2>
          <p>Monitor conversion queue, track progress, and manage processing status</p>
        </div>
        <button className="add-btn">
          <span className="btn-plus"><RefreshCcw size={15} /></span> Refresh
        </button>
      </div>
<ConversionStats />
<ConversionTable />
    </div>
  );
};

export default withAdminAuth(Conversions);
