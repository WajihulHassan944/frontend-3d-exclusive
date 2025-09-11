import React, { Suspense } from "react";
import Blogs from "./Blogs";

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

export const metadata = {
  title: "VR 3D Content Blog | Xclusive 3D Video Conversion",
  description:
    "Discover everything about 3D video conversion for Meta Quest and Apple Vision Pro. Tutorials, insights, and business applications of immersive 3D.",
  alternates: {
    canonical: "https://xclusive3d.com/blogs",
  },
  openGraph: {
    title: "VR 3D Content Blog | Xclusive 3D",
    description:
      "Learn how to convert and use 3D video content for VR devices like Meta Quest and Apple Vision Pro with Xclusive 3D.",
    url: "https://xclusive3d.com/blogs",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/blogs.png",
        width: 1200,
        height: 630,
        alt: "Xclusive 3D Blog - VR 3D Content",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VR 3D Content Blog | Xclusive 3D",
    description:
      "Guides, tutorials, and insights about immersive 3D video conversion for VR headsets.",
    images: ["https://www.xclusive3d.com/assets/blogs.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Blogs />
      </Suspense>
    </>
  );
}
