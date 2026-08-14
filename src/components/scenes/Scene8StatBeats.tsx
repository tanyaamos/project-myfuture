"use client";

import { useEffect, useRef, useState } from "react";
import { registerGSAP, ScrollTrigger } from "@/lib/gsap";
import { StatBeatPanel } from "@/components/ui/StatBeatPanel";
import { ThemeAccentGlow } from "@/components/ui/ThemeAccentGlow";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

function beatIndexFromProgress(progress: number, count: number): number {
  if (count <= 1) return 0;
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped >= 1) return count - 1;
  return Math.min(count - 1, Math.round(clamped * (count - 1)));
}

export function Scene8StatBeats() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { sprint3, accentColor } = usePersonalizedContent();
  const { statBeats } = sprint3;
  const beatCount = statBeats.length;
  const scrollSteps = Math.max(1, beatCount - 1);
  const safeIndex = Math.min(activeIndex, Math.max(0, beatCount - 1));
  const activeBeat = statBeats[safeIndex] ?? statBeats[0];

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin || beatCount === 0) return;

    const syncFromProgress = (progress: number) => {
      const index = beatIndexFromProgress(progress, beatCount);
      if (activeIndexRef.current === index) return;
      activeIndexRef.current = index;
      setActiveIndex(index);
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${scrollSteps * 100}%`,
      pin: pin,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: (self) => {
        setCurrentScene("stat-beats");
        syncFromProgress(self.progress);
      },
      onEnterBack: (self) => {
        setCurrentScene("stat-beats");
        syncFromProgress(self.progress);
      },
      onLeave: () => setCurrentScene("real-experiences"),
      onLeaveBack: () => setCurrentScene("student-voice"),
      onUpdate: (self) => syncFromProgress(self.progress),
    });

    syncFromProgress(trigger.progress);

    const onRefresh = () => syncFromProgress(trigger.progress);
    ScrollTrigger.addEventListener("refresh", onRefresh);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      trigger.kill();
    };
  }, [beatCount, scrollSteps, setCurrentScene]);

  if (!activeBeat) return null;

  return (
    <section
      ref={sectionRef}
      id="scene-stat-beats"
      className="relative bg-charcoal"
      style={{ height: `${beatCount * 100}vh` }}
      aria-label="Proof points"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-charcoal">
        <ThemeAccentGlow color={accentColor} />

        <div className="absolute inset-x-0 top-28 z-20 px-6 md:top-32 md:px-16">
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: accentColor }}
          >
            What does it mean?
          </p>
        </div>

        <div
          className="relative z-10 flex h-full items-center justify-center px-6 md:px-12"
          role="tablist"
          aria-label="Statistics"
        >
          <StatBeatPanel beat={activeBeat} accentColor={accentColor} />
        </div>

        <div className="absolute inset-x-0 bottom-12 z-20 flex justify-center gap-2 md:bottom-16">
          {statBeats.map((_, index) => (
            <div
              key={index}
              className="h-1 rounded-full"
              style={{
                width: safeIndex === index ? 32 : 8,
                backgroundColor:
                  safeIndex === index ? accentColor : "rgba(255,255,255,0.2)",
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
