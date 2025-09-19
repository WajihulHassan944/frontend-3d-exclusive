import React, { useEffect, useState } from "react";
import {
  Search,
  CheckCircle,
  RefreshCcw,
  Clock,
  AlertCircle,
  PauseCircle,
} from "lucide-react";
import "./ConversionTable.css";
import { baseUrl } from "@/const";

const ConversionTable = ({ onUpdated, refreshKey }) => {
  const [conversions, setConversions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedError, setSelectedError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
const fetchConversions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/b2/queue`);
        const data = await res.json();
        setConversions(data.queue || []); // ✅ use queue array
      } catch (err) {
        console.error("❌ Failed to fetch conversions:", err);
      } finally {
        setLoading(false);
      }
    };

  // Fetch conversions
  useEffect(() => {
    setLoading(true);
    fetchConversions();
  }, [refreshKey]);

// Retry conversion
const handleRetry = async (id) => {
  try {
    const res = await fetch(`${baseUrl}/b2/videos/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, 
      },
      body: JSON.stringify({videoId: id, status: "queued" }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Retry failed");
    }
    setConversions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "queued" } : c))
    );
    setSelectedError(null);
  } catch (err) {
    console.error("❌ Retry failed:", err);
  }
   if (onUpdated) onUpdated();
};

// Filter conversions by search + tab
const filteredConversions = conversions.filter((c) => {
  const matchesSearch =
    c.fileName.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase());

  const status = c.status.toLowerCase();

  const matchesTab =
    activeTab === "all"
      ? true
      : activeTab === "queued"
      ? ["queued", "pending", "uploaded"].includes(status)
      : activeTab === "error"
      ? ["error", "failed"].includes(status)
      : status === activeTab;

  return matchesSearch && matchesTab;
});


  return (
    <div>
      {/* Search */}
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search conversions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table Container */}
      <div className="table-container">
        <h3>Conversion Queue</h3>
        <p className="subtitle">Track all conversion jobs and their current status</p>

        {/* Tabs */}
        <div className="tabs">
          {["all", "processing", "queued", "completed", "error"].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} (
          {conversions.filter((c) => {
  const status = c.status.toLowerCase();
  return tab === "all"
    ? true
    : tab === "queued"
    ? ["queued", "pending", "uploaded"].includes(status)
    : tab === "error"
    ? ["error", "failed"].includes(status)
    : status === tab;
}).length}


              )
            </button>
          ))}
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Customer</th>
              <th>File</th>
              <th>Type</th>
              <th>Progress</th>
              <th>Credits</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {loading ? (
    [...Array(2)].map((_, i) => (
      <tr key={i}>
        <td>
          <span className="skeleton-loader" style={{ width: "60px", height: "16px" }} />
        </td>
        <td>
          <div className="customer">
            <span className="skeleton-loader" style={{ width: "80px", height: "14px", display: "block", marginBottom: "4px" }} />
            <span className="skeleton-loader" style={{ width: "120px", height: "12px", display: "block" }} />
          </div>
        </td>
        <td>
          <span className="skeleton-loader" style={{ width: "100px", height: "14px", display: "block", marginBottom: "4px" }} />
          <span className="skeleton-loader" style={{ width: "50px", height: "12px", display: "block" }} />
        </td>
        <td>
          <span className="skeleton-loader" style={{ width: "90px", height: "14px" }} />
        </td>
        <td>
          <span className="skeleton-loader" style={{ width: "70px", height: "14px", display: "block", marginBottom: "4px" }} />
          <span className="skeleton-loader" style={{ width: "100%", height: "6px", display: "block", borderRadius: "3px" }} />
        </td>
        <td>
          <span className="skeleton-loader" style={{ width: "40px", height: "14px" }} />
        </td>
        <td>
          <span className="skeleton-loader" style={{ width: "70px", height: "14px" }} />
        </td>
        <td>
          <span className="skeleton-loader" style={{ width: "50px", height: "16px" }} />
        </td>
      </tr>
    ))
  ) : filteredConversions.length > 0 ? (
    filteredConversions.map((c) => (
     <tr
  key={c.id}
  onClick={() =>
    ["error", "failed"].includes(c.status.toLowerCase())
      ? setSelectedError(c)
      : setSelectedError(null)
  }
  style={{
    cursor: ["error", "failed"].includes(c.status.toLowerCase())
      ? "pointer"
      : "default",
  }}
>

        <td>
          <span className={`status ${c.status.toLowerCase()}`}>
            {c.status === "completed" && <CheckCircle size={14} />}
            {c.status === "processing" && <RefreshCcw size={14} />}
            {(c.status === "queued" || c.status === "uploaded" || c.status === "pending") && <Clock size={14} />}
            {(c.status === "error" || c.status === "failed") && <AlertCircle size={14} />}
            {c.status === "pending" && <PauseCircle size={14} />}
            {c.status}
          </span>
        </td>
        <td>
          <div className="customer">
            <span className="customer-name">{c.customer}</span>
            <span className="customer-email">{c.email}</span>
          </div>
        </td>
        <td>
          {c.fileName}
          <br />
          <span className="file-size">{c.fileSize || "-"}</span>
        </td>
        <td>{c.type || "-"}</td>
        <td>
          {c.status === "processing" ? (
            <>
              {c.progress || "0%"}
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: c.progress || "0%" }}
                />
              </div>
            </>
          ) : c.status === "completed" ? (
            "100%"
          ) : c.status === "error" ? (
            "Failed"
          ) : (
            "Waiting"
          )}
        </td>
        <td>{c.credits || 0}</td>
        <td>{c.duration || "-"}</td>
        <td>
          {(c.status === "error" || c.status === "failed") && (
            <button
              className="btn retry"
              onClick={(e) => {
                e.stopPropagation();
                handleRetry(c.id);
              }}
            >
              <RefreshCcw size={12} /> Retry
            </button>
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
        No conversions found
      </td>
    </tr>
  )}
</tbody>

        </table>

        {/* Error Details */}
        {selectedError && (
          <div className="error-details">
            <AlertCircle size={16} />
            <p>
              <strong>{selectedError.fileName}</strong>
              <span>{selectedError.errorMessage || "Unknown error occurred."}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversionTable;
