"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { ThemeAccentGlow } from "@/components/ui/ThemeAccentGlow";
import { usePersonalizedContent } from "@/hooks/usePersonalizedContent";
import { useExperienceStore } from "@/store/experience-store";

export function Scene6Momentum() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);
  const { content, accentColor } = usePersonalizedContent();

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const stat = statRef.current;
      if (!section || !stat) return;

      const lines = section.querySelectorAll("[data-momentum-line]");
      const statValue = stat.querySelector("[data-stat-value]");

      gsap.fromTo(
        lines,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none reverse",
            onEnter: () => setCurrentScene("momentum"),
            onEnterBack: () => setCurrentScene("momentum"),
          },
        },
      );

      if (statValue) {
        gsap.fromTo(
          statValue,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [content.momentum.stat] },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-momentum"
      className="relative min-h-screen"
      aria-label="Your momentum"
    >
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden">
        <VideoBackground
          key={content.momentum.imageSrc}
          imageSrc={content.momentum.imageSrc}
          imageAlt={content.momentum.imageAlt}
          overlay="dark"
          kenBurns
        />

        <ThemeAccentGlow color={accentColor} className="opacity-80" />

        <div className="relative z-10 px-6 py-32 md:px-16 lg:px-24">
          <div ref={statRef} className="mb-12 md:mb-16">
            <motion.p
              data-stat-value
              className="text-display-xl font-display font-bold tracking-tight"
              style={{ color: accentColor }}
            >
              {content.momentum.stat}
            </motion.p>
            <p
              data-momentum-line
              className="mt-2 max-w-md text-sm font-medium tracking-[0.15em] text-white/80 uppercase md:text-base"
            >
              {content.momentum.statLabel}
            </p>
          </div>

          <div className="max-w-4xl">
            <div className="overflow-hidden">
              <h2 data-momentum-line className="text-display-lg text-white">
                {content.momentum.headline}
              </h2>
            </div>
            <div className="overflow-hidden">
              <p
                data-momentum-line
                className="text-display-lg"
                style={{ color: accentColor }}
              >
                {content.momentum.subline}
              </p>
            </div>
          </div>

          <motion.p
            data-momentum-line
            className="mt-16 max-w-sm text-sm font-medium tracking-widest text-white/65 uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            More of your story is coming — two choices below shape what follows
          </motion.p>
        </div>
      </div>
    </section>
  );
}
