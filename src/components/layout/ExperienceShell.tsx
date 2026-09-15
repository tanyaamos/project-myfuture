"use client";

import { useEffect } from "react";
import { Scene1Opening } from "@/components/scenes/Scene1Opening";
import { Scene3Interests } from "@/components/scenes/Scene3Interests";
import { Scene4PersonalizedMirror } from "@/components/scenes/Scene4PersonalizedMirror";
import { Scene5PathReveal } from "@/components/scenes/Scene5PathReveal";
import { Scene6Momentum } from "@/components/scenes/Scene6Momentum";
import { Scene11LearningStyle } from "@/components/scenes/Scene11LearningStyle";
import { Scene12CampusChoice } from "@/components/scenes/Scene12CampusChoice";
import { Scene13CampusImmersion } from "@/components/scenes/Scene13CampusImmersion";
import { Scene14Arizona } from "@/components/scenes/Scene14Arizona";
import { Scene15UnexpectedPlaces } from "@/components/scenes/Scene15UnexpectedPlaces";
import { Scene7StudentVoice } from "@/components/scenes/Scene7StudentVoice";
import { Scene8StatBeats } from "@/components/scenes/Scene8StatBeats";
import { Scene9RealExperiences } from "@/components/scenes/Scene9RealExperiences";
import { Scene10Belonging } from "@/components/scenes/Scene10Belonging";
import { Scene16FutureSnapshot } from "@/components/scenes/Scene16FutureSnapshot";
import { Scene17PictureYourself } from "@/components/scenes/Scene17PictureYourself";
import { Scene18NextStep } from "@/components/scenes/Scene18NextStep";
import { Scene19Sendoff } from "@/components/scenes/Scene19Sendoff";
import { AsuBrandHeader } from "@/components/ui/AsuBrandHeader";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useExperienceStore } from "@/store/experience-store";

export function ExperienceShell() {
  const progress = useScrollProgress();

  useEffect(() => {
    useExperienceStore.persist.rehydrate();
  }, []);

  return (
    <>
      <ProgressIndicator progress={progress} />
      <AsuBrandHeader />

      <main id="main-content" className="relative">
        <Scene1Opening />
        <Scene3Interests />
        <Scene4PersonalizedMirror />
        <Scene5PathReveal />
        <Scene6Momentum />
        <Scene11LearningStyle />
        <Scene12CampusChoice />
        <Scene13CampusImmersion />
        <Scene14Arizona />
        <Scene15UnexpectedPlaces />
        <Scene7StudentVoice />
        <Scene8StatBeats />
        <Scene9RealExperiences />
        <Scene10Belonging />
        <Scene16FutureSnapshot />
        <Scene17PictureYourself />
        <Scene18NextStep />
        <Scene19Sendoff />
      </main>
    </>
  );
}
