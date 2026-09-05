import {
  SiVuedotjs, SiAngular, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiBootstrap, SiDjango, SiNextdotjs, SiLaravel, SiPhp,
  SiSpringboot, SiCplusplus, SiMysql, SiPostgresql, SiMongodb,
  SiSqlite, SiGit, SiGithub, SiDocker, SiInsomnia, SiJira,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { Database, Code2, RefreshCw, Cloud } from "lucide-react";
import type { TechIconEntry } from "../types";

/* Color de marca — se aplica solo en hover; en reposo todo va en tinta. */
export const techIcons: Record<string, TechIconEntry> = {
  "Vue.js":          { Icon: SiVuedotjs,   color: "#4FC08D" },
  "Angular":         { Icon: SiAngular,    color: "#DD0031" },
  "TypeScript":      { Icon: SiTypescript, color: "#3178C6" },
  "JavaScript":      { Icon: SiJavascript, color: "#C9A800" },
  "HTML":            { Icon: SiHtml5,      color: "#E34F26" },
  "CSS":             { Icon: SiCss,        color: "#1572B6" },
  "Tailwind CSS":    { Icon: SiTailwindcss,color: "#06B6D4" },
  "Bootstrap":       { Icon: SiBootstrap,  color: "#7952B3" },
  "Django":          { Icon: SiDjango,     color: "#0C4B33" },
  "Next.js":         { Icon: SiNextdotjs,  color: "var(--fg)" },
  "Laravel":         { Icon: SiLaravel,    color: "#FF2D20" },
  "Spring Boot":     { Icon: SiSpringboot, color: "#6DB33F" },
  "PHP":             { Icon: SiPhp,        color: "#777BB4" },
  "Java":            { Icon: FaJava,       color: "#007396" },
  "C++":             { Icon: SiCplusplus,  color: "#00599C" },
  "MySQL":           { Icon: SiMysql,      color: "#4479A1" },
  "PostgreSQL":      { Icon: SiPostgresql, color: "#4169E1" },
  "PgAdmin":         { Icon: Database,     color: "#336791" },
  "MongoDB":         { Icon: SiMongodb,    color: "#47A248" },
  "SQL Server":      { Icon: Database,     color: "#CC2927" },
  "SQLite":          { Icon: SiSqlite,     color: "#0F80CC" },
  "Git":             { Icon: SiGit,        color: "#F05032" },
  "GitHub":          { Icon: SiGithub,     color: "var(--fg)" },
  "VS Code":         { Icon: Code2,        color: "#007ACC" },
  "Docker":          { Icon: SiDocker,     color: "#2496ED" },
  "Insomnia":        { Icon: SiInsomnia,   color: "#4000BF" },
  "Scrum":           { Icon: RefreshCw,    color: "var(--accent)" },
  "Jira":            { Icon: SiJira,       color: "#0052CC" },
  "Microsoft Azure": { Icon: Cloud,        color: "#0078D4" },
};
