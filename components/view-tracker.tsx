"use client";

import { useEffect } from "react";
import { trackRecentView } from "@/lib/store";

export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackRecentView(slug);
  }, [slug]);
  return null;
}
