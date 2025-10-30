import CookiesPolicy from "./CookiesPolicy";
import { baseUrl } from "@/const";

// ✅ Fetch Cookies Policy page data (server-side)
async function getCookiesPage() {
  try {
    const res = await fetch(`${baseUrl}/pages/url/cookies`, { cache: "no-store" });
    const data = await res.json();
    if (data.success && data.pageByUrl) return data.pageByUrl;
  } catch (err) {
    console.error("Error fetching Cookies page data:", err);
  }
  return null;
}

// ✅ Generate dynamic metadata
export async function generateMetadata() {
  const pageData = await getCookiesPage();

  if (!pageData) {
    return {
      title: "Cookies Policy | Xclusive 3D Video Conversion Service",
      description:
        "Learn how Xclusive 3D uses cookies to improve user experience, provide functionality, and deliver personalized content. Manage your preferences anytime.",
      alternates: { canonical: "https://xclusive3d.com/cookies" },
    };
  }

  const { seo } = pageData;
  return {
    title: seo?.metaTitle || "Cookies Policy | Xclusive 3D",
    description:
      seo?.metaDescription ||
      "Understand how Xclusive 3D uses cookies, including essential, performance, preference, and advertising cookies.",
    alternates: { canonical: "https://xclusive3d.com/cookies" },
    openGraph: {
      title: seo?.metaTitle || "Cookies Policy | Xclusive 3D",
      description:
        seo?.metaDescription ||
        "Understand how Xclusive 3D uses cookies, including essential, performance, preference, and advertising cookies.",
      url: "https://xclusive3d.com/cookies",
      siteName: "Xclusive 3D",
      images: [
        {
          url:
            seo?.openGraphImage ||
            "https://www.xclusive3d.com/assets/cookies.png",
          width: 1200,
          height: 630,
          alt: "Xclusive 3D Cookies Policy OG Image",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle || "Cookies Policy | Xclusive 3D",
      description:
        seo?.metaDescription ||
        "Read Xclusive 3D’s Cookies Policy to understand how we use cookies to enhance functionality and personalization.",
      images: [seo?.openGraphImage || "https://www.xclusive3d.com/assets/cookies.png"],
    },
  };
}

// ✅ Page component
export default async function Page() {
  const pageData = await getCookiesPage();

  const cookiesSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://xclusive3d.com/cookies",
    url: "https://xclusive3d.com/cookies",
    name: pageData?.seo?.metaTitle || "Cookies Policy | Xclusive 3D",
    description:
      pageData?.seo?.metaDescription ||
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

  return (
    <>
      {/* ✅ Inject Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cookiesSchema) }}
      />

      {/* ✅ Dynamic content */}
      <CookiesPolicy section={pageData?.sections || []} />
    </>
  );
}
