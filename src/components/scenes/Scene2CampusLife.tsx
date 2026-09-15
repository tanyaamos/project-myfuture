"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { MEDIA } from "@/lib/media";
import { useExperienceStore } from "@/store/experience-store";

const CAMPUS_LINES = [
  { text: "Some people arrive", emphasis: false },
  { text: "knowing exactly", emphasis: false },
  { text: "where they're going.", emphasis: false },
  { text: "Most don't.", emphasis: true, className: "mt-4 md:mt-5" },
  { text: "Either way...", emphasis: false },
  { text: "you're in the right place.", emphasis: true },
];

export function Scene2CampusLife() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const pin = pinRef.current;
      const content = contentRef.current;
      if (!section || !pin || !content) return;

      const lines = content.querySelectorAll("[data-campus-line]");
      const hero = section.querySelector("[data-campus-hero]");
      gsap.set(lines, { y: 36, opacity: 0 });
      gsap.set(hero, { scale: 1.07, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin,
          scrub: 1.1,
          anticipatePin: 1,
          onEnter: () => setCurrentScene("campus-life"),
          onEnterBack: () => setCurrentScene("campus-life"),
          onLeave: () => setCurrentScene("interests"),
        },
      });

      // Hero image settles in
      tl.to(hero, { scale: 1, duration: 0.18, ease: "power2.out" }, 0);

      // Lines animate into the hero, one by one
      lines.forEach((line, i) => {
        tl.to(
          line,
          { y: 0, opacity: 1, duration: 0.1, ease: "power3.out" },
          0.1 + i * 0.08,
        );
      });

      // Text scrolls up and out
      tl.to(
        content,
        { y: -72, opacity: 0, ease: "power2.in", duration: 0.2 },
        0.6,
      );

    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-campus"
      className="relative h-[300vh]"
      aria-label="Campus life scene"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-sandstone-50">
        {/* Hero — full viewport; tight blend at the bottom edge only */}
        <div data-campus-hero className="absolute inset-0 will-change-transform">
          <div className="absolute inset-0 overflow-hidden">
            <VideoBackground
              videoSrc="/videos/campus-energy.mp4"
              mediaAsset={MEDIA.scenes.campusLife}
              overlay="campusHero"
              kenBurns
              priority
            />
          </div>

          {/* Dark scrim for copy */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[50%] bg-[linear-gradient(to_top,rgba(26,26,26,0.85)_0%,rgba(26,26,26,0.45)_30%,transparent_62%)]"
            aria-hidden="true"
          />

          {/* Sandstone bleed — matches Scene 3, no solid white band */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[14vh] bg-gradient-to-t from-sandstone-50 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Copy animates in over the hero */}
        <div className="relative z-10 flex h-full items-center px-6 md:px-16 lg:px-24">
          <div ref={contentRef} className="max-w-4xl will-change-transform">
            {CAMPUS_LINES.map((line, index) => (
              <p
                key={index}
                data-campus-line
                className={`text-display-campus will-change-[opacity,transform] ${line.emphasis ? "text-asu-gold" : "text-white"} ${line.className ?? ""}`}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
