"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { FutureSnapshot } from "@/lib/snapshot";

interface FutureSnapshotCardProps {
  snapshot: FutureSnapshot;
  revealStep?: number;
}

export const FutureSnapshotCard = forwardRef<HTMLDivElement, FutureSnapshotCardProps>(
  function FutureSnapshotCard({ snapshot, revealStep = 6 }, ref) {
    const show = (step: number) => revealStep >= step;

    return (
      <div
        ref={ref}
        className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-charcoal-soft p-8 shadow-2xl md:p-10"
        style={{
          boxShadow: `0 32px 80px -20px ${snapshot.accentColor}33`,
        }}
      >
        <div
          className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"
          style={{ backgroundColor: `${snapshot.accentColor}25` }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          {show(1) && (
            <motion.p
              className="mb-6 font-mono text-xs tracking-[0.35em] text-white/60 uppercase"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {snapshot.year} · Future Snapshot
            </motion.p>
          )}

          {show(2) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-display-md text-white">{snapshot.headline}</h2>
              <p
                className="text-display-md"
                style={{ color: snapshot.accentColor }}
              >
                {snapshot.emphasis}
              </p>
            </motion.div>
          )}

          {show(3) && (
            <motion.div
              className="mt-8 flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span
                className="rounded-full px-4 py-2 font-display text-sm font-semibold"
                style={{
                  backgroundColor: `${snapshot.accentColor}22`,
                  color: snapshot.accentColor,
                }}
              >
                {snapshot.interest.emoji} {snapshot.interest.label}
              </span>
              {snapshot.learningStyle && (
                <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">
                  {snapshot.learningStyle.emoji} {snapshot.learningStyle.label}
                </span>
              )}
              {snapshot.campus && (
                <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80">
                  {snapshot.campus.label}
                </span>
              )}
            </motion.div>
          )}

          {show(4) && (
            <motion.div
              className="mt-8 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-[10px] tracking-[0.25em] text-white/60 uppercase">
                On your radar
              </p>
              {snapshot.programs.map((program, i) => (
                <motion.div
                  key={program.name}
                  className="border-l-2 pl-4"
                  style={{ borderColor: snapshot.accentColor }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <a
                    href={program.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block transition-opacity hover:opacity-80"
                  >
                    <p className="font-display text-sm font-semibold text-white group-hover:underline">
                      {program.name}
                    </p>
                    <p className="text-xs text-white/75">{program.headline}</p>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}

          {show(5) && (
            <motion.div
              className="mt-8 border-t border-white/10 pt-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="text-display-lg font-bold tracking-tight"
                style={{ color: snapshot.accentColor }}
              >
                {snapshot.heroStat.stat}
              </p>
              <p className="mt-1 text-sm font-medium tracking-wide text-white/80 uppercase">
                {snapshot.heroStat.label}
              </p>
            </motion.div>
          )}

          {show(6) && (
            <motion.blockquote
              className="mt-8 border-t border-white/10 pt-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm leading-relaxed text-white/70 italic">
                &ldquo;{snapshot.quote.text.length > 120
                  ? `${snapshot.quote.text.slice(0, 120)}…`
                  : snapshot.quote.text}&rdquo;
              </p>
              <footer className="mt-2 text-xs text-white/60">— {snapshot.quote.name}</footer>
            </motion.blockquote>
          )}

          <p className="mt-8 text-center font-mono text-[9px] tracking-[0.3em] text-white/25 uppercase">
            #FutureSunDevil
          </p>
        </div>
      </div>
    );
  },
);
