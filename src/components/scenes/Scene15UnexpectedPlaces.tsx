"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { PathPanel } from "@/components/ui/PathPanel";
import { getGlobalPlaces } from "@/lib/sprint5-content";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene15UnexpectedPlaces() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { accentColor } = usePersonalizedContent();
  const places = getGlobalPlaces();

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const track = trackRef.current;
      const heading = headingRef.current;
      if (!section || !track) return;

      gsap.fromTo(
        heading,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      const scrollDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -scrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onEnter: () => setCurrentScene("unexpected-places"),
          onEnterBack: () => setCurrentScene("unexpected-places"),
          onLeave: () => setCurrentScene("student-voice"),
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-global-places"
      className="relative bg-charcoal"
      aria-label="Go to class in unexpected places"
    >
      <div
        ref={headingRef}
        className="pointer-events-none absolute top-0 right-0 left-0 z-20 px-6 pt-28 md:px-16 md:pt-32"
      >
        <p
          className="mb-2 font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: accentColor }}
        >
          Beyond campus
        </p>
        <h2 className="text-display-md max-w-xl text-white">
          Go to class in
          <br />
          <span style={{ color: accentColor }}>unexpected places.</span>
        </h2>
        <p className="mt-3 max-w-sm text-sm font-medium text-white/75">
          4,300+ students in global programs each year · 65+ countries
        </p>
      </div>

      <div className="flex h-screen items-center overflow-hidden">
        <div ref={trackRef} className="flex h-[85vh] will-change-transform">
          {places.map((place, index) => (
            <div key={place.title} className="h-full">
              <PathPanel
                moment={place}
                index={index}
                accentColor={accentColor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
