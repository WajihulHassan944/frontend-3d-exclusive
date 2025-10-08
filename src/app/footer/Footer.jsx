'use client';

import Link from 'next/link';
import Image from 'next/image';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        {/* ─── Logo ─────────────────────────────────── */}
        <Link href="/" className="footer-logo" aria-label="Xclusive 3D Homepage">
          <Image
            src="/logo.png"
            alt="Xclusive 3D company logo"
            width={150}
            height={95}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* ─── Footer links ─────────────────────────── */}
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/termsandconditions">Terms &amp; Conditions</Link>
          <Link href="/privacypolicy">Privacy Policy</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>

<center>
  <p className='mutedp'>Apple Vision Pro and Meta Quest are trademarks of their respective owners. We are not affiliated with or endorsed by Apple or Meta.</p>
</center>

 <div className="footer-copy">
        <p>
          © {new Date().getFullYear()} <strong>Xclusive 3D</strong> — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
