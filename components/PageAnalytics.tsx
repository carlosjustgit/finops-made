"use client";

import { useEffect } from "react";
import { captureUTM } from "@/lib/utm";
import { trackPageView } from "@/lib/tracking";

export function PageAnalytics() {
  useEffect(() => {
    captureUTM();
    trackPageView();
  }, []);

  return null;
}
