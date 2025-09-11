import TermsAndConditions from "./TermsAndConditions";

const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/termsandconditions",
  url: "https://xclusive3d.com/termsandconditions",
  name: "Terms of Service | Xclusive 3D",
  description:
    "Read the Terms of Service (v2.0) of Xclusive 3D to understand your rights, responsibilities, and limitations when using our 2D to 3D video conversion services.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
  about: {
    "@type": "Thing",
    name: "Terms of Service",
    description:
      "The legal agreement between Xclusive 3D and its users, covering consent, eligibility, content rights, credit validity, and user responsibilities.",
  },
};

export const metadata = {
  title: "Terms of Service | Xclusive 3D Video Conversion",
  description:
    "Review Xclusive 3D’s Terms of Service (v2.0) including user responsibilities, copyright policies, credit validity, and liability limitations.",
  alternates: {
    canonical: "https://xclusive3d.com/termsandconditions",
  },
  openGraph: {
    title: "Terms of Service | Xclusive 3D",
    description:
      "Understand the rules and responsibilities of using Xclusive 3D’s AI-powered 2D to 3D video conversion service.",
    url: "https://xclusive3d.com/termsandconditions",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/terms-and-conditions.png",
        width: 500,
        height: 500,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Xclusive 3D",
    description:
      "Read Xclusive 3D’s Terms of Service (v2.0) to learn about usage rights, responsibilities, and service limitations.",
    images: ["https://www.xclusive3d.com/assets/terms-and-conditions.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />
      <TermsAndConditions />
    </>
  );
}
