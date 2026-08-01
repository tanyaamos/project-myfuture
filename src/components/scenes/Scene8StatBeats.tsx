"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { StatBeatPanel } from "@/components/ui/StatBeatPanel";
import { ThemeAccentGlow } from "@/components/ui/ThemeAccentGlow";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene8StatBeats() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const {
    sprint3,
    accentColor,
    selectedInterest,
    selectedLearningStyle,
    selectedCampus,
  } = usePersonalizedContent();
  const { statBeats } = sprint3;

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: pin,
          scrub: 0.8,
          anticipatePin: 1,
          onEnter: () => setCurrentScene("stat-beats"),
          onEnterBack: () => setCurrentScene("stat-beats"),
          onLeave: () => setCurrentScene("real-experiences"),
          onUpdate: (self) => {
            const index = Math.min(
              statBeats.length - 1,
              Math.floor(self.progress * statBeats.length),
            );
            setActiveIndex(index);
          },
        },
      });

      tl.to({}, { duration: 1 });
    },
    { scope: sectionRef, dependencies: [statBeats.length] },
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedInterest, selectedLearningStyle, selectedCampus]);

  return (
    <section
      ref={sectionRef}
      id="scene-stat-beats"
      className="relative h-[300vh] bg-charcoal"
      aria-label="Proof points"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <ThemeAccentGlow color={accentColor} />

        <div className="absolute inset-x-0 top-28 z-10 px-6 md:top-32 md:px-16">
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: accentColor }}
          >
            What does it mean?
          </p>
        </div>

        <div className="relative h-full" role="tablist" aria-label="Statistics">
          {statBeats.map((beat, index) => (
            <StatBeatPanel
              key={`${beat.stat}-${index}`}
              beat={beat}
              accentColor={accentColor}
              active={activeIndex === index}
            />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center gap-2 md:bottom-16">
          {statBeats.map((_, index) => (
            <div
              key={index}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: activeIndex === index ? 32 : 8,
                backgroundColor:
                  activeIndex === index ? accentColor : "rgba(255,255,255,0.2)",
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
