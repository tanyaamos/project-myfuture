"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { getConnectionPaths } from "@/lib/sprint7-content";
import { ConnectionPathTile } from "@/components/ui/ConnectionPathTile";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene18NextStep() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { accentColor, selectedCampus, selectedInterest } = usePersonalizedContent();
  const connectionPaths = getConnectionPaths(selectedCampus, selectedInterest);

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const heading = headingRef.current;
      if (!section || !heading) return;

      gsap.fromTo(
        heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentScene("next-step"),
            onEnterBack: () => setCurrentScene("next-step"),
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-next-step"
      className="relative bg-charcoal py-28 md:py-36"
      aria-label="Take your next step"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${accentColor}12` }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div ref={headingRef} className="mb-12 md:mb-16">
          <p
            className="mb-3 font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: accentColor }}
          >
            When you&apos;re ready
          </p>
          <h2 className="text-display-lg max-w-2xl text-white">
            The door is open.
            <span className="text-white/45"> No pressure. Just possibility.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {connectionPaths.map((path, index) => (
            <ConnectionPathTile
              key={path.id}
              label={path.label}
              headline={path.headline}
              description={path.description}
              href={path.href}
              index={index}
              accentColor={accentColor}
              external={path.external}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
