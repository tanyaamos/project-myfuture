"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { getArizonaBeats } from "@/lib/sprint5-content";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene14Arizona() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { accentColor } = usePersonalizedContent();
  const beats = getArizonaBeats();

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: pin,
          scrub: 0.8,
          anticipatePin: 1,
          onEnter: () => setCurrentScene("arizona"),
          onEnterBack: () => setCurrentScene("arizona"),
          onLeave: () => setCurrentScene("unexpected-places"),
          onUpdate: (self) => {
            const index = Math.min(
              beats.length - 1,
              Math.floor(self.progress * beats.length),
            );
            setActiveIndex(index);
          },
        },
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="scene-arizona"
      className="relative h-[350vh]"
      aria-label="Arizona as your backdrop"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/85" />
        <div className="grain-overlay absolute inset-0" />

        <div className="absolute inset-x-0 top-28 z-10 px-6 md:top-32 md:px-16">
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: accentColor }}
          >
            The Southwest
          </p>
          <h2 className="text-display-md mt-2 max-w-lg text-white">
            Arizona isn&apos;t a backdrop.
            <span className="text-white/75"> It&apos;s part of the story.</span>
          </h2>
        </div>

        <div className="relative flex h-full items-center justify-center px-6 md:px-12">
          {beats.map((beat, index) => (
            <div
              key={beat.stat}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-700 ${
                activeIndex === index ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={activeIndex !== index}
            >
              <p
                className="text-display-xl mb-3 font-bold"
                style={{ color: accentColor }}
              >
                {beat.stat}
              </p>
              <p className="text-display-md max-w-2xl text-white">{beat.label}</p>
              {beat.sublabel && (
                <p className="mt-4 max-w-md text-sm font-medium text-white/75 md:text-base">
                  {beat.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center gap-1.5 md:bottom-16">
          {beats.map((_, index) => (
            <div
              key={index}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: activeIndex === index ? 28 : 6,
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
