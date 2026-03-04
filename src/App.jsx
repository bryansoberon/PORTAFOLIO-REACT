import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
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
  Sun,
  Moon,
} from "lucide-react";

const navItems = [
  { id: "home",         label: "Inicio"      },
  { id: "education",    label: "Educacion"   },
  { id: "services",     label: "Servicios"   },
  { id: "stack",        label: "Stack"       },
  { id: "testimonials", label: "Testimonios" },
  { id: "contact",      label: "Contacto"    },
];

/* ── Helpers de estilo (usan CSS vars) ─────────────── */
const S = {
  card:      { border: "1px solid var(--border)",    backgroundColor: "var(--bg-card)" },
  pill:      { border: "1px solid var(--border-md)", backgroundColor: "var(--bg-pill)" },
  input:     { border: "1px solid var(--border)",    backgroundColor: "var(--bg-input)" },
  divider:   { backgroundColor: "var(--divider)" },
  activeBg:  { backgroundColor: "var(--bg-active)", boxShadow: "inset 0 0 0 1px var(--border-in)" },
};

/* ── App ────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  // ── Theme ──
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // ── Links ──
  const links = {
    linkedin:  "https://www.linkedin.com/in/bernabe-bryan-sober%C3%B3n-quintana-195437307/",
    github:    "https://github.com/bryansoberon",
    instagram: "https://www.instagram.com/bryansoberon/",
    twitter:   "https://x.com/BryanEseCu",
    cv:        `${import.meta.env.BASE_URL}cv_documentado.pdf`,
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
    <div className="min-h-screen selection:bg-amber-400/30 selection:text-white"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activeId={activeId}
        onNav={scrollTo}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="pt-14">
        <Home links={links} />
        <Education />
        <Services />
        <Stack />
        <Testimonials />
        <Contact />
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
function Header({ menuOpen, setMenuOpen, activeId, onNav, theme, toggleTheme }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className="mt-3 flex items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-xl"
          style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-navbar)" }}
        >
          {/* Logo */}
          <button onClick={() => onNav("home")} className="group flex items-baseline gap-2 text-left" aria-label="Ir al inicio">
            <span className="text-lg font-extrabold tracking-wide" style={{ color: "var(--text)" }}>
              PORTAFOLIO
              <span className="ml-2 text-glow" style={{ color: "var(--accent)" }}>BRYAN</span>
            </span>
            <span className="hidden text-xs sm:inline" style={{ color: "var(--text-4)" }}>
              Systems Engineer
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className="rounded-full px-4 py-2 text-sm font-medium transition"
                style={activeId === item.id ? S.activeBg : { backgroundColor: "transparent" }}
                onMouseEnter={(e) => { if (activeId !== item.id) e.currentTarget.style.backgroundColor = "var(--bg-pill)"; }}
                onMouseLeave={(e) => { if (activeId !== item.id) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <span style={activeId === item.id ? { color: "var(--accent)" } : { color: "var(--text-3)" }}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Right side: theme toggle + hamburger */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:scale-110"
              style={{ border: "1px solid var(--border-md)", backgroundColor: "var(--bg-pill)", color: "var(--accent)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill)"; }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile hamburger */}
            <button
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition md:hidden"
              style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-pill)", color: "var(--text-2)" }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
              <span>Menu</span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="mt-2 rounded-2xl p-2 backdrop-blur-xl md:hidden"
            style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-navbar)" }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition"
                style={{ backgroundColor: activeId === item.id ? "var(--bg-active)" : "transparent" }}
              >
                <span style={activeId === item.id ? { color: "var(--accent)" } : { color: "var(--text-3)" }}>
                  {item.label}
                </span>
                <span style={{ color: "var(--text-5)", fontSize: "0.7rem" }}>{item.id}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

