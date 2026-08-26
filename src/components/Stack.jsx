import { useState } from "react";
import { Container, SectionHead, Reveal } from "./primitives.jsx";
import { stackCategoriesBase } from "../data/content.js";
import { techIcons } from "../data/techIcons.js";

/* Sección 07 — el stack completo, visible de un vistazo.
   Los diales de «Sobre mí» muestran una categoría a la vez;
   aquí están las cuatro juntas, para quien viene a escanear. */
export default function Stack({ t, u }) {
  const cats = stackCategoriesBase.map((c, i) => ({ ...c, title: t.stack.categories[i] }));
  const total = cats.reduce((sum, c) => sum + c.techs.length, 0);

  return (
    <section id="stack" className="py-20 sm:py-28" style={{ backgroundColor: "var(--panel)" }}>
      <Container>
        <SectionHead
          label={u.sectionNames.stack}
          title={t.stack.heading}
          note={t.stack.subtitle}
          count={total}
        />

        <div className="mt-10">
          {cats.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.07}>
              <div className="grid gap-4 border-t border-[var(--rule)] py-7 last:border-b sm:gap-6 lg:grid-cols-12">
                <div className="flex items-baseline gap-4 lg:col-span-3">
                  <span className="meta">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-[1.05rem] font-medium tracking-[-0.01em] text-[var(--fg)]">
                    {cat.title}
                  </h3>
                </div>

                <ul className="flex flex-wrap gap-x-6 gap-y-3.5 lg:col-span-9">
                  {cat.techs.map((tech) => <TechItem key={tech} name={tech} />)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* El color de marca solo aparece al pasar el cursor; en reposo, tinta. */
function TechItem({ name }) {
  const [hover, setHover] = useState(false);
  const entry = techIcons[name];
  if (!entry) return null;
  const { Icon, color } = entry;

  return (
    <li
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="flex items-center gap-2.5"
    >
      <Icon
        size={17}
        className="transition-colors duration-300"
        style={{ color: hover ? color : "var(--fg-3)" }}
      />
      <span
        className="text-[0.9rem] transition-colors duration-300"
        style={{ color: hover ? "var(--fg)" : "var(--fg-2)" }}
      >
        {name}
      </span>
    </li>
  );
}
