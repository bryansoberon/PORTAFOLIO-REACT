import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Portrait from "./Portrait.jsx";
import { Reveal } from "./primitives.jsx";
import { EASE } from "../lib/motion.js";
import { profile, links } from "../data/content.js";
import { Code2, Database, GitBranch } from "lucide-react";

const STAT_ICONS = [Code2, Database, GitBranch];

/* Sección 01 — retrato al centro, meta en las cuatro esquinas. */
export default function Hero({ u, onNav }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  /* Cada capa se aleja a distinta velocidad: rejilla lenta,
     palabras fantasma rápidas, retrato intermedio. */
  const gridY   = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const ghostL  = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);
  const ghostR  = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const portY   = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const portOp  = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="index" className="relative min-h-[100svh] overflow-hidden">
      {/* Rejilla técnica */}
      <motion.div aria-hidden className="grid-bg pointer-events-none absolute inset-0" style={{ y: gridY }} />

      {/* Marcas fantasma detrás del retrato */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-between px-[6vw]">
        <motion.div style={{ x: ghostL }}><GhostWord text="FULL" /></motion.div>
        <motion.div style={{ x: ghostR }}><GhostWord text="STACK" /></motion.div>
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-[var(--gutter)] pb-8 pt-6">
        {/* ── Barra superior ── */}
        <div className="flex items-start justify-between gap-6">
          <Reveal>
            <button onClick={() => onNav("index")} className="block text-left" data-cursor="Inicio">
              <span className="block text-[1.05rem] font-bold tracking-[-0.02em] text-[var(--fg)]">
                {profile.name}
              </span>
              <span className="mt-0.5 block text-[0.85rem] text-[var(--fg-3)]">{u.tagline}</span>
            </button>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex items-center gap-4 sm:gap-7">
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="link-u hidden text-[0.92rem] font-medium text-[var(--fg)] sm:inline-block">LinkedIn</a>
              <a href={links.github} target="_blank" rel="noreferrer" className="link-u hidden text-[0.92rem] font-medium text-[var(--fg)] sm:inline-block">GitHub</a>
              <button onClick={() => onNav("contact")} className="pill">
                <span className="dot-live" />
                <span>{u.availability}</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* ── Retrato ── */}
        <div className="flex flex-1 items-center justify-center py-8">
          {/* Capa externa: paralaje. Capa interna: entrada.
              Separadas porque ambas animan `y` y `opacity`. */}
          <motion.div style={{ y: portY, opacity: portOp }}>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
            >
              <Portrait />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Pie: descripción + métricas ── */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal delay={0.2}>
            <div className="flex items-start gap-5">
              <button
                onClick={() => onNav("about")}
                aria-label={u.scroll}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--rule)] transition-colors duration-300 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--on-ink)]"
              >
                <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                  <svg viewBox="0 0 16 16" className="h-4 w-4">
                    <path d="M8 2v12M3.5 9.5L8 14l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </button>

              <p className="max-w-md text-[0.95rem] leading-[1.5] text-[var(--fg-2)]">
                {u.heroBlurb}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="flex flex-wrap items-center gap-x-9 gap-y-5">
              {u.heroStats.map((s, k) => {
                const Icon = STAT_ICONS[k];
                return (
                  <div key={s.label} className="flex items-center gap-3">
                    {k === 0 ? (
                      <span className="display text-[clamp(2rem,4vw,3.25rem)] text-[var(--fg)]">{s.n}</span>
                    ) : (
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--rule)] text-[var(--fg-2)]">
                        <Icon size={17} strokeWidth={1.5} />
                      </span>
                    )}
                    <span className="whitespace-pre-line text-[0.8rem] leading-[1.25] text-[var(--fg-2)]">
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GhostWord({ text }) {
  return (
    <span
      className="select-none font-bold tracking-[-0.05em]"
      style={{
        fontSize: "clamp(5rem, 16vw, 15rem)",
        color: "rgba(19,19,19,0.035)",
        lineHeight: 1,
      }}
    >
      {text}
    </span>
  );
}
