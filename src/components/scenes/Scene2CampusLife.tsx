"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGSAP } from "@/lib/gsap";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { useExperienceStore } from "@/store/experience-store";

const CAMPUS_LINES = [
  { text: "Some people arrive", delay: 0 },
  { text: "knowing exactly", delay: 0.05 },
  { text: "where they're going.", delay: 0.1 },
  { text: "Most don't.", emphasis: true, delay: 0.2, className: "mt-8 md:mt-12" },
  { text: "Either way...", delay: 0.3 },
  { text: "you're in the right place.", emphasis: true, delay: 0.35 },
];

export function Scene2CampusLife() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const setCurrentScene = useExperienceStore((s) => s.setCurrentScene);

  useGSAP(
    () => {
      registerGSAP();
      const section = sectionRef.current;
      const content = contentRef.current;
      if (!section || !content) return;

      const lines = content.querySelectorAll("[data-campus-line]");
      const bg = section.querySelector("[data-campus-bg]");

      gsap.set(lines, { y: 60, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1,
          onEnter: () => setCurrentScene("campus-life"),
          onEnterBack: () => setCurrentScene("campus-life"),
          onLeave: () => setCurrentScene("interests"),
        },
      });

      tl.to(bg, { opacity: 1, scale: 1, duration: 0.4, ease: "none" }, 0);

      lines.forEach((line, i) => {
        tl.to(
          line,
          { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
          0.1 + i * 0.08,
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="scene-campus"
      className="relative min-h-[140vh]"
      aria-label="Campus life scene"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          data-campus-bg
          className="absolute inset-0 scale-105 opacity-0 will-change-transform"
        >
          <VideoBackground
            videoSrc="/videos/campus-energy.mp4"
            imageSrc="https://images.unsplash.com/photo-1541339907198-e08756dedf32?auto=format&fit=crop&w=2400&q=80"
            imageAlt="Students walking across a vibrant university campus"
            overlay="warm"
            kenBurns
          />
        </div>

        <div className="relative z-10 flex h-full items-center px-6 md:px-16 lg:px-24">
          <div ref={contentRef} className="max-w-4xl">
            {CAMPUS_LINES.map((line, index) => (
              <div key={index} className="line-reveal-mask">
                <p
                  data-campus-line
                  className={`text-display-lg will-change-transform ${line.emphasis ? "text-asu-gold" : "text-white"} ${line.className ?? ""}`}
                >
                  {line.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
      </div>
    </section>
  );
}
