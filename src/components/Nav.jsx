import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "../lib/motion.js";
import { sections, profile } from "../data/content.js";

/* Barra superior fija + índice numerado + menú móvil. */
export default function Nav({ activeId, onNav, u, lang, onLang, links }) {
  const [open, setOpen] = useState(false);
  const [past, setPast] = useState(false);

  /* La cabecera del hero ya muestra identidad y enlaces:
     esta barra solo aparece cuando el hero queda atrás. */
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.72;
      setPast(next);
      if (!next) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => { setOpen(false); onNav(id); };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{ y: past ? 0 : -72, opacity: past ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: past ? "auto" : "none" }}
      >
        <div
          className="border-b border-[var(--rule)] backdrop-blur-md"
          style={{ backgroundColor: "color-mix(in srgb, var(--paper) 86%, transparent)" }}
        >
          <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-4 px-[var(--gutter)]">
            {/* Identidad */}
            <button
              onClick={() => go("index")}
              className="link-u shrink-0 text-[0.95rem] font-bold tracking-[-0.02em] text-[var(--fg)]"
            >
              {profile.name}
            </button>

            {/* Disponibilidad */}
            <div className="hidden items-center gap-2 md:flex">
              <span className="dot-live" />
              <span className="meta !text-[var(--fg-2)]">{u.availability}</span>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-5">
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="link-u hidden text-[0.8rem] text-[var(--fg-2)] sm:inline-block">LinkedIn</a>
              <a href={links.github} target="_blank" rel="noreferrer" className="link-u hidden text-[0.8rem] text-[var(--fg-2)] sm:inline-block">GitHub</a>

              <button
                onClick={onLang}
                className="meta !text-[var(--fg-2)] transition-colors hover:!text-[var(--accent)]"
                aria-label="Change language"
              >
                {lang === "en" ? "EN / es" : "ES / en"}
              </button>

              <button
                onClick={() => setOpen((v) => !v)}
                className="meta !text-[var(--fg)] transition-colors hover:!text-[var(--accent)]"
                aria-expanded={open}
              >
                {open ? "Close" : u.indexLabel}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Índice desplegable a pantalla completa */}
      <AnimatePresence>
        {open && past && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-x-0 top-14 z-40 border-b border-[var(--rule)] bg-[var(--paper)]"
          >
            <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)] py-4">
              {sections.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => go(s.id)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.04 * i }}
                  className="group flex w-full items-baseline gap-6 border-b border-[var(--rule-soft)] py-3 text-left last:border-0"
                >
                  <span className="meta w-8">{s.n}</span>
                  <span
                    className="h2 text-[clamp(1.35rem,3.6vw,2.5rem)] transition-colors duration-300"
                    style={{ color: activeId === s.id ? "var(--accent)" : "var(--fg)" }}
                  >
                    {u.sectionNames[s.id]}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Riel lateral: marca la sección activa sin ocupar espacio */}
      <motion.aside
        className="pointer-events-none fixed left-[calc(var(--gutter)/2)] top-1/2 z-30 hidden -translate-y-1/2 xl:block"
        initial={false}
        animate={{ opacity: past ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <ul className="flex flex-col gap-3">
          {sections.map((s) => {
            const on = activeId === s.id;
            return (
              <li key={s.id} className="pointer-events-auto">
                <button
                  onClick={() => onNav(s.id)}
                  className="group flex items-center gap-3"
                  aria-current={on ? "true" : undefined}
                >
                  <span
                    className="block h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      width: on ? 28 : 12,
                      backgroundColor: on ? "var(--accent)" : "var(--fg-4)",
                    }}
                  />
                  <span
                    className="meta transition-colors duration-300"
                    style={{ color: on ? "var(--accent)" : "var(--fg-4)" }}
                  >
                    {s.n}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </motion.aside>
    </>
  );
}
