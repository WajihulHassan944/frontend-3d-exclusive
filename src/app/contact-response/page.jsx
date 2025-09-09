import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import "../status/thank.css";

const contactConfirmationSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/contact/contact-response",
  url: "https://xclusive3d.com/contact/contact-response",
  name: "Message Sent | Xclusive 3D",
  description:
    "Thank you for contacting Xclusive 3D. Your message has been successfully sent. We will respond within 24 hours during business days.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
};

// ✅ Page-level SEO metadata
export const metadata = {
  title: "Thank You | Contact Confirmation | Xclusive 3D",
  description:
    "Your message has been sent successfully. The Xclusive 3D team will reply to your inquiry within 24 hours during business days.",
  alternates: {
    canonical: "https://xclusive3d.com/contact/contact-response",
  },
  openGraph: {
    title: "Message Sent | Xclusive 3D",
    description:
      "We’ve received your message and will respond within 24 hours during business days.",
    url: "https://xclusive3d.com/contact/contact-response",
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
    title: "Message Sent | Xclusive 3D",
    description:
      "Your message has been successfully sent. We will reply within 24 hours.",
    images: ["https://www.xclusive3d.com/assets/logo.png"],
  },
};

export default function Page() {
  return (
    <div className="verify-container" style={{ marginTop: "4%" }}>
      {/* ✅ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactConfirmationSchema),
        }}
      />
      <div className="verify-box" style={{ maxWidth: "500px" }}>
        <FaCheckCircle size={60} color="#ff8c2f" />
        <h2>Thank you!</h2>
        <center>
          <p style={{ maxWidth: "400px", margin: "15px 0" }}>
            Your message has been sent. We will come back to you within 24 hours
            on business days.
          </p>
        </center>
        <Link href="/">
          <button className="login-btn">Home</button>
        </Link>
      </div>
    </div>
  );
}
