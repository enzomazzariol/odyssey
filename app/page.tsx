"use client";

import { useEffect } from "react";
import { useStore } from "@/store";
import IntroOverlay from "@/components/ui/IntroOverlay";

export default function HomePage() {
  const setScene = useStore((s) => s.setScene);

  useEffect(() => {
    setScene("intro");
  }, [setScene]);

  return <IntroOverlay />;
}
