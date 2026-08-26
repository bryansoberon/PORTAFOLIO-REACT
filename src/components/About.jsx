import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Reveal } from "./primitives.jsx";
import { EASE } from "../lib/motion.js";
import { stackCategoriesBase } from "../data/content.js";
import { techIcons } from "../data/techIcons.js";

const LETTERS = ["A", "B", "C", "D"];

/* Sección 02 — declaración + diales por área del stack. */
export default function About({ t, u }) {
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
            className="mt-16 overflow-hidden border border-[var(--rule)] p-2"
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

/* Un dial: círculo grande con aguja que gira al activarse. */
function Dial({ index, title, active, onActivate, last }) {
  const angle = [-14, -34, 0, 42][index % 4];

  return (
    <button
      data-cursor={title}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={active}
      className={`group relative flex aspect-square items-center justify-center p-4 sm:p-6 ${last ? "" : "lg:border-r"} border-[var(--rule)]`}
    >
      {/* Indicador de esquina */}
      <span
        className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full transition-colors duration-400"
        style={{ backgroundColor: active ? "var(--accent)" : "var(--panel-2)" }}
      />

      {/* Círculo */}
      <motion.span
        className="relative grid h-full w-full max-h-[15rem] max-w-[15rem] place-items-center rounded-full"
        animate={{ backgroundColor: active ? "var(--accent)" : "var(--panel)" }}
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
            style={{ backgroundColor: active ? "#fff" : "var(--paper)" }}
          />
        </motion.span>

        {/* Núcleo + etiqueta */}
        <span className="relative flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[0.8rem] font-semibold transition-colors duration-400"
            style={{ backgroundColor: "var(--paper)", color: "var(--fg)" }}
          >
            {LETTERS[index]}
          </span>
          <motion.span
            className="text-left text-[0.85rem] font-medium leading-tight"
            animate={{
              rotate: active ? 0 : angle * 0.55,
              color: active ? "#ffffff" : "var(--fg-3)",
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

function Weapon({ name, delay }) {
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
