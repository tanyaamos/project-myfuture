"use client";

import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  progress: number;
}

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
  const percentage = Math.round(progress * 100);

  return (
    <div
      className="fixed top-0 right-0 left-0 z-50 flex items-center gap-3 px-5 py-4 md:px-8"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Experience progress: ${percentage} percent`}
    >
      <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full origin-left rounded-full bg-asu-gold"
          style={{ scaleX: progress }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress }}
          transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
        />
      </div>
      <span className="min-w-[2.5rem] text-right font-mono text-[10px] tracking-widest text-white/60 tabular-nums">
        {percentage.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
