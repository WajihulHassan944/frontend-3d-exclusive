import Pricing from "./Pricing";

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/pricing",
  url: "https://xclusive3d.com/pricing",
  name: "Pricing | Xclusive 3D",
  description:
    "Explore flexible pricing plans for Xclusive 3D’s AI-powered 2D to 3D video conversion service. Get 1 free minute after registration and choose from multiple quality tiers.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
  about: {
    "@type": "Thing",
    name: "3D Video Conversion Pricing",
    description:
      "Pricing options for converting 2D videos into immersive 3D formats including Meta Quest, Apple Vision Pro, and YouTube 3D.",
  },
};

export const metadata = {
  title: "Pricing | Xclusive 3D Video Conversion",
  description:
    "Check out Xclusive 3D’s flexible pricing. Get started with 1 free minute and explore affordable credit-based plans for 1080p, 2.7K, 4K, and 8K video conversions.",
  alternates: {
    canonical: "https://xclusive3d.com/pricing",
  },
  openGraph: {
    title: "Pricing | Xclusive 3D",
    description:
      "Choose the perfect pricing plan for your 3D video conversion needs. Enjoy 1 free minute after signup and flexible credit options.",
    url: "https://xclusive3d.com/pricing",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/pricing.png",
        width: 1200,
        height: 630,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Xclusive 3D",
    description:
      "Discover Xclusive 3D’s pricing plans for AI-powered 2D to 3D video conversion. Start with 1 free minute today.",
    images: ["https://www.xclusive3d.com/assets/pricing.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
      <Pricing />
    </>
  );
}
