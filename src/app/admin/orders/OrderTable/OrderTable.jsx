import React from "react";
import { Search, MoreHorizontal } from "lucide-react";
import "./OrderTable.css";

const OrderTable = () => {
  return (
    <div>
      {/* Search */}
      <div className="search-bar">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="Search order" />
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
            <tr>
              <td>ORD-001</td>
              <td>
                <div className="customer">
                  <span className="customer-name">John Doe</span>
                  <span className="customer-email">john@example.com</span>
                </div>
              </td>
              <td>Acme Corp</td>
              <td>€299.99</td>
              <td>1,000</td>
              <td>
                <span className="status completed">completed</span>
              </td>
              <td>2024-01-15</td>
              <td>
                <MoreHorizontal className="action-menu" size={18} />
              </td>
            </tr>

            <tr>
              <td>ORD-002</td>
              <td>
                <div className="customer">
                  <span className="customer-name">Jane Smith</span>
                  <span className="customer-email">jane@techstart.com</span>
                </div>
              </td>
              <td>TechStart Ltd</td>
              <td>€599.99</td>
              <td>2,500</td>
              <td>
                <span className="status pending">pending</span>
              </td>
              <td>2024-01-14</td>
              <td>
                <MoreHorizontal className="action-menu" size={18} />
              </td>
            </tr>

            <tr>
              <td>ORD-003</td>
              <td>
                <div className="customer">
                  <span className="customer-name">Mike Johnson</span>
                  <span className="customer-email">mike@designco.nl</span>
                </div>
              </td>
              <td>Design Co</td>
              <td>€149.99</td>
              <td>500</td>
              <td>
                <span className="status processing">processing</span>
              </td>
              <td>2024-01-13</td>
              <td>
                <MoreHorizontal className="action-menu" size={18} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
