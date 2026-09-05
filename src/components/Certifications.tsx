import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container, SectionHead, Reveal, Arrow } from "./primitives";
import { EASE } from "../lib/motion";
import { certificationsBase } from "../data/content";
import type { Translation, UiCopy } from "../types";

interface CertificationsProps {
  t: Translation;
  u: UiCopy;
}

/* Sección 05 — credenciales como acordeón numerado. */
export default function Certifications({ t, u }: CertificationsProps) {
  const items = certificationsBase.map((c, i) => ({ ...c, ...t.certifications.items[i] }));
  const [openIdx, setOpenIdx] = useState(0);
  const c = t.certifications;

  return (
    <section id="certifications" className="py-20 sm:py-28" style={{ backgroundColor: "var(--panel)" }}>
      <Container>
        <SectionHead
          label={u.sectionNames.certifications}
          title={`${c.headingPrefix} ${c.headingAccent}`}
          note={c.subtitle}
          count={items.length}
        />

        <div className="mt-10">
          {items.map((item, i) => {
            const open = openIdx === i;
            const href = `${import.meta.env.BASE_URL}${item.pdf}`;

            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="border-t border-[var(--rule)] last:border-b">
                  <button
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    aria-expanded={open}
                    className="group flex w-full items-start gap-4 py-6 text-left sm:gap-6"
                  >
                    <span className="meta pt-2">{String(i + 1).padStart(2, "0")}</span>

                    <span className="flex-1">
                      <span
                        className="h2 block text-[clamp(1.05rem,2.2vw,1.6rem)] transition-colors duration-300"
                        style={{ color: open ? "var(--accent)" : "var(--fg)" }}
                      >
                        {item.title}
                      </span>
                      <span className="meta mt-2 block">
                        {item.issuer} — {item.issued}
                        {item.expires ? ` · ${c.expLabel} ${item.expires}` : ""}
                      </span>
                    </span>

                    <span
                      className="mt-2 text-[var(--fg-3)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ transform: open ? "rotate(45deg)" : "none" }}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 16 16" className="h-4 w-4">
                        <path d="M8 2v12M2 8h12" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-8 sm:pl-[calc(1.5rem+1.5rem)] lg:grid-cols-12">
                          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-[var(--fg-2)] lg:col-span-7">
                            {item.desc}
                          </p>

                          <div className="lg:col-span-5">
                            <ul className="flex flex-wrap gap-1.5">
                              {item.skills.map((s) => (
                                <li key={s} className="tag">{s}</li>
                              ))}
                            </ul>

                            {item.credentialId && (
                              <p className="meta mt-4 break-all">ID · {item.credentialId}</p>
                            )}

                            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-2">
                              <a
                                href={href}
                                download={item.downloadName}
                                className="group inline-flex items-center gap-2 text-[0.9rem] text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                              >
                                <span className="link-u">{c.downloadPdf}</span>
                                <Arrow className="rotate-90" />
                              </a>

                              {item.verifyUrl && (
                                <a
                                  href={item.verifyUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group inline-flex items-center gap-2 text-[0.9rem] text-[var(--fg-2)] transition-colors hover:text-[var(--accent)]"
                                >
                                  <span className="link-u">{c.verify}</span>
                                  <Arrow />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
