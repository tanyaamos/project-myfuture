"use client";

import { motion } from "framer-motion";
import type { CampusExploreLink } from "@/lib/asu-links";

interface CampusChoiceCardProps {
  label: string;
  tagline: string;
  vibe: string;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  exploreLinks: CampusExploreLink[];
  accentColor?: string;
}

export function CampusChoiceCard({
  label,
  tagline,
  vibe,
  index,
  isSelected,
  onSelect,
  exploreLinks,
  accentColor = "#FFC627",
}: CampusChoiceCardProps) {
  return (
    <motion.article
      className={`flex flex-col overflow-hidden rounded-2xl border backdrop-blur-md transition-colors duration-500 md:rounded-3xl ${
        isSelected
          ? "border-asu-maroon bg-asu-maroon text-white shadow-2xl shadow-asu-maroon/20"
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
    >
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full cursor-pointer flex-col items-start gap-2 p-5 text-left md:p-7"
        aria-pressed={isSelected}
        aria-label={`Select campus: ${label}`}
      >
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase"
          style={{ color: isSelected ? accentColor : undefined }}
        >
          {vibe}
        </span>

        <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">
          {label}
        </span>

        <p
          className={`text-sm leading-relaxed md:text-base ${
            isSelected ? "text-white/80" : "text-charcoal-muted"
          }`}
        >
          {tagline}
        </p>

        {isSelected && (
          <span className="mt-1 text-xs tracking-widest uppercase opacity-70">Selected ✓</span>
        )}
      </button>

      <div
        className={`flex flex-wrap gap-x-4 gap-y-2 border-t px-5 py-3 md:px-7 ${
          isSelected ? "border-white/15" : "border-charcoal/8"
        }`}
      >
        {exploreLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className={`font-display text-xs font-semibold underline-offset-2 transition-colors hover:underline md:text-sm ${
              isSelected ? "text-white/75 hover:text-white" : "text-asu-maroon hover:text-asu-maroon/80"
            }`}
          >
            {link.label} →
          </a>
        ))}
      </div>
    </motion.article>
  );
}
