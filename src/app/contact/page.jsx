import Contact from "./Contact";
import { baseUrl } from "@/const";

// ✅ Generate SEO metadata dynamically
export async function generateMetadata() {
  try {
    const res = await fetch(`${baseUrl}/pages/url/contact`, { cache: "no-store" });
    const data = await res.json();

    if (!data.success || !data.pageByUrl) {
      throw new Error("Page not found");
    }

    const page = data.pageByUrl;
    const seo = page.seo || {};

    const metaTitle = seo.metaTitle || `${page.pageName} | Xclusive 3D`;
    const metaDescription =
      seo.metaDescription ||
      "Have questions about our 3D video conversion service? Contact us today!";
    const ogImage =
      seo.openGraphImage ||
      "https://www.xclusive3d.com/assets/contact.png";
    const pageUrl = `https://xclusive3d.com${page.pageUrl}`;

    return {
      title: metaTitle,
      description: metaDescription,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: pageUrl,
        siteName: "Xclusive 3D",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: page.pageName,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
        images: [ogImage],
      },
    };
  } catch (err) {
    return {
      title: "Contact | Xclusive 3D",
      description:
        "Reach out to Xclusive 3D for any inquiries or collaboration opportunities.",
    };
  }
}

// ✅ Render Page
export default async function Page() {
  try {
    const res = await fetch(`${baseUrl}/pages/url/contact`, {
      cache: "no-store",
    });
    const data = await res.json();

    const page = data?.pageByUrl;
    if (!page) {
      return <p>Page not found</p>;
    }

    // ✅ Schema.org structured data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `https://xclusive3d.com${page.pageUrl}`,
      url: `https://xclusive3d.com${page.pageUrl}`,
      name: page.pageName,
      description: page.seo?.metaDescription || "",
      isPartOf: {
        "@type": "WebSite",
        url: "https://xclusive3d.com/",
        name: "Xclusive 3D",
      },
      mainEntity: {
        "@type": "Organization",
        name: "Xclusive 3D",
        url: "https://xclusive3d.com/",
        logo: "https://www.xclusive3d.com/assets/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: ["English"],
          hoursAvailable: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ],
              opens: "09:00",
              closes: "18:00",
            },
          ],
        },
      },
    };

    return (
      <>
        {/* ✅ Inject JSON-LD schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <Contact page={page} />
      </>
    );
  } catch (error) {
    return <p>Failed to load page data.</p>;
  }
}
