'use client';

import React from 'react';
import Image from 'next/image';
import './cart.css';
import { FaTrashAlt, FaVrCardboard } from 'react-icons/fa';

export default function ShoppingCart() {
  return (
    <div className="cart-container">
      <Image
        src="/logo.png"
        alt="Xclusive 3D Logo"
        width={180}
        height={90}
        className="logo"
      />

      <h2 className="cart-title">Shopping Cart</h2>

      <div className="cart-item">
        <div className="item-icon">
          <FaVrCardboard size={24} color="#fff" />
        </div>
        <div className="item-info">
          <strong>10 credits for</strong>
          <span>3D video conversion</span>
        </div>
        <button className="delete-btn" aria-label="Delete item">
          <FaTrashAlt color="#fff" />
        </button>
      </div>

      <button className="checkout-btn">Checkout</button>
    </div>
  );
}
