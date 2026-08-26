import { Container, Arrow } from "./primitives.jsx";
import { profile, links } from "../data/content.js";

/* Cierre: marquee tipográfico + créditos. */
export default function Footer({ t, u, onNav }) {
  const phrase = `${profile.name} — ${t.header.role} — ${profile.location} —`;

  return (
    <footer style={{ backgroundColor: "var(--ink)", color: "var(--on-ink)" }}>
      <div className="overflow-hidden border-y border-[var(--rule-ink)] py-8">
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((k) => (
            <span key={k} className="display shrink-0 pr-10 text-[clamp(2.5rem,7vw,5.5rem)] text-[var(--on-ink)]">
              {`${phrase} ${phrase} `}
            </span>
          ))}
        </div>
      </div>

      <Container className="flex flex-wrap items-center justify-between gap-6 py-8">
        <p className="meta">
          © {new Date().getFullYear()} {profile.name}. {t.footer.rights}
        </p>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {[
            ["LinkedIn", links.linkedin],
            ["GitHub", links.github],
            ["X", links.twitter],
            ["Instagram", links.instagram],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 text-[0.85rem] text-[var(--on-ink-2)] transition-colors hover:text-[var(--on-ink)]"
            >
              <span className="link-u">{label}</span>
              <Arrow className="h-3 w-3" />
            </a>
          ))}
        </nav>

        <button
          onClick={() => onNav("index")}
          className="group inline-flex items-center gap-2 text-[0.85rem] text-[var(--on-ink-2)] transition-colors hover:text-[var(--on-ink)]"
        >
          <span className="link-u">{u.backTop}</span>
          <Arrow className="h-3 w-3 rotate-[-45deg]" />
        </button>
      </Container>
    </footer>
  );
}
