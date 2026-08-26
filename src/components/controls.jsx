import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { socialLinks } from "../data/socialLinks.js";

export function SocialRow({ size = 17, className = "" }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {socialLinks.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            data-cursor={label}
            className="icon-btn"
          >
            <Icon size={size} strokeWidth={1.6} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/* Tecnologías insignia — heredado del diseño anterior. */
export function BadgeRow({ className = "" }) {
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {["Angular", "Vue", "Next.js", "Django", "Scrum"].map((tag) => (
        <li key={tag} className="tag">{tag}</li>
      ))}
    </ul>
  );
}

export function ThemeToggle({ theme, onToggle, label }) {
  const dark = theme === "dark";

  return (
    <button
      onClick={onToggle}
      className="icon-btn"
      aria-label={label}
      data-cursor={label}
      title={label}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -70, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="grid place-items-center"
      >
        {dark ? <Sun size={17} strokeWidth={1.6} /> : <Moon size={17} strokeWidth={1.6} />}
      </motion.span>
    </button>
  );
}
