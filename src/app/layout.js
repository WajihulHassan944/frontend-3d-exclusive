import "./globals.css";
import React from "react";
import ClientLayout from "./ClientLayout";
import { baseUrl } from "@/const";

export async function generateMetadata() {
  try {
    const res = await fetch(`${baseUrl}/pages/getHomeSeo`, {
      cache: "no-store",
    });
    const data = await res.json();

    if (!data?.success || !data?.seo) throw new Error("No SEO data");

    const { metaTitle, metaDescription, openGraphImage } = data.seo;

    return {
      title: metaTitle || "Xclusive 3D | Convert 2D Videos into Immersive 3D Experiences",
      description:
        metaDescription ||
        "Transform your flat 2D videos into immersive 3D experiences for Meta Quest, Apple Vision Pro, and VR headsets.",
      alternates: { canonical: "https://xclusive3d.com" },
      openGraph: {
        title: metaTitle || "Xclusive 3D | Convert 2D Videos into Immersive 3D",
        description:
          metaDescription ||
          "Easily convert your 2D videos into VR-ready 3D formats. Perfect for Meta Quest, Apple Vision Pro, and immersive video experiences.",
        url: "https://xclusive3d.com",
        siteName: "Xclusive 3D",
        images: [
          {
            url: openGraphImage || "https://www.xclusive3d.com/assets/og-home.png",
            width: 1200,
            height: 630,
            alt: "Xclusive 3D homepage",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle || "Xclusive 3D | Convert 2D Videos into Immersive 3D",
        description:
          metaDescription ||
          "Convert your videos into immersive 3D for Meta Quest & Apple Vision Pro. Start your 3D experience today.",
        images: [openGraphImage || "https://www.xclusive3d.com/assets/og-home.png"],
      },
      robots: { index: true, follow: true },
    };
  } catch (error) {
    console.error("Error fetching SEO metadata:", error);
    return {
      title: "Xclusive 3D | Convert 2D Videos into Immersive 3D Experiences",
      description:
        "Transform your flat 2D videos into immersive 3D experiences for Meta Quest, Apple Vision Pro, and VR headsets.",
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager (Placeholder) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Xclusive 3D",
              url: "https://xclusive3d.com",
              logo: "https://xclusive3d.com/logoMain.png",
              sameAs: [
                "https://www.facebook.com/xclusive3d",
                "https://twitter.com/xclusive3d",
                "https://www.linkedin.com/company/xclusive3d",
              ],
            }),
          }}
        />
      </head>

      <body>
        {/* ✅ Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
