"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { StudentQuote } from "@/components/ui/StudentQuote";
import { ThemeAccentGlow } from "@/components/ui/ThemeAccentGlow";
import { PersonalizationRibbon } from "@/components/ui/PersonalizationRibbon";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene7StudentVoice() {
  const sectionRef = useRef<HTMLElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { sprint3, accentColor } = usePersonalizedContent();
  const { studentVoice } = sprint3;

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelector("[data-voice-content]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentScene("student-voice"),
            onEnterBack: () => setCurrentScene("student-voice"),
            onLeave: () => setCurrentScene("stat-beats"),
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [studentVoice.quote] },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-student-voice"
      className="relative min-h-screen"
      aria-label="Student voice"
    >
      <div className="relative flex min-h-screen items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-asu-maroon via-charcoal to-charcoal-soft"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-asu-maroon-dark/80 via-transparent to-asu-gold/10" />
          <div className="grain-overlay absolute inset-0" />
          <div className="cinematic-vignette absolute inset-0" />
        </div>

        <ThemeAccentGlow color={accentColor} />

        <div
          data-voice-content
          className="relative z-10 px-6 py-32 md:px-16 lg:px-24"
        >
          <PersonalizationRibbon accentColor={accentColor} />
          <StudentQuote voice={studentVoice} accentColor={accentColor} />
        </div>
      </div>
    </section>
  );
}
