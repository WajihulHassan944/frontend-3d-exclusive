"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "./home/page";
import CookieConsent from "../../components/CookieConsent/CookieConsent";
import Whycloud from "./upload/Whycloud/Whycloud";
import ImmersiveThreeD from "./upload/ImmersiveThreeD/ImmersiveThreeD";
import Whatexpect from "./upload/Whatexpect/Whatexpect";
import CustomerTestimonials from "./upload/CustomerTestimonials/CustomerTestimonials";
import PricingSectionInPricing from "./pricing/PricingSection/PricingSection";
import NewsletterSignup from "./upload/NewsletterSignup/NewsletterSignup";
import HowItWorks from "./upload/HowItWorks/HowItWorks";
import "./upload/upload.css";
import { baseUrl } from "@/const";
import ComingSoon from "./coming-soon/ComingSoon";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import PrivacyProtection from "./upload/PrivacyProtection/PrivacyProtection";

export default function Page() {
  const [sections, setSections] = useState([]);
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [loading, setLoading] = useState(true);
const pathname = usePathname();
useEffect(() => {
  if (pathname?.startsWith("/blogs")) {
    setIsComingSoon(false);
  }
}, [pathname]);
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`${baseUrl}/pages/url/%2F`, {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success && data.pageByUrl) {
          setSections(data.pageByUrl.sections || []);

          // 🔥 Dynamic Coming Soon
          if (typeof data.pageByUrl.isComingSoon === "boolean") {
            setIsComingSoon(data.pageByUrl.isComingSoon);
          }
        }
      } catch (err) {
        console.error("Error fetching home page data:", err);
      }

      // 🟢 Stop loader once API completes
      setLoading(false);
    };

    fetchPageData();
  }, []);
  const user = useSelector((state) => state.user);

  // ⬇️ ADMIN ALWAYS DISABLES COMING SOON
  useEffect(() => {
    if (user?.role?.includes("admin")) {
      setIsComingSoon(false);
    }
  }, [user]);
  // Helper to get section by ID
  const getSection = (id) => sections.find((sec) => sec.sectionId === id);

  // 🔥 Block rendering until API resolves
  if (loading) {
    return (
        <div className="coming-soon-wrap loaderContainer">
        <div className="coming-soon-section loading-text">Loading...</div>
      </div>
  
    );
  }

  return (
    <main>
      {isComingSoon ? (
        <ComingSoon />
      ) : (
        <>
          <HeroSection sectionData={getSection("hero")} />
          <CookieConsent />
          <Whycloud sectionData={getSection("why-convert")} />
          <ImmersiveThreeD sectionData={getSection("experience-3d")} />
          <HowItWorks sectionData={getSection("how-it-works")} />
          <PrivacyProtection sectionData={getSection("privacy-protection")} />
          <Whatexpect sectionData={getSection("expectations")} />
          <CustomerTestimonials sectionData={getSection("testimonials")} />
          <PricingSectionInPricing />
          <NewsletterSignup sectionData={getSection("updates")} />
        </>
      )}
    </main>
  );
}
