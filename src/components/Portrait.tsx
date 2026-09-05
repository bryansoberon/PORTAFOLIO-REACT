import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroFrames, heroFrameGlow, profile } from "../data/content";
import { prefersReducedMotion } from "../lib/motion";

const HOLD = 2600;      // ms por fotograma cuando nadie interactúa
const COMMIT_AT = 0.86; // fracción borrada a partir de la cual el frame se da por revelado
const STROKE_R = 34;    // radio del trazo, en px lógicos
const RAMP_STEPS = 38;  // fotogramas de la disolvencia
const RAMP_ALPHA = 0.09;

/* Cuántos fotogramas saltar al revelar. Va a 2 y no a 1 a propósito:
   f2/f3/f4 son los tres grises azulados —«azul medianoche», «acero»,
   «grafito»— y descubrir uno debajo del contiguo casi no se ve. Saltando
   de dos en dos el salto de color es mayor, y con cinco fotogramas el
   ciclo sigue pasando por todos: 0 → 2 → 4 → 1 → 3 → 0. */
const REVEAL_STEP = 2;

/* Dibuja replicando `object-cover` + `object-top`.
   Es la pieza que sostiene la ilusión: la capa de abajo es un <img> con
   object-cover, así que si aquí se estirase la imagen (que es lo que hace
   un drawImage a secas) las dos capas quedarían a distinta escala y al
   revelar se notaría el salto. */
function drawCover(ctx: CanvasRenderingContext2D, im: HTMLImageElement, w: number, h: number) {
  const ir = im.naturalWidth / im.naturalHeight;
  const cr = w / h;
  if (ir > cr) {
    // Más ancha que el marco: se recorta por los lados, centrada.
    const dw = h * ir;
    ctx.drawImage(im, (w - dw) / 2, 0, dw, h);
  } else {
    // Más estrecha: se recorta por abajo, anclada arriba (object-top).
    ctx.drawImage(im, 0, 0, w, w / ir);
  }
}

/* Borra un manchón de borde irregular. Vive fuera del componente porque no
   depende de nada suyo: así no se recrea en cada render. */
