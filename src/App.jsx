import React, { useEffect, useState, useRef } from "react";
import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence, useInView, useScroll, useSpring, useTransform } from "framer-motion";

import {
  SiVuedotjs, SiAngular, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiBootstrap, SiDjango, SiNextdotjs, SiLaravel, SiPhp,
  SiSpringboot, SiCplusplus, SiMysql, SiPostgresql, SiMongodb,
  SiSqlite, SiGit, SiGithub, SiDocker, SiInsomnia
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Menu,
  X,
  Download,
  Send,
  Mail,
  Phone,
  MapPin,
  Code2,
  Database,
  RefreshCw,
} from "lucide-react";

const navItems = [
  { id: "home",         label: "Home"        },
  { id: "projects",     label: "Projects"    },
  { id: "education",    label: "Education"   },
  { id: "services",     label: "Services"    },
  { id: "stack",        label: "Stack"       },
  { id: "contact",      label: "Contact"     },
];

/* ── Helpers de estilo (usan CSS vars) ─────────────── */
const S = {
  card:      { border: "1px solid var(--border)",    backgroundColor: "var(--bg-card)" },
  pill:      { border: "1px solid var(--border-md)", backgroundColor: "var(--bg-pill)" },
  input:     { border: "1px solid var(--border)",    backgroundColor: "var(--bg-input)" },
  divider:   { backgroundColor: "var(--divider)" },
  activeBg:  { backgroundColor: "var(--bg-active)", boxShadow: "inset 0 0 0 1px var(--border-in)" },
};

/* ── Animation variants ─────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideFromLeft = {
  hidden:  { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const slideFromRight = {
  hidden:  { opacity: 0, x: 56 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const staggerPills = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};

const blurUp = {
  hidden:  { opacity: 0, y: 38, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0,  filter: "blur(0px)",
             transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

const staggerPost = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.82 } },
};

/* ── Hook scroll reveal ─────────────────────────────── */
function useScrollReveal(margin = "-80px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return [ref, inView];
}

/* ── App ────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  const links = {
    linkedin:  "https://www.linkedin.com/in/bernabe-bryan-sober%C3%B3n-quintana-195437307/",
    github:    "https://github.com/bryansoberon",
    instagram: "https://www.instagram.com/bryansoberon/",
    twitter:   "https://x.com/bryandev333",
    cv:        `${import.meta.env.BASE_URL}Bernabe_Bryan_Soberon_Quintana_CV_PRACTICAS.pdf`,
  };

  // ── ScrollSpy ──
  useEffect(() => {
    const els = navItems.map((x) => document.getElementById(x.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.2, 0.4, 0.6, 0.8] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => { setMenuOpen(false); }, [activeId]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="min-h-screen selection:bg-cyan-400/30 selection:text-white"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activeId={activeId}
        onNav={scrollTo}
      />

      <main className="pt-14">
        <Home links={links} />
        <Projects />
        <Education />
        <Services />
        <Stack />
        <Contact links={links} />
      </main>

      <Footer links={links} onNav={scrollTo} />

      {/* Radial bg */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{ background: "var(--radial-bg)" }}
      />
    </div>
  );
}

