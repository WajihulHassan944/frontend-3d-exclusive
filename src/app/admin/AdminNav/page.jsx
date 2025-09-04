import React from "react";
import {
  Menu,
  LayoutDashboard,
  FileText,
  Image,
  Users,
  ShoppingCart,
  Search,
  Settings,
  X,
} from "lucide-react";
import "./adminSideNav.css";

const AdminSideNav = ({ isOpen, setIsOpen }) => {
  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div className={`side-nav ${isOpen ? "open" : "collapsed"}`}>
      {/* Header */}
      <div className="side-nav-header">
        {isOpen ? (
          <>
            <h2>Admin Panel</h2>
            <X className="toggle-icon" onClick={toggleNav} />
          </>
        ) : (
          <Menu className="toggle-icon collapsed-toggle" onClick={toggleNav} />
        )}
      </div>

      {/* Menu */}
      <ul className="side-nav-menu">
        <li>
          <LayoutDashboard className="side-nav-icon" />
          {isOpen && <span>Dashboard</span>}
        </li>
        <li>
          <FileText className="side-nav-icon" />
          {isOpen && <span>Posts</span>}
        </li>
        <li>
          <Image className="side-nav-icon" />
          {isOpen && <span>Media</span>}
        </li>
        <li>
          <FileText className="side-nav-icon" />
          {isOpen && <span>Pages</span>}
        </li>
        <li>
          <Users className="side-nav-icon" />
          {isOpen && <span>Users</span>}
        </li>
        <li>
          <ShoppingCart className="side-nav-icon" />
          {isOpen && <span>Orders</span>}
        </li>
        <li>
          <Search className="side-nav-icon" />
          {isOpen && <span>SEO</span>}
        </li>
        <li>
          <Settings className="side-nav-icon" />
          {isOpen && <span>Settings</span>}
        </li>
      </ul>
    </div>
  );
};

export default AdminSideNav;
