import { useCallback, useState } from "react";
import type { Theme } from "../types";

const KEY = "portfolio-theme";

/* El diseño es oscuro de nacimiento: sin preferencia guardada, oscuro.
   El claro es una elección explícita del visitante. */
function initial(): Theme {
  return localStorage.getItem(KEY) === "light" ? "light" : "dark";
}

/* El atributo se escribe en <html> antes de pintar (ver index.html),
   así que aquí solo hay que mantenerlo sincronizado al alternar. */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(initial);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem(KEY, next);
      return next;
    });
  }, []);

  return [theme, toggle];
}