/* ── HEADER ─────────────────────────────────────────── */
function Header({ menuOpen, setMenuOpen, activeId, onNav }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{ scaleX, backgroundColor: "var(--accent)" }}
      />

      {/* Bar */}
      <div
        className="backdrop-blur-md"
        style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg-navbar)" }}
      >
        <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => onNav("home")} className="flex items-center gap-3 text-left shrink-0" aria-label="Go to home">
            <div className="h-7 w-7 overflow-hidden rounded-lg shrink-0" style={{ border: "1px solid var(--border-st)" }}>
              <img src="/favicon.png" alt="BryanDev" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                Bryan <span style={{ color: "var(--accent)" }}>Soberón</span>
              </span>
              <span className="hidden text-[9px] tracking-[0.22em] uppercase sm:block mt-0.5" style={{ color: "var(--text-4)" }}>
                Full-Stack Dev
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className="relative text-sm transition-colors duration-150"
                style={{ color: activeId === item.id ? "var(--text)" : "var(--text-3)" }}
                onMouseEnter={(e) => { if (activeId !== item.id) e.currentTarget.style.color = "var(--text-2)"; }}
                onMouseLeave={(e) => { if (activeId !== item.id) e.currentTarget.style.color = "var(--text-3)"; }}
              >
                {item.label}
                {activeId === item.id && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-[18px] left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:flex items-center gap-1.5 text-xs" style={{ color: "var(--text-4)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
              Available
            </span>

            <motion.button
              className="inline-flex items-center justify-center rounded-lg h-8 w-8 md:hidden"
              style={{ border: "1px solid var(--border)", color: "var(--text-3)" }}
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {menuOpen ? <X size={15} /> : <Menu size={15} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="backdrop-blur-md md:hidden"
            style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg-navbar)" }}
          >
            <div className="mx-auto max-w-6xl px-6 py-2 flex flex-col">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.15 }}
                  onClick={() => onNav(item.id)}
                  className="flex items-center justify-between py-3 text-sm text-left w-full"
                  style={{
                    color: activeId === item.id ? "var(--accent)" : "var(--text-3)",
                    borderBottom: i < navItems.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  {item.label}
                  {activeId === item.id && (
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--accent)" }} />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ── COMPONENTE TERMINAL AVANZADA (SUPERIOR AL EJEMPLO) ── */
function TerminalConsole() {
  const [typedText, setTypedText] = useState("");

  // 1. Definimos la secuencia de comandos y outputs
  const terminalSession = [
    { type: 'prompt', text: 'user@bryandev:~$ ' },
    { type: 'command', text: 'pnpm install skills --global' },
    { type: 'output', text: '\n⠋ fetching packages...\n⠙ resoluting dependencies...\n✔ installed 150 packages in 2.1s\n\n' },
    { type: 'prompt', text: 'user@bryandev:~$ ' },
    { type: 'command', text: 'cat profile.json' },
    { type: 'jsonOutput', text: `\n{
  "role": "Full-Stack Engineer",
  "stack": ["Angular", "Vue", "Next.js", "Django"],
  "status": "Available",
  "location": "Chiclayo, PE"
}` }
  ];

  // 2. Lógica de animación compleja
  useEffect(() => {
    let currentPart = 0;
    let currentChar = 0;
    let currentTyped = "";

    const typeAnimation = () => {
      if (currentPart >= terminalSession.length) return; // Fin de la sesión

      const part = terminalSession[currentPart];

      // Si es prompt o output, los mostramos de golpe y pasamos al siguiente
      if (part.type === 'prompt' || part.type === 'output' || part.type === 'jsonOutput') {
        setTypedText(prev => prev + part.text);
        currentPart++;
        currentChar = 0;
        // Pequeña pausa antes del siguiente comando para que sea natural
        setTimeout(typeAnimation, part.type === 'prompt' ? 100 : 500); 
      } 
      // Si es un comando, lo animamos letra por letra
      else if (part.type === 'command') {
        if (currentChar < part.text.length) {
          setTypedText(prev => prev + part.text.charAt(currentChar));
          currentChar++;
          setTimeout(typeAnimation, 50); // Velocidad de escritura
        } else {
          // Comando terminado, pasamos a la siguiente parte
          currentPart++;
          currentChar = 0;
          setTimeout(typeAnimation, 200); // Pausa antes del output
        }
      }
    };

    // Iniciamos la animación con un pequeño delay
    const startTimeout = setTimeout(typeAnimation, 1000);

    // Cleanup
    return () => clearTimeout(startTimeout);
  }, []);

  // 3. Helper para renderizar texto con colores de terminal/sintaxis
  const renderTerminalText = (text) => {
    // Expresión regular para JSON simple (llaves, claves, strings, booleanos)
    const jsonRegex = /(\{|\[|\}|\]|:|",?)|("(?:[^"\\]|\\.)*")|(\b(?:true|false|null)\b)|(\b\d+\b)/g;
    
    // Primero, dividimos el texto basado en los prompts para colorearlos
    const parts = text.split(/(user@bryandev:~\$ )/g);

    return parts.map((part, index) => {
      // Si es el prompt, verde brillante
      if (part === 'user@bryandev:~$ ') {
        return <span key={index} className="text-emerald-400 font-bold">{part}</span>;
      }
      
      // Si el texto parece JSON, aplicamos coloreado sintáctico
      if (part.includes('{') && part.includes('}')) {
        // Un tokenizado muy básico para el JSON
        const jsonParts = part.split(jsonRegex).filter(Boolean);
        return <span key={index} className="text-slate-300">
          {jsonParts.map((token, j) => {
            if (token.startsWith('"') && token.endsWith('"') && !jsonParts[j+1]?.includes(':')) {
               return <span key={j} className="text-cyan-300">{token}</span>; // Valores string: Cyan
            }
            if (token.startsWith('"') && token.endsWith('"') && jsonParts[j+1]?.includes(':')) {
               return <span key={j} className="text-slate-200">{token}</span>; // Claves: Blanco mate
            }
            if (token === ':' || token === ',' || token === '{' || token === '}' || token === '[' || token === ']') {
              return <span key={j} className="text-slate-500">{token}</span>; // Puntuación: Gris
            }
            if (token === 'true' || token === 'false') {
              return <span key={j} className="text-yellow-400">{token}</span>; // Booleanos: Amarillo
            }
            return token;
          })}
        </span>;
      }

      // Por defecto, texto de terminal normal
      return <span key={index} className="text-slate-300">{part}</span>;
    });
  };

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/5 bg-[#0d1117]/90 p-0 font-mono text-[13px] shadow-2xl backdrop-blur-md">
      {/* Barra superior estilo MacOS/VSCode */}
      <div className="flex items-center gap-2 bg-white/5 px-5 py-3.5 border-b border-white/5">
        <div className="flex gap-2">
          <div className="h-3.5 w-3.5 rounded-full bg-red-500/80" />
          <div className="h-3.5 w-3.5 rounded-full bg-yellow-500/80" />
          <div className="h-3.5 w-3.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[11px] text-slate-500 uppercase tracking-widest ml-3 font-semibold">bryan-portfolio ~ zsh</span>
      </div>
      
      {/* Contenido de la Terminal */}
      <div className="p-7 min-h-[280px] leading-relaxed">
        <pre className="whitespace-pre-wrap text-slate-300">
          {renderTerminalText(typedText)}
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }} 
            className="inline-block w-2.5 h-4.5 bg-cyan-400 ml-1.5 align-middle" 
          />
        </pre>
      </div>
    </div>
  );
}

/* ── HOME ────────────────────────────────────────────── */
function Home({ links }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY    = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imageY   = useTransform(scrollYProgress, [0, 1], [0, 55]);

  // Each icon has a unique Y + X drift → visible depth effect on scroll
  const icon1Y   = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const icon1X   = useTransform(scrollYProgress, [0, 1], [0,  -35]);
  const icon2Y   = useTransform(scrollYProgress, [0, 1], [0, -270]);
  const icon2X   = useTransform(scrollYProgress, [0, 1], [0,   48]);
  const icon3Y   = useTransform(scrollYProgress, [0, 1], [0, -145]);
  const icon3X   = useTransform(scrollYProgress, [0, 1], [0,  -55]);
  const icon4Y   = useTransform(scrollYProgress, [0, 1], [0, -230]);
  const icon4X   = useTransform(scrollYProgress, [0, 1], [0,   40]);

  const socialLinks = [
    { href: links.linkedin,  label: "LinkedIn",  icon: <Linkedin  size={17} /> },
    { href: links.github,    label: "GitHub",    icon: <Github    size={17} /> },
    { href: links.instagram, label: "Instagram", icon: <Instagram size={17} /> },
    { href: links.twitter,   label: "Twitter",   icon: <Twitter   size={17} /> },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden"
      style={{ minHeight: "calc(100dvh - 56px)" }}
    >

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]" style={{ minHeight: "calc(100dvh - 56px)" }}>

        {/* LEFT – Content with parallax */}
        <div className="relative z-10 flex flex-col justify-start lg:justify-center
                        px-6 sm:px-10 lg:px-14 xl:px-20
                        pt-10 pb-14 lg:py-0 min-w-0">
          <motion.div style={{ y: textY }} className="flex flex-col">

            {/* Pre-heading group */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col">
              <motion.div variants={blurUp}>
                <BadgeRow />
              </motion.div>
              <motion.p
                variants={blurUp}
                className="mt-8 text-xs font-semibold tracking-[0.28em] uppercase"
                style={{ color: "var(--text-4)" }}
              >
                Hi, I'm
              </motion.p>
            </motion.div>

            {/* Heading – letter by letter */}
            <h1
              className="mt-1 font-extrabold tracking-tight leading-[1.02]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", perspective: "600px" }}
            >
              <LetterReveal word="Bryan" color="var(--text)"   delay={0.42} />
              <LetterReveal word="Soberón" color="var(--accent)" delay={0.64} glow />
            </h1>

            {/* Post-heading group */}
            <motion.div variants={staggerPost} initial="hidden" animate="visible" className="flex flex-col">

              <motion.div variants={blurUp} className="mt-3 overflow-hidden min-w-0">
                <span className="typing text-base sm:text-lg font-medium" style={{ color: "var(--text-3)" }}>
                  Bachelor's degree in Systems Engineering
                </span>
              </motion.div>

              <motion.p
                variants={blurUp}
                className="mt-5 max-w-[420px] text-sm leading-relaxed sm:text-[0.95rem]"
                style={{ color: "var(--text-4)" }}
              >
                Web development (Front/Back), data analysis and project management with an agile approach.
              </motion.p>


            {/* Heading Secundario – Estilizado */}
            <h2
              className="mt-6 flex items-center gap-1 sm:gap-3 font-extrabold tracking-tight leading-[1.1] uppercase whitespace-nowrap"
              style={{ fontSize: "clamp(0.68rem, 3.6vw, 2.2rem)", perspective: "600px" }}
            >
              <motion.span
                className="text-xs sm:text-2xl flex-shrink-0"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
              >🕷️ ☕️</motion.span>
              <LetterReveal word="SOPHISTICATED" color="var(--accent)" delay={0.8} glow />
              <LetterReveal word="ENVIRONMENT" color="var(--accent)" delay={1.0} glow />
              <motion.span
                className="text-xs sm:text-2xl flex-shrink-0"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
              >🍃</motion.span>
            </h2>

              {/* CTAs */}
              <motion.div variants={blurUp} className="mt-7 flex flex-wrap items-center gap-3">
                <motion.a
                  className="glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-black"
                  style={{ backgroundColor: "var(--accent)" }}
                  href={links.cv}
                  download="CV_Bryan_Soberon.pdf"
                  whileHover={{ scale: 1.06, boxShadow: "0 0 32px rgba(34,211,238,0.6)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Download size={16} />
                  Download CV
                </motion.a>
                <motion.a
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
                  style={{ ...S.pill, color: "var(--text)" }}
                  href="#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Send size={16} />
                  Contact
                </motion.a>
              </motion.div>

              {/* Mobile social row */}
              <motion.div variants={blurUp} className="mt-6 flex items-center gap-3 lg:hidden">
                {socialLinks.map(({ href, label, icon }) => (
                  <SocialIcon key={label} href={href} label={label} icon={icon} />
                ))}
              </motion.div>

              {/* Stats */}
              <motion.div variants={blurUp} className="mt-9 flex items-center gap-5">
                {[
                  { n: "10+", label: "Projects" },
                  { n: "4+",  label: "Stacks"   },
                ].map(({ n, label }, i) => (
                  <React.Fragment key={label}>
                    {i > 0 && <div className="h-9 w-px rounded-full" style={{ backgroundColor: "var(--border-md)" }} />}
                    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.18 }}>
                      <div className="text-2xl font-extrabold leading-none" style={{ color: "var(--accent)" }}>{n}</div>
                      <div className="mt-0.5 text-[11px] font-medium" style={{ color: "var(--text-4)" }}>{label}</div>
                    </motion.div>
                  </React.Fragment>
                ))}
              </motion.div>

              {/* Terminal – mobile only */}
              <motion.div variants={blurUp} className="mt-8 w-full lg:hidden">
                <TerminalConsole />
              </motion.div>

            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT – Desktop photo + floating icons */}
        <div className="hidden lg:flex relative items-center justify-center">
          
          {/* LA TERMINAL (Reemplaza a la imagen) */}
          <motion.div 
            className="z-10"
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <TerminalConsole />
          </motion.div>

        {/* ── Floating social icons around head ── */}
          {/* LinkedIn – upper left */}
          <motion.div
            className="absolute z-20"
            style={{ top: "12%", left: "10%", y: icon1Y, x: icon1X }}
            initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href={links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md"
              style={{ border: "1px solid var(--border-st)", backgroundColor: "var(--bg-pill)", color: "var(--text-2)" }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              whileHover={{ scale: 1.3, boxShadow: "0 0 26px rgba(34,211,238,0.55)", color: "var(--accent)", borderColor: "var(--accent)" }}
              whileTap={{ scale: 0.88 }}
            >
              <Linkedin size={18} />
            </motion.a>
          </motion.div>

          {/* GitHub – upper right */}
          <motion.div
            className="absolute z-20"
            style={{ top: "8%", right: "12%", y: icon2Y, x: icon2X }}
            initial={{ opacity: 0, scale: 0.3, rotate: 20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href={links.github} aria-label="GitHub" target="_blank" rel="noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md"
              style={{ border: "1px solid var(--border-st)", backgroundColor: "var(--bg-pill)", color: "var(--text-2)" }}
              animate={{ y: [0, -13, 0] }}
              transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              whileHover={{ scale: 1.3, boxShadow: "0 0 26px rgba(34,211,238,0.55)", color: "var(--accent)", borderColor: "var(--accent)" }}
              whileTap={{ scale: 0.88 }}
            >
              <Github size={18} />
            </motion.a>
          </motion.div>

          {/* Instagram – left side */}
          <motion.div
            className="absolute z-20"
            style={{ top: "38%", left: "5%", y: icon3Y, x: icon3X }}
            initial={{ opacity: 0, scale: 0.3, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href={links.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md"
              style={{ border: "1px solid var(--border-st)", backgroundColor: "var(--bg-pill)", color: "var(--text-2)" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
              whileHover={{ scale: 1.3, boxShadow: "0 0 26px rgba(34,211,238,0.55)", color: "var(--accent)", borderColor: "var(--accent)" }}
              whileTap={{ scale: 0.88 }}
            >
              <Instagram size={18} />
            </motion.a>
          </motion.div>

          {/* Twitter – right side */}
          <motion.div
            className="absolute z-20"
            style={{ top: "34%", right: "8%", y: icon4Y, x: icon4X }}
            initial={{ opacity: 0, scale: 0.3, rotate: 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href={links.twitter} aria-label="Twitter" target="_blank" rel="noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md"
              style={{ border: "1px solid var(--border-st)", backgroundColor: "var(--bg-pill)", color: "var(--text-2)" }}
              animate={{ y: [0, -11, 0] }}
              transition={{ duration: 3.7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              whileHover={{ scale: 1.3, boxShadow: "0 0 26px rgba(34,211,238,0.55)", color: "var(--accent)", borderColor: "var(--accent)" }}
              whileTap={{ scale: 0.88 }}
            >
              <Twitter size={18} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── LETTER REVEAL ───────────────────────────────────── */
function LetterReveal({ word, color, delay = 0, stagger = 0.048, glow = false }) {
  return (
    <span
      className={`block${glow ? " text-glow" : ""}`}
      style={{ color, display: "block", overflow: "hidden" }}
    >
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          initial={{ opacity: 0, y: "0.75em", rotateX: -90, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: "0em",    rotateX: 0,    filter: "blur(0px)" }}
          transition={{
            duration: 0.52,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * stagger,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function BadgeRow() {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl px-3 py-2 text-xs" style={{ ...S.pill, color: "var(--text-2)" }}>
      {["Angular",  "Vue",  "Next.js", "Django", "Scrum"].map((tag) => (
        <span key={tag} className="rounded-full px-2 py-1" style={{ backgroundColor: "var(--bg-active)" }}>{tag}</span>
      ))}
    </div>
  );
}

function SocialIcon({ href, label, icon }) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full"
      style={{ border: "1px solid var(--border-md)", backgroundColor: "var(--bg-pill)", color: "var(--text-3)" }}
      whileHover={{ scale: 1.18, color: "var(--accent)", borderColor: "var(--accent)", backgroundColor: "var(--bg-active)" }}
      whileTap={{ scale: 0.92 }}
    >
      {icon}
    </motion.a>
  );
}

/* ── PROJECTS ────────────────────────────────────────── */
function Projects() {
  const projects = [
    {
      title: "Mailof Peluches - E-commerce",
      tags: ["Next.js", "React", "Vue 3", "Prisma", "PostgreSQL", "Vercel", "neon"],
      desc: "Hybrid Full-Stack ecosystem. High-performance store in Next.js with a separate Admin Panel in Vue 3 for dynamic inventory management.",
      link: "https://mailofcix.shop/catalogo",
      type: "Full-Stack Project"
    },
    {
      title: "ERP Logístico - Fleet & Dashboards",
      tags: ["Laravel 12", "Livewire Volt", "DDD", "MySQL", "PHP 8.2"],
      desc: "Development of the core fleet and driver management under DDD architecture. Creation of reactive dashboards for real-time operational control.",
      link: "https://github.com/bryansoberon",
      type: "Backend & Architecture"
    }
  ];

  const [ref, inView] = useScrollReveal();

  return (
    <section id="projects" className="py-16" style={{ backgroundColor: "var(--bg-sec)" }}>
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12"
        >
          <h2 className="text-center text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
            Featured <span className="text-glow" style={{ color: "var(--accent)" }}>Projects</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} {...p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}



function ProjectCard({ title, tags, desc, link, type, delay }) {
  const [ref, inView] = useScrollReveal("-50px");

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl p-1"
      style={{ backgroundColor: "var(--border-md)" }}
    >
      <div className="h-full w-full rounded-[22px] p-6 lg:p-8" style={{ backgroundColor: "var(--bg-card)" }}>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--accent)" }}>{type}</span>
        <h3 className="mt-2 text-2xl font-bold" style={{ color: "var(--text)" }}>{title}</h3>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="rounded-full px-3 py-1 text-[11px] font-medium" style={S.pill}>{t}</span>
          ))}
        </div>

        <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>{desc}</p>
        
        <div className="mt-8 flex items-center justify-between">
          <a 
            href={link} 
            target="_blank" 
            className="flex items-center gap-2 text-sm font-bold transition-all hover:gap-3" 
            style={{ color: "var(--accent)" }}
          >
            View Live Project <Send size={14} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}





/* ── EDUCATION ───────────────────────────────────────── */
function Education() {
  const items = [
    { year: "2017 – 2019", title: "High School", desc: "IEP Sagrado Divino Maestro - Secondary 3rd to 5th grade" },
    { year: "2021 – 2025", title: "University", desc: "Universidad Señor de Sipán - Systems Engineering. Focus on software development, architecture, analytics and project management." },
    { year: "2025 – Sep to Dec", title: "Pre-professional Internship", desc: "Implementation of web solutions, automation and business process improvements at Carlos Gabriel Transportes S.A.C." },
  ];

  const [titleRef, titleInView] = useScrollReveal("-60px");

  return (
    <section id="education" className="py-16" style={{ backgroundColor: "var(--bg-sec)" }}>
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2
          ref={titleRef}
          variants={fadeUp}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          className="text-center text-4xl font-extrabold sm:text-5xl"
          style={{ color: "var(--text)" }}
        >
          Education <span className="ml-1 text-glow" style={{ color: "var(--accent)" }}>Timeline</span>
        </motion.h2>

        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="absolute left-5 top-0 h-full w-[2px] sm:left-1/2 sm:-ml-[1px]" style={S.divider} />
          <div>
            {items.map((it, idx) => (
              <TimelineItem
                key={it.year}
                item={it}
                side={idx % 2 === 0 ? "left" : "right"}
                mt={idx === 0 ? "" : "mt-12"}

              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, side, mt = "" }) {
  const [ref, inView] = useScrollReveal("-40px");
  const isLeft = side === "left";

  return (
    <motion.div
      ref={ref}
      variants={isLeft ? slideFromLeft : slideFromRight}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`relative flex items-start gap-4 sm:gap-0 ${mt}`}
    >
      <div
        className="relative z-10 mt-1 flex h-10 w-10 items-center justify-center rounded-full sm:absolute sm:left-1/2 sm:-ml-5"
        style={{ border: "1px solid var(--border-md)", backgroundColor: "var(--bg)" }}
      >
        <motion.div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: "var(--accent)", boxShadow: "0 0 18px var(--glow-avatar)" }}
          animate={inView ? { scale: [1, 1.5, 1] } : {}}
          transition={{ delay: 0.45, duration: 0.45 }}
        />
      </div>
      <div
        className={`w-full rounded-3xl p-6 backdrop-blur-xl sm:w-[46%] ${isLeft ? "sm:pr-8" : "sm:ml-auto sm:pl-8"}`}
        style={S.card}
      >
        <div className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{item.year}</div>
        <div className="mt-1 text-xl font-bold" style={{ color: "var(--text)" }}>{item.title}</div>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>{item.desc}</p>
      </div>
    </motion.div>
  );
}

/* ── SERVICES ────────────────────────────────────────── */
function Services() {
  const services = [
    { title: "Web Designer",       desc: "Responsive and consistent interface design. Priority on readability, visual hierarchy and UX." },
    { title: "Frontend Developer", desc: "Vue + reusable component architecture, scalable state management and Web Vitals optimization." },
    { title: "Backend Developer",  desc: "Clean and secure APIs. Integrations, validation, error handling, and well-modeled databases." },
    { title: "Testing",            desc: "Testing and verification: critical cases, regression, and basic automation to reduce production failures." },
  ];

  const [ref, inView] = useScrollReveal();

  return (
    <section id="services" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-center text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>Services</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm sm:text-base" style={{ color: "var(--text-3)" }}>
            What I can build for you: interface, logic and delivery with a professional approach.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-10 grid gap-5 sm:grid-cols-2"
        >
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ title, desc }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="rounded-3xl p-7"
      style={S.pill}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill)"; }}
    >
      <div
        className="inline-flex items-center rounded-2xl px-3 py-2 text-xs font-semibold"
        style={{ border: "1px solid var(--border-md)", backgroundColor: "var(--bg-card)", color: "var(--accent)" }}
      >
        {title}
      </div>
      <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{desc}</p>
      <div className="mt-6 h-[1px] w-full" style={S.divider} />
      <div className="mt-4 text-xs" style={{ color: "var(--text-4)" }}>
        Deliverables: UI • Components • API • Deploy
      </div>
    </motion.div>
  );
}

/* ── STACK ───────────────────────────────────────────── */
/* ── STACK ───────────────────────────────────────────── */
const techIcons = {
  "Vue.js":       { Icon: SiVuedotjs,    color: "#4FC08D" },
  "Angular":      { Icon: SiAngular,     color: "#DD0031" },
  "TypeScript":   { Icon: SiTypescript,  color: "#3178C6" },
  "JavaScript":   { Icon: SiJavascript,  color: "#F7DF1E" },
  "HTML":         { Icon: SiHtml5,       color: "#E34F26" },
  "CSS":          { Icon: SiCss,         color: "#1572B6" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Bootstrap":    { Icon: SiBootstrap,    color: "#7952B3" },
  "Django":       { Icon: SiDjango,      color: "#0C4B33" },
  "Next.js":      { Icon: SiNextdotjs,   color: "var(--text)" },
  "Laravel":      { Icon: SiLaravel,     color: "#FF2D20" },
  "Spring Boot":  { Icon: SiSpringboot,  color: "#6DB33F" },
  "PHP":          { Icon: SiPhp,         color: "#777BB4" },
  "Java":         { Icon: FaJava,        color: "#007396" },
  "C++":          { Icon: SiCplusplus,   color: "#00599C" },
  "MySQL":        { Icon: SiMysql,       color: "#4479A1" },
  "PostgreSQL":   { Icon: SiPostgresql,  color: "#4169E1" },
  "PgAdmin":      { Icon: Database,      color: "#336791" }, 
  "MongoDB":      { Icon: SiMongodb,     color: "#47A248" },
  "SQL Server":   { Icon: Database,      color: "#CC2927" }, 
  "SQLite":       { Icon: SiSqlite,      color: "#44AADD" },
  "Git":          { Icon: SiGit,         color: "#F05032" },
  "GitHub":       { Icon: SiGithub,      color: "var(--text)" },
  "VS Code":      { Icon: Code2,         color: "#007ACC" },
  "Docker":       { Icon: SiDocker,      color: "#2496ED" },
  "Insomnia":     { Icon: SiInsomnia,    color: "#4000BF" },
  "Scrum":        { Icon: RefreshCw,     color: "var(--accent)" },
};

const stackCategories = [
  { title: "Frontend",  techs: ["Vue.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap"] },
  { title: "Backend",   techs: ["Django", "Next.js", "Laravel", "Spring Boot"] },
  { title: "Databases", techs: ["PostgreSQL", "MySQL", "PgAdmin", "MongoDB", "SQL Server", "SQLite"] },
  { title: "Tools",     techs: ["Git", "GitHub", "VS Code", "Docker", "Insomnia", "Scrum"] },
];

function Stack() {
  const [headerRef, headerInView] = useScrollReveal();

  return (
    <section id="stack" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-3"
        >
          <motion.span
            variants={fadeUp}
            className="rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{ border: "1px solid var(--border-md)", backgroundColor: "var(--bg-pill)", color: "var(--accent)" }}
          >
            Stack
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-center text-4xl font-extrabold sm:text-5xl"
            style={{ color: "var(--text)" }}
          >
            Technologies I Use
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-center text-sm sm:text-base"
            style={{ color: "var(--text-3)" }}
          >
            Tools and technologies I use to develop modern, scalable and well-structured web applications.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {stackCategories.map((cat, i) => (
            <StackCard key={cat.title} cat={cat} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({ cat, delay }) {
  const [ref, inView] = useScrollReveal("-40px");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.93, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="rounded-3xl p-7"
      style={S.card}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="h-5 w-[3px] rounded-full" style={{ backgroundColor: "var(--accent)" }} />
        <h3 className="text-base font-bold" style={{ color: "var(--text)" }}>{cat.title}</h3>
      </div>

      <motion.div
        className="flex flex-wrap gap-3"
        variants={staggerPills}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {cat.techs.map((tech) => {
          const entry = techIcons[tech];
          const IconComp = entry?.Icon;
          const iconColor = entry?.color ?? "var(--accent)";
          return (
            <motion.div
              key={tech}
              variants={fadeIn}
              whileHover={{ scale: 1.15, y: -3, transition: { duration: 0.14 } }}
              className="flex flex-col items-center gap-1.5 cursor-default"
              title={tech}
            >
              <div
                className="flex items-center justify-center rounded-2xl p-3"
                style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-pill)" }}
              >
                {IconComp && <IconComp size={28} style={{ color: iconColor }} />}
              </div>
              <span className="text-[10px] font-medium text-center leading-tight" style={{ color: "var(--text-3)" }}>
                {tech}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

/* ── CONTACT ─────────────────────────────────────────── */
function Contact({ links }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const FORMSPREE = import.meta.env.VITE_FORMSPREE_URL;
  const [status,   setStatus]   = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [ref, inView] = useScrollReveal();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error"); setErrorMsg("Please fill in: name, email, and message."); return;
    }
    if (!emailRegex.test(form.email)) {
      setStatus("error"); setErrorMsg("Enter a valid email address."); return;
    }

    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _source: "portfolio-react" }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Could not send. Please try again in 1 minute.");
    }
  }

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2
          ref={ref}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center text-4xl font-extrabold sm:text-5xl"
          style={{ color: "var(--text)" }}
        >
          Contact Me <span style={{ color: "var(--accent)" }}>Now</span>
        </motion.h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Left – Spline + contact info */}
          <motion.div
            initial={{ opacity: 0, x: -44 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="flex flex-col gap-4"
          >
            

            {/* Contact info */}
            <div
              className="rounded-3xl p-6"
              style={S.card}
            >
              <div className="text-base font-bold" style={{ color: "var(--text)" }}>Bryan Soberón</div>
              <div className="text-sm mb-4" style={{ color: "var(--accent)" }}>Systems Engineer • Full‑Stack</div>
              <div className="space-y-3 text-sm" style={{ color: "var(--text-3)" }}>
                <InfoRow icon={<Mail  size={15} />} text="bryansoberonq@gmail.com" />
                <InfoRow icon={<Phone size={15} />} text="+51 933 698 031" />
                <InfoRow icon={<MapPin size={15} />} text="Perú" />
              </div>
            </div>
            {/* Spline */}
            <div
              className="relative overflow-hidden rounded-3xl h-[320px] sm:h-[380px]"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}
            >
              <div
                className="pointer-events-none absolute z-0"
                style={{
                  inset: "-40px -20px -20px -20px", // expande el área visible hacia arriba
                  transform: "translateY(-30px) scale(1.08)", // sube el muñeco y lo agranda ligeramente
                  transformOrigin: "center top",
                }}
              >
                <Spline scene="https://prod.spline.design/Pbg4uemZbXh3i3ec/scene.splinecode" />
              </div>
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
                style={{ height: "90px", background: "var(--spline-mask)" }}
              />
              <a href={links.github}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full px-6 py-2.5 text-sm font-semibold text-black flex items-center gap-2 transition hover:scale-[1.03] whitespace-nowrap"
                style={{ background: "var(--github-btn)", boxShadow: "var(--github-glow)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.7.5.5 5.8.5 12.3c0 5.2 3.4 9.6 8.1 11.2.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8-.8 1.5-1.1.3-.9 1-1.5 1.8-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.7-1.6 8.1-6 8.1-11.2C23.5 5.8 18.3.5 12 .5z" />
                </svg>
                Go to my GitHub
              </a>
            </div>
          </motion.div>


          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 44 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
            className="rounded-3xl p-7"
            style={S.pill}
            onSubmit={handleSubmit}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full name"      name="name"    value={form.name}    onChange={onChange} />
              <Input label="Email address"  name="email"   type="email" value={form.email}   onChange={onChange} />
              <Input label="Phone"          name="phone"   type="tel"   value={form.phone}   onChange={onChange} />
              <Input label="Subject"        name="subject" value={form.subject} onChange={onChange} />
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>Message</label>
              <textarea
                id="message" name="message" value={form.message} onChange={onChange} rows={7}
                className="mt-2 w-full resize-none rounded-2xl px-4 py-3 text-sm outline-none ring-0"
                style={{ ...S.input, color: "var(--text)", caretColor: "var(--accent)" }}
                placeholder="Tell me what you need..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-black disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--accent)", boxShadow: "var(--glow-btn)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={18} />
              {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✅" : "Send"}
            </motion.button>

            <div aria-live="polite">
              {status === "error" && <p className="mt-3 text-sm text-red-400">{errorMsg}</p>}
              {status === "sent"  && <p className="mt-3 text-sm text-emerald-400">Your message was sent successfully ✅</p>}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Input({ label, name, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>{label}</label>
      <input
        id={name} name={name} {...props}
        className="mt-2 w-full rounded-2xl px-4 py-3 text-sm outline-none"
        style={{ ...S.input, color: "var(--text)", caretColor: "var(--accent)" }}
      />
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl"
        style={{ border: "1px solid var(--border-md)", backgroundColor: "var(--bg-pill)", color: "var(--accent)" }}
      >
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

/* ── FOOTER ──────────────────────────────────────────── */
function Footer({ links, onNav }) {
  return (
    <footer className="py-12" style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-sm" style={{ color: "var(--text-4)" }}>
            © {new Date().getFullYear()} Bryan. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {navItems.map((it) => (
              <button
                key={it.id}
                onClick={() => onNav(it.id)}
                className="rounded-full px-3 py-2 text-xs transition"
                style={{ color: "var(--text-3)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {it.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {[
              { href: links.linkedin, label: "LinkedIn", icon: <Linkedin size={18} /> },
              { href: links.github,   label: "GitHub",   icon: <Github   size={18} /> },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-105"
                style={{ ...S.pill, color: "var(--text-2)" }}
                href={href} aria-label={label} target="_blank" rel="noreferrer"
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill)"; }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
