"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { SENDOFF } from "@/lib/sprint7-content";
import { MEDIA } from "@/lib/media";
import { MediaImage } from "@/components/ui/MediaImage";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene19Sendoff() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { accentColor } = usePersonalizedContent();

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
      className="relative min-h-[80vh]"
      aria-label="Sun Devil sendoff"
    >
      <div className="relative flex min-h-[80vh] flex-col justify-end overflow-hidden pb-16 md:pb-24">
        <div className="absolute inset-0">
          <MediaImage asset={MEDIA.scenes.sunDevilWelcome} />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
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
            <motion.p
              data-sendoff-line
              className="mt-10 font-mono text-xs tracking-[0.35em] text-white/30 uppercase"
            >
              {SENDOFF.tag}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
