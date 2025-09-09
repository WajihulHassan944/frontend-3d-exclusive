import React, { Suspense } from "react";
import CartPage from "./CartPage";

const cartSchema = {
  "@context": "https://schema.org",
  "@type": "ShoppingCart",
  name: "Xclusive 3D Cart",
  description:
    "Your shopping cart on Xclusive 3D. Review and manage your credits, video conversion services, and checkout securely.",
  url: "https://xclusive3d.com/cart",
  potentialAction: {
    "@type": "BuyAction",
    target: "https://xclusive3d.com/checkout",
  },
};

export const metadata = {
  title: "Cart | Xclusive 3D",
  description:
    "View and manage your Xclusive 3D cart. Add credits, review items, and proceed to secure checkout.",
  alternates: {
    canonical: "https://xclusive3d.com/cart",
  },
  openGraph: {
    title: "Your Cart | Xclusive 3D",
    description:
      "Manage your items and proceed to secure checkout with Xclusive 3D.",
    url: "https://xclusive3d.com/cart",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/cart-preview.png",
        width: 1200,
        height: 630,
        alt: "Xclusive 3D Cart Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Cart | Xclusive 3D",
    description:
      "Check your cart items and complete your purchase securely with Xclusive 3D.",
    images: ["https://www.xclusive3d.com/assets/cart-preview.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data for ShoppingCart */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cartSchema) }}
      />
      <Suspense fallback={<div>Loading cart...</div>}>
        <CartPage />
      </Suspense>
    </>
  );
}
