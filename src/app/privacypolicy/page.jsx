import PrivacyPolicy from "./PrivacyPolicy";
import { baseUrl } from "@/const";

// ✅ Reusable fetcher
async function getPrivacyPage() {
  try {
    const res = await fetch(`${baseUrl}/pages/url/privacypolicy`, { cache: "no-store" });
    const data = await res.json();
    if (data.success && data.pageByUrl) return data.pageByUrl;
  } catch (err) {
    console.error("Error fetching Privacy Policy page:", err);
  }
  return null;
}

// ✅ Dynamic metadata (Next.js standard way)
export async function generateMetadata() {
  const pageData = await getPrivacyPage();

  if (!pageData) {
    return {
      title: "Privacy Policy | Xclusive 3D Video Conversion",
      description:
        "Learn how Xclusive 3D collects, uses, and protects your personal data when using our AI-powered 2D to 3D video conversion platform.",
      alternates: { canonical: "https://xclusive3d.com/privacypolicy" },
    };
  }

  const { seo } = pageData;

  return {
    title: seo?.metaTitle || "Privacy Policy | Xclusive 3D",
    description:
      seo?.metaDescription ||
      "Learn how Xclusive 3D collects, uses, and protects your personal data.",
    alternates: { canonical: "https://xclusive3d.com/privacypolicy" },
    openGraph: {
      title: seo?.metaTitle || "Privacy Policy | Xclusive 3D",
      description:
        seo?.metaDescription ||
        "Understand how Xclusive 3D manages and protects your information.",
      url: "https://xclusive3d.com/privacypolicy",
      siteName: "Xclusive 3D",
      images: [
        {
          url:
            seo?.openGraphImage ||
            "https://www.xclusive3d.com/assets/privacy-policy.png",
          width: 1200,
          height: 630,
          alt: "Privacy Policy - Xclusive 3D",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle || "Privacy Policy | Xclusive 3D",
      description:
        seo?.metaDescription ||
        "How Xclusive 3D collects and protects your personal data.",
      images: [
        seo?.openGraphImage || "https://www.xclusive3d.com/assets/privacy-policy.png",
      ],
    },
  };
}

// ✅ JSON-LD Schema for SEO
const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/privacypolicy",
  url: "https://xclusive3d.com/privacypolicy",
  name: "Privacy Policy | Xclusive 3D",
  description:
    "Learn how Xclusive 3D collects, uses, and protects your personal data when using our AI-powered 2D to 3D video conversion platform.",
};

// ✅ Page Component
export default async function Page() {
  const pageData = await getPrivacyPage();

  return (
    <>
      {/* ✅ SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
      />

      {/* ✅ Pass data once (no refetch) */}
      <PrivacyPolicy section={pageData?.sections || []} />
    </>
  );
}
