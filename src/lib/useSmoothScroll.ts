import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "./motion";
import type { NavHandler } from "../types";

/* Scroll con inercia. Devuelve una función para navegar a una sección
   que respeta la misma amortiguación, en vez de saltar. */
export function useSmoothScroll(): NavHandler {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (x: number) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenis.current = instance;

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  const scrollTo: NavHandler = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis.current) lenis.current.scrollTo(el, { offset: -8 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return scrollTo;
}
