// pages/404.js
import Link from 'next/link';
import Head from 'next/head';
import './404.css'; // make sure this path is correct

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found - XCLUSIVE 3D</title>
      </Head>
      <div className="not-found-container">
        <h1>404</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link href="/" className="btn btn-filled">
          Go Home
        </Link>
      </div>
    </>
  );
}
