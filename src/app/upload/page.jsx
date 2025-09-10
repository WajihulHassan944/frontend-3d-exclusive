import React, { Suspense } from "react";
import Home from "./Home";

const uploadSchema = {
  "@context": "https://schema.org",
  "@type": "MediaObject",
  name: "Upload Video for 3D Conversion | Xclusive 3D",
  description:
    "Upload your video and convert it into immersive 3D with Xclusive 3D. Supports MP4, MOV, AVI, MKV, and old film formats. Get 1 free minute after signup.",
  url: "https://xclusive3d.com/upload",
  potentialAction: {
    "@type": "Action",
    name: "Convert Video to 3D",
    target: "https://xclusive3d.com/upload",
  },
};

export const metadata = {
  title: "Upload Video | Convert to 3D Online | Xclusive 3D",
  description:
    "Upload your video for instant 3D conversion. Compatible with Apple Vision Pro, Meta Quest, YouTube 3D, and more. Supports all major video formats.",
  alternates: {
    canonical: "https://xclusive3d.com/upload",
  },
  openGraph: {
    title: "Upload Your Video | Xclusive 3D",
    description:
      "Easily upload and convert your videos into immersive 3D. Optimized for Apple Vision Pro, Meta Quest, YouTube 3D, and other platforms.",
    url: "https://xclusive3d.com/upload",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/upload-preview.png",
        width: 1200,
        height: 630,
        alt: "Upload Video for 3D Conversion - Xclusive 3D",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upload Video | Convert to 3D Online | Xclusive 3D",
    description:
      "Upload your video and convert it into immersive 3D. Works with Vision Pro, Meta Quest, YouTube 3D, and more.",
    images: ["https://www.xclusive3d.com/assets/upload-preview.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data for Upload/Conversion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(uploadSchema) }}
      />
      <Suspense fallback={<div>Loading upload tool...</div>}>
        <Home />
      </Suspense>
    </>
  );
}
