"use client";

import { motion } from "framer-motion";
import type { Interest } from "@/types/experience";

interface FloatingInterestCardProps {
  interest: Interest;
  index: number;
  isSelected: boolean;
  onSelect: (id: Interest["id"]) => void;
  position: { x: string; y: string; rotate?: number };
  floating?: boolean;
  gateActive?: boolean;
}

export function FloatingInterestCard({
  interest,
  index,
  isSelected,
  onSelect,
  position,
  floating = true,
  gateActive = false,
}: FloatingInterestCardProps) {
  const baseRotate = position.rotate ?? 0;
  const entranceDelay = 0.15 + index * 0.08;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(interest.id)}
      className={`group z-10 flex w-full cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 backdrop-blur-md transition-colors duration-500 md:gap-4 md:rounded-3xl md:px-7 md:py-5 ${
        floating ? "absolute w-auto" : "relative"
      } ${
        isSelected
          ? "border-asu-maroon bg-asu-maroon text-white shadow-2xl shadow-asu-maroon/25"
          : gateActive
            ? "animate-pulse border-asu-maroon/40 bg-white text-charcoal shadow-lg shadow-asu-maroon/10"
            : "border-charcoal/10 bg-white/90 text-charcoal hover:border-asu-gold/60 hover:bg-white hover:shadow-xl hover:shadow-charcoal/10"
      }`}
      style={
        floating
          ? {
              left: position.x,
              top: position.y,
            }
          : undefined
      }
      initial={{ opacity: 0, scale: 0.85, y: 40, rotate: baseRotate }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate: baseRotate }}
      viewport={{ once: true, margin: "-10%" }}
      animate={
        floating
          ? { y: [0, -8, 0], rotate: baseRotate }
          : { y: 0, rotate: baseRotate }
      }
      transition={{
        opacity: { duration: 0.8, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.8, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] },
        y: floating
          ? {
              duration: 4.5 + index * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: entranceDelay + 0.8,
            }
          : { duration: 0.8, delay: entranceDelay, ease: [0.16, 1, 0.3, 1] },
        rotate: { duration: 0.8, delay: entranceDelay },
      }}
      whileHover={{ scale: 1.05, rotate: floating ? 0 : baseRotate }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={isSelected}
      aria-label={`Select interest: ${interest.label}`}
    >
      <span className="text-2xl md:text-3xl" aria-hidden="true">
        {interest.emoji}
      </span>
      <span className="text-left font-display text-base font-semibold tracking-tight whitespace-nowrap md:text-lg">
        {interest.label}
      </span>

      {isSelected && (
        <motion.span
          className="ml-1 text-xs font-medium tracking-widest uppercase opacity-80"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 0.8, x: 0 }}
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}
