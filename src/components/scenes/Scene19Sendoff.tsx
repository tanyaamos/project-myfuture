"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap";
import { ASU_LINKS, SENDOFF } from "@/lib/sprint7-content";
import { MEDIA } from "@/lib/media";
import { MediaImage } from "@/components/ui/MediaImage";
import { useLenisInstance } from "@/context/LenisContext";
import { scrollToTop } from "@/hooks/useLenisScroll";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene19Sendoff() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const resetExperience = useExperienceStore((s) => s.resetExperience);
  const lenis = useLenisInstance();
  const { accentColor } = usePersonalizedContent();

  const handleStartOver = () => {
    resetExperience();
    scrollToTop(lenis);
    ScrollTrigger.refresh();
  };

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      gsap.fromTo(
        content.querySelectorAll("[data-sendoff-line]"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentScene("sendoff"),
            onEnterBack: () => setCurrentScene("sendoff"),
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-sendoff"
      className="relative min-h-screen"
      aria-label="Sun Devil sendoff"
    >
      <div className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-20 md:pb-28">
        <div className="absolute inset-0">
          <MediaImage asset={MEDIA.scenes.sunDevilWelcome} />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/75 to-charcoal/35" />
        </div>

        <div ref={contentRef} className="relative z-10 px-6 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <div className="overflow-hidden">
              <h2 data-sendoff-line className="text-display-xl text-white">
                {SENDOFF.headline}
              </h2>
            </div>
            <div className="overflow-hidden">
              <p
                data-sendoff-line
                className="text-display-xl"
                style={{ color: accentColor }}
              >
                {SENDOFF.emphasis}
              </p>
            </div>
            <p
              data-sendoff-line
              className="text-body-lg mt-6 max-w-xl text-white/55"
            >
              {SENDOFF.subline}
            </p>

            <motion.a
              data-sendoff-line
              href={ASU_LINKS.apply}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-full px-10 py-5 font-display text-base font-bold tracking-wide text-charcoal shadow-2xl transition-transform hover:scale-[1.03] md:text-lg"
              style={{ backgroundColor: accentColor }}
              whileTap={{ scale: 0.97 }}
            >
              Apply to ASU
              <span aria-hidden="true">→</span>
            </motion.a>

            <div data-sendoff-line className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={handleStartOver}
                className="font-display text-sm tracking-wide text-white/45 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Start over
              </button>
              <motion.p className="font-mono text-xs tracking-[0.35em] text-white/30 uppercase">
                {SENDOFF.tag}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
