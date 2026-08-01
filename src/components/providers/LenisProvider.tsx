"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { LenisContextProvider } from "@/context/LenisContext";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

interface LenisProviderProps {
  children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    registerGSAP();

    const instance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      instance.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    ScrollTrigger.refresh();

    return () => {
      instance.destroy();
      setLenis(null);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <LenisContextProvider lenis={lenis}>{children}</LenisContextProvider>;
}

/** Imperative scroll helper for scene transitions */
export function scrollToElement(selector: string, lenis?: Lenis | null) {
  const element = document.querySelector(selector) as HTMLElement | null;
  if (!element) return;

  if (lenis) {
    lenis.scrollTo(element, { offset: 0, duration: 1.8 });
    return;
  }

  element.scrollIntoView({ behavior: "smooth" });
}

export { gsap, ScrollTrigger };
