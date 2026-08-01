"use client";

import Image from "next/image";
import { useState } from "react";

/** Drop the official logo at public/images/brand/asu-logo.svg (or .png). */
export const ASU_LOGO_SVG = "/images/brand/asu-logo.svg";
export const ASU_LOGO_PNG = "/images/brand/asu-logo.png";

const SIZES = {
  sm: { width: 130, height: 40, mark: "text-lg", name: "text-[9px]" },
  md: { width: 180, height: 58, mark: "text-2xl", name: "text-[10px]" },
  lg: { width: 240, height: 76, mark: "text-3xl", name: "text-xs" },
} as const;

interface AsuLogoProps {
  variant?: "light" | "dark";
  size?: keyof typeof SIZES;
  className?: string;
}

function AsuWordmarkFallback({
  variant,
  size,
  className,
}: Required<Pick<AsuLogoProps, "variant" | "size">> & { className?: string }) {
  const { mark, name } = SIZES[size];
  const isLight = variant === "light";

  return (
    <div className={`flex flex-col gap-0.5 ${className ?? ""}`} aria-label="Arizona State University">
      <span
        className={`font-display font-bold leading-none tracking-tight ${mark} ${isLight ? "text-asu-gold" : "text-asu-maroon"}`}
      >
        ASU
      </span>
      <span
        className={`font-mono leading-tight tracking-[0.2em] uppercase ${name} ${isLight ? "text-white/80" : "text-charcoal/70"}`}
      >
        Arizona State University
      </span>
    </div>
  );
}

/** Renders local ASU logo asset with maroon/gold wordmark fallback until asset is added. */
export function AsuLogo({ variant = "light", size = "md", className }: AsuLogoProps) {
  const [src, setSrc] = useState(ASU_LOGO_PNG);
  const [useFallback, setUseFallback] = useState(false);
  const dimensions = SIZES[size];

  if (useFallback) {
    return <AsuWordmarkFallback variant={variant} size={size} className={className} />;
  }

  return (
    <Image
      src={src}
      alt="Arizona State University"
      width={dimensions.width}
      height={dimensions.height}
      className={`h-auto w-auto object-contain object-left ${className ?? ""}`}
      onError={() => {
        if (src === ASU_LOGO_PNG) {
          setSrc(ASU_LOGO_SVG);
          return;
        }
        setUseFallback(true);
      }}
    />
  );
}
