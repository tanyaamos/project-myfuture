"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { ThemeAccentGlow } from "@/components/ui/ThemeAccentGlow";
import { getCampusMedia, MEDIA } from "@/lib/media";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene10Belonging() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { sprint3, accentColor, selectedCampus } = usePersonalizedContent();
  const { belonging } = sprint3;
  const backgroundMedia = selectedCampus
    ? getCampusMedia(selectedCampus)
    : MEDIA.scenes.belonging;

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      const lines = content.querySelectorAll("[data-belong-line]");

      gsap.fromTo(
        lines,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentScene("belonging"),
            onEnterBack: () => setCurrentScene("belonging"),
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [belonging.emphasis] },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-belonging"
      className="relative min-h-screen"
      aria-label="You belong here"
    >
      <div className="relative flex min-h-screen items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCampus ?? "default"}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <VideoBackground
              mediaAsset={backgroundMedia}
              overlay="dark"
              kenBurns
              priority
            />
          </motion.div>
        </AnimatePresence>

        <ThemeAccentGlow color={accentColor} className="opacity-60" />

        <div className="relative z-10 w-full px-6 py-32 md:px-16 lg:px-24">
          <div ref={contentRef} className="max-w-4xl">
            <p
              data-belong-line
              className="mb-6 font-mono text-sm tracking-[0.2em]"
              style={{ color: accentColor }}
            >
              {belonging.chapter}
            </p>

            <div className="overflow-hidden">
              <p data-belong-line className="text-body-lg mb-2 text-white/80">
                {belonging.preline}
              </p>
            </div>
            <div className="overflow-hidden">
              <h2 data-belong-line className="text-display-xl text-white">
                {belonging.headline}
              </h2>
            </div>
            <div className="overflow-hidden">
              <p
                data-belong-line
                className="text-display-xl"
                style={{ color: accentColor }}
              >
                {belonging.emphasis}
              </p>
            </div>
            <div className="overflow-hidden">
              <p data-belong-line className="text-body-lg mt-8 max-w-xl text-white/85">
                {belonging.subline}
              </p>
            </div>

            <motion.p
              data-belong-line
              className="mt-16 text-xs tracking-[0.25em] text-white/55 uppercase"
            >
              More of your story is coming
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
