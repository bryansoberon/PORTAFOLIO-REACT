import { useCallback, useState } from "react";

const KEY = "portfolio-theme";

/* Lee la preferencia guardada; si no hay, respeta la del sistema. */
function initial() {
  const saved = localStorage.getItem(KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/* El atributo se escribe en <html> antes de pintar (ver index.html),
   así que aquí solo hay que mantenerlo sincronizado al alternar. */
export function useTheme() {
  const [theme, setTheme] = useState(initial);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(KEY, next);
      return next;
    });
  }, []);

  return [theme, toggle];
}
