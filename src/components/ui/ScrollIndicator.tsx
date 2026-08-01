"use client";

import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  visible?: boolean;
  label?: string;
}

export function ScrollIndicator({
  visible = true,
  label = "Scroll to explore",
}: ScrollIndicatorProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-3 md:bottom-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <span className="text-[11px] font-medium tracking-[0.2em] text-white/70 uppercase">
        {label}
      </span>
      <motion.div
        className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="h-2 w-1 rounded-full bg-white/80"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
