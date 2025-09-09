import React, { Suspense } from "react";
import Dashboard from "./Dashboard";

const dashboardSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/dashboard",
  url: "https://xclusive3d.com/dashboard",
  name: "User Dashboard | Xclusive 3D",
  description:
    "Access your Xclusive 3D dashboard. Track video uploads, monitor processing statuses, download completed conversions, and manage your credit balance.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
  potentialAction: {
    "@type": "ViewAction",
    target: "https://xclusive3d.com/dashboard",
    name: "View Dashboard",
  },
};

export const metadata = {
  title: "Dashboard | Xclusive 3D Video Conversion",
  description:
    "Monitor your uploaded videos, track processing progress, download completed files, and manage your credits in the Xclusive 3D dashboard.",
  alternates: {
    canonical: "https://xclusive3d.com/dashboard",
  },
  openGraph: {
    title: "User Dashboard | Xclusive 3D",
    description:
      "Track and manage your video uploads and credits in the Xclusive 3D dashboard.",
    url: "https://xclusive3d.com/dashboard",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/dashboard-preview.png",
        width: 600,
        height: 400,
        alt: "Xclusive 3D Dashboard Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "User Dashboard | Xclusive 3D",
    description:
      "Track your video conversions and credits in your Xclusive 3D dashboard.",
    images: ["https://www.xclusive3d.com/assets/dashboard-preview.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dashboardSchema) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    </>
  );
}
