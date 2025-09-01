import React from "react";
import {
  
  FaBars,
  FaTachometerAlt,
  FaFileAlt,
  FaImage,
  FaUserFriends,
  FaShoppingCart,
  FaSearch,
  FaCog,
} from "react-icons/fa";
import { X } from "lucide-react";
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
          <FaBars className="toggle-icon collapsed-toggle" onClick={toggleNav} />
        )}
      </div>

      {/* Menu */}
      <ul className="side-nav-menu">
        <li>
          <FaTachometerAlt className="side-nav-icon" />
          {isOpen && <span>Dashboard</span>}
        </li>
        <li>
          <FaFileAlt className="side-nav-icon" />
          {isOpen && <span>Posts</span>}
        </li>
        <li>
          <FaImage className="side-nav-icon" />
          {isOpen && <span>Media</span>}
        </li>
        <li>
          <FaFileAlt className="side-nav-icon" />
          {isOpen && <span>Pages</span>}
        </li>
        <li>
          <FaUserFriends className="side-nav-icon" />
          {isOpen && <span>Users</span>}
        </li>
        <li>
          <FaShoppingCart className="side-nav-icon" />
          {isOpen && <span>Orders</span>}
        </li>
        <li>
          <FaSearch className="side-nav-icon" />
          {isOpen && <span>SEO</span>}
        </li>
        <li>
          <FaCog className="side-nav-icon" />
          {isOpen && <span>Settings</span>}
        </li>
      </ul>
    </div>
  );
};

export default AdminSideNav;
