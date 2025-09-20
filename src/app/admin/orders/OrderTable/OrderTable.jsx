import React, { useEffect, useState } from "react";
import { Search, MoreHorizontal } from "lucide-react";
import "./OrderTable.css";
import { baseUrl } from "@/const";
import toast from "react-hot-toast";

const OrderTable = ({refreshKey, onDeleted}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
 
  const fetchOrders = async () => {
      try {
        const res = await fetch(`${baseUrl}/wallet/orders/all`);
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
     setLoading(true);
    fetchOrders();
  }, [refreshKey]);
useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".action-menu") && !e.target.closest(".dropdown-menu-table")) {
      setOpenMenu(null);
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  const filteredOrders = orders.filter((order) =>
    [order.orderId, order.customer, order.email, order.company]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this order?")) return;

  try {
    const res = await fetch(`${baseUrl}/wallet/order/${id}`, { method: "DELETE" });

    if (!res.ok) {
      throw new Error(`Delete failed: ${res.status}`);
    }

    if(onDeleted) onDeleted();
    toast.success("Order deleted successfully");
  } catch (err) {
    console.error("Error deleting order:", err);
    toast.error("Failed to delete order");
  } finally {
    setOpenMenu(null);
  }
};



  return (
    <div>
      {/* Search */}
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search order"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <h3>All Orders</h3>
        <p className="subtitle">Manage and track all customer orders</p>

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Company</th>
              <th>Amount</th>
              <th>Credits</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
        <tbody>
  {loading
    ? Array.from({ length: 5 }).map((_, idx) => (
        <tr key={idx}>
          {Array.from({ length: 8 }).map((_, colIdx) => (
            <td key={colIdx}>
              <span className="skeleton-loader" />
            </td>
          ))}
        </tr>
      ))
    : filteredOrders.map((order, idx) => (
        <tr key={idx}>
          <td>{order.orderId}</td>
          <td>
            <div className="customer">
              <span className="customer-name">{order.customer}</span>
              <span className="customer-email">{order.email}</span>
            </div>
          </td>
          <td>{order.company || "—"}</td>
          <td>
            {order.currency === "CREDITS" && order.amount === "0.00" ? (
              <span className="admin-added">Added by Admin</span>
            ) : (
              <>
                {order.currency} {' '}
                {Number(order.amount).toFixed(2)}
              </>
            )}
          </td>
          <td>{order.credits}</td>
          <td>
            <span className={`status ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </td>
          <td>{order.date}</td>
        <td className="relative">
  <MoreHorizontal
    className="action-menu"
    size={18}
    onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
  />
  {openMenu === idx && (
    <div className="dropdown-menu-table">
      <button onClick={() => handleDelete(order._id)}>Delete</button>
    </div>
  )}
</td>

        </tr>
      ))}
</tbody>
</table>
      </div>
    </div>
  );
};

export default OrderTable;
