'use client';

import Image from 'next/image';
import Link from 'next/link';
import './checkout.css';

export default function CheckoutPage() {
  return (
    <main className="checkout">
      {/* top logo */}
      <Image
        src="https://res.cloudinary.com/daflot6fo/image/upload/v1752555158/two-Photoroom_bvwst2.png"     /* put your logo inside /public */
        alt="Xclusive 3D"
        width={120}
              height={80}
        className="checkout-logo"
        priority
      />

      {/* heading */}
      <h1 className="checkout-title">Checkout</h1>

      {/* glassy product box */}
      <div className="credit-box">
        10&nbsp;credits&nbsp;for&nbsp;3D&nbsp;video&nbsp;conversion
      </div>

      {/* CTA button */}
      <Link href="/payment" className="cta-btn">
        Complete&nbsp;Purchase
      </Link>
    </main>
  );
}
