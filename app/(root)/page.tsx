"use client";

import { useState, useEffect } from "react";
import MobileView from "../mobile/MobileView";
import DesktopView from "./DesktopView";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="min-h-screen bg-violet-100">
      {isMobile ? <MobileView /> : <DesktopView />}
    </main>
  );
}
