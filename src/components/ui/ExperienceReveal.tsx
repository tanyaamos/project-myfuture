"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getProgramLink } from "@/lib/asu-links";
import { ExploreLink } from "@/components/ui/ExploreLink";
import type { RealExperience } from "@/lib/sprint3-content";

interface ExperienceRevealProps {
  experience: RealExperience;
  index: number;
  accentColor: string;
}

export function ExperienceReveal({ experience, index, accentColor }: ExperienceRevealProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.article
      className={`relative flex min-h-[80vh] flex-col overflow-hidden md:min-h-screen md:flex-row ${
        isEven ? "" : "md:flex-row-reverse"
      }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`${experience.program}: ${experience.headline}`}
    >
      <div className="relative h-[45vh] md:h-auto md:w-1/2">
        <Image
          src={experience.imageSrc}
          alt={experience.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-charcoal/20 md:bg-transparent" />
      </div>

      <div className="flex flex-1 flex-col justify-center bg-charcoal px-6 py-12 md:px-16 md:py-24 lg:px-24">
        <span
          className="mb-4 font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: accentColor }}
        >
          {experience.program}
        </span>
        <h3 className="text-display-md mb-6 max-w-lg text-white">{experience.headline}</h3>
        <p className="max-w-md text-body-lg text-white/85">{experience.description}</p>
        <ExploreLink
          href={getProgramLink(experience.program)}
          label="View degree on degrees.asu.edu"
          accentColor={accentColor}
        />
      </div>
    </motion.article>
  );
}
