"use client";

import { useEffect } from "react";

export function BootstrapScripts() {
  useEffect(() => {
    const revealScript = document.createElement("script");
    revealScript.src = "/scripts/reveal-init.js";
    document.head.appendChild(revealScript);

    return () => {
      revealScript.remove();
    };
  }, []);

  return null;
}
