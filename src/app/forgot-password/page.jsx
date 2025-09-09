import ForgotPassword from "./ForgotPassword";

const forgotSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/forgot-password",
  url: "https://xclusive3d.com/forgot-password",
  name: "Forgot Password | Xclusive 3D",
  description:
    "Reset your Xclusive 3D account password. Request a secure email link to recover access and continue converting your 2D videos into immersive 3D.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://xclusive3d.com/",
    name: "Xclusive 3D",
  },
};

export const metadata = {
  title: "Forgot Password | Xclusive 3D Video Conversion",
  description:
    "Easily reset your password and regain access to your Xclusive 3D account. Request a secure password reset link via email.",
  alternates: {
    canonical: "https://xclusive3d.com/forgot-password",
  },
  openGraph: {
    title: "Forgot Password | Xclusive 3D",
    description:
      "Request a password reset link to securely recover your Xclusive 3D account and continue converting 2D videos into immersive 3D.",
    url: "https://xclusive3d.com/forgot-password",
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
    title: "Forgot Password | Xclusive 3D",
    description:
      "Reset your Xclusive 3D account password securely via email link.",
    images: ["https://www.xclusive3d.com/assets/logo.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(forgotSchema) }}
      />
      <ForgotPassword />
    </>
  );
}
