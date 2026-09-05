import type { ComponentType, CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";

/* Contratos del contenido y de la interfaz.
   Fuente única de verdad de las formas — si falta una clave en un
   idioma o se escribe mal el id de una sección, falla la compilación. */

export type Lang = "en" | "es";
export type Theme = "dark" | "light";

export type SectionId =
  | "index"
  | "about"
  | "projects"
  | "experience"
  | "education"
  | "certifications"
  | "stack"
  | "contact";

/** Navegar a una sección. Solo acepta ids que existen. */
export type NavHandler = (id: SectionId) => void;

/* ── Iconos ────────────────────────────────────────────── */

/** react-icons y lucide-react coinciden en estas props, así que un
    mismo tipo sirve para las dos familias del catálogo de tecnologías. */
export type TechIconComponent = ComponentType<{
  size?: number | string;
  className?: string;
  style?: CSSProperties;
}>;

export interface TechIconEntry {
  Icon: TechIconComponent;
  color: string;
}

/** Las redes usan solo lucide, que sí admite `strokeWidth`. */
export interface SocialLink {
  label: string;
  href: string;
  Icon: LucideIcon;
}

/* ── Piezas de contenido ───────────────────────────────── */

export interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

export interface ProjectCopy {
  title: string;
  desc: string;
  type: string;
}

export interface ProjectBase {
  tags: string[];
  link: string;
}

export type Project = ProjectBase & ProjectCopy;

export interface CertificationCopy {
  title: string;
  issued: string;
  /** Solo algunas credenciales vencen. */
  expires?: string;
  skills: string[];
  desc: string;
}

export interface CertificationBase {
  issuer: string;
  credentialId: string | null;
  pdf: string;
  downloadName: string;
  verifyUrl: string | null;
}

export type Certification = CertificationBase & CertificationCopy;

export interface StackCategoryBase {
  techs: string[];
}

export type StackCategory = StackCategoryBase & { title: string };

export interface ContactFormCopy {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  placeholder: string;
  send: string;
  sending: string;
  sent: string;
  sentMsg: string;
  errFill: string;
  errEmail: string;
  errSend: string;
}

/* ── Textos traducidos ─────────────────────────────────── */

export interface Translation {
  nav: Record<
    "home" | "projects" | "experience" | "education" | "certifications" | "stack" | "contact",
    string
  >;
  header: { available: string; role: string };
  home: {
    greeting: string;
    subtitle: string;
    paragraph: string;
    /** Las dos palabras fantasma a los lados del retrato. */
    tagline: [string, string];
    contact: string;
    stats: { projects: string; stacks: string };
  };
  projects: {
    headingPrefix: string;
    headingAccent: string;
    viewProject: string;
    items: ProjectCopy[];
  };
  education: {
    headingPrefix: string;
    headingAccent: string;
    items: TimelineItem[];
  };
  experience: {
    headingPrefix: string;
    headingAccent: string;
    items: TimelineItem[];
  };
  certifications: {
    headingPrefix: string;
    headingAccent: string;
    subtitle: string;
    downloadPdf: string;
    verify: string;
    expLabel: string;
    items: CertificationCopy[];
  };
  stack: {
    badge: string;
    heading: string;
    subtitle: string;
    categories: string[];
  };
  contact: {
    headingPrefix: string;
    headingAccent: string;
    role: string;
    githubBtn: string;
    form: ContactFormCopy;
  };
  footer: { rights: string };
}

export interface UiCopy {
  availability: string;
  indexLabel: string;
  tagline: string;
  sectionNames: Record<SectionId, string>;
  themeLabel: string;
  socialLabel: string;
  aboutLabel: string;
  aboutStatement: string;
  dialsLabel: string;
  weapons: string;
  /** Las claves son los títulos de categoría, que cambian por idioma. */
  dialCopy: Record<string, string>;
  scroll: string;
  /** Pista del cursor sobre el retrato: se descubre al arrastrar. */
  revealHint: string;
  contactLabel: string;
  contactBig: string;
  revealEmail: string;
  backTop: string;
}

/* ── Perfil, enlaces e índice ──────────────────────────── */

export interface Profile {
  name: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  location: string;
}

export interface Links {
  linkedin: string;
  github: string;
  instagram: string;
  twitter: string;
  facebook: string;
}

export interface SectionRef {
  id: SectionId;
  n: string;
}
