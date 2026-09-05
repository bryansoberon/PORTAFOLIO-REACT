import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Reveal } from "./primitives";
import { EASE } from "../lib/motion";
import { stackCategoriesBase } from "../data/content";
import { techIcons } from "../data/techIcons";
import type { Translation, UiCopy } from "../types";

const LETTERS = ["A", "B", "C", "D"];

interface AboutProps {
  t: Translation;
  u: UiCopy;
}

/* Sección 02 — declaración + diales por área del stack. */
export default function About({ t, u }: AboutProps) {
  const cats = stackCategoriesBase.map((c, i) => ({ ...c, title: t.stack.categories[i] }));
  const [active, setActive] = useState(2);
  const current = cats[active];

  return (
    <section id="about" className="py-20 sm:py-28">
      <Container>
        {/* Declaración */}
        <Reveal>
          <span className="meta">{u.aboutLabel}</span>
          <p className="mt-6 max-w-4xl text-[clamp(1.35rem,3.2vw,2.5rem)] font-medium leading-[1.22] tracking-[-0.03em] text-[var(--fg)]">
            {u.aboutStatement.split(" ").map((w, i) => (
              <span key={i}>
                {["architecture,", "data", "interface", "arquitectura,", "datos", "interfaz", "full-stack", "Systems", "Sistemas"].includes(w.replace(/[.,]/g, ""))
                  ? <span className="text-[var(--accent)]">{w} </span>
                  : `${w} `}
              </span>
            ))}
          </p>
        </Reveal>

        {/* Panel de diales */}
        <Reveal delay={0.1}>
          <div
            className="mt-12 overflow-hidden border border-[var(--rule)] p-1.5 sm:mt-16 sm:p-2"
            style={{ borderRadius: "var(--r-lg)", backgroundColor: "var(--paper)" }}
          >
            {/* Fila de diales */}
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {cats.map((c, i) => (
                <Dial
                  key={c.title}
                  index={i}
                  title={c.title}
                  active={active === i}
                  onActivate={() => setActive(i)}
                  last={i === cats.length - 1}
                />
              ))}
            </div>

            {/* Detalle del dial activo */}
            <div className="grid gap-8 border-t border-[var(--rule)] p-6 sm:p-8 lg:grid-cols-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="lg:col-span-6"
                >
                  <h3 className="text-[1.1rem] font-semibold text-[var(--fg)]">{current.title}</h3>
                  <p className="mt-3 max-w-lg text-[0.92rem] leading-[1.6] text-[var(--fg-2)]">
                    {u.dialCopy[current.title]}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="lg:col-span-6">
                <span className="meta">{u.weapons}</span>
                <AnimatePresence mode="wait">
                  <motion.ul
                    key={current.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mt-4 flex flex-wrap gap-2.5"
                  >
                    {current.techs.map((tech, k) => (
                      <Weapon key={tech} name={tech} delay={k * 0.03} />
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

interface DialProps {
  index: number;
  title: string;
  active: boolean;
  onActivate: () => void;
  last: boolean;
}

/* Un dial: círculo grande con aguja que gira al activarse. */
function Dial({ index, title, active, onActivate, last }: DialProps) {
  const angle = [-14, -34, 0, 42][index % 4];

  return (
    <button
      data-cursor={title}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={active}
      className={`group relative flex aspect-square items-center justify-center p-2 sm:p-5 lg:p-6 ${last ? "" : "lg:border-r"} border-[var(--rule)]`}
    >
      {/* Indicador de esquina */}
      <span
        className="absolute right-3 top-3 h-2 w-2 rounded-full transition-colors duration-400 sm:right-4 sm:top-4 sm:h-2.5 sm:w-2.5"
        style={{ backgroundColor: active ? "var(--accent)" : "var(--panel-2)" }}
      />

      {/* Círculo */}
      <motion.span
        className="relative grid h-full w-full max-h-[15rem] max-w-[15rem] place-items-center rounded-full"
        animate={{ backgroundColor: active ? "var(--accent)" : "var(--panel-2)" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Aguja */}
        <motion.span
          className="absolute inset-0"
          animate={{ rotate: active ? 0 : angle }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
        >
          <span
            className="absolute left-1/2 top-[8%] block h-[14%] w-[2px] -translate-x-1/2 rounded-full"
            style={{ backgroundColor: active ? "var(--on-accent)" : "var(--fg-4)" }}
          />
        </motion.span>

        {/* Núcleo + etiqueta */}
        <span className="relative flex items-center gap-1.5 sm:gap-2.5">
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.7rem] font-semibold transition-colors duration-400 sm:h-9 sm:w-9 sm:text-[0.8rem]"
            style={{ backgroundColor: "var(--paper)", color: "var(--fg)" }}
          >
            {LETTERS[index]}
          </span>
          <motion.span
            className="text-left text-[0.72rem] font-medium leading-tight sm:text-[0.85rem]"
            animate={{
              rotate: active ? 0 : angle * 0.55,
              color: active ? "var(--on-accent)" : "var(--fg-3)",
            }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
          >
            {title}
          </motion.span>
        </span>
      </motion.span>
    </button>
  );
}

function Weapon({ name, delay }: { name: string; delay: number }) {
  const entry = techIcons[name];
  if (!entry) return null;
  const { Icon, color } = entry;

  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: EASE }}
      className="group flex items-center gap-2 rounded-[var(--r-sm)] bg-[var(--panel)] px-3 py-2 transition-colors duration-300 hover:bg-[var(--panel-2)]"
      title={name}
    >
      <Icon size={16} style={{ color }} className="opacity-55 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="text-[0.8rem] text-[var(--fg-2)]">{name}</span>
    </motion.li>
  );
}
