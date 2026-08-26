import { useEffect, useRef } from "react";
import Lenis from "lenis";

/* Scroll con inercia. Devuelve una función para navegar a una sección
   que respeta la misma amortiguación, en vez de saltar. */
export function useSmoothScroll() {
  const lenis = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenis.current = instance;

    let frame;
    const raf = (time) => {
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

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis.current) lenis.current.scrollTo(el, { offset: -8 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return scrollTo;
}
