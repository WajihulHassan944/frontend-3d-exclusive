"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  LayoutDashboard,
  FileText,
  Image,
  Users,
  ShoppingCart,
  Tag,
  Search,
  Settings,
  X,
} from "lucide-react";
import "./adminSideNav.css";

const AdminSideNav = ({ isOpen, setIsOpen }) => {
  const toggleNav = () => setIsOpen(!isOpen);
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Posts", icon: FileText },
    { href: "/admin/media", label: "Media", icon: Image },
    { href: "/admin/pages", label: "Pages", icon: FileText },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/coupons", label: "Coupons", icon: Tag },
    { href: "/admin/seo", label: "SEO", icon: Search },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

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
  {navItems.map(({ href, label, icon: Icon }) => {
    let isActive = false;

    if (href === "/admin") {
      // Dashboard should only be active on exact match
      isActive = pathname === "/admin";
    } else {
      // Other items: active if exact or sub-route
      isActive = pathname === href || pathname.startsWith(href + "/");
    }

    return (
      <Link href={href} key={href}>
        <li className={isActive ? "active" : ""}>
          <Icon className="side-nav-icon" />
          {isOpen && <span>{label}</span>}
        </li>
      </Link>
    );
  })}
</ul>


    </div>
  );
};

export default AdminSideNav;