/* ── HOME ────────────────────────────────────────────── */
function Home({ links }) {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative">
          <BadgeRow />

          <div className="mt-3 text-lg sm:text-xl flex items-baseline gap-2" style={{ color: "var(--text-2)" }}>
            <span style={{ color: "var(--text-3)" }}>Soy</span>
            <span className="typing" style={{ color: "var(--accent)" }} aria-label="Full-Stack Developer">
              Full-Stack Developer
            </span>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-3)" }}>
            Soy Bernabé Bryan Soberón Quintana. Me enfoco en desarrollo web (Front/Back),
            analítica de datos y gestión de proyectos tecnológicos con enfoque ágil.
            Me interesa construir soluciones escalables, limpias y medibles.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              className="glow inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
              style={{ backgroundColor: "var(--accent)" }}
              href={links.cv}
              download="CV_Bryan_Soberon.pdf"
            >
              <Download size={18} />
              Descargar CV
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition hover:scale-[1.01]"
              style={{ ...S.pill, color: "var(--text)" }}
              href="#contact"
            >
              <Send size={18} />
              Contactar
            </a>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <SocialIcon href={links.linkedin}  label="LinkedIn"  icon={<Linkedin  size={18} />} />
            <SocialIcon href={links.github}    label="GitHub"    icon={<Github    size={18} />} />
            <SocialIcon href={links.instagram} label="Instagram" icon={<Instagram size={18} />} />
            <SocialIcon href={links.twitter}   label="Twitter"   icon={<Twitter   size={18} />} />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
            <Stat label="Projects" value="10+" />
            <Stat label="Stack"    value="Django & NextJS • Angular & Vue" />
            <Stat label="Focus"    value="Web • Data Science • me" />
          </div>
        </div>

        <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Spline scene="https://prod.spline.design/Pbg4uemZbXh3i3ec/scene.splinecode" />
          </div>

          {/* Máscara Spline — usa var para coincidir con bg del tema */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
            style={{ height: "120px", background: "var(--spline-mask)" }}
          />

          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full px-7 py-3 text-sm font-semibold text-black flex items-center gap-2 transition hover:scale-[1.03]"
            style={{ background: "var(--github-btn)", boxShadow: "var(--github-glow)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.7.5.5 5.8.5 12.3c0 5.2 3.4 9.6 8.1 11.2.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8-.8 1.5-1.1.3-.9 1-1.5 1.8-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.7-1.6 8.1-6 8.1-11.2C23.5 5.8 18.3.5 12 .5z" />
            </svg>
            Ir a mi GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function BadgeRow() {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-full px-3 py-2 text-xs" style={{ ...S.pill, color: "var(--text-2)" }}>
      {["Vue", "Django", "Data", "Scrum"].map((tag) => (
        <span key={tag} className="rounded-full px-2 py-1" style={{ backgroundColor: "var(--bg-active)" }}>{tag}</span>
      ))}
    </div>
  );
}

function SocialIcon({ href, label, icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:scale-105"
      style={{ ...S.pill, color: "var(--text-2)" }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill)"; }}
    >
      {icon}
    </a>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl p-4" style={S.pill}>
      <div className="text-lg font-bold" style={{ color: "var(--accent)" }}>{value}</div>
      <div className="mt-1 text-xs" style={{ color: "var(--text-4)" }}>{label}</div>
    </div>
  );
}

/* ── EDUCATION ───────────────────────────────────────── */
function Education() {
  const items = [
    { year: "2017 – 2019", title: "Colegio",              desc: "Secundaria 3ero a 5to - IEP Sagrado Divino Maestro" },
    { year: "2021 – 2025", title: "Universidad",           desc: "Universidad Señor de Sipán - Ingeniería de Sistemas. Enfoque en desarrollo de software, arquitectura, analítica y gestión de proyectos." },
    { year: "2025 – Sep a Dic", title: "Prácticas preprofesionales", desc: "Implementación de soluciones web, automatización y mejoras en procesos de negocio en Carlos Gabriel Transportes S.A.C." },
  ];

  return (
    <section id="education" className="py-16" style={{ backgroundColor: "var(--bg-sec)" }}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
          Educación <span className="ml-1 text-glow" style={{ color: "var(--accent)" }}>Timeline</span>
        </h2>
        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="absolute left-5 top-0 h-full w-[2px] sm:left-1/2 sm:-ml-[1px]" style={S.divider} />
          <div className="space-y-7">
            {items.map((it, idx) => (
              <TimelineItem key={it.year} item={it} side={idx % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, side }) {
  const isLeft = side === "left";
  return (
    <div className="relative flex items-start gap-4 sm:gap-0">
      <div
        className="relative z-10 mt-1 flex h-10 w-10 items-center justify-center rounded-full sm:absolute sm:left-1/2 sm:-ml-5"
        style={{ border: "1px solid var(--border-md)", backgroundColor: "var(--bg)" }}
      >
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--accent)", boxShadow: "0 0 18px var(--glow-avatar)" }} />
      </div>
      <div
        className={`w-full rounded-3xl p-6 backdrop-blur-xl sm:w-[46%] ${isLeft ? "sm:pr-8" : "sm:ml-auto sm:pl-8"}`}
        style={S.card}
      >
        <div className="text-sm font-semibold" style={{ color: "var(--accent)" }}>{item.year}</div>
        <div className="mt-1 text-xl font-bold" style={{ color: "var(--text)" }}>{item.title}</div>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>{item.desc}</p>
      </div>
    </div>
  );
}

/* ── SERVICES ────────────────────────────────────────── */
function Services() {
  const services = [
    { title: "Web Designer",       desc: "Diseño de interfaces responsivas y consistentes. Prioridad en legibilidad, jerarquía visual y UX." },
    { title: "Frontend Developer", desc: "React + buenas prácticas: componentes reutilizables, estado claro, rendimiento y accesibilidad." },
    { title: "Backend Developer",  desc: "APIs limpias y seguras. Integraciones, validación, control de errores, y bases de datos bien modeladas." },
    { title: "Testing",            desc: "Pruebas y verificación: casos críticos, regresión, y automatización básica para reducir fallos en producción." },
  ];

  return (
    <section id="services" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>Servicios</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm sm:text-base" style={{ color: "var(--text-3)" }}>
          Lo que puedo construir para ti: interfaz, lógica y entrega con enfoque profesional.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, desc }) {
  return (
    <div
      className="rounded-3xl p-7 transition hover:-translate-y-1"
      style={S.pill}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-pill)"; }}
    >
      <div className="inline-flex items-center rounded-2xl px-3 py-2 text-xs font-semibold"
        style={{ border: "1px solid var(--border-md)", backgroundColor: "var(--bg-card)", color: "var(--accent)" }}>
        {title}
      </div>
      <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{desc}</p>
      <div className="mt-6 h-[1px] w-full" style={S.divider} />
      <div className="mt-4 text-xs" style={{ color: "var(--text-4)" }}>
        Entregables: UI • Componentes • API • Deploy
      </div>
    </div>
  );
}

/* ── STACK ───────────────────────────────────────────── */
const stackCategories = [
  {
    title: "Frontend",
    techs: [ "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Backend",
    techs: ["Django", "Next.js", "Laravel", "PHP", "Java", "C++"],
  },
  {
    title: "Base de datos",
    techs: ["MySQL", "PostgreSQL", "MongoDB", "SQL Server", "SQLite"],
  },
  {
    title: "Herramientas",
    techs: ["Git", "GitHub", "VS Code", "Docker", "Insomnia", "Scrum"],
  },
];

function Stack() {
  return (
    <section id="stack" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{ border: "1px solid var(--border-md)", backgroundColor: "var(--bg-pill)", color: "var(--accent)" }}
          >
            Stack
          </span>
          <h2 className="text-center text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
            Tecnologías que utilizo
          </h2>
          <p className="max-w-xl text-center text-sm sm:text-base" style={{ color: "var(--text-3)" }}>
            Herramientas y tecnologías con las que desarrollo aplicaciones web modernas, escalables y bien estructuradas.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {stackCategories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-3xl p-7 transition hover:-translate-y-1"
              style={S.card}
            >
              {/* Category title with gold left bar */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-5 w-[3px] rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                <h3 className="text-base font-bold" style={{ color: "var(--text)" }}>{cat.title}</h3>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full px-3 py-1 text-xs font-medium transition hover:scale-105"
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "var(--bg-pill)",
                      color: "var(--text-2)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ────────────────────────────────────── */
function Testimonials() {
  const items = [
    {
    name: "Ing. Juan Carlos Chuquipoma Jimenez",
    role: "Socio",
    avatar: "/JUAN.jpg",
    text: "Bryan demuestra un dominio sólido en desarrollo de software y arquitectura de sistemas. Su capacidad para estructurar soluciones escalables y aplicar buenas prácticas, junto con su conocimiento de Scrum, ha sido clave para mantener organización, enfoque y entregas de calidad en nuestros proyectos."
    },
    {
      name: "Claudia Victoria Soberón Quintana",
      role: "Cliente",
      avatar: "/CALA.jpg",
      text: "El sistema de gestión desarrollado por Bryan mejoró significativamente la administración de nuestros productos y ventas. Destaco su responsabilidad, claridad en el proceso y enfoque en ofrecer soluciones de calidad."
    },
    {
      name: "Elizabeth Quintana Bances",
      role: "Cliente",
      avatar: "/ELITA.jpg",
      text: "El sistema me permitió tener un control real de mi inventario y mis ventas. Ahora puedo visualizar ingresos, costos y stock en tiempo real, lo que me ayuda a tomar decisiones más acertadas. He reducido errores y optimizado la gestión de mi negocio."
    },
  ];

  return (
    <section id="testimonials" className="py-16" style={{ backgroundColor: "var(--bg-sec)" }}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>Testimonios</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t.name} className="rounded-3xl p-7 backdrop-blur-xl transition hover:-translate-y-1" style={S.card}>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-14 w-14 rounded-full object-cover"
                  style={{ border: "1px solid var(--border-st)", boxShadow: "0 0 24px var(--glow-avatar)" }}
                />
                <div>
                  <div className="text-sm font-bold" style={{ color: "var(--text)" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--accent)" }}>{t.role}</div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>"{t.text}"</p>
              <Stars />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <div className="mt-5 flex gap-1" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-lg" style={{ color: "var(--accent)" }}>★</span>
      ))}
    </div>
  );
}

/* ── CONTACT ─────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const FORMSPREE = "https://formspree.io/f/maqdrnwr";
  const [status,   setStatus]   = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error"); setErrorMsg("Completa: nombre, correo y mensaje."); return;
    }
    if (!emailRegex.test(form.email)) {
      setStatus("error"); setErrorMsg("Ingresa un correo válido."); return;
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
      setErrorMsg("No se pudo enviar. Intenta de nuevo en 1 minuto.");
    }
  }

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl" style={{ color: "var(--text)" }}>
          Contactame <span style={{ color: "var(--accent)" }}>Ahora</span>
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {/* Info */}
          <div className="rounded-3xl p-7 backdrop-blur-xl" style={S.card}>
            <div className="flex items-center gap-4">
              <img
                src="/BRYAN.jpg" alt="Bryan"
                className="h-20 w-20 rounded-full object-cover"
                style={{ border: "1px solid var(--border-st)", boxShadow: "0 0 30px var(--glow-avatar)" }}
              />
              <div>
                <div className="text-lg font-bold" style={{ color: "var(--text)" }}>Bryan Soberón</div>
                <div className="text-sm" style={{ color: "var(--accent)" }}>Systems Engineer • Full‑Stack</div>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm" style={{ color: "var(--text-3)" }}>
              <InfoRow icon={<Mail  size={16} />} text="bryansoberonq@gmail.com" />
              <InfoRow icon={<Phone size={16} />} text="+51 933 698 031" />
              <InfoRow icon={<MapPin size={16} />} text="Perú" />
            </div>
          </div>

          {/* Form */}
          <form className="rounded-3xl p-7" style={S.pill} onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Nombre completo"    name="name"    value={form.name}    onChange={onChange} />
              <Input label="Correo electrónico" name="email"   type="email" value={form.email}   onChange={onChange} />
              <Input label="Teléfono"           name="phone"   type="tel"   value={form.phone}   onChange={onChange} />
              <Input label="Asunto"             name="subject" value={form.subject} onChange={onChange} />
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>Mensaje</label>
              <textarea
                id="message" name="message" value={form.message} onChange={onChange} rows={7}
                className="mt-2 w-full resize-none rounded-2xl px-4 py-3 text-sm outline-none ring-0"
                style={{ ...S.input, color: "var(--text)", caretColor: "var(--accent)" }}
                placeholder="Cuéntame qué necesitas..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--accent)", boxShadow: "var(--glow-btn)" }}
            >
              <Send size={18} />
              {status === "sending" ? "Enviando..." : status === "sent" ? "Enviado ✅" : "Enviar"}
            </button>

            <div aria-live="polite">
              {status === "error" && <p className="mt-3 text-sm text-red-400">{errorMsg}</p>}
              {status === "sent"  && <p className="mt-3 text-sm text-emerald-400">Se envió tu mensaje correctamente ✅</p>}
            </div>
          </form>
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
