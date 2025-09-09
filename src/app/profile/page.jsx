

import React, { Suspense } from "react";
import Profile from "./Profile";

const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://xclusive3d.com/profile",
  url: "https://xclusive3d.com/profile",
  name: "User Profile | Xclusive 3D",
  description:
    "View and manage your Xclusive 3D account profile, including personal details, country, email, and available credits for 2D to 3D video conversion.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
  potentialAction: {
    "@type": "UpdateAction",
    target: "https://xclusive3d.com/profile",
    name: "Update Profile Information",
  },
};

export const metadata = {
  title: "Profile | Xclusive 3D Video Conversion",
  description:
    "Manage your Xclusive 3D account profile. View your credits, check expiry dates, and update your personal details for seamless 2D to 3D video conversion.",
  alternates: {
    canonical: "https://xclusive3d.com/profile",
  },
  openGraph: {
    title: "User Profile | Xclusive 3D",
    description:
      "View and manage your profile and credits on Xclusive 3D. Track credit expirations and keep your account details up to date.",
    url: "https://xclusive3d.com/profile",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/logo.png",
        width: 600,
        height: 400,
        alt: "Xclusive 3D Profile Dashboard",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Profile | Xclusive 3D",
    description:
      "Manage your Xclusive 3D account profile and credits for video conversion.",
    images: ["https://www.xclusive3d.com/assets/profile-preview.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Profile />
      </Suspense>
    </>
  );
}
