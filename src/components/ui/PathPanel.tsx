"use client";

import Image from "next/image";
import { getPlaceLink } from "@/lib/asu-links";
import { ExploreLink } from "@/components/ui/ExploreLink";
import type { PathMoment } from "@/lib/personalization";

interface PathPanelProps {
  moment: PathMoment;
  index: number;
  accentColor: string;
}

export function PathPanel({ moment, index, accentColor }: PathPanelProps) {
  return (
    <article
      className="relative flex h-full w-screen shrink-0 flex-col justify-end overflow-hidden md:w-[85vw] lg:w-[75vw]"
      aria-label={`${moment.title}: ${moment.description}`}
    >
      <div className="absolute inset-0">
        <Image
          src={moment.imageSrc}
          alt={moment.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 75vw"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/20" />
      </div>

      <div className="relative z-10 px-6 pb-16 md:px-16 md:pb-24 lg:px-24">
        <span
          className="mb-4 block font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: accentColor }}
        >
          0{index + 1}
        </span>
        <h3 className="text-display-md mb-4 max-w-2xl text-white">{moment.title}</h3>
        <p className="max-w-lg text-body-lg text-white/75">{moment.description}</p>
        <ExploreLink
          href={moment.href ?? getPlaceLink(moment.title)}
          accentColor={accentColor}
        />
      </div>
    </article>
  );
}
