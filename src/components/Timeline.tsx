import type { CSSProperties } from "react";
import { Container, SectionHead, Reveal } from "./primitives";
import type { SectionId, TimelineItem } from "../types";

interface TimelineProps {
  id: SectionId;
  label: string;
  title: string;
  items: TimelineItem[];
  tone?: "paper" | "ink";
}

/* Experiencia y educación — misma fila numerada. */
export default function Timeline({ id, label, title, items, tone = "paper" }: TimelineProps) {
  const onInk = tone === "ink";

  return (
    <section
      id={id}
      className="py-20 sm:py-28"
      style={onInk ? { backgroundColor: "var(--ink)" } : undefined}
    >
      <Container>
        <SectionHead label={label} title={title} count={items.length} onInk={onInk} />

        <div className="mt-10">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              {/* Los colores viajan como variables, no como estilos en línea:
                  un estilo en línea le ganaría siempre al `:hover` del CSS. */}
              <article
                className="tl-row grid gap-4 border-t py-9 lg:grid-cols-12 lg:gap-8"
                style={{
                  "--tl-rule": onInk ? "var(--rule-ink)" : "var(--rule)",
                  "--tl-meta": onInk ? "var(--on-ink-2)" : "var(--fg-3)",
                  "--tl-title": onInk ? "var(--on-ink)" : "var(--fg)",
                  "--tl-desc": onInk ? "var(--on-ink-2)" : "var(--fg-2)",
                } as CSSProperties}
              >
                <div className="flex items-start gap-4 lg:col-span-3">
                  <span className="meta tl-meta">{String(i + 1).padStart(2, "0")}</span>
                  <span className="meta tl-meta">{item.year}</span>
                </div>

                <h3 className="h2 tl-title text-[clamp(1.15rem,2.4vw,1.75rem)] lg:col-span-5">
                  {item.title}
                </h3>

                <p className="tl-desc max-w-lg text-[0.95rem] leading-[1.6] lg:col-span-4">
                  {item.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
