"use client";

import { useLenisInstance } from "@/context/LenisContext";
import { scrollToElement } from "@/components/providers/LenisProvider";

/** Scroll to top of the experience — used by Start over */
export function scrollToTop(lenis: ReturnType<typeof useLenisInstance>) {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    return;
  }

  window.scrollTo({ top: 0, behavior: "instant" });
}

export { scrollToElement };
