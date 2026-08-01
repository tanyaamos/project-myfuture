"use client";

import { getInterestById, getPersonalizationHints } from "@/lib/interests";
import { getPersonalizedContent, getThemeAccent } from "@/lib/personalization";
import {
  getCampusById,
  getEnhancedSprint3Content,
  getLearningStyleById,
} from "@/lib/sprint4-content";
import { useExperienceStore } from "@/store/experience-store";

export function usePersonalizedContent() {
  const selectedInterest = useExperienceStore((s) => s.selectedInterest);
  const selectedLearningStyle = useExperienceStore((s) => s.selectedLearningStyle);
  const selectedCampus = useExperienceStore((s) => s.selectedCampus);

  const interest = selectedInterest ? getInterestById(selectedInterest) : undefined;
  const learningStyle = selectedLearningStyle
    ? getLearningStyleById(selectedLearningStyle)
    : undefined;
  const campus = selectedCampus ? getCampusById(selectedCampus) : undefined;

  const content = getPersonalizedContent(selectedInterest);
  const sprint3 = getEnhancedSprint3Content(
    selectedInterest,
    selectedLearningStyle,
    selectedCampus,
  );
  const hints = getPersonalizationHints(selectedInterest);
  const accentColor = interest ? getThemeAccent(interest.theme) : "#FFC627";

  return {
    selectedInterest,
    selectedLearningStyle,
    selectedCampus,
    interest,
    learningStyle,
    campus,
    content,
    sprint3,
    hints,
    accentColor,
    hasSelection: selectedInterest !== null,
    hasLearningStyle: selectedLearningStyle !== null,
    hasCampus: selectedCampus !== null,
    isFullyPersonalized:
      selectedInterest !== null &&
      selectedLearningStyle !== null &&
      selectedCampus !== null,
  };
}
