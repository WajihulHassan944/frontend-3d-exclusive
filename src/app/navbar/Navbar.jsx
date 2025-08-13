'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import './navbar.css';
import { useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import { IoMdArrowDropdown } from 'react-icons/io';
import useLogout from '@/hooks/useLogout';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const logout = useLogout();
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="nav-wrapper">
      <nav className="nav">
         <Link href="/" className="logo">
            <div className="logo-box">
              <img
                src="/logo.png"
                alt="Brand logo"
                className="brand-logo"
              />
            </div>
            <p>XCLUSIVE 3D</p>
          </Link>

        <div className="logo-div">
         
          <ul className="nav-links">
            {isLoggedIn ? (
             <> <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/upload">Convert to 3D</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
               <li><Link href="/faq">FAQ</Link></li>
               <li><Link href="/add-billing">Billing</Link></li>
              
                 </>
            ) : (
              <>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/blogs">Blogs</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Right section */}
        <div className="auth">
          {isLoggedIn ? (
            <div className="user-section" ref={dropdownRef}>
             <Link href="/cart"> <FiShoppingCart size={22} className="cart-icon" /></Link>

              <div
                className="user-profile"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <Image
                  src={user?.profileUrl || '/assets/user.png'}
                  alt="User"
                  width={34}
                  height={34}
                  className="user-img"
                />
                <span className="user-name">{user.firstName}</span>
                <IoMdArrowDropdown size={18} className="cart-icon" />
              </div>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <Link href="/profile" onClick={() => setDropdownOpen(false)}>Profile</Link>
                  <Link href="/profilesettings" onClick={() => setDropdownOpen(false)}>Settings</Link>
                  <button onClick={() => logout(() => setDropdownOpen(false))}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline">Sign in</Link>
              <Link href="/signup" className="btn btn-filled">Sign&nbsp;Up</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          aria-label="Toggle menu"
          className={`hamburger ${open ? 'active' : ''}`}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? 'show' : ''}`}>
        <button
          className="close-btn"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>

        {isLoggedIn ? (
          <>
            <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link href="/profile" onClick={() => setOpen(false)}>Profile</Link>
            <Link href="/profilesettings" onClick={() => setOpen(false)}>Settings</Link>
            <button className="btn btn-filled" onClick={() => logout(() => setOpen(false))}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
            <Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link>
            <hr />
            <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link href="/signup" className="btn btn-filled" onClick={() => setOpen(false)}>
              Sign&nbsp;Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
