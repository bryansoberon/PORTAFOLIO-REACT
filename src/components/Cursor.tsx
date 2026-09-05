import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { prefersReducedMotion } from "../lib/motion";

type CursorMode = "idle" | "link" | "label";

/* Cursor propio: un disco que sigue al puntero, crece sobre elementos
   interactivos y muestra la etiqueta que el elemento declare en
   `data-cursor`. Solo se monta si hay un puntero fino de verdad. */
export default function Cursor() {
  /* Se decide una sola vez al montar: en un efecto dispararía un render extra. */
  const [enabled] = useState(
    () => window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion()
  );
  const [mode, setMode] = useState<CursorMode>("idle");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 420, damping: 34, mass: 0.45 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const hit = e.target instanceof Element
        ? e.target.closest("[data-cursor], a, button, input, textarea, label")
        : null;

      if (!hit) { setMode("idle"); setLabel(""); return; }

      const text = hit.getAttribute("data-cursor");
      if (text) { setMode("label"); setLabel(text); }
      else { setMode("link"); setLabel(""); }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "label" ? 88 : mode === "link" ? 46 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] grid place-items-center rounded-full"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        // El modo de mezcla cambia con el tema, así que vive en una variable CSS.
        mixBlendMode: "var(--cursor-blend)" as CSSProperties["mixBlendMode"],
      }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor: mode === "idle" ? "#ffffff" : "rgba(255,255,255,0.92)",
      }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <AnimatePresence>
        {mode === "label" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            className="select-none text-[0.7rem] font-medium tracking-[0.04em] text-black"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
