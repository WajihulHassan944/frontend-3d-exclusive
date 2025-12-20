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
    {/* ✅ Google Analytics (GA4) */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Z94GNVX0GM"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Z94GNVX0GM');
    `,
  }}
/>
{/* ✅ Meta Pixel */}
<script
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1005526805967106');
      fbq('track', 'PageView');
    `,
  }}
/>
<noscript>
  <img
    height="1"
    width="1"
    style={{ display: 'none' }}
    src="https://www.facebook.com/tr?id=1005526805967106&ev=PageView&noscript=1"
  />
</noscript>

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
      
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
