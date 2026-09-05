import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Certifications from "./components/Certifications";
import Stack from "./components/Stack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";

import { useSmoothScroll } from "./lib/useSmoothScroll";
import { useTheme } from "./lib/useTheme";

import { translations, ui, sections, links } from "./data/content";
import type { Lang, SectionId } from "./types";

export default function App() {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("portfolio-lang") as Lang | null) ?? "en"
  );
  const [activeId, setActiveId] = useState<SectionId>("index");
  const [theme, toggleTheme] = useTheme();

  const t = translations[lang];
  const u = ui[lang];

  useEffect(() => {
    localStorage.setItem("portfolio-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  /* ScrollSpy para el índice. */
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id as SectionId);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = useSmoothScroll();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--fg)]">
      <Cursor />

      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[var(--accent)]"
        style={{ scaleX: progress }}
      />

      <Nav
        activeId={activeId}
        onNav={scrollTo}
        u={u}
        lang={lang}
        onLang={() => setLang((l) => (l === "en" ? "es" : "en"))}
        links={links}
        theme={theme}
        onTheme={toggleTheme}
      />

      <main>
        <Hero t={t} u={u} onNav={scrollTo} theme={theme} onTheme={toggleTheme} />
        <About t={t} u={u} />
        <Projects t={t} u={u} />

        <Timeline
          id="experience"
          label={u.sectionNames.experience}
          title={`${t.experience.headingPrefix} ${t.experience.headingAccent}`}
          items={t.experience.items}
          tone="ink"
        />

        <Timeline
          id="education"
          label={u.sectionNames.education}
          title={`${t.education.headingPrefix} ${t.education.headingAccent}`}
          items={t.education.items}
        />

        <Certifications t={t} u={u} />
        <Stack t={t} u={u} />
        <Contact t={t} u={u} />
      </main>

      <Footer t={t} u={u} onNav={scrollTo} />
    </div>
  );
}
