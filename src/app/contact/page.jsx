import Contact from "./Contact";
import { baseUrl } from "@/const";

// ✅ Fetch Contact Page Data (server-side)
async function getContactPage() {
  try {
    const res = await fetch(`${baseUrl}/pages/url/contact`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (data.success && data.pageByUrl) return data.pageByUrl;
  } catch (err) {
    console.error("Error fetching Contact page data:", err);
  }
  return null;
}

// ✅ Generate dynamic metadata
export async function generateMetadata() {
  const pageData = await getContactPage();

  if (!pageData) {
    return {
      title: "Contact | Xclusive 3D",
      description:
        "Reach out to Xclusive 3D for any inquiries about our AI-powered video enhancement and 3D conversion services.",
      alternates: { canonical: "https://xclusive3d.com/contact" },
    };
  }

  const { seo, pageName, pageUrl } = pageData;

  const metaTitle = seo?.metaTitle || `${pageName} | Xclusive 3D`;
  const metaDescription =
    seo?.metaDescription ||
    "Have questions about our 3D video conversion service? Contact us today!";
  const ogImage =
    seo?.openGraphImage || "https://www.xclusive3d.com/assets/contact.png";

  const fullUrl = `https://xclusive3d.com${pageUrl}`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: fullUrl },

    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: fullUrl,
      siteName: "Xclusive 3D",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageName,
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
}

// ✅ Structured Data (JSON-LD)
const contactSchema = (page) => ({
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
});

// ✅ Page Component
export default async function Page() {
  const pageData = await getContactPage();

  if (!pageData) return <p>Page not found</p>;

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema(pageData)),
        }}
      />

      <Contact page={pageData} />
    </>
  );
}
