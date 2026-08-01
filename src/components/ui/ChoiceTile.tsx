"use client";

import { motion } from "framer-motion";

interface ChoiceTileProps {
  emoji?: string;
  label: string;
  tagline?: string;
  vibe?: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  accentColor?: string;
  variant?: "light" | "dark";
}

export function ChoiceTile({
  emoji,
  label,
  tagline,
  vibe,
  index,
  isSelected,
  onSelect,
  accentColor = "#FFC627",
  variant = "light",
}: ChoiceTileProps) {
  const isDark = variant === "dark";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className={`group relative flex w-full cursor-pointer flex-col items-start gap-2 rounded-2xl border p-5 text-left backdrop-blur-md transition-colors duration-500 md:rounded-3xl md:p-7 ${
        isSelected
          ? isDark
            ? "border-asu-gold bg-asu-gold/10 text-white shadow-xl shadow-asu-gold/10"
            : "border-asu-maroon bg-asu-maroon text-white shadow-2xl shadow-asu-maroon/20"
          : isDark
            ? "border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
            : "border-charcoal/10 bg-white/90 text-charcoal hover:border-asu-gold/50 hover:bg-white hover:shadow-lg"
      }`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        delay: 0.1 + index * 0.07,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isSelected}
      aria-label={`Select: ${label}`}
    >
      {vibe && (
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase"
          style={{ color: isSelected ? accentColor : isDark ? "rgba(255,255,255,0.4)" : undefined }}
        >
          {vibe}
        </span>
      )}

      <div className="flex items-center gap-3">
        {emoji && (
          <span className="text-2xl md:text-3xl" aria-hidden="true">
            {emoji}
          </span>
        )}
        <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">
          {label}
        </span>
      </div>

      {tagline && (
        <p
          className={`text-sm leading-relaxed md:text-base ${
            isSelected
              ? isDark
                ? "text-white/80"
                : "text-white/80"
              : isDark
                ? "text-white/50"
                : "text-charcoal-muted"
          }`}
        >
          {tagline}
        </p>
      )}

      {isSelected && (
        <motion.span
          className="absolute top-4 right-4 text-xs tracking-widest uppercase opacity-70"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}
