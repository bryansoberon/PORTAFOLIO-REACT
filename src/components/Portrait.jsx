import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroFrames, heroFrameGlow, profile } from "../data/content.js";

const HOLD = 2600; // ms por fotograma

/* Retrato en arco que cicla entre fotogramas con distinta gradación,
   más un paralaje suave que sigue al cursor. */
export default function Portrait() {
  const [i, setI] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const box = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % heroFrames.length), HOLD);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const r = box.current?.getBoundingClientRect();
      if (!r) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      setTilt({ x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={box} className="relative mx-auto w-fit">
      {/* Resplandor: se desborda del arco y tiñe el aire alrededor */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`glow-${i}`}
          aria-hidden
          className="pointer-events-none absolute -inset-[18%] blur-[52px]"
          style={{
            background: `radial-gradient(50% 45% at 50% 45%, ${heroFrameGlow[i]} 0%, transparent 72%)`,
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.62, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Marco en arco */}
      <motion.div
        className="arch relative aspect-[0.66] h-[min(34svh,15rem)] sm:h-[min(38svh,19rem)] lg:h-[min(42svh,23rem)]"
        animate={{ x: tilt.x * 10, y: tilt.y * 8 }}
        transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.6 }}
      >
        {/* Fotogramas del retrato */}
        <AnimatePresence mode="sync">
          <motion.img
            key={`img-${i}`}
            src={heroFrames[i]}
            alt={profile.name}
            width={800}
            height={1186}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        {/* Degradado inferior para fundir con la página */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to top, var(--fade-out), transparent)" }}
        />
      </motion.div>

      {/* Contador de fotogramas, como una tira de película */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {heroFrames.map((_, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`Frame ${k + 1}`}
            data-cursor={`0${k + 1}`}
            className="h-[3px] rounded-full transition-all duration-500"
            style={{
              width: k === i ? 26 : 10,
              backgroundColor: k === i ? "var(--accent)" : "var(--panel-3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
