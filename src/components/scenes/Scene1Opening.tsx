"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { MEDIA } from "@/lib/media";
import { useExperienceStore } from "@/store/experience-store";

const OPENING_LINES = [
  { text: "YOUR FUTURE", emphasis: true },
  { text: "doesn't start" },
  { text: "with choosing" },
  { text: "a university." },
  { text: "It starts", className: "mt-6 md:mt-10" },
  { text: "with imagining" },
  { text: "what's possible.", emphasis: true },
];

export function Scene1Opening() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const pin = pinRef.current;
      const headline = headlineRef.current;
      if (!section || !pin || !headline) return;

      const lines = headline.querySelectorAll("[data-scroll-line]");

      gsap.fromTo(
        lines,
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=180%",
          pin: pin,
          scrub: 1.2,
          anticipatePin: 1,
          onEnter: () => setCurrentScene("opening"),
          onLeave: () => setCurrentScene("campus-life"),
        },
      });

      tl.to(
        headline,
        { y: -60, opacity: 0, ease: "power2.in" },
        0.65,
      );

      tl.to(
        section.querySelector("[data-scene1-bg]"),
        { scale: 1.15, opacity: 0.6, ease: "none" },
        0,
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-opening"
      className="relative h-[200vh]"
      aria-label="Opening scene"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <div data-scene1-bg className="absolute inset-0 will-change-transform">
          <VideoBackground
            videoSrc="/videos/opening-cinematic.mp4"
            mediaAsset={MEDIA.scenes.opening}
            overlay="dark"
            kenBurns
            priority
          />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-center px-6 pb-24 md:px-16 lg:px-24">
          <div ref={headlineRef} className="max-w-5xl">
            <div className="mb-8 overflow-hidden md:mb-10">
              <p
                data-scroll-line
                className="font-mono text-[10px] tracking-[0.35em] text-asu-gold uppercase md:text-xs"
              >
                Arizona State University
              </p>
            </div>
            {OPENING_LINES.map((line, index) => (
              <div key={index} className="overflow-hidden">
                <p
                  data-scroll-line
                  className={`text-display-xl will-change-transform ${line.emphasis ? "text-asu-gold" : "text-white"} ${line.className ?? ""}`}
                >
                  {line.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <ScrollIndicator />
      </div>
    </section>
  );
}
