import React, { Suspense } from "react";
import Blogs from "./Blogs";
import { baseUrl } from "@/const";

// ✅ Fetch Blog Page Data (Server-side)
async function getBlogPage() {
  try {
    const res = await fetch(`${baseUrl}/pages/url/blogs`, { cache: "no-store" });
    const data = await res.json();
    if (data.success && data.pageByUrl) return data.pageByUrl;
  } catch (err) {
    console.error("Error fetching Blog page data:", err);
  }
  return null;
}

// ✅ Generate Dynamic Metadata
export async function generateMetadata() {
  const pageData = await getBlogPage();

  if (!pageData) {
    return {
      title: "VR 3D Content Blog | Xclusive 3D Video Conversion",
      description:
        "Discover everything about 3D video conversion for Meta Quest and Apple Vision Pro. Tutorials, insights, and business applications of immersive 3D.",
      alternates: { canonical: "https://xclusive3d.com/blogs" },
    };
  }

  const { seo } = pageData;
  return {
    title: seo?.metaTitle || "VR 3D Content Blog | Xclusive 3D",
    description:
      seo?.metaDescription ||
      "Discover everything about 3D video conversion for Meta Quest and Apple Vision Pro.",
    alternates: { canonical: "https://xclusive3d.com/blogs" },
    openGraph: {
      title: seo?.metaTitle || "VR 3D Content Blog | Xclusive 3D",
      description:
        seo?.metaDescription ||
        "Learn how to convert and use 3D video content for VR devices like Meta Quest and Apple Vision Pro.",
      url: "https://xclusive3d.com/blogs",
      siteName: "Xclusive 3D",
      images: [
        {
          url:
            seo?.openGraphImage ||
            "https://www.xclusive3d.com/assets/blogs.png",
          width: 1200,
          height: 630,
          alt: "Xclusive 3D Blog - VR 3D Content",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle || "VR 3D Content Blog | Xclusive 3D",
      description:
        seo?.metaDescription ||
        "Guides, tutorials, and insights about immersive 3D video conversion for VR headsets.",
      images: [seo?.openGraphImage || "https://www.xclusive3d.com/assets/blogs.png"],
    },
  };
}

// ✅ Blog Schema for SEO
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://xclusive3d.com/blogs",
  url: "https://xclusive3d.com/blogs",
  name: "VR 3D Content Blog | Xclusive 3D",
  description:
    "Explore tutorials, insights, and technology guides about 3D video conversion, VR, and immersive content on the Xclusive 3D blog.",
  publisher: {
    "@type": "Organization",
    name: "Xclusive 3D",
    url: "https://xclusive3d.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.xclusive3d.com/assets/logo.png",
    },
  },
};

// ✅ Page Component
export default async function Page() {
  const pageData = await getBlogPage();
  const section = pageData?.sections?.[0] || {};

  return (
    <>
      {/* ✅ Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Blogs section={section} />
      </Suspense>
    </>
  );
}
