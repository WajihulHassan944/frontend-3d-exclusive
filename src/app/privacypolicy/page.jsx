import PrivacyPolicy from "./PrivacyPolicy";

const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/privacypolicy",
  url: "https://xclusive3d.com/privacypolicy",
  name: "Privacy Policy | Xclusive 3D",
  description:
    "Read Xclusive 3D’s Privacy Policy to understand how we collect, use, and protect your data in compliance with GDPR and global privacy laws.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
  about: {
    "@type": "Thing",
    name: "Privacy Policy",
    description:
      "Details on how Xclusive 3D handles user data, including information collected, retention, usage, rights under GDPR, and data security.",
  },
};

export const metadata = {
  title: "Privacy Policy | Xclusive 3D Video Conversion",
  description:
    "Learn how Xclusive 3D collects, uses, and protects your personal data when using our AI-powered 2D to 3D video conversion platform.",
  alternates: {
    canonical: "https://xclusive3d.com/privacypolicy",
  },
  openGraph: {
    title: "Privacy Policy | Xclusive 3D",
    description:
      "Understand how your data is handled securely and in compliance with GDPR at Xclusive 3D.",
    url: "https://xclusive3d.com/privacypolicy",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/privacy-policy.png",
        width: 500,
        height: 500,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Xclusive 3D",
    description:
      "Review Xclusive 3D’s Privacy Policy to see how your personal data is protected under GDPR and other privacy laws.",
    images: ["https://www.xclusive3d.com/assets/privacy-policy.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />
      <PrivacyPolicy />
    </>
  );
}
