import FaqClient from "./FaqClient";

const faqs = [
  {
    q: 'What is Xclusive3D.com?',
    a: `Xclusive3D.com is an online service that converts ordinary 2D videos into Full side-by-side (Full SBS) 3D format or MV-HEVC ready for immersive playback on VR headsets like Meta Quest and Apple Vision Pro. You simply upload a video, and we handle the entire 3D conversion in the cloud.`,
  },
  {
    q: 'Why should I convert 2D videos to 3D videos?',
    a: `3D adds depth and realism, making movies, demos, and personal memories more immersive on modern headsets. With Xclusive3D.com, you get this enhanced experience without needing complex tools.`,
  },
  {
    q: 'What is a Full Side by Side video?',
    a: `Full SBS is a 3D video format where the left and right eye images are stored side-by-side at full resolution for each eye.
For example, in a 3840×2160 Full SBS video, each eye sees 1920×2160 pixels. This delivers sharper, more detailed images compared to Half SBS, which halves the horizontal resolution for each eye.

Benefits:
• Higher image quality and sharpness, especially in VR headsets.
• Preserves more detail from 4K or 8K sources.
• Reduced compression artifacts.`,
  },
  {
    q: 'What is MV-HEVC video?',
    a: `MV-HEVC (Multiview High Efficiency Video Coding) is a 3D video format that stores separate left-eye and right-eye views within a single video file. Unlike Side-by-Side, the full resolution for each eye is preserved without squeezing both views into one frame.

Benefits:
• Native 3D playback on compatible devices (e.g., Apple Vision Pro).
• Maintains full resolution per eye for maximum image quality.
• More efficient compression than two separate video streams.`,
  },
  {
    q: 'Does Xclusive3D.com work on any video?',
    a: `We support common formats like MP4, MOV and resolutions up to 8K. Very large or protected files may not work, so we recommend testing with a short clip first.`,
  },
  {
    q: 'How does Cloud Conversion work?',
    a: `After you upload your video, our server processes it in the cloud. Once converted, the 3D file is uploaded to our file server and made available for you to download. Your download link will remain active for 7 days.`,
  },
  {
    q: 'How long will the conversion process take?',
    a: `Typically, a 5-minute 1080p video takes less than 5 minutes to convert. Keep in mind that 3D conversion is processor-intensive. Longer or higher-resolution videos may take more time, depending on server load. Our goal is to complete every conversion within two hours.`,
  },
  {
    q: 'What video resolutions do you accept?',
    a: `We currently support videos up to 8K resolution. Please note that higher-resolution files may take longer to convert.`,
  },
  {
    q: 'Can I upload the converted 3D video direct to YouTube and will it be recognized as a 3D video?',
    a: `Yes! Our Full side by side files include stereoscopic metadata that YouTube automatically detects, so your video will show up as 3D.`,
  },
  {
    q: 'How much does it cost?',
    a: `Conversion is credit-based and depends on the resolution. Each minute of 1080p video conversion uses 1 credit. Plans start at €24 for 15 credits, with bulk discounts available. Please see our pricing page for more details.`,
  },
  {
    q: 'How long are credits valid?',
    a: `Credits are valid for 12 months after purchase, after which they automatically expire.`,
  },
  {
    q: 'Can I get a refund for unused credits?',
    a: `No, credits are non-refundable.`,
  },
  {
    q: 'How long do you store my files?',
    a: `Files are stored for a maximum of 7 days, after which they are permanently deleted.`,
  },
];

// ✅ generate schema server-side
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export const metadata = {
  title: "FAQs | Xclusive 3D Video Conversion Service",
  description:
    "Find answers to frequently asked questions about Xclusive 3D. Learn how to convert 2D videos into immersive 3D formats for Meta Quest, Apple Vision Pro, and YouTube 3D.",
  alternates: {
    canonical: "https://xclusive3d.com/faq",
  },
  openGraph: {
    title: "FAQs | Xclusive 3D",
    description:
      "Got questions about 3D video conversion? Explore our FAQs to learn about formats, supported devices, pricing, and more.",
    url: "https://xclusive3d.com/faq",
    siteName: "Xclusive 3D",
    images: [
      {
        url: "https://www.xclusive3d.com/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Xclusive 3D Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs | Xclusive 3D Video Conversion Service",
    description:
      "Find answers to FAQs about Xclusive 3D’s AI-powered 2D to 3D video conversion service for Meta Quest, Apple Vision Pro, and YouTube 3D.",
    images: ["https://www.xclusive3d.com/assets/logo.png"],
  },
};

export default function Page() {
  return (
    <>
      {/* ✅ schema injected server-side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient faqs={faqs} />
    </>
  );
}
