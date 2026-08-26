import { useCallback, useState } from "react";

const KEY = "portfolio-theme";

/* El diseño es oscuro de nacimiento: sin preferencia guardada, oscuro.
   El claro es una elección explícita del visitante. */
function initial() {
  return localStorage.getItem(KEY) === "light" ? "light" : "dark";
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
