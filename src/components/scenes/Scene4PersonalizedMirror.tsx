"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { ThemeAccentGlow } from "@/components/ui/ThemeAccentGlow";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene4PersonalizedMirror() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { content, accentColor, interest, hasSelection } = usePersonalizedContent();
  const photoFeature = content.mirror.imageFeature;

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      const lines = content.querySelectorAll("[data-mirror-line]");

      gsap.fromTo(
        lines,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "center center",
            scrub: 1,
            onEnter: () => setCurrentScene("personalized-mirror"),
            onEnterBack: () => setCurrentScene("personalized-mirror"),
            onLeave: () => setCurrentScene("path-reveal"),
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [content.mirror.headline] },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-mirror"
      className="relative min-h-screen"
      aria-label="Your personalized path"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={content.mirror.imageSrc}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <VideoBackground
              imageSrc={content.mirror.imageSrc}
              imageAlt={content.mirror.imageAlt}
              overlay="dark"
              kenBurns
            />
          </motion.div>
        </AnimatePresence>

        <ThemeAccentGlow color={accentColor} />

        {photoFeature && (
          <p className="absolute right-6 bottom-6 z-10 max-w-xs text-right text-[11px] leading-relaxed text-white/75 md:right-10 md:bottom-8 md:max-w-sm md:text-xs">
            <span className="block font-medium text-white/85">{photoFeature.title}</span>
            {photoFeature.credit}
          </p>
        )}

        {!photoFeature && content.mirror.imageCredit && (
          <p className="absolute right-6 bottom-6 z-10 max-w-sm rounded-lg bg-charcoal/60 px-4 py-3 text-right text-[11px] leading-relaxed text-white/70 backdrop-blur-sm md:right-10 md:bottom-10 md:text-xs">
            {content.mirror.imageCredit}
          </p>
        )}

        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16 lg:px-24">
          <div ref={contentRef} className="max-w-4xl">
            {hasSelection && interest && (
              <motion.p
                className="mb-6 flex items-center gap-3 text-sm tracking-[0.2em] uppercase"
                style={{ color: accentColor }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                key={interest.id}
              >
                <span className="text-xl" aria-hidden="true">
                  {interest.emoji}
                </span>
                {interest.label}
              </motion.p>
            )}

            <div className="line-reveal-mask">
              <p data-mirror-line className="text-body-lg mb-2 text-white/80">
                {content.mirror.preline}
              </p>
            </div>
            <div className="line-reveal-mask">
              <h2 data-mirror-line className="text-display-xl text-white">
                {content.mirror.headline}
              </h2>
            </div>
            <div className="line-reveal-mask">
              <p
                data-mirror-line
                className="text-display-xl"
                style={{ color: accentColor }}
              >
                {content.mirror.emphasis}
              </p>
            </div>
            <div className="line-reveal-mask">
              <p data-mirror-line className="text-body-lg mt-8 max-w-xl text-white/85">
                {content.mirror.subline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
