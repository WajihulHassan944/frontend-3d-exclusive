"use client";
import { useSelector } from "react-redux";
import HeroSection from "./home/page";
import Home from "./upload/page";
import CookieConsent from "../../components/CookieConsent/CookieConsent";

export default function Page() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
  
      <main >
      {!isLoggedIn && <HeroSection />
      }
      <CookieConsent />
         <Home /> 
      </main>
 
  );
}
