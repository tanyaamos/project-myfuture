"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { PathPanel } from "@/components/ui/PathPanel";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene5PathReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { content, accentColor, hasSelection } = usePersonalizedContent();

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
          onEnter: () => setCurrentScene("path-reveal"),
          onEnterBack: () => setCurrentScene("path-reveal"),
          onLeave: () => setCurrentScene("momentum"),
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [content.paths.length] },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-paths"
      className="relative bg-charcoal"
      aria-label="Your path moments"
    >
      <div
        ref={headingRef}
        className="pointer-events-none absolute top-0 right-0 left-0 z-20 px-6 pt-28 md:px-16 md:pt-32"
      >
        <p
          className="mb-2 font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: accentColor }}
        >
          {hasSelection ? "Your path" : "Explore paths"}
        </p>
        <h2 className="text-display-md max-w-lg text-white">
          Three moments that could be yours.
        </h2>
      </div>

      <div className="flex h-screen items-center overflow-hidden">
        <div ref={trackRef} className="flex h-[85vh] will-change-transform">
          {content.paths.map((moment, index) => (
            <div key={`${moment.title}-${moment.imageSrc}`} data-path-panel className="h-full">
              <PathPanel moment={moment} index={index} accentColor={accentColor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
