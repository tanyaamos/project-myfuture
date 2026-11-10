"use client";

import { AsuLogo } from "@/components/ui/AsuLogo";
import { useExperienceStore } from "@/store/experience-store";

const LIGHT_SCENES = new Set(["interests", "campus-choice"]);

/** Top-left ASU mark — sits above the progress bar in the fixed header. */
export function AsuBrandHeader() {
  const currentScene = useExperienceStore((s) => s.currentScene);
  const variant = LIGHT_SCENES.has(currentScene) ? "dark" : "light";

  return (
    <div
      className={`inline-flex rounded-md px-3 py-2 backdrop-blur-md transition-colors duration-500 ${
        variant === "light" ? "bg-charcoal/30" : "bg-white/80 shadow-sm"
      }`}
    >
      <AsuLogo variant={variant} size="md" />
    </div>
  );
}
