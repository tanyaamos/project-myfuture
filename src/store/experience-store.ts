"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CampusId, InterestId, LearningStyleId, SceneId } from "@/types/experience";

interface ExperienceState {
  selectedInterest: InterestId | null;
  selectedLearningStyle: LearningStyleId | null;
  selectedCampus: CampusId | null;
  currentScene: SceneId;
  hasCompletedIntro: boolean;
  setSelectedInterest: (id: InterestId) => void;
  setSelectedLearningStyle: (id: LearningStyleId) => void;
  setSelectedCampus: (id: CampusId) => void;
  setCurrentScene: (scene: SceneId) => void;
  setHasCompletedIntro: (value: boolean) => void;
  resetExperience: () => void;
}

export const useExperienceStore = create<ExperienceState>()(
  persist(
    (set) => ({
      selectedInterest: null,
      selectedLearningStyle: null,
      selectedCampus: null,
      currentScene: "opening",
      hasCompletedIntro: false,

      setSelectedInterest: (id) =>
        set({
          selectedInterest: id,
        }),

      setSelectedLearningStyle: (id) =>
        set({
          selectedLearningStyle: id,
        }),

      setSelectedCampus: (id) =>
        set({
          selectedCampus: id,
        }),

      setCurrentScene: (scene) =>
        set({
          currentScene: scene,
        }),

      setHasCompletedIntro: (value) =>
        set({
          hasCompletedIntro: value,
        }),

      resetExperience: () =>
        set({
          selectedInterest: null,
          selectedLearningStyle: null,
          selectedCampus: null,
          currentScene: "opening",
          hasCompletedIntro: false,
        }),
    }),
    {
      name: "myfuture-experience",
      skipHydration: true,
      partialize: (state) => ({
        selectedInterest: state.selectedInterest,
        selectedLearningStyle: state.selectedLearningStyle,
        selectedCampus: state.selectedCampus,
        hasCompletedIntro: state.hasCompletedIntro,
      }),
    },
  ),
);

export function usePersonalization() {
  const selectedInterest = useExperienceStore((s) => s.selectedInterest);
  const selectedLearningStyle = useExperienceStore((s) => s.selectedLearningStyle);
  const selectedCampus = useExperienceStore((s) => s.selectedCampus);

  return {
    selectedInterest,
    selectedLearningStyle,
    selectedCampus,
    hasInterest: selectedInterest !== null,
    hasLearningStyle: selectedLearningStyle !== null,
    hasCampus: selectedCampus !== null,
    isFullyPersonalized:
      selectedInterest !== null &&
      selectedLearningStyle !== null &&
      selectedCampus !== null,
  };
}
