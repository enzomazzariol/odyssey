"use client";

import { useEffect } from "react";
import { useStore } from "@/store";

export default function ExplorePage() {
  const setScene = useStore((s) => s.setScene);

  useEffect(() => {
    setScene("solar-system");
  }, [setScene]);

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
      <p className="text-white/40 text-sm tracking-[0.3em] uppercase animate-pulse">
        Solar System — Coming in Phase 2
      </p>
    </div>
  );
}
