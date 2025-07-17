'use client';

import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';          // move this import to app/layout.js if you’re using the App Router

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* ─── Logo ─────────────────────────────────── */}
        <Link href="/" className="footer-logo">
          <Image
            src="/logo.png"   /* use the white version you just generated */
            alt="Xclusive 3D"
            width={150}
            height={95}
            style={{objectFit:'contain'}}
            priority
          />
        </Link>

        {/* ─── Footer links ─────────────────────────── */}
        <nav className="footer-links">
          <Link href="/termsandconditions">Terms &amp; Conditions</Link>
          <Link href="/privacypolicy">Privacy Policy</Link>
           <Link href="/cookies">Cookies</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>

      <div className="footer-copy">
        © {new Date().getFullYear()} Xclusive 3D — All rights reserved.
      </div>
    </footer>
  );
}
