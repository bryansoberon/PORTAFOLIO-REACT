import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Timeline from "./components/Timeline.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Cursor from "./components/Cursor.jsx";

import { useSmoothScroll } from "./lib/useSmoothScroll.js";

import { translations, ui, sections, links } from "./data/content.js";

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("portfolio-lang") || "en");
  const [activeId, setActiveId] = useState("index");

  const t = translations[lang];
  const u = ui[lang];

  useEffect(() => {
    localStorage.setItem("portfolio-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  /* ScrollSpy para el índice. */
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
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
      />

      <main>
        <Hero u={u} onNav={scrollTo} />
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
        <Contact t={t} u={u} />
      </main>

      <Footer t={t} u={u} onNav={scrollTo} />
    </div>
  );
}
