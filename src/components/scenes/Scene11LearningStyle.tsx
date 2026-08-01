"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { LEARNING_STYLES } from "@/lib/sprint4-content";
import { ASU_LINKS } from "@/lib/asu-links";
import { ChoiceTile } from "@/components/ui/ChoiceTile";
import { useExperienceStore } from "@/store/experience-store";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";

export function Scene11LearningStyle() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const selectedLearningStyle = useExperienceStore((s) => s.selectedLearningStyle);
  const setSelectedLearningStyle = useExperienceStore((s) => s.setSelectedLearningStyle);
  const { accentColor } = usePersonalizedContent();

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
            start: "top 70%",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentScene("learning-style"),
            onEnterBack: () => setCurrentScene("learning-style"),
            onLeave: () => setCurrentScene("campus-choice"),
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-learning-style"
      className="relative min-h-screen bg-charcoal py-24 md:py-32"
      aria-label="Choose your learning style"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full blur-3xl"
          style={{ backgroundColor: `${accentColor}15` }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        <p
          className="mb-4 font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: accentColor }}
        >
          Go deeper
        </p>

        <motion.h2
          ref={headingRef}
          className="text-display-lg mb-3 max-w-3xl text-white"
        >
          How do you
          <br />
          <span style={{ color: accentColor }}>learn best?</span>
        </motion.h2>

        <p className="mb-12 max-w-lg text-body-lg text-white/80 md:mb-8">
          This shapes what comes next — programs, spaces, and stories picked for you.
        </p>

        <p className="mb-12 text-sm text-white/70 md:mb-16">
          Not sure how you learn best?{" "}
          <a
            href={ASU_LINKS.degrees}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline-offset-2 hover:underline"
            style={{ color: accentColor }}
          >
            Browse degrees at ASU first →
          </a>
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {LEARNING_STYLES.map((style, index) => (
            <ChoiceTile
              key={style.id}
              emoji={style.emoji}
              label={style.label}
              tagline={style.tagline}
              index={index}
              isSelected={selectedLearningStyle === style.id}
              onSelect={() => setSelectedLearningStyle(style.id)}
              accentColor={accentColor}
              variant="dark"
            />
          ))}
        </div>

        {selectedLearningStyle && (
          <motion.p
            className="mt-10 text-center text-sm tracking-widest uppercase"
            style={{ color: accentColor }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            aria-live="polite"
          >
            Saved — one more choice below
          </motion.p>
        )}
      </div>
    </section>
  );
}
