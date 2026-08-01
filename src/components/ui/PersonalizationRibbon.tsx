"use client";

import { motion } from "framer-motion";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";

interface PersonalizationRibbonProps {
  accentColor: string;
}

export function PersonalizationRibbon({ accentColor }: PersonalizationRibbonProps) {
  const { interest, learningStyle, campus, isFullyPersonalized } = usePersonalizedContent();

  if (!interest) return null;

  const pills = [
    interest ? `${interest.emoji} ${interest.label}` : null,
    learningStyle ? `${learningStyle.emoji} ${learningStyle.label}` : null,
    campus ? campus.label : null,
  ].filter(Boolean);

  return (
    <motion.div
      className="mb-8 flex flex-wrap gap-2"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Your personalized path"
    >
      {pills.map((pill, i) => (
        <span
          key={i}
          className="rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase backdrop-blur-sm"
          style={{
            borderColor: `${accentColor}44`,
            color: accentColor,
            backgroundColor: `${accentColor}11`,
          }}
        >
          {pill}
        </span>
      ))}
      {isFullyPersonalized && (
        <span className="self-center text-[10px] font-medium tracking-widest text-white/55 uppercase">
          · your path
        </span>
      )}
    </motion.div>
  );
}
