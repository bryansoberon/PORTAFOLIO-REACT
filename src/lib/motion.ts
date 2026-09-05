/* Curva de easing compartida por todas las animaciones.
   El tipo tupla es necesario: `number[]` no lo acepta framer-motion. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ──────────────────────────────────────────────────────────
   Interruptor único del movimiento.

   En `false` el sitio anima siempre, sin mirar la preferencia del
   sistema. Es una decisión deliberada: con «reducir movimiento» activo
   en Windows se apagaban a la vez el cursor propio, el scroll con
   inercia, el ciclo del retrato, el marquee del pie y el punto de
   disponibilidad — es decir, casi todo el carácter del sitio.

   Ponerlo en `true` devuelve el comportamiento respetuoso con la
   preferencia del sistema. Es lo único que hay que cambiar.
   ────────────────────────────────────────────────────────── */
export const HONOR_REDUCED_MOTION = false;

/** Fuente única de verdad para «¿hay que atenuar el movimiento?». */
export function prefersReducedMotion(): boolean {
  if (!HONOR_REDUCED_MOTION) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
