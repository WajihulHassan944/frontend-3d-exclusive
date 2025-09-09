import Verify from "./Verify";

const verifySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/verify",
  url: "https://xclusive3d.com/verify",
  name: "Account Verification | Xclusive 3D",
  description:
    "Verify your email to activate your Xclusive 3D account and start converting 2D videos into immersive 3D for Meta Quest, Apple Vision Pro, and YouTube 3D.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
};

export const metadata = {
  title: "Verify Your Account | Xclusive 3D",
  description:
    "Check your inbox and verify your email address to activate your Xclusive 3D account. Start converting your 2D videos into immersive 3D.",
  alternates: {
    canonical: "https://xclusive3d.com/verify",
  },
  openGraph: {
    title: "Account Verification | Xclusive 3D",
    description:
      "Verify your email to activate your Xclusive 3D account and begin converting 2D videos into immersive 3D for Meta Quest, Apple Vision Pro, and YouTube 3D.",
    url: "https://xclusive3d.com/verify",
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
    title: "Verify Your Account | Xclusive 3D",
    description:
      "We’ve sent a verification email. Confirm it to activate your account and start using Xclusive 3D’s 2D-to-3D video conversion service.",
    images: ["https://www.xclusive3d.com/assets/logo.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(verifySchema) }}
      />
      <Verify />
    </>
  );
}
