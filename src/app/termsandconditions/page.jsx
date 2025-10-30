import TermsAndConditions from "./TermsAndConditions";
import { baseUrl } from "@/const";
// ✅ Fetch function reused by both metadata and page
async function getPageData() {
  const res = await fetch(`${baseUrl}/pages/url/termsandconditions`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch page data");
  const data = await res.json();
  return data?.pageByUrl;
}

// ✅ Dynamic metadata from the same API
export async function generateMetadata() {
  const page = await getPageData();
  const seo = page?.seo || {};

  return {
    title: seo.metaTitle || "Terms of Service | Xclusive 3D Video Conversion",
    description:
      seo.metaDescription ||
      "Review Xclusive 3D’s Terms of Service (v2.0) including user responsibilities, copyright policies, credit validity, and liability limitations.",
    alternates: {
      canonical: "https://xclusive3d.com/termsandconditions",
    },
    openGraph: {
      title: seo.metaTitle || "Terms of Service | Xclusive 3D",
      description:
        seo.metaDescription ||
        "Understand the rules and responsibilities of using Xclusive 3D’s AI-powered 2D to 3D video conversion service.",
      url: "https://xclusive3d.com/termsandconditions",
      siteName: "Xclusive 3D",
      images: [
        {
          url:
            seo.openGraphImage ||
            "https://www.xclusive3d.com/assets/terms-and-conditions.png",
          width: 1200,
          height: 630,
          alt: seo.metaTitle || "Xclusive 3D Logo",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Terms of Service | Xclusive 3D",
      description:
        seo.metaDescription ||
        "Read Xclusive 3D’s Terms of Service (v2.0) to learn about usage rights, responsibilities, and service limitations.",
      images: [
        seo.openGraphImage ||
          "https://www.xclusive3d.com/assets/terms-and-conditions.png",
      ],
    },
  };
}

// ✅ Page component uses the same fetched data
export default async function Page() {
  const page = await getPageData();

  return (
    <>
      <TermsAndConditions section={page?.sections || []} />
    </>
  );
}
