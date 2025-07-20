"use client";
import { useSelector } from "react-redux";
import HeroSection from "./home/page";
import Home from "./upload/page";

export default function Page() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
  
      <main >
      {!isLoggedIn && <HeroSection />
      }
         <Home /> 
      </main>
 
  );
}
