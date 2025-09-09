import React, { Suspense } from "react";
import PaymentConformation from "./PaymentConformation";

const orderSchema = {
  "@context": "https://schema.org",
  "@type": "Order",
  seller: {
    "@type": "Organization",
    name: "Xclusive 3D",
    url: "https://xclusive3d.com",
    logo: "https://xclusive3d.com/assets/logo.png",
  },
  potentialAction: {
    "@type": "DownloadAction",
    target: "https://xclusive3d.com/account/invoices",
    name: "Download Invoice",
  },
  confirmationNumber: "Invoice Number",
  orderStatus: "https://schema.org/OrderDelivered",
  priceCurrency: "EUR",
};

export const metadata = {
  title: "Payment Confirmation | Xclusive 3D",
  description:
    "Your payment was successful. Download your invoice and start processing your 3D video conversions with Xclusive 3D.",
  alternates: {
    canonical: "https://xclusive3d.com/thankyou-for-purchase",
  },
  openGraph: {
    title: "Payment Confirmation | Xclusive 3D",
    description:
      "Payment successful! Download your invoice and start converting videos into immersive 3D experiences.",
    url: "https://xclusive3d.com/thankyou-for-purchase",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/payment-success.png",
        width: 1200,
        height: 630,
        alt: "Xclusive 3D Payment Confirmation",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Confirmation | Xclusive 3D",
    description:
      "Your payment was successful. Download your invoice and enjoy 3D video conversion with Xclusive 3D.",
    images: ["https://www.xclusive3d.com/assets/payment-success.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ JSON-LD Structured Data for Order */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orderSchema) }}
      />
      <Suspense fallback={<div>Loading confirmation...</div>}>
        <PaymentConformation />
      </Suspense>
    </>
  );
}
