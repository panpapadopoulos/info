"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    goatcounter?: { count: (vars?: { path?: string }) => void };
  }
}

/**
 * GoatCounter's script counts full page loads only. Moving between pages with Next's
 * client-side links (e.g. /cv → Home) doesn't reload, so count those here.
 */
export function PageViewCounter() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    // The first view is the page load, which the script already counted.
    if (first.current) {
      first.current = false;
      return;
    }
    window.goatcounter?.count({ path: pathname });
  }, [pathname]);

  return null;
}
