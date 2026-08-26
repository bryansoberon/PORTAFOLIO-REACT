import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "../lib/motion.js";

/* Aparición al hacer scroll — una sola vez, sutil. */
export function Reveal({ children, delay = 0, y = 22, className = "", style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Contenedor con los márgenes del grid. */
export function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1600px] px-[var(--gutter)] ${className}`}>
      {children}
    </div>
  );
}

/* Cabecera de sección: etiqueta tipo ruta + contador + título. */
export function SectionHead({ label, title, note, count, onInk = false }) {
  const slug = `/${label.toLowerCase().replace(/\s+/g, "_")}`;

  return (
    <header className="border-t pt-5" style={{ borderColor: onInk ? "var(--rule-ink)" : "var(--rule)" }}>
      <Reveal>
        <div className="flex items-baseline justify-between gap-6">
          <span className="meta" style={onInk ? { color: "var(--on-ink-2)" } : undefined}>{slug}</span>
          {count != null && (
            <span className="meta" style={onInk ? { color: "var(--on-ink-2)" } : undefined}>
              [{String(count).padStart(2, "0")}]
            </span>
          )}
        </div>
      </Reveal>

      {title && (
        <Reveal delay={0.06}>
          <h2
            className="h2 mt-6 max-w-4xl text-[clamp(1.9rem,5.5vw,4rem)]"
            style={{ color: onInk ? "var(--on-ink)" : "var(--fg)" }}
          >
            {title}
          </h2>
        </Reveal>
      )}

      {note && (
        <Reveal delay={0.12}>
          <p
            className="mt-5 max-w-xl text-[0.95rem] leading-[1.6]"
            style={{ color: onInk ? "var(--on-ink-2)" : "var(--fg-2)" }}
          >
            {note}
          </p>
        </Reveal>
      )}
    </header>
  );
}

/* Flecha diagonal que se desplaza en hover del contenedor `group`. */
export function Arrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1 ${className}`}
    >
      <path d="M4 12L12 4M12 4H5.5M12 4V10.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
