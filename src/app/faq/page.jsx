import FaqClient from "./FaqClient";
import { baseUrl } from "@/const";

// ✅ Fetch FAQ page data (server-side)
async function getFaqPage() {
  try {
    const res = await fetch(`${baseUrl}/pages/url/faq`, { cache: "no-store" });
    const data = await res.json();
    if (data.success && data.pageByUrl) return data.pageByUrl;
  } catch (err) {
    console.error("Error fetching FAQ page data:", err);
  }
  return null;
}

// ✅ Generate dynamic metadata
export async function generateMetadata() {
  const pageData = await getFaqPage();

  if (!pageData) {
    return {
      title: "FAQs | Xclusive 3D Video Conversion Service",
      description:
        "Find answers to frequently asked questions about Xclusive 3D. Learn how to convert 2D videos into immersive 3D formats for Meta Quest, Apple Vision Pro, and YouTube 3D.",
      alternates: { canonical: "https://xclusive3d.com/faq" },
    };
  }

  const { seo } = pageData;
  return {
    title: seo?.metaTitle || "FAQs | Xclusive 3D",
    description:
      seo?.metaDescription ||
      "Find answers to FAQs about Xclusive 3D’s 2D to 3D video conversion service.",
    alternates: { canonical: "https://xclusive3d.com/faq" },
    openGraph: {
      title: seo?.metaTitle || "FAQs | Xclusive 3D",
      description:
        seo?.metaDescription ||
        "Got questions about 3D video conversion? Explore our FAQs to learn about formats, supported devices, and pricing.",
      url: "https://xclusive3d.com/faq",
      siteName: "Xclusive 3D",
      images: [
        {
          url: seo?.openGraphImage || "https://www.xclusive3d.com/assets/faqs.png",
          width: 1200,
          height: 630,
          alt: "Xclusive 3D FAQ OG Image",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle || "FAQs | Xclusive 3D",
      description:
        seo?.metaDescription ||
        "Find answers to frequently asked questions about Xclusive 3D.",
      images: [seo?.openGraphImage || "https://www.xclusive3d.com/assets/faqs.png"],
    },
  };
}

// ✅ Static fallback FAQ schema (SEO)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [],
};

// ✅ Page component
export default async function Page() {
  const pageData = await getFaqPage();

  // fallback data if API fails
  const faqs =
    pageData?.sections?.[0]?.faqs?.map((f) => ({
      q: f.question,
      a: f.answer,
    })) || [];

  const section = pageData?.sections?.[0] || null;

  return (
    <>
      {/* ✅ Schema injected for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...faqSchema,
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />

      {/* ✅ Pass dynamic props */}
      <FaqClient faqs={faqs} section={section} />
    </>
  );
}
