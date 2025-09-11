import LoginForm from "./Login";

const loginSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/login",
  url: "https://xclusive3d.com/login",
  name: "Login | Xclusive 3D",
  description:
    "Sign in to your Xclusive 3D account to convert 2D videos into immersive 3D for Meta Quest, Apple Vision Pro, and YouTube 3D.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
};

// ✅ Page-level metadata
export const metadata = {
  title: "Sign in | Xclusive 3D Video Conversion Service",
  description:
    "Sign in to your Xclusive 3D account to convert 2D videos into immersive 3D for Meta Quest, Apple Vision Pro, and YouTube 3D.",
  alternates: {
    canonical: "https://xclusive3d.com/login",
  },
  openGraph: {
    title: "Login | Xclusive 3D",
    description:
      "Access your Xclusive 3D account and continue converting your 2D videos into high-quality immersive 3D formats.",
    url: "https://xclusive3d.com/login",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/signin.png",
        width: 500,
        height: 500,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Login | Xclusive 3D Video Conversion",
    description:
      "Sign in to Xclusive 3D to start converting your 2D videos into immersive 3D.",
    images: ["https://www.xclusive3d.com/assets/signin.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ Structured data (SSR) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(loginSchema) }}
      />
      <LoginForm />
    </>
  );
}
