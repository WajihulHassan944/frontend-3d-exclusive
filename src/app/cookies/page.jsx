import CookiesPolicy from "./CookiesPolicy";

const cookiesSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/cookies",
  url: "https://xclusive3d.com/cookies",
  name: "Cookies Policy | Xclusive 3D",
  description:
    "Read the Cookies Policy of Xclusive 3D to understand how we use cookies and similar technologies to enhance your browsing experience and comply with GDPR.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
  about: {
    "@type": "Thing",
    name: "Cookies Policy",
    description:
      "Details about Xclusive 3D’s use of cookies, including essential, performance, preference, and advertising cookies, along with how to manage preferences.",
  },
};

export const metadata = {
  title: "Cookies Policy | Xclusive 3D Video Conversion Service",
  description:
    "Learn how Xclusive 3D uses cookies to improve user experience, provide functionality, and deliver personalized content. Manage your preferences anytime.",
  alternates: {
    canonical: "https://xclusive3d.com/cookies",
  },
  openGraph: {
    title: "Cookies Policy | Xclusive 3D",
    description:
      "Understand how Xclusive 3D uses cookies, including essential, performance, preference, and advertising cookies. Learn how to manage your cookie preferences.",
    url: "https://xclusive3d.com/cookies",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/cookies.png",
        width: 500,
        height: 500,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cookies Policy | Xclusive 3D",
    description:
      "Read Xclusive 3D’s Cookies Policy to understand how we use cookies to enhance functionality and personalization.",
    images: ["https://www.xclusive3d.com/assets/cookies.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cookiesSchema) }}
      />
      <CookiesPolicy />
    </>
  );
}
