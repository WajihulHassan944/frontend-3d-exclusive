import Link from "next/link";
import "./404.css";

const notFoundSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/404",
  url: "https://xclusive3d.com/404",
  name: "404 Not Found | Xclusive 3D",
  description:
    "The page you’re looking for on Xclusive 3D doesn’t exist. Return to the homepage to continue exploring our AI-powered 2D to 3D video conversion services.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
};

export const metadata = {
  title: "404 Not Found | Xclusive 3D",
  description:
    "Oops! The page you’re trying to reach does not exist. Go back to the Xclusive 3D homepage.",
  alternates: {
    canonical: "https://xclusive3d.com/404",
  },
  openGraph: {
    title: "404 Not Found | Xclusive 3D",
    description:
      "This page could not be found. Navigate back to the Xclusive 3D homepage.",
    url: "https://xclusive3d.com/404",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/logo.png",
        width: 500,
        height: 500,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "404 Not Found | Xclusive 3D",
    description:
      "The page you’re looking for doesn’t exist. Head back to the homepage of Xclusive 3D.",
    images: ["https://www.xclusive3d.com/assets/logo.png"],
  },
};

export default function NotFoundPage() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(notFoundSchema) }}
      />

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
