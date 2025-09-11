import SignupForm from "./Signup";

const signupSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://xclusive3d.com/signup",
  url: "https://xclusive3d.com/signup",
  name: "Sign Up | Xclusive 3D",
  description:
    "Create your Xclusive 3D account and start converting 2D videos into immersive 3D for Meta Quest, Apple Vision Pro, and YouTube 3D.",
  isPartOf: {
    "@type": "WebSite",
    url: "httpsclusive3d.com/",
    name: "Xclusive 3D",
  },
};

// ✅ Page-level metadata
export const metadata = {
  title: "Sign Up | Xclusive 3D Video Conversion Service",
  description:
    "Register now to create your Xclusive 3D account. Get 1 free minute of video conversion and start transforming your 2D videos into stunning immersive 3D.",
  alternates: {
    canonical: "https://xclusive3d.com/signup",
  },
  openGraph: {
    title: "Sign Up | Xclusive 3D",
    description:
      "Join Xclusive 3D today and unlock AI-powered 2D to 3D video conversion for Meta Quest, Apple Vision Pro, and YouTube 3D. Includes 1 free minute on signup.",
    url: "https://xclusive3d.com/signup",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/signup.png",
        width: 500,
        height: 500,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign Up | Xclusive 3D Video Conversion",
    description:
      "Create your Xclusive 3D account and enjoy 1 free minute of AI-powered 2D to 3D video conversion.",
    images: ["https://www.xclusive3d.com/assets/signup.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ Structured data (SSR) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(signupSchema) }}
      />
      <SignupForm />
    </>
  );
}