function stampAt(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  const segments = 26;
  const seed = Math.random() * Math.PI * 2;

  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  const g = ctx.createRadialGradient(x, y, r * 0.18, x, y, r);
  g.addColorStop(0, "rgba(0,0,0,1)");
  g.addColorStop(0.6, "rgba(0,0,0,0.9)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.beginPath();
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    // Tres senos desfasados: el borde queda irregular, como un trazo real.
    const wob =
      1 +
      0.16 * Math.sin(a * 3 + seed) +
      0.08 * Math.sin(a * 5 + seed * 2.1) +
      0.05 * Math.sin(a * 7 + seed * 0.7);
    const px = x + Math.cos(a) * r * wob;
    const py = y + Math.sin(a) * r * wob;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/* Retrato en arco. Debajo está el siguiente fotograma; encima, un canvas
   con el actual. Al arrastrar por encima se borra la capa de arriba y
   aparece la gradación de abajo — misma foto, otro tratamiento de color,
   por eso la ilusión se sostiene: la pose no se mueve ni un píxel.

   Al descubrirlo casi entero se hace el relevo: el fotograma revelado pasa
   a ser el actual y debajo se coloca el siguiente. El cambio es invisible
   porque se repinta exactamente lo que ya estaba en pantalla. */
export default function Portrait({ revealHint }: { revealHint?: string }) {
  const total = heroFrames.length;

  const [current, setCurrent] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const [reduce] = useState(prefersReducedMotion);

  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const size = useRef({ w: 0, h: 0 });
  const lastStamp = useRef<{ x: number; y: number } | null>(null);
  const currentRef = useRef(0);
  const rampRaf = useRef(0);
  const sampleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interacting = useRef(false);

  currentRef.current = current;
  const next = (current + REVEAL_STEP) % total;

  /* En táctil no se activa: `touch-action: none` sobre un retrato de este
     tamaño secuestraría el scroll de la página. */
  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  /* ── Precarga ─────────────────────────────────────────── */
  useEffect(() => {
    let alive = true;
    let loaded = 0;
    const marked = new Array<boolean>(heroFrames.length).fill(false);

    /* Se cuenta una sola vez por imagen: con la foto ya en caché saltan
       los dos caminos (el evento y la comprobación de `complete`). */
    const done = (i: number) => {
      if (!alive || marked[i]) return;
      marked[i] = true;
      if (++loaded === heroFrames.length) setReady(true);
    };

    imgs.current = heroFrames.map((src, i) => {
      const im = new Image();
      im.onload = () => done(i);
      im.onerror = () => done(i); // una imagen caída no debe dejar el retrato en blanco
      im.src = src;
      // Cacheada: el evento `load` ya pasó y no volverá a dispararse.
      if (im.complete) done(i);
      return im;
    });

    return () => { alive = false; };
  }, []);

  /* ── Pintado del canvas ───────────────────────────────── */
  const paint = useCallback((i: number, alpha = 1) => {
    const c = canvas.current;
    const im = imgs.current[i];
    if (!c || !im?.complete) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const { w, h } = size.current;
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = alpha;
    if (alpha >= 1) ctx.clearRect(0, 0, w, h);
    drawCover(ctx, im, w, h);
    ctx.globalAlpha = 1;
  }, []);

  /* Disolvencia hacia un fotograma. Sirve para las dos cosas: el ciclo
     automático y el «cicatrizado» cuando el cursor se va a medio camino. */
  const rampTo = useCallback((i: number) => {
    cancelAnimationFrame(rampRaf.current);
    let n = 0;
    const step = () => {
      paint(i, RAMP_ALPHA);
      if (++n < RAMP_STEPS) rampRaf.current = requestAnimationFrame(step);
      else paint(i, 1);
    };
    rampRaf.current = requestAnimationFrame(step);
  }, [paint]);

  /* ── Tamaño real del lienzo ───────────────────────────── */
  useEffect(() => {
    const c = canvas.current;
    const st = stage.current;
    if (!c || !st) return;

    const resize = () => {
      const r = st.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size.current = { w: r.width, h: r.height };
      c.width = Math.max(1, Math.round(r.width * dpr));
      c.height = Math.max(1, Math.round(r.height * dpr));
      c.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(currentRef.current);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(st);
    return () => ro.disconnect();
  }, [paint, ready]);

  /* Rellena el hueco entre dos posiciones del puntero: sin esto, un
     movimiento rápido deja la huella a manchones sueltos. */
  const stampAlong = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    const last = lastStamp.current;
    if (!last) {
      stampAt(ctx, x, y, r);
    } else {
      const dx = x - last.x;
      const dy = y - last.y;
      const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / Math.max(6, r * 0.35)));
      for (let i = 1; i <= steps; i++) {
        stampAt(ctx, last.x + (dx * i) / steps, last.y + (dy * i) / steps, r);
      }
    }
    lastStamp.current = { x, y };
  }, []);

  /* Cuánto se ha descubierto. Se muestrea en miniatura, no a resolución
     completa: es una comprobación por gesto, no por fotograma. */
  const erasedFraction = useCallback(() => {
    const c = canvas.current;
    if (!c) return 0;
    try {
      const sw = 32, sh = 48;
      const off = document.createElement("canvas");
      off.width = sw;
      off.height = sh;
      const o = off.getContext("2d");
      if (!o) return 0;
      o.drawImage(c, 0, 0, sw, sh);
      const d = o.getImageData(0, 0, sw, sh).data;
      let clear = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] < 24) clear++;
      return clear / (sw * sh);
    } catch {
      return 0; // canvas contaminado: se queda sin relevo, nada más
    }
  }, []);

  const maybeCommit = useCallback(() => {
    if (erasedFraction() < COMMIT_AT) return;
    const nx = (currentRef.current + REVEAL_STEP) % total;
    currentRef.current = nx;
    setCurrent(nx);
    paint(nx); // invisible: repinta justo lo que el usuario acaba de descubrir
  }, [erasedFraction, paint, total]);

  /* ── Arrastre para revelar ────────────────────────────────
     No se apaga con «reducir movimiento»: eso es para lo que se mueve
     solo, y esto solo ocurre si el visitante arrastra. Lo que sí se
     apaga por esa preferencia es el ciclo automático y el paralaje. */
  useEffect(() => {
    if (coarse) return;
    const st = stage.current;
    if (!st) return;

    const onMove = (e: PointerEvent) => {
      const r = st.getBoundingClientRect();
      const inside =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top && e.clientY <= r.bottom;

      if (!inside) { lastStamp.current = null; return; }

      const ctx = canvas.current?.getContext("2d");
      if (!ctx) return;

      interacting.current = true;
      cancelAnimationFrame(rampRaf.current);
      stampAlong(ctx, e.clientX - r.left, e.clientY - r.top, STROKE_R);

      if (sampleTimer.current) clearTimeout(sampleTimer.current);
      sampleTimer.current = setTimeout(maybeCommit, 200);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (sampleTimer.current) clearTimeout(sampleTimer.current);
    };
  }, [coarse, maybeCommit, stampAlong]);

  /* ── Ciclo automático mientras nadie toca ─────────────── */
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (interacting.current) return;
      const nx = (currentRef.current + 1) % total;
      currentRef.current = nx;
      setCurrent(nx);
      rampTo(nx);
    }, HOLD);
    return () => clearInterval(id);
  }, [reduce, rampTo, total]);

  /* ── Paralaje con el cursor ───────────────────────────── */
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const r = box.current?.getBoundingClientRect();
      if (!r) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      setTilt({ x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  useEffect(() => () => cancelAnimationFrame(rampRaf.current), []);

  const handleLeave = () => {
    interacting.current = false;
    lastStamp.current = null;
    rampTo(currentRef.current); // un vistazo a medias no se queda ahí colgado
  };

  const pick = (k: number) => {
    interacting.current = false;
    lastStamp.current = null;
    currentRef.current = k;
    setCurrent(k);
    rampTo(k);
  };

  return (
    <div ref={box} className="relative mx-auto w-fit">
      {/* Resplandor: se desborda del arco y tiñe el aire alrededor */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`glow-${current}`}
          aria-hidden
          className="pointer-events-none absolute -inset-[18%] blur-[52px]"
          style={{
            background: `radial-gradient(50% 45% at 50% 45%, ${heroFrameGlow[current]} 0%, transparent 72%)`,
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 0.62, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Marco en arco */}
      <motion.div
        ref={stage}
        data-cursor={coarse ? undefined : revealHint}
        onPointerLeave={handleLeave}
        className="arch relative aspect-[0.66] h-[min(34svh,15rem)] sm:h-[min(38svh,19rem)] lg:h-[min(42svh,23rem)]"
        animate={{ x: tilt.x * 10, y: tilt.y * 8 }}
        transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.6 }}
      >
        {/* Capa de abajo: la gradación que se descubre al arrastrar.
            Hasta que el canvas pinta, aquí va el actual — si no, se vería
            un fotograma que aún no toca antes de que el lienzo aparezca. */}
        <img
          src={heroFrames[!ready ? current : next]}
          alt={profile.name}
          width={800}
          height={1185}
          loading="eager"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover object-top"
        />

        {/* Capa de arriba: el fotograma actual, borrable */}
        <canvas
          ref={canvas}
          aria-hidden
          className="absolute inset-0 h-full w-full transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
        />

        {/* Degradado inferior para fundir con la página */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to top, var(--fade-out), transparent)" }}
        />
      </motion.div>

      {/* Contador de fotogramas, como una tira de película */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {heroFrames.map((_, k) => (
          <button
            key={k}
            onClick={() => pick(k)}
            aria-label={`Frame ${k + 1}`}
            data-cursor={`0${k + 1}`}
            className="h-[3px] rounded-full transition-all duration-500"
            style={{
              width: k === current ? 26 : 10,
              backgroundColor: k === current ? "var(--accent)" : "var(--panel-3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
