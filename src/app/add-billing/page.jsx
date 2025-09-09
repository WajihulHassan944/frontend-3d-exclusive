import React, { Suspense } from "react";
import AddBilling from "./AddBilling";

const billingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/add-billing",
  url: "https://xclusive3d.com/add-billing",
  name: "Billing & Payment Methods | Xclusive 3D",
  description:
    "Manage your billing details and securely add payment methods with Stripe to top up your Xclusive 3D credits for 2D to 3D video conversion.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
  potentialAction: {
    "@type": "PayAction",
    target: "https://xclusive3d.com/add-billing",
    name: "Manage Billing and Payments",
  },
};

export const metadata = {
  title: "Billing & Payment Methods | Xclusive 3D Video Conversion",
  description:
    "Add and manage payment methods securely with Stripe. Easily top up your credits for 2D to 3D video conversion on Xclusive 3D.",
  alternates: {
    canonical: "https://xclusive3d.com/add-billing",
  },
  openGraph: {
    title: "Billing & Payment Methods | Xclusive 3D",
    description:
      "Manage your billing details and securely add payment methods with Stripe for Xclusive 3D.",
    url: "https://xclusive3d.com/add-billing",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/billing-preview.png",
        width: 600,
        height: 400,
        alt: "Xclusive 3D Billing Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Billing & Payment Methods | Xclusive 3D",
    description:
      "Securely manage billing and add payment methods with Stripe to top up your Xclusive 3D credits.",
    images: ["https://www.xclusive3d.com/assets/billing-preview.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(billingSchema) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <AddBilling />
      </Suspense>
    </>
  );
}
