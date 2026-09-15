"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { MEDIA } from "@/lib/media";
import { useExperienceStore } from "@/store/experience-store";

const OPENING_LINES = [
  {
    parts: [
      { text: "Your future ", emphasis: true },
      { text: "doesn't start with choosing a university." },
    ],
  },
  {
    parts: [
      { text: "It starts with imagining " },
      { text: "what's possible.", emphasis: true },
    ],
    className: "mt-4 md:mt-6",
  },
];

const CAMPUS_LINES = [
  { text: "Some people arrive", emphasis: false },
  { text: "knowing exactly", emphasis: false },
  { text: "where they're going.", emphasis: false },
  { text: "Most don't.", emphasis: true, className: "mt-4 md:mt-5" },
  { text: "Either way...", emphasis: false },
  { text: "you're in the right place.", emphasis: true },
];

export function Scene1Opening() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const campusContentRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const pin = pinRef.current;
      const headline = headlineRef.current;
      const campusContent = campusContentRef.current;
      if (!section || !pin || !headline || !campusContent) return;

      const openingLines = headline.querySelectorAll("[data-scroll-line]");
      const campusLines = campusContent.querySelectorAll("[data-campus-line]");
      const heroBg = section.querySelector("[data-hero-bg]");
      const scrollHint = section.querySelector("[data-scroll-hint]");

      gsap.fromTo(
        openingLines,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          delay: 0.5,
          ease: "power4.out",
        },
      );

      gsap.set(campusLines, { y: 28, opacity: 0 });
      if (heroBg) gsap.set(heroBg, { scale: 1.06 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=280%",
          pin,
          scrub: 1.1,
          anticipatePin: 1,
          onEnter: () => setCurrentScene("opening"),
          onEnterBack: () => setCurrentScene("opening"),
          onLeave: () => setCurrentScene("interests"),
          onUpdate: (self) => {
            if (self.progress < 0.26) {
              setCurrentScene("opening");
            } else if (self.progress < 0.88) {
              setCurrentScene("campus-life");
            }
          },
        },
      });

      // Single hero — subtle settle, no image swap
      if (heroBg) {
        tl.to(heroBg, { scale: 1, ease: "power2.out", duration: 0.35 }, 0);
      }

      // Hero copy out, then campus copy in the same spot
      tl.to(
        headline,
        { y: -48, opacity: 0, ease: "power2.in", duration: 0.12 },
        0.22,
      );

      if (scrollHint) {
        tl.to(scrollHint, { opacity: 0, duration: 0.08 }, 0.18);
      }

      campusLines.forEach((line, i) => {
        tl.to(
          line,
          { y: 0, opacity: 1, duration: 0.09, ease: "power3.out" },
          0.24 + i * 0.07,
        );
      });

      tl.to(
        campusContent,
        { y: -64, opacity: 0, ease: "power2.in", duration: 0.18 },
        0.72,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-opening"
      className="relative h-[380vh]"
      aria-label="Opening scene"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-sandstone-50">
        <div data-hero-bg className="absolute inset-0 will-change-transform">
          <VideoBackground
            videoSrc="/videos/opening-cinematic.mp4"
            mediaAsset={MEDIA.scenes.opening}
            overlay="dark"
            kenBurns
            priority
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[50%] bg-[linear-gradient(to_top,rgba(26,26,26,0.85)_0%,rgba(26,26,26,0.45)_30%,transparent_62%)]"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 flex h-full w-full flex-col justify-start px-5 pt-40 pb-24 sm:px-8 md:px-10 md:pt-44 lg:px-12 lg:pt-48">
          <div ref={headlineRef} className="relative z-10 w-full max-w-4xl">
            {OPENING_LINES.map((line, index) => (
              <div key={index} className="line-reveal-mask">
                <p
                  data-scroll-line
                  className={`text-display-opening text-balance will-change-transform text-white ${line.className ?? ""}`}
                >
                  {line.parts.map((part, partIndex) => (
                    <span
                      key={partIndex}
                      className={part.emphasis ? "text-asu-gold" : undefined}
                    >
                      {part.text}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          <div
            ref={campusContentRef}
            className="pointer-events-none absolute inset-x-5 top-40 max-w-4xl will-change-[opacity,transform] sm:inset-x-8 md:inset-x-10 md:top-44 lg:inset-x-12 lg:top-48"
          >
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

        <div data-scroll-hint>
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}
