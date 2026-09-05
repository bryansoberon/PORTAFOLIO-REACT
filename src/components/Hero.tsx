import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Send } from "lucide-react";
import Portrait from "./Portrait";
import { Reveal } from "./primitives";
import { EASE } from "../lib/motion";
import { SocialRow, BadgeRow, ThemeToggle } from "./controls";
import { profile, links } from "../data/content";
import type { NavHandler, Theme, Translation, UiCopy } from "../types";

interface HeroProps {
  t: Translation;
  u: UiCopy;
  onNav: NavHandler;
  theme: Theme;
  onTheme: () => void;
}

/* Sección 01 — retrato al centro, meta en las cuatro esquinas. */
export default function Hero({ t, u, onNav, theme, onTheme }: HeroProps) {
  const h = t.home;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  /* Cada capa se aleja a distinta velocidad. */
  const gridY  = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const ghostL = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"]);
  const ghostR = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const portY  = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const portOp = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="index" className="relative overflow-hidden">
      {/* Rejilla técnica */}
      <motion.div aria-hidden className="grid-bg pointer-events-none absolute inset-0" style={{ y: gridY }} />

      {/* Marcas fantasma detrás del retrato */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden items-center justify-between px-[4vw] sm:flex">
        <motion.div style={{ x: ghostL }}><GhostWord text={h.tagline[0]} /></motion.div>
        <motion.div style={{ x: ghostR }}><GhostWord text={h.tagline[1]} /></motion.div>
      </div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col px-[var(--gutter)] pb-8 pt-5">
        {/* ── Barra superior ── */}
        <div className="flex items-start justify-between gap-4">
          <Reveal>
            <button
              onClick={() => onNav("index")}
              className="flex items-center gap-3 text-left"
              data-cursor={u.sectionNames.index}
            >
              <img
                src={`${import.meta.env.BASE_URL}favicon.png`}
                alt=""
                width={30}
                height={30}
                className="h-[30px] w-[30px] shrink-0 rounded-lg border border-[var(--rule)] object-contain"
              />
              <span className="block">
                <span className="block text-[0.95rem] font-bold leading-tight tracking-[-0.02em] text-[var(--fg)] sm:text-[1.05rem]">
                  {profile.name}
                </span>
                <span className="mt-0.5 block text-[0.75rem] leading-tight text-[var(--fg-3)] sm:text-[0.85rem]">
                  {u.tagline}
                </span>
              </span>
            </button>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex items-center gap-2 sm:gap-5">
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="link-u hidden text-[0.92rem] font-medium text-[var(--fg)] lg:inline-block">LinkedIn</a>
              <a href={links.github} target="_blank" rel="noreferrer" className="link-u hidden text-[0.92rem] font-medium text-[var(--fg)] lg:inline-block">GitHub</a>

              <ThemeToggle theme={theme} onToggle={onTheme} label={u.themeLabel} />

              <button
                onClick={() => onNav("contact")}
                className="pill !px-3 sm:!px-[1.15rem]"
                data-cursor={u.sectionNames.contact}
              >
                <span className="dot-live" />
                {/* En pantallas estrechas solo cabe el estado, no la frase. */}
                <span className="hidden sm:inline">{u.availability}</span>
                <span className="sm:hidden">{t.header.available}</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* ── Retrato ── */}
        <div className="flex flex-1 items-center justify-center py-4 sm:py-6">
          {/* Capa externa: paralaje. Capa interna: entrada.
              Separadas porque ambas animan `y` y `opacity`. */}
          <motion.div style={{ y: portY, opacity: portOp }}>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
            >
              <Portrait revealHint={u.revealHint} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Pie: presentación + métricas ── */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="flex items-start gap-4 sm:gap-5">
              <button
                onClick={() => onNav("about")}
                aria-label={u.scroll}
                data-cursor={u.scroll}
                className="hidden h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--rule)] transition-colors duration-300 hover:border-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--paper)] sm:grid"
              >
                <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                  <svg viewBox="0 0 16 16" className="h-4 w-4">
                    <path d="M8 2v12M3.5 9.5L8 14l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </button>

              <div>
                <p className="text-[clamp(1.15rem,2.6vw,1.7rem)] font-semibold leading-[1.2] tracking-[-0.025em] text-[var(--fg)]">
                  {h.greeting} <span className="text-[var(--accent)]">{profile.name}</span>
                </p>
                <p className="mt-1.5 text-[clamp(0.95rem,1.6vw,1.15rem)] font-medium leading-[1.3] text-[var(--fg-2)]">
                  {h.subtitle}
                </p>
                <p className="mt-3 max-w-lg text-[0.9rem] leading-[1.5] text-[var(--fg-3)]">
                  {h.paragraph}
                </p>

                <BadgeRow className="mt-4" />

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNav("contact")}
                    className="pill pill-accent"
                    data-cursor={h.contact}
                  >
                    <Send size={15} strokeWidth={1.8} />
                    {h.contact}
                  </button>
                  <SocialRow />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Métricas */}
          <Reveal delay={0.28} className="lg:col-span-5">
            <div className="flex flex-wrap items-start gap-x-8 gap-y-5 lg:justify-end">
              {[
                { n: "10+", label: h.stats.projects },
                { n: "4+",  label: h.stats.stacks },
                { n: "5",   label: u.sectionNames.certifications },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div className="display text-[clamp(1.75rem,4vw,3rem)] text-[var(--accent)]">{n}</div>
                  <div className="meta mt-1">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GhostWord({ text }: { text: string }) {
  return (
    <span
      className="select-none font-bold tracking-[-0.05em]"
      style={{ fontSize: "clamp(5rem, 15vw, 15rem)", color: "var(--ghost)", lineHeight: 1 }}
    >
      {text}
    </span>
  );
}
