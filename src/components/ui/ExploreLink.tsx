"use client";

import { motion } from "framer-motion";

interface ExploreLinkProps {
  href: string;
  label?: string;
  accentColor: string;
  className?: string;
}

export function ExploreLink({
  href,
  label = "View degree on degrees.asu.edu",
  accentColor,
  className = "",
}: ExploreLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold transition-transform duration-300 hover:translate-x-1 ${className}`}
      style={{ color: accentColor }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
      <span aria-hidden="true">→</span>
    </motion.a>
  );
}
