"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { buildFutureSnapshot, shareSnapshot } from "@/lib/snapshot";
import { FutureSnapshotCard } from "@/components/ui/FutureSnapshotCard";
import { ThemeAccentGlow } from "@/components/ui/ThemeAccentGlow";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene16FutureSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [revealStep, setRevealStep] = useState(0);
  const [shareStatus, setShareStatus] = useState<"idle" | "shared" | "copied" | "failed">("idle");
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);

  const {
    interest,
    learningStyle,
    campus,
    sprint3,
    accentColor,
    hints,
    isFullyPersonalized,
  } = usePersonalizedContent();

  const snapshot = useMemo(
    () =>
      buildFutureSnapshot({
        interest,
        learningStyle,
        campus,
        sprint3,
        accentColor,
        themeWord: hints?.headlineTone,
      }),
    [interest, learningStyle, campus, sprint3, accentColor, hints],
  );

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const pin = pinRef.current;
      if (!section || !pin) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=280%",
          pin: pin,
          scrub: 0.6,
          anticipatePin: 1,
          onEnter: () => setCurrentScene("future-snapshot"),
          onEnterBack: () => setCurrentScene("future-snapshot"),
          onUpdate: (self) => {
            const step = Math.min(6, Math.ceil(self.progress * 6));
            setRevealStep(step);
          },
        },
      });

      tl.to({}, { duration: 1 });
    },
    { scope: sectionRef },
  );

  const handleShare = useCallback(async () => {
    const result = await shareSnapshot(snapshot);
    setShareStatus(result);
    setTimeout(() => setShareStatus("idle"), 3000);
  }, [snapshot]);

  return (
    <section
      ref={sectionRef}
      id="scene-future-snapshot"
      className="relative h-[380vh] bg-charcoal"
      aria-label="Your future snapshot"
    >
      <div ref={pinRef} className="relative flex h-screen flex-col overflow-hidden">
        <ThemeAccentGlow color={accentColor} className="opacity-70" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 md:px-12">
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealStep >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: accentColor }}
            >
              {isFullyPersonalized ? "This is your path" : "Your snapshot"}
            </p>
            <h2 className="text-display-md mt-2 text-white">
              {isFullyPersonalized ? "Your Future Snapshot" : "Keep exploring"}
            </h2>
            {!isFullyPersonalized && (
              <p className="mt-2 text-sm text-white/70">
                Make your choices above to unlock your full snapshot
              </p>
            )}
          </motion.div>

          <FutureSnapshotCard snapshot={snapshot} revealStep={revealStep} />

          {revealStep >= 6 && (
            <motion.div
              className="mt-10 flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button
                type="button"
                onClick={handleShare}
                className="cursor-pointer rounded-full px-8 py-4 font-display text-sm font-semibold tracking-wide text-charcoal transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: accentColor }}
              >
                {shareStatus === "copied"
                  ? "Copied to clipboard ✓"
                  : shareStatus === "shared"
                    ? "Shared ✓"
                    : shareStatus === "failed"
                      ? "Could not share — try again"
                      : "Share my snapshot"}
              </button>
              <p className="text-center text-xs text-white/55">
                Send it to a friend, a parent, or save it for later
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
