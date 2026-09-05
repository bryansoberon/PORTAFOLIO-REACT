import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* Une clases condicionales y resuelve conflictos de Tailwind
   (`px-2 px-4` → `px-4`). Es el helper que importan los componentes
   de shadcn/ui y 21st.dev desde `@/lib/utils`. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
