"use client";

import { motion } from "framer-motion";
import { AsuLogo } from "@/components/ui/AsuLogo";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/** Subtle top-left ASU mark — visible at the start, fades as the user scrolls in. */
export function AsuBrandHeader() {
  const progress = useScrollProgress();
  const opacity = Math.max(0, 1 - progress / 0.06);

  return (
    <motion.div
      className="pointer-events-none fixed top-[3.25rem] left-5 z-40 md:top-[3.5rem] md:left-8"
      style={{ opacity }}
      aria-hidden={opacity < 0.05}
    >
      <AsuLogo variant="light" size="md" />
    </motion.div>
  );
}
