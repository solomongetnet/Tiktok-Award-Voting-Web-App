"use client";

import { ReactNode, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AosProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return <>{children}</>;
}
