import React, { Suspense } from "react";
import ResetPassword from "./ResetPassword";

const resetSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/reset-password",
  url: "https://xclusive3d.com/reset-password",
  name: "Reset Password | Xclusive 3D",
  description:
    "Reset your Xclusive 3D account password securely. Enter a new password to regain access and continue converting 2D videos into immersive 3D.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
};

export const metadata = {
  title: "Reset Password | Xclusive 3D Video Conversion",
  description:
    "Create a new password and securely recover your Xclusive 3D account to continue converting 2D videos into immersive 3D experiences.",
  alternates: {
    canonical: "https://xclusive3d.com/reset-password",
  },
  openGraph: {
    title: "Reset Password | Xclusive 3D",
    description:
      "Enter a new password and recover your Xclusive 3D account securely.",
    url: "https://xclusive3d.com/reset-password",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/logo.png",
        width: 500,
        height: 500,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Reset Password | Xclusive 3D",
    description:
      "Reset your Xclusive 3D account password securely and regain access to your projects.",
    images: ["https://www.xclusive3d.com/assets/logo.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resetSchema) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </>
  );
}
