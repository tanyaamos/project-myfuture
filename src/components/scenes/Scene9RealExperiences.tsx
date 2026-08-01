"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { ExperienceReveal } from "@/components/ui/ExperienceReveal";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene9RealExperiences() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { sprint3, accentColor, isFullyPersonalized } = usePersonalizedContent();
  const { experiences } = sprint3;

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const heading = headingRef.current;
      if (!section || !heading) return;

      gsap.fromTo(
        heading,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentScene("real-experiences"),
            onEnterBack: () => setCurrentScene("real-experiences"),
            onLeave: () => setCurrentScene("belonging"),
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-experiences"
      className="relative bg-charcoal"
      aria-label="Real ASU experiences"
    >
      <div
        ref={headingRef}
        className="px-6 pt-28 pb-12 md:px-16 md:pt-36 md:pb-16 lg:px-24"
      >
        <p
          className="mb-3 font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: accentColor }}
        >
          Real experiences
        </p>
        <h2 className="text-display-lg max-w-3xl text-white">
          {isFullyPersonalized ? "Picked for your path." : "Not brochures."}
          <br />
          <span className="text-white/75">
            {isFullyPersonalized
              ? "Programs matched to you."
              : "Actual programs. Actual people."}
          </span>
        </h2>
      </div>

      <div>
        {experiences.map((experience, index) => (
          <ExperienceReveal
            key={`${experience.program}-${index}`}
            experience={experience}
            index={index}
            accentColor={accentColor}
          />
        ))}
      </div>
    </section>
  );
}
