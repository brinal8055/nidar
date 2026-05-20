"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export function PageAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("landing_view", { path: pathname });
  }, [pathname]);

  return null;
}
