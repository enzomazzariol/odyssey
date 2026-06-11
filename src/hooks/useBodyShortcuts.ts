"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PLANETS } from "@/data/planets";

/** Keys 1–8 jump to planets, 9 to the Sun */
export function useBodyShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName)) return;

      if (e.key === "9") {
        router.push("/explore/sun");
        return;
      }
      const n = Number(e.key);
      if (n >= 1 && n <= 8) {
        router.push(`/explore/${PLANETS[n - 1].id}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);
}
