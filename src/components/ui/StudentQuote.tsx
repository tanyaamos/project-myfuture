"use client";

import { motion } from "framer-motion";
import type { StudentVoice } from "@/lib/sprint3-content";

interface StudentQuoteProps {
  voice: StudentVoice;
  accentColor: string;
}

export function StudentQuote({ voice, accentColor }: StudentQuoteProps) {
  return (
    <blockquote className="max-w-4xl">
      <motion.p
        className="text-display-md mb-10 text-white md:mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        &ldquo;{voice.quote}&rdquo;
      </motion.p>
      <footer>
        <cite className="not-italic">
          <p className="font-display text-lg font-semibold text-white md:text-xl">
            {voice.name}
          </p>
          <p className="mt-1 text-sm font-medium tracking-wide text-white/75 md:text-base">
            {voice.context}
          </p>
        </cite>
        <p
          className="mt-6 font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: accentColor }}
        >
          Golden Conversations
        </p>
      </footer>
    </blockquote>
  );
}
