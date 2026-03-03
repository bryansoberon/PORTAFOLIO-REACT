import React, { useEffect, useMemo, useRef, useState } from "react";
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
} from "lucide-react";

/**
 * ✅ Portafolio en React (single-page) inspirado en tu HTML actual,
 * pero más moderno: navbar glass, scrollspy, secciones, timeline, cards, etc.
 *
 * Requisitos sugeridos:
 * - Vite + React
 * - TailwindCSS
 * - @splinetool/react-spline
 * - lucide-react
 */

const ACCENT = "#a855f7"; // purple-500

const navItems = [
  { id: "home", label: "Inicio" },
  { id: "education", label: "Educacion" },
  { id: "services", label: "Servicios" },
  { id: "testimonials", label: "Testimonios" },
  { id: "contact", label: "Contacto" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const cvHref = `${import.meta.env.BASE_URL}cv_documentado.pdf`;

  // Cambia por tus links reales
  const links = useMemo(
    () => ({
      linkedin: "https://www.linkedin.com/in/bernabe-bryan-sober%C3%B3n-quintana-195437307/",
      github: "https://github.com/bryansoberon",
      instagram: "https://www.instagram.com/bryansoberon/",
      twitter: "https://x.com/BryanEseCu",
      cv: cvHref,
    }),
    [cvHref]
  );

  const sectionsRef = useRef([]);

  useEffect(() => {
    // ScrollSpy robusto con IntersectionObserver
    const els = navItems
      .map((x) => document.getElementById(x.id))
      .filter(Boolean);

    sectionsRef.current = els;

    const obs = new IntersectionObserver(
      (entries) => {
        // elige la sección con mayor intersección
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        // Ajusta: un poco antes de llegar al centro
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.2, 0.4, 0.6, 0.8],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // Cerrar menú cuando cambia sección
    setMenuOpen(false);
  }, [activeId]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-fuchsia-500/30 selection:text-white">
      {/* Keyframes (typing + glow) */}
      <style>{`
        :root { --accent: ${ACCENT}; }
        @keyframes caret { 50% { border-color: transparent; } }
        @keyframes typing { from { width: 0; } to { width: 100%; } }
        @keyframes floaty { 0%{ transform: translateY(0);} 50%{ transform: translateY(-8px);} 100%{ transform: translateY(0);} }
        .glow { box-shadow: 0 0 18px rgba(168,85,247,.45), 0 0 40px rgba(168,85,247,.25); }
        .text-glow { text-shadow: 0 0 18px rgba(168,85,247,.55); }
       /* === TYPING SIN SALTO === */
      .typing-wrap{
        display: inline-block;
        width: 18ch;               /* reserva ancho fijo */
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        vertical-align: bottom;     /* evita que “suba” */
      }

      .typing{
        display: inline-block;
        white-space: nowrap;
        width: 0;
        overflow: hidden;
        animation: typing 2.2s steps(18, end) forwards;
      }

      .typing-wrap::after{
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        height: 1.1em;
        border-right: 2px solid var(--accent);
        animation: caret .75s step-end infinite;
      }


      `}</style>

      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        activeId={activeId}
        onNav={scrollTo}
      />

      {/* MAIN */}
      <main className="pt-14">
        <Home links={links} />
        <Education />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer links={links} onNav={scrollTo} />

      {/* Fondo sutil */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(900px 450px at 10% 10%, rgba(168,85,247,.12), transparent 60%), radial-gradient(700px 350px at 90% 20%, rgba(34,197,94,.08), transparent 55%), radial-gradient(900px 450px at 30% 95%, rgba(59,130,246,.08), transparent 60%)",
        }}
      />
    </div>
  );
}

function Header({ menuOpen, setMenuOpen, activeId, onNav }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
          <button
            onClick={() => onNav("home")}
            className="group flex items-baseline gap-2 text-left"
            aria-label="Ir al inicio"
          >
            <span className="text-lg font-extrabold tracking-wide">
              PORTAFOLIO
              <span className="ml-2 text-glow" style={{ color: ACCENT }}>
                BRYAN
              </span>
            </span>
            <span className="hidden text-xs text-zinc-400 group-hover:text-zinc-300 sm:inline">
              Systems Engineer
            </span>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeId === item.id
                    ? "bg-white/10 text-white"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
                style={
                  activeId === item.id
                    ? { boxShadow: `inset 0 0 0 1px ${ACCENT}55` }
                    : undefined
                }
              >
                <span
                  className={activeId === item.id ? "" : "opacity-90"}
                  style={activeId === item.id ? { color: ACCENT } : undefined}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <button
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
            <span>Menu</span>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mt-2 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl md:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeId === item.id ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <span style={activeId === item.id ? { color: ACCENT } : undefined}>
                  {item.label}
                </span>
                <span className="text-xs text-zinc-500">{item.id}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Home({ links }) {
  return (
    <section id="home" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative">
          <BadgeRow />
        <div className="mt-3 text-lg text-zinc-200 sm:text-xl flex items-baseline gap-2">
          <span className="text-zinc-300">Soy</span>

          <span
            className="typing"
            style={{ color: ACCENT }}
            aria-label="Full-Stack Developer"
          >
            Full-Stack Developer
          </span>
        </div>


          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            Soy Bernabé Bryan Soberón Quintana. Me enfoco en desarrollo web (Front/Back),
            analítica de datos y gestión de proyectos tecnológicos con enfoque ágil.
            Me interesa construir soluciones escalables, limpias y medibles.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              className="glow inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
              style={{ backgroundColor: ACCENT }}
              href={links.cv}
              download="CV_Bryan_Soberon.pdf"
            >
              <Download size={18} />
              Descargar CV
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-white/10"
              href="#contact"
            >
              <Send size={18} />
              Contactar
            </a>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <SocialIcon href={links.linkedin} label="LinkedIn" icon={<Linkedin size={18} />} />
            <SocialIcon href={links.github} label="GitHub" icon={<Github size={18} />} />
            <SocialIcon href={links.instagram} label="Instagram" icon={<Instagram size={18} />} />
            <SocialIcon href={links.twitter} label="Twitter" icon={<Twitter size={18} />} />
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
            <Stat label="Projects" value="10+" />
            <Stat label="Stack" value="React • Laravel" />
            <Stat label="Focus" value="Web • Data" />
          </div>
        </div>

        <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-3xl">

        {/* Spline (sin interacción) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/Pbg4uemZbXh3i3ec/scene.splinecode" />
        </div>

        {/* MÁSCARA para tapar el botón original */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-10
                        bg-gradient-to-t from-black via-black/80 to-transparent" />

        {/* TU botón real */}
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2
                    rounded-full px-7 py-3 text-sm font-semibold text-black
                    flex items-center gap-2"
          style={{
            background: "linear-gradient(90deg, #a855f7, #ec4899)",
            boxShadow: "0 0 30px rgba(168,85,247,.6)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.7.5.5 5.8.5 12.3c0 5.2 3.4 9.6 8.1 11.2.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8-.8 1.5-1.1.3-.9 1-1.5 1.8-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.9 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.7-1.6 8.1-6 8.1-11.2C23.5 5.8 18.3.5 12 .5z"/>
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
    <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200">
      <span className="rounded-full bg-white/10 px-2 py-1">React</span>
      <span className="rounded-full bg-white/10 px-2 py-1">Laravel</span>
      <span className="rounded-full bg-white/10 px-2 py-1">Data</span>
      <span className="rounded-full bg-white/10 px-2 py-1">Scrum</span>
    </div>
  );
}

function SocialIcon({ href, label, icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 transition hover:scale-105 hover:bg-white/10"
      style={{ boxShadow: `0 0 0 0 rgba(168,85,247,0)` }}
    >
      {icon}
    </a>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-lg font-bold" style={{ color: ACCENT }}>
        {value}
      </div>
      <div className="mt-1 text-xs text-zinc-400">{label}</div>
    </div>
  );
}

function Education() {
  const items = [
    {
      year: "2017 – 2019",
      title: "Colegio",
      desc: "Secundaria 3ero a 5to - IEP Sagrado Divino Maestro",
    },
    {
      year: "2021 – 2025",
      title: "Universidad",
      desc: "Universidad Señor de sipan - Ingeniería de Sistemas. Enfoque en desarrollo de software, arquitectura, analítica y gestión de proyectos.",
    },
    {
      year: "2025 – Septiembre a diciembre",
      title: "Prácticas preprofesionales",
      desc: "Implementación de soluciones web, automatización y mejoras en procesos de negocio en Carlos Gabriel Transportes S.A.C.",
    },

  ];

  return (
    <section id="education" className="bg-zinc-900/40 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl">
          Educación
          <span className="ml-3 text-glow" style={{ color: ACCENT }}>
            Timeline
          </span>
        </h2>

        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="absolute left-5 top-0 h-full w-[2px] bg-white/10 sm:left-1/2 sm:-ml-[1px]" />

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
      <div className="relative z-10 mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-950/50 sm:absolute sm:left-1/2 sm:-ml-5">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: ACCENT, boxShadow: `0 0 18px ${ACCENT}66` }} />
      </div>

      <div
        className={`w-full rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl sm:w-[46%] ${
          isLeft ? "sm:pr-8" : "sm:ml-auto sm:pl-8"
        }`}
      >
        <div className="text-sm font-semibold" style={{ color: ACCENT }}>
          {item.year}
        </div>
        <div className="mt-1 text-xl font-bold text-zinc-100">{item.title}</div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-300">{item.desc}</p>
      </div>
    </div>
  );
}

function Services() {
  const services = [
    {
      title: "Web Designer",
      desc: "Diseño de interfaces responsivas y consistentes. Prioridad en legibilidad, jerarquía visual y UX.",
    },
    {
      title: "Frontend Developer",
      desc: "React + buenas prácticas: componentes reutilizables, estado claro, rendimiento y accesibilidad.",
    },
    {
      title: "Backend Developer",
      desc: "APIs limpias y seguras. Integraciones, validación, control de errores, y bases de datos bien modeladas.",
    },
    {
      title: "Testing",
      desc: "Pruebas y verificación: casos críticos, regresión, y automatización básica para reducir fallos en producción.",
    },
  ];

  return (
    <section id="services" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl">Servicios</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-300 sm:text-base">
          Lo que puedo construir para ti: interfaz, lógica y entrega con enfoque profesional.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/7"
              style={{ boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
            >
              <div
                className="inline-flex items-center rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-xs font-semibold"
                style={{ color: ACCENT }}
              >
                {s.title}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-200">{s.desc}</p>
              <div className="mt-6 h-[1px] w-full bg-white/10" />
              <div className="mt-4 text-xs text-zinc-400">
                Entregables: UI • Componentes • API • Deploy
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Juan Carlos Chuquipoma Jimenez",
      role: "Cliente",
      avatar: "/JUAN.jpg", 
      text: "Gracias al trabajo de Bryan, mi negocio ahora cuenta con un sistema web eficiente que optimiza nuestras campañas. ¡Totalmente recomendado!",
    },
    {
      name: "Claudia Victoria Soberón Quintana",
      role: "Cliente",
      avatar: "/CALA.jpg",
      text: "El sistema de gestión que nos brindó Bryan mejoró significativamente administración de productos y ventas. Compromiso y calidad.",
    },
    {
      name: "José Carlos Rivera Guadalupe",
      role: "Cliente",
      avatar: "/CARLOS.jpg",
      text: "Optimización y predicción para marketing con IA: subió la eficiencia de campañas y el ROI. Asesoría clave.",
    },
  ];

  return (
    <section id="testimonials" className="bg-zinc-900/40 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl">Testimonios</h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {items.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl border border-white/10 bg-black/30 p-7 backdrop-blur-xl transition hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-14 w-14 rounded-full border border-white/10 object-cover"
                  style={{ boxShadow: `0 0 24px ${ACCENT}33` }}
                />
                <div>
                  <div className="text-sm font-bold text-zinc-100">{t.name}</div>
                  <div className="text-xs" style={{ color: ACCENT }}>
                    {t.role}
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-300">“{t.text}”</p>
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
        <span key={i} className="text-lg" style={{ color: "#fbbf24" }}>
          ★
        </span>
      ))}
    </div>
  );
}

function Contact() {
  // Form simple: mailto (sin backend). Si quieres backend real, lo conectas luego.
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykzozvb";

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    // Validación mínima profesional
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Completa: nombre, correo y mensaje.");
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,

          // extra útil (opcional)
          _source: "portfolio-react",
        }),
      });

      if (!res.ok) throw new Error("Formspree rejected");

      setStatus("sent");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg("No se pudo enviar. Intenta de nuevo en 1 minuto.");
    }
  }

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));


  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl font-extrabold sm:text-5xl">
          Contactame <span style={{ color: ACCENT }}>Ahora</span>
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-7 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <img
                src="/BRYAN.png"
                alt="Bryan"
                className="h-20 w-20 rounded-full border border-white/10 object-cover"
                style={{ boxShadow: `0 0 30px ${ACCENT}33` }}
              />
              <div>
                <div className="text-lg font-bold">Bryan Soberón</div>
                <div className="text-sm" style={{ color: ACCENT }}>
                  Systems Engineer • Full‑Stack
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-zinc-300">
              <InfoRow icon={<Mail size={16} />} text="briansoberonq@gmail.com" />
              <InfoRow icon={<Phone size={16} />} text="+51 933 698 031" />
              <InfoRow icon={<MapPin size={16} />} text="Perú" />
            </div>

  
          </div>

         <form
            className="rounded-3xl border border-white/10 bg-white/5 p-7"
            onSubmit={handleSubmit}
          >

            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Nombre completo" name="name" value={form.name} onChange={onChange} />
              <Input label="Correo electronico" name="email" type="email" value={form.email} onChange={onChange} />
              <Input label="Telefono" name="phone" value={form.phone} onChange={onChange} />
              <Input label="Asunto" name="subject" value={form.subject} onChange={onChange} />
            </div>

            <div className="mt-4">
              <label className="text-xs font-semibold text-zinc-200">Mensaje</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={7}
                className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none ring-0 placeholder:text-zinc-500 focus:border-white/20"
                placeholder="Cuéntame qué necesitas..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: ACCENT, boxShadow: `0 0 24px ${ACCENT}55` }}
            >
              <Send size={18} />
              {status === "sending" ? "Enviando..." : status === "sent" ? "Enviado ✅" : "Enviar"}
            </button>
            {status === "error" && (
              <p className="mt-3 text-sm text-red-300">{errorMsg}</p>
            )}
            {status === "sent" && (
              <p className="mt-3 text-sm text-emerald-300">
                Se envió tu mensaje correctamente ✅
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-xs font-semibold text-zinc-200">{label}</label>
      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-white/20"
      />
    </div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
        style={{ color: ACCENT }}
      >
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

function Footer({ links, onNav }) {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-sm text-zinc-400">
            © {new Date().getFullYear()} Bryan. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {navItems.map((it) => (
              <button
                key={it.id}
                onClick={() => onNav(it.id)}
                className="rounded-full px-3 py-2 text-xs text-zinc-300 hover:bg-white/5"
              >
                {it.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
              href={links.linkedin}
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
              href={links.github}
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
