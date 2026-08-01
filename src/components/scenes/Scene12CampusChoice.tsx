"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { CAMPUSES } from "@/lib/sprint4-content";
import { getCampusExploreLinks } from "@/lib/asu-links";
import { CampusChoiceCard } from "@/components/ui/CampusChoiceCard";
import { useExperienceStore } from "@/store/experience-store";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";

export function Scene12CampusChoice() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const selectedCampus = useExperienceStore((s) => s.selectedCampus);
  const setSelectedCampus = useExperienceStore((s) => s.setSelectedCampus);
  const { accentColor, campus: selectedCampusData } = usePersonalizedContent();

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
            onEnter: () => setCurrentScene("campus-choice"),
            onEnterBack: () => setCurrentScene("campus-choice"),
            onLeave: () => setCurrentScene("campus-immersion"),
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-campus-choice"
      className="relative min-h-screen overflow-hidden bg-sandstone-50 pb-24 md:pb-32"
      aria-label="Choose your campus"
    >
      <AnimatePresence mode="wait">
        {selectedCampusData && (
          <motion.div
            key={selectedCampusData.id}
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            aria-hidden="true"
          >
            <Image
              src={selectedCampusData.imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-sandstone-50/80" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 md:px-12 md:pt-36">
        <p
          className="mb-4 font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: accentColor }}
        >
          Almost there
        </p>

        <motion.h2
          ref={headingRef}
          className="text-display-lg mb-3 max-w-3xl text-charcoal"
        >
          Where do you
          <br />
          see yourself?
        </motion.h2>

        <p className="mb-4 max-w-xl text-body-lg text-charcoal-muted">
          Tap a campus to select it for your path. Explore first if you want — each card links
          out to campus info, degrees, and visits.
        </p>
        <p className="mb-12 text-sm text-charcoal-muted/80 md:mb-16">
          Not ready to choose? Open any link below, then come back and tap your pick.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAMPUSES.map((campus, index) => (
            <CampusChoiceCard
              key={campus.id}
              label={campus.label}
              tagline={campus.description}
              vibe={campus.vibe}
              index={index}
              isSelected={selectedCampus === campus.id}
              onSelect={() => setSelectedCampus(campus.id)}
              exploreLinks={getCampusExploreLinks(campus.id)}
              accentColor={accentColor}
            />
          ))}
        </div>

        {selectedCampus && selectedCampusData && (
          <motion.p
            className="mt-10 text-center font-display text-sm tracking-widest uppercase md:mt-16"
            style={{ color: accentColor }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            aria-live="polite"
          >
            {selectedCampusData.label} selected — scroll to see it come alive
          </motion.p>
        )}
      </div>
    </section>
  );
}
