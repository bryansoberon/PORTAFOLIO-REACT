import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container, Reveal } from "./primitives.jsx";
import { projectsBase } from "../data/content.js";
import { techIcons } from "../data/techIcons.js";

/* Sección 03 — cada proyecto es una tarjeta que se queda pegada
   mientras la siguiente sube por encima. */
export default function Projects({ t, u }) {
  const items = projectsBase.map((p, i) => ({ ...p, ...t.projects.items[i] }));

  return (
    <section id="projects" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="flex items-baseline justify-between border-t border-[var(--rule)] pt-5">
            <span className="meta">/{u.sectionNames.projects.toLowerCase().replace(/\s+/g, "_")}</span>
            <span className="meta">[{String(items.length).padStart(2, "0")}]</span>
          </div>
        </Reveal>

        {/* Pila */}
        <div className="mt-10">
          {items.map((p, i) => (
            <StackedCard key={p.title} project={p} index={i} total={items.length} u={u} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StackedCard({ project, index, total, u }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end start"] });

  /* La tarjeta saliente se encoge y se apaga bajo la que entra. */
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.12]);

  const isLast = index === total - 1;

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `calc(5rem + ${index * 1.25}rem)`, marginBottom: isLast ? 0 : "2rem" }}
    >
      <motion.article
        style={{ scale: isLast ? 1 : scale, transformOrigin: "center top", borderRadius: "var(--r-lg)" }}
        className="relative overflow-hidden border border-[var(--rule)] bg-[var(--paper)] p-6 sm:p-10"
      >
        {/* Velo que oscurece la tarjeta a medida que queda atrás */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-[var(--ink)]"
          style={{ opacity: isLast ? 0 : dim }}
        />

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Texto */}
          <div className="flex flex-col lg:col-span-5">
            <span className="meta">{String(index + 1).padStart(2, "0")}</span>

            <h3 className="h2 mt-3 text-[clamp(1.6rem,3.6vw,2.75rem)] text-[var(--fg)]">
              {project.title}
            </h3>
            <span className="meta mt-2">{project.type}</span>

            <p className="mt-6 max-w-lg text-[0.98rem] leading-[1.6] text-[var(--fg-2)]">
              {project.desc}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => <li key={tag} className="tag">{tag}</li>)}
            </ul>

            <div className="mt-auto pt-8">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="pill"
                data-cursor={u.liveSite}
              >
                {u.liveSite}
              </a>
            </div>
          </div>

          {/* Vista previa */}
          <div className="lg:col-span-7">
            <Preview project={project} index={index} progress={scrollYProgress} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* Maqueta de navegador construida con los datos reales del proyecto. */
function Preview({ project, index, progress }) {
  const host = (() => {
    try { return new URL(project.link).host.replace(/^www\./, ""); }
    catch { return project.link; }
  })();

  const icons = project.tags.map((tag) => techIcons[tag]).filter(Boolean).slice(0, 5);
  const dark = index % 2 === 0;

  /* Paralaje interno: la maqueta flota dentro de su panel. */
  const y = useTransform(progress, [0, 1], ["4%", "-6%"]);

  return (
    <div
      className="grid place-items-center overflow-hidden p-4 sm:p-8"
      style={{ backgroundColor: "var(--panel)", borderRadius: "var(--r-lg)" }}
    >
      <motion.div
        style={{
          y,
          borderRadius: "var(--r-md)",
          backgroundColor: dark ? "var(--ink)" : "var(--paper)",
          color: dark ? "var(--on-ink)" : "var(--fg)",
        }}
        className="w-full overflow-hidden shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)]"
      >
        {/* Barra de dirección */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: `1px solid ${dark ? "var(--rule-ink)" : "var(--rule)"}` }}
        >
          <span className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />
            ))}
          </span>
          <span
            className="meta flex-1 truncate rounded-full px-3 py-1 text-center"
            style={{
              backgroundColor: dark ? "rgba(255,255,255,0.06)" : "var(--panel)",
              color: dark ? "var(--on-ink-2)" : "var(--fg-3)",
            }}
          >
            {host}
          </span>
        </div>

        {/* Lienzo */}
        <div className="aspect-[16/10] p-6 sm:p-9">
          <span className="meta" style={{ color: dark ? "var(--on-ink-2)" : "var(--fg-3)" }}>
            {String(index + 1).padStart(2, "0")} / {project.type}
          </span>

          <p
            className="display mt-4 text-[clamp(1.5rem,3.4vw,2.75rem)]"
            style={{ color: dark ? "var(--on-ink)" : "var(--fg)" }}
          >
            {project.title.split(" - ")[0]}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {icons.map(({ Icon, color }, k) => (
              <span
                key={k}
                className="grid h-10 w-10 place-items-center rounded-full"
                style={{ backgroundColor: dark ? "rgba(255,255,255,0.07)" : "var(--panel)" }}
              >
                <Icon size={17} style={{ color: dark ? "#fff" : color }} className="opacity-80" />
              </span>
            ))}
          </div>

          {/* Líneas fantasma que sugieren contenido */}
          <div className="mt-8 space-y-2.5">
            {[100, 78, 55].map((w) => (
              <span
                key={w}
                className="block h-2 rounded-full"
                style={{
                  width: `${w}%`,
                  backgroundColor: dark ? "rgba(255,255,255,0.08)" : "var(--panel)",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
