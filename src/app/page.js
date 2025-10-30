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
export default function Page() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`${baseUrl}/pages/url/%2F`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success && data.pageByUrl) {
          setSections(data.pageByUrl.sections || []);
        }
      } catch (err) {
        console.error("Error fetching home page data:", err);
      }
    };

    fetchPageData();
  }, []);

  // ✅ Helper function to get a section by its ID
  const getSection = (id) => sections.find((sec) => sec.sectionId === id);

  return (
    <main>
      {/* ✅ Pass respective data as props */}
      <HeroSection sectionData={getSection("hero")} />
      <CookieConsent />
      <Whycloud sectionData={getSection("why-convert")} />
      <ImmersiveThreeD sectionData={getSection("experience-3d")} />
      <HowItWorks sectionData={getSection("how-it-works")} />
      <Whatexpect sectionData={getSection("expectations")} />
      <CustomerTestimonials sectionData={getSection("testimonials")} />
      <PricingSectionInPricing />
      <NewsletterSignup sectionData={getSection("updates")} />
    </main>
  );
}
