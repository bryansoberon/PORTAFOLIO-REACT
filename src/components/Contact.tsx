import { useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github } from "lucide-react";
import { Container, Reveal } from "./primitives";
import { EASE } from "../lib/motion";
import { SocialRow } from "./controls";
import { profile, links } from "../data/content";
import type { Translation, UiCopy } from "../types";

interface ContactProps {
  t: Translation;
  u: UiCopy;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type Status = "idle" | "sending" | "sent" | "error";

/* Sección 07 — titular grande, palabra fantasma de fondo,
   píldora que revela el correo y formulario. */
export default function Contact({ t, u }: ContactProps) {
  const f = t.contact.form;
  const FORMSPREE = import.meta.env.VITE_FORMSPREE_URL;

  const empty: FormState = { name: "", email: "", phone: "", subject: "", message: "" };
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [revealed, setRevealed] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error"); setErrorMsg(f.errFill); return;
    }
    if (!emailRegex.test(form.email)) {
      setStatus("error"); setErrorMsg(f.errEmail); return;
    }

    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, _source: "portfolio-react" }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm(empty);
    } catch {
      setStatus("error");
      setErrorMsg(f.errSend);
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <Container>
        {/* Encabezado */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <Reveal>
            <span className="meta">{u.contactLabel}</span>
            <h2 className="h2 mt-3 max-w-4xl text-[clamp(2rem,6vw,4.5rem)] text-[var(--fg)]">
              {u.contactBig}
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <span className="pill pointer-events-none">
              <span className="dot-live" />
              <span>{u.availability}</span>
            </span>
          </Reveal>
        </div>

        {/* Píldora que revela el correo, sobre una palabra fantasma */}
        <div className="relative mt-16">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-bold tracking-[-0.05em]"
            style={{ fontSize: "clamp(4rem,14vw,13rem)", color: "var(--ghost)", lineHeight: 1 }}
          >
            {profile.first.toLowerCase()}
          </span>

          <Reveal delay={0.1}>
            <button
              onClick={() => setRevealed(true)}
              className="group relative flex w-full max-w-3xl items-center gap-6 border border-[var(--rule)] bg-[var(--panel)] p-3 text-left transition-colors duration-500 hover:bg-[var(--panel-2)]"
              style={{ borderRadius: "var(--r-pill)" }}
            >
              <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-[var(--rule)] bg-[var(--paper)] text-[var(--fg)] transition-all duration-500 group-hover:bg-[var(--accent)] group-hover:text-white sm:h-32 sm:w-32">
                <svg viewBox="0 0 24 24" className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1">
                  <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>

              <AnimatePresence mode="wait">
                {revealed ? (
                  <motion.a
                    key="mail"
                    href={"mailto:" + profile.email}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="link-u break-all pr-6 text-[clamp(1rem,2.6vw,1.9rem)] font-medium text-[var(--fg)]"
                  >
                    {profile.email}
                  </motion.a>
                ) : (
                  <motion.span
                    key="cta"
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="whitespace-pre-line text-[clamp(1rem,2.2vw,1.4rem)] leading-tight text-[var(--fg-3)]"
                  >
                    {u.revealEmail}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </Reveal>
        </div>

        {/* Datos + formulario */}
        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="meta">{t.contact.role}</span>
              <dl className="mt-6 space-y-3">
                <Row label="Email" value={profile.email} href={"mailto:" + profile.email} />
                <Row label="Phone" value={profile.phone} href={"tel:" + profile.phone.replace(/\s/g, "")} />
                <Row label="Location" value={profile.location} />
              </dl>

              <div className="mt-8">
                <span className="meta">{u.socialLabel}</span>
                <SocialRow className="mt-3" />
              </div>

              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="pill pill-accent mt-6"
                data-cursor="GitHub"
              >
                <Github size={15} strokeWidth={1.8} />
                {t.contact.githubBtn}
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.08}>
              <form
                onSubmit={handleSubmit}
                className="border border-[var(--rule)] p-6 sm:p-8"
                style={{ borderRadius: "var(--r-lg)" }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={f.name}    name="name"    value={form.name}    onChange={onChange} required />
                  <Field label={f.email}   name="email"   value={form.email}   onChange={onChange} type="email" required />
                  <Field label={f.phone}   name="phone"   value={form.phone}   onChange={onChange} />
                  <Field label={f.subject} name="subject" value={form.subject} onChange={onChange} />
                </div>

                <div className="mt-5">
                  <label className="meta" htmlFor="message">{f.message}</label>
                  <textarea
                    id="message" name="message" rows={4}
                    value={form.message} onChange={onChange}
                    placeholder={f.placeholder} required
                    className="field mt-2 resize-none"
                  />
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <button type="submit" disabled={status === "sending"} className="pill disabled:opacity-50">
                    {status === "sending" ? f.sending : status === "sent" ? f.sent : f.send}
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
                      <path d="M3 8h9M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {status === "sent"  && <p className="text-[0.85rem] text-[var(--fg-2)]">{f.sentMsg}</p>}
                  {status === "error" && <p className="text-[0.85rem] text-[var(--accent-2)]">{errorMsg}</p>}
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

interface RowProps {
  label: string;
  value: ReactNode;
  href?: string;
}

function Row({ label, value, href }: RowProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--rule-soft)] pb-2.5">
      <dt className="meta">{label}</dt>
      <dd className="text-right text-[0.9rem] text-[var(--fg)]">
        {href ? <a href={href} className="link-u">{value}</a> : value}
      </dd>
    </div>
  );
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

function Field({ label, name, ...props }: FieldProps) {
  return (
    <div>
      <label className="meta" htmlFor={name}>{label}</label>
      <input id={name} name={name} className="field mt-2" placeholder={label} {...props} />
    </div>
  );
}
