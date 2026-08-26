import { Container, SectionHead, Reveal } from "./primitives.jsx";

/* Experiencia y educación — misma fila numerada. */
export default function Timeline({ id, label, title, items, tone = "paper" }) {
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
              <article
                className="grid gap-4 border-t py-9 lg:grid-cols-12 lg:gap-8"
                style={{ borderColor: onInk ? "var(--rule-ink)" : "var(--rule)" }}
              >
                <div className="flex items-start gap-4 lg:col-span-3">
                  <span className="meta" style={onInk ? { color: "var(--on-ink-2)" } : undefined}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="meta" style={onInk ? { color: "var(--on-ink-2)" } : undefined}>
                    {item.year}
                  </span>
                </div>

                <h3
                  className="h2 text-[clamp(1.15rem,2.4vw,1.75rem)] lg:col-span-5"
                  style={{ color: onInk ? "var(--on-ink)" : "var(--fg)" }}
                >
                  {item.title}
                </h3>

                <p
                  className="max-w-lg text-[0.95rem] leading-[1.6] lg:col-span-4"
                  style={{ color: onInk ? "var(--on-ink-2)" : "var(--fg-2)" }}
                >
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
