import Contact from "./Contact";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://xclusive3d.com/contact",
  url: "https://xclusive3d.com/contact",
  name: "Contact | Xclusive 3D",
  description:
    "Have questions about our 3D video conversion service? Contact Xclusive 3D — we typically respond within 24 hours during business days.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
  mainEntity: {
    "@type": "Organization",
    name: "Xclusive 3D",
    url: "https://xclusive3d.com/",
    logo: "https://www.xclusive3d.com/assets/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English"],
      hoursAvailable: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
    },
  },
};

// ✅ Page-level metadata
export const metadata = {
  title: "Contact | Xclusive 3D Video Conversion Service",
  description:
    "Have questions about our 3D video conversion service? Contact Xclusive 3D today. We typically respond within 24 hours during business days.",
  alternates: {
    canonical: "https://xclusive3d.com/contact",
  },
  openGraph: {
    title: "Contact | Xclusive 3D",
    description:
      "Need help or have questions about 2D to 3D video conversion? Reach out to Xclusive 3D and our support team will assist you.",
    url: "https://xclusive3d.com/contact",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/contact.png",
        width: 500,
        height: 500,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact | Xclusive 3D Video Conversion",
    description:
      "Have questions about 3D video conversion? Contact Xclusive 3D and we’ll get back to you within 24 hours.",
    images: ["https://www.xclusive3d.com/assets/contact.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ Structured data (SSR) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Contact />
    </>
  );
}
