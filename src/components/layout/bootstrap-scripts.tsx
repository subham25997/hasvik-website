"use client";

import { useEffect } from "react";

export function BootstrapScripts() {
  useEffect(() => {
    const themeScript = document.createElement("script");
    themeScript.textContent =
      "try{var d=localStorage.getItem('theme')==='dark';var e=document.documentElement;e.classList.add('js');e.classList.toggle('dark',d);e.style.colorScheme=d?'dark':'light'}catch(_){}";
    document.head.appendChild(themeScript);

    const revealScript = document.createElement("script");
    revealScript.src = "/scripts/reveal-init.js";
    document.head.appendChild(revealScript);

    return () => {
      themeScript.remove();
      revealScript.remove();
    };
  }, []);

  return null;
}
