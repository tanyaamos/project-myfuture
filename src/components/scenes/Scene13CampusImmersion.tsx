"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { MediaImage } from "@/components/ui/MediaImage";
import { ThemeAccentGlow } from "@/components/ui/ThemeAccentGlow";
import {
  getCampusImmersionMedia,
  getCampusImmersionStudentMedia,
} from "@/lib/media";
import { getCampusImmersion } from "@/lib/sprint5-content";
import { getDegreesBrowseForInterest } from "@/lib/asu-links";
import { ExploreLink } from "@/components/ui/ExploreLink";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene13CampusImmersion() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { selectedCampus, selectedInterest, accentColor } = usePersonalizedContent();
  const immersion = getCampusImmersion(selectedCampus);
  const campusMedia = getCampusImmersionMedia(selectedCampus);
  const studentMedia = getCampusImmersionStudentMedia(selectedCampus);

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const pin = pinRef.current;
      const content = contentRef.current;
      if (!section || !pin || !content) return;

      const lines = content.querySelectorAll("[data-immersion-line]");
      const bg = pin.querySelector("[data-immersion-bg]");

      gsap.set(lines, { y: 100, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: pin,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => setCurrentScene("campus-immersion"),
          onEnterBack: () => setCurrentScene("campus-immersion"),
          onLeave: () => setCurrentScene("arizona"),
        },
      });

      tl.fromTo(
        lines,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          ease: "power3.out",
          duration: 0.55,
        },
        0,
      );

      if (bg) {
        tl.fromTo(bg, { scale: 1 }, { scale: 1.08, ease: "none", duration: 1 }, 0);
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-campus-immersion"
      className="relative h-[200vh]"
      aria-label="Campus immersion"
    >
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden bg-charcoal-soft"
      >
        <div data-immersion-bg className="absolute inset-0 origin-center">
          <AnimatePresence initial={false}>
            <motion.div
              key={selectedCampus ?? "default"}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 animate-ken-burns">
                <MediaImage asset={campusMedia} priority={Boolean(selectedCampus)} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/80" />
              <div className="grain-overlay absolute inset-0" />
              <div className="cinematic-vignette absolute inset-0" />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false}>
          <motion.div
            key={`student-${selectedCampus ?? "default"}`}
            data-immersion-student
            className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[min(55vw,680px)]"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/50 to-transparent" />
            <MediaImage
              asset={studentMedia}
              priority={Boolean(selectedCampus)}
              sizes="(max-width: 768px) 70vw, 680px"
              className="object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/30" />
          </motion.div>
        </AnimatePresence>

        <ThemeAccentGlow color={accentColor} />

        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-16 md:pb-28 lg:px-24">
          <div ref={contentRef} className="max-w-2xl">
            <p
              data-immersion-line
              className="mb-4 font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: accentColor }}
            >
              {immersion.campusLabel}
            </p>

            <div className="overflow-hidden">
              <p
                data-immersion-line
                className="text-display-xl font-bold tracking-tight"
                style={{ color: accentColor }}
              >
                {immersion.vibe}
              </p>
            </div>

            <div className="overflow-hidden">
              <h2 data-immersion-line className="text-display-xl mt-2 text-white">
                {immersion.headline}
              </h2>
            </div>
            <div className="overflow-hidden">
              <p data-immersion-line className="text-display-xl text-white/90">
                {immersion.subline}
              </p>
            </div>

            <div className="overflow-hidden">
              <p
                data-immersion-line
                className="text-body-lg mt-8 max-w-xl text-white/85"
              >
                {immersion.detail}
              </p>
            </div>

            <div data-immersion-line>
              <ExploreLink
                href={getDegreesBrowseForInterest(selectedInterest)}
                label="Browse degrees on degrees.asu.edu"
                accentColor={accentColor}
                className="mt-8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
