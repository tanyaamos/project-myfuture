"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { getVisitContent } from "@/lib/sprint7-content";
import { getCampusMedia, MEDIA } from "@/lib/media";
import { MediaImage } from "@/components/ui/MediaImage";
import { ThemeAccentGlow } from "@/components/ui/ThemeAccentGlow";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene17PictureYourself() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { selectedCampus, campus, accentColor } = usePersonalizedContent();

  const visit = getVisitContent(selectedCampus, campus?.label);
  const media = selectedCampus
    ? getCampusMedia(selectedCampus)
    : MEDIA.scenes.visit;

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      gsap.fromTo(
        content.querySelectorAll("[data-visit-line]"),
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentScene("picture-yourself"),
            onEnterBack: () => setCurrentScene("picture-yourself"),
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [visit.headline] },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-visit"
      className="relative min-h-screen"
      aria-label="Picture yourself at ASU"
    >
      <div className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage key={media.local} asset={media} priority />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-charcoal/20" />
        </div>

        <ThemeAccentGlow color={accentColor} className="opacity-50" />

        <div className="relative z-10 w-full px-6 py-32 md:px-16 lg:px-24">
          <div ref={contentRef} className="max-w-3xl">
            <p data-visit-line className="text-body-lg mb-2 text-white/80">
              {visit.preline}
            </p>
            <h2 data-visit-line className="text-display-xl text-white">
              {visit.headline}
            </h2>
            <p
              data-visit-line
              className="text-display-xl"
              style={{ color: accentColor }}
            >
              {visit.emphasis}
            </p>
            <p data-visit-line className="text-body-lg mt-8 max-w-xl text-white/85">
              {visit.subline}
            </p>

            <motion.a
              data-visit-line
              href={visit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 font-display text-sm font-semibold text-charcoal transition-transform hover:scale-105"
              style={{ backgroundColor: accentColor }}
              whileTap={{ scale: 0.97 }}
            >
              {visit.cta}
              <span aria-hidden="true">→</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
