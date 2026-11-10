"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP, ScrollTrigger } from "@/lib/gsap";
import { INTERESTS } from "@/lib/interests";
import { FloatingInterestCard } from "@/components/ui/FloatingInterestCard";
import { getDegreesBrowseForInterest } from "@/lib/asu-links";
import { useLenisInstance } from "@/context/LenisContext";
import { useExperienceStore } from "@/store/experience-store";

/** Desktop scattered positions — mobile uses stacked layout below */
const DESKTOP_POSITIONS = [
  { x: "4%", y: "18%", rotate: -3 },
  { x: "52%", y: "8%", rotate: 2 },
  { x: "22%", y: "38%", rotate: 1 },
  { x: "62%", y: "32%", rotate: -2 },
  { x: "8%", y: "58%", rotate: 3 },
  { x: "48%", y: "52%", rotate: -1 },
  { x: "28%", y: "72%", rotate: 2 },
  { x: "58%", y: "68%", rotate: -3 },
  { x: "38%", y: "22%", rotate: 0 },
];

export function Scene3Interests() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);
  const selectedInterest = useExperienceStore((s) => s.selectedInterest);
  const currentScene = useExperienceStore((s) => s.currentScene);
  const setSelectedInterest = useExperienceStore((s) => s.setSelectedInterest);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const lenis = useLenisInstance();

  const isGated = currentScene === "interests" && selectedInterest === null;

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const heading = headingRef.current;
      if (!section || !heading) return;

      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentScene("interests"),
            onEnterBack: () => setCurrentScene("interests"),
            onLeave: () => {
              if (selectedInterest) setCurrentScene("personalized-mirror");
            },
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [selectedInterest] },
  );

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      if (!section) return;

      pinTriggerRef.current?.kill();
      pinTriggerRef.current = null;

      if (selectedInterest) {
        ScrollTrigger.refresh();
        return;
      }

      pinTriggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onLeave: () => {
          if (!useExperienceStore.getState().selectedInterest) {
            lenis?.scrollTo("#scene-interests", { offset: 0, duration: 0.9 });
          }
        },
      });

      return () => {
        pinTriggerRef.current?.kill();
        pinTriggerRef.current = null;
      };
    },
    { scope: sectionRef, dependencies: [selectedInterest, lenis] },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-interests"
      className="relative z-20 -mt-[14vh]"
      aria-label="Choose your interests"
    >
      {/* Transparent overlap — opening hero stays visible during pull-up */}
      <div className="pointer-events-none h-[14vh]" aria-hidden="true" />

      <div className="relative min-h-screen bg-sandstone-50 md:min-h-[100dvh]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 bg-gradient-to-b from-transparent to-sandstone-50"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-asu-gold/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-asu-maroon/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 pt-24 pb-8 md:min-h-[100dvh] md:px-12 md:pt-28 md:pb-10">
        <div className="mb-6 max-w-3xl shrink-0 md:mb-8">
          <motion.h2
            ref={headingRef}
            className="text-display-lg mb-3 text-charcoal md:mb-4"
          >
            What pulls you in?
          </motion.h2>

          <p className="max-w-xl text-body-lg leading-relaxed text-charcoal-muted">
          {isGated
            ? "Choose one to continue — or explore degrees first, then come back and tap your pick."
            : "Tap what resonates. Your path adapts from here."}
          </p>
        </div>

        {/* Mobile: flowing stack */}
        <div className="flex flex-col gap-3 md:hidden">
          {INTERESTS.map((interest, index) => (
            <FloatingInterestCard
              key={interest.id}
              interest={interest}
              index={index}
              isSelected={selectedInterest === interest.id}
              onSelect={setSelectedInterest}
              position={{ x: "0", y: "0", rotate: index % 2 === 0 ? -1 : 1 }}
              floating={false}
              gateActive={isGated}
            />
          ))}
        </div>

        {/* Desktop: cinematic floating field — height capped so pin doesn't clip copy below */}
        <div className="relative hidden min-h-[320px] flex-1 md:block md:max-h-[calc(100dvh-18rem)] lg:max-h-[calc(100dvh-17rem)]">
          {INTERESTS.map((interest, index) => (
            <FloatingInterestCard
              key={interest.id}
              interest={interest}
              index={index}
              isSelected={selectedInterest === interest.id}
              onSelect={setSelectedInterest}
              position={DESKTOP_POSITIONS[index]}
              gateActive={isGated}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedInterest ? (
            <motion.p
              key="saved"
              className="mt-10 text-center font-display text-sm tracking-widest uppercase md:mt-16"
              style={{ color: "var(--color-asu-maroon)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              role="status"
              aria-live="polite"
            >
              Saved — scroll to see your path
            </motion.p>
          ) : isGated ? (
            <motion.div
              key="gate"
              className="mt-8 flex shrink-0 flex-col items-center gap-3 md:mt-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="status"
              aria-live="polite"
            >
              <p className="font-display text-sm tracking-widest text-asu-maroon uppercase">
                Pick one to continue
              </p>
              <a
                href={getDegreesBrowseForInterest(null)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-sm font-semibold text-asu-maroon underline-offset-2 hover:underline"
              >
                Or browse all degrees at ASU first →
              </a>
              <motion.span
                className="text-asu-maroon/50"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                ↓
              </motion.span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {selectedInterest && (
          <motion.a
            href={getDegreesBrowseForInterest(selectedInterest)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block text-center font-display text-sm font-semibold text-asu-maroon underline-offset-2 hover:underline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Browse degrees for your interest →
          </motion.a>
        )}
        </div>
      </div>
    </section>
  );
}
