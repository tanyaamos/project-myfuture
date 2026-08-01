"use client";

import type { StatBeat } from "@/lib/sprint3-content";

interface StatBeatPanelProps {
  beat: StatBeat;
  accentColor: string;
  active?: boolean;
}

export function StatBeatPanel({ beat, accentColor, active = false }: StatBeatPanelProps) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-700 md:px-12 ${
        active ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!active}
    >
      <p
        className="text-display-xl mb-4 font-bold tracking-tight"
        style={{ color: accentColor }}
      >
        {beat.stat}
      </p>
      <p className="text-display-md max-w-2xl text-white">{beat.label}</p>
      {beat.sublabel && (
        <p className="mt-4 max-w-md text-sm font-medium tracking-wide text-white/75 md:text-base">
          {beat.sublabel}
        </p>
      )}
    </div>
  );
}
