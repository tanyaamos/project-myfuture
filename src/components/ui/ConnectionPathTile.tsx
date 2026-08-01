"use client";

import { motion } from "framer-motion";

interface ConnectionPathTileProps {
  label: string;
  headline: string;
  description: string;
  href: string;
  index: number;
  accentColor: string;
  external?: boolean;
}

export function ConnectionPathTile({
  label,
  headline,
  description,
  href,
  index,
  accentColor,
  external = true,
}: ConnectionPathTileProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-white/25 hover:bg-white/10 md:min-h-[260px] md:p-8"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
    >
      <div>
        <span
          className="font-mono text-[10px] tracking-[0.25em] uppercase"
          style={{ color: accentColor }}
        >
          {label}
        </span>
        <h3 className="text-display-md mt-3 text-white">{headline}</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80 md:text-base">
          {description}
        </p>
      </div>

      <span
        className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: accentColor }}
      >
        Explore
        <span aria-hidden="true">→</span>
      </span>
    </motion.a>
  );
}
