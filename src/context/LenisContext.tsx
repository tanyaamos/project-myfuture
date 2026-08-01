"use client";

import { createContext, useContext } from "react";
import type Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function LenisContextProvider({
  lenis,
  children,
}: {
  lenis: Lenis | null;
  children: React.ReactNode;
}) {
  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenisInstance() {
  return useContext(LenisContext);
}
