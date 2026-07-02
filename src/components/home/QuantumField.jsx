import { useEffect, useRef } from 'react';
import styles from './QuantumField.module.css';

const TAU = Math.PI * 2;
const PARTICLE_COUNT = 70;

const makeParticles = (w, h) => Array.from({ length: PARTICLE_COUNT }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: 0.6 + (Math.random() * 1.6),
  drift: 0.05 + (Math.random() * 0.15),
  phase: Math.random() * TAU,
  hue: Math.random(),
}));

const drawWaves = (ctx, w, h, t) => {
  const bands = [
    {
      base: 0.70, amp: 14, k: 0.012, speed: 0.9, color: 'rgba(80, 216, 175, 0.20)',
    },
    {
      base: 0.78, amp: 18, k: 0.009, speed: -0.6, color: 'rgba(94, 193, 229, 0.16)',
    },
    {
      base: 0.86, amp: 11, k: 0.015, speed: 0.45, color: 'rgba(184, 239, 244, 0.10)',
    },
  ];

  bands.forEach((band) => {
    ctx.beginPath();
    for (let x = 0; x <= w; x += 4) {
      // two superposed sines with a slow beat envelope for an interference feel
      const envelope = Math.sin((x * 0.002) + (t * 0.2));
      const y = (band.base * h)
        + (band.amp * envelope * Math.sin((x * band.k) + (t * band.speed)))
        + ((band.amp * 0.5) * Math.sin((x * band.k * 1.7) - (t * band.speed * 1.3)));
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = band.color;
    ctx.lineWidth = 1.2;
    ctx.stroke();
  });
};

const drawParticles = (ctx, particles, h, t) => {
  particles.forEach((p) => {
    const twinkle = 0.25 + (0.55 * ((1 + Math.sin((t * 1.4) + p.phase)) / 2));
    const y = (p.y + (t * 6 * p.drift)) % h;
    const color = p.hue > 0.5
      ? `rgba(80, 216, 175, ${twinkle})`
      : `rgba(184, 239, 244, ${twinkle})`;
    ctx.beginPath();
    ctx.arc(p.x, y, p.r, 0, TAU);
    ctx.fillStyle = color;
    ctx.fill();
  });
};

const sphereGeom = (w, h) => ({
  cx: w * 0.76,
  cy: h * 0.46,
  r: Math.min(h * 0.30, 170),
  visible: w >= 700,
});

const drawBlochSphere = (ctx, w, h, t, qubit) => {
  const {
    cx, cy, r, visible,
  } = sphereGeom(w, h);
  if (!visible) return;

  ctx.strokeStyle = 'rgba(94, 193, 229, 0.35)';
  ctx.lineWidth = 1;

  // outer disc
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.stroke();

  // equator + latitudes
  [0, -0.45, 0.45].forEach((lat) => {
    const ry = r * 0.30 * Math.cos(lat * Math.PI * 0.5);
    const yOff = r * Math.sin(lat * Math.PI * 0.5);
    const rx = r * Math.cos(lat * Math.PI * 0.5);
    ctx.beginPath();
    ctx.ellipse(cx, cy + yOff, rx, ry, 0, 0, TAU);
    ctx.strokeStyle = lat === 0 ? 'rgba(94, 193, 229, 0.30)' : 'rgba(94, 193, 229, 0.14)';
    ctx.stroke();
  });

  // rotating longitude lines
  [0, 1, 2].forEach((i) => {
    const phi = (t * 0.25) + ((i * TAU) / 6);
    const rx = Math.abs(r * Math.cos(phi));
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, r, 0, 0, TAU);
    ctx.strokeStyle = 'rgba(94, 193, 229, 0.12)';
    ctx.stroke();
  });

  // vertical axis
  ctx.beginPath();
  ctx.moveTo(cx, cy - (r * 1.12));
  ctx.lineTo(cx, cy + (r * 1.12));
  ctx.strokeStyle = 'rgba(203, 222, 235, 0.25)';
  ctx.stroke();

  // state vector (precessing, or mid-measurement)
  const { theta, phi } = qubit;
  const vx = r * Math.sin(theta) * Math.cos(phi);
  const vy = (-r * Math.cos(theta)) + (r * Math.sin(theta) * Math.sin(phi) * 0.30);
  const tipX = cx + vx;
  const tipY = cy + vy;

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(tipX, tipY);
  ctx.strokeStyle = 'rgba(80, 216, 175, 0.85)';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, 10);
  glow.addColorStop(0, 'rgba(80, 216, 175, 0.9)');
  glow.addColorStop(1, 'rgba(80, 216, 175, 0)');
  ctx.beginPath();
  ctx.arc(tipX, tipY, 10, 0, TAU);
  ctx.fillStyle = glow;
  ctx.fill();

  // measurement flash + readout
  if (qubit.flash > 0) {
    ctx.beginPath();
    ctx.arc(tipX, tipY, 10 + ((1 - qubit.flash) * 30), 0, TAU);
    ctx.strokeStyle = `rgba(80, 216, 175, ${0.7 * qubit.flash})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  if (qubit.readout) {
    ctx.font = '500 15px "IBM Plex Mono", monospace';
    ctx.fillStyle = 'rgba(80, 216, 175, 0.9)';
    ctx.textAlign = 'center';
    ctx.fillText(`measured ${qubit.readout}`, cx, cy + r + 48);
  }

  // basis-state labels
  ctx.font = '500 13px "IBM Plex Mono", monospace';
  ctx.fillStyle = 'rgba(203, 222, 235, 0.6)';
  ctx.textAlign = 'center';
  ctx.fillText('|0⟩', cx, cy - (r * 1.12) - 10);
  ctx.fillText('|1⟩', cx, cy + (r * 1.12) + 20);
};

const BASE_THETA = 1.05;
const MEASURE_ANIM = 0.3;
const MEASURE_HOLD = 1.6;
const MEASURE_RELEASE = 0.6;

const lerp = (a, b, u) => a + ((b - a) * Math.min(1, Math.max(0, u)));

// Resolve the vector's angles at time t given an in-flight measurement.
// Collapse obeys the Born rule: for polar angle theta, P(|0>) = cos^2(theta/2).
const qubitAt = (t, measurement) => {
  if (!measurement) {
    return {
      theta: BASE_THETA, phi: t * 0.5, flash: 0, readout: null,
    };
  }

  const dt = t - measurement.t0;
  const target = measurement.pole === 0 ? 0.02 : Math.PI - 0.02;

  if (dt < MEASURE_ANIM) {
    return {
      theta: lerp(BASE_THETA, target, dt / MEASURE_ANIM),
      phi: measurement.phi0,
      flash: 1 - (dt / MEASURE_ANIM),
      readout: null,
    };
  }
  if (dt < MEASURE_ANIM + MEASURE_HOLD) {
    return {
      theta: target,
      phi: measurement.phi0,
      flash: 0,
      readout: measurement.pole === 0 ? '|0⟩' : '|1⟩',
    };
  }
  if (dt < MEASURE_ANIM + MEASURE_HOLD + MEASURE_RELEASE) {
    const u = (dt - MEASURE_ANIM - MEASURE_HOLD) / MEASURE_RELEASE;
    return {
      theta: lerp(target, BASE_THETA, u),
      phi: lerp(measurement.phi0, t * 0.5, u),
      flash: 0,
      readout: null,
    };
  }
  return null; // measurement finished; caller clears it
};

const QuantumField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let particles = [];
    let width = 0;
    let height = 0;

    // pause the loop while the hero is offscreen or the tab is hidden
    let inView = true;
    let running = false;

    let measurement = null;

    const render = (now) => {
      const t = now / 1000;
      let qubit = qubitAt(t, measurement);
      if (!qubit) {
        measurement = null;
        qubit = qubitAt(t, null);
      }
      ctx.clearRect(0, 0, width, height);
      drawWaves(ctx, width, height, t);
      drawParticles(ctx, particles, height, t);
      drawBlochSphere(ctx, width, height, t, qubit);
      if (running) rafId = window.requestAnimationFrame(render);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const prevWidth = width;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // regenerate only on width changes; mobile browsers fire resize on
      // scroll (URL bar collapse) with height-only changes, and regenerating
      // there makes every particle visibly teleport
      if (width !== prevWidth || particles.length === 0) {
        particles = makeParticles(width, height);
      }
      // the width/height assignment wiped the bitmap; with the rAF loop off
      // under reduced motion nothing would ever repaint it
      if (reducedMotion) render(performance.now());
    };

    const overSphere = (event) => {
      const rect = canvas.getBoundingClientRect();
      const {
        cx, cy, r, visible,
      } = sphereGeom(width, height);
      if (!visible) return false;
      const dx = (event.clientX - rect.left) - cx;
      const dy = (event.clientY - rect.top) - cy;
      return ((dx * dx) + (dy * dy)) <= (r * r);
    };

    // click the sphere -> measure the qubit (Born rule: P(|0>) = cos^2(theta/2))
    const onClick = (event) => {
      if (reducedMotion || measurement || !overSphere(event)) return;
      const p0 = Math.cos(BASE_THETA / 2) ** 2;
      measurement = {
        pole: Math.random() < p0 ? 0 : 1,
        t0: performance.now() / 1000,
        phi0: (performance.now() / 1000) * 0.5,
      };
    };

    // the hero's content container sits above the canvas and would swallow
    // pointer events over the sphere, so listen on the shared parent section
    const surface = canvas.parentElement;

    const onMove = (event) => {
      surface.style.cursor = (!reducedMotion && overSphere(event)) ? 'pointer' : '';
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      rafId = window.requestAnimationFrame(render);
    };

    const stop = () => {
      running = false;
      window.cancelAnimationFrame(rafId);
    };

    const syncRunning = () => {
      if (inView && !document.hidden) start();
      else stop();
    };

    const onVisibility = () => syncRunning();

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        inView = entries[0].isIntersecting;
        syncRunning();
      })
      : null;

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    surface.addEventListener('click', onClick);
    surface.addEventListener('mousemove', onMove);
    if (observer) observer.observe(canvas);

    if (reducedMotion) {
      render(0);
    } else {
      start();
    }

    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      surface.removeEventListener('click', onClick);
      surface.removeEventListener('mousemove', onMove);
      if (observer) observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};

export default QuantumField;
