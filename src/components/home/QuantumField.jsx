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
      // two superposed sines with a slow beat envelope — interference feel
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

const drawBlochSphere = (ctx, w, h, t) => {
  if (w < 700) return;

  const cx = w * 0.76;
  const cy = h * 0.46;
  const r = Math.min(h * 0.30, 170);

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

  // precessing state vector
  const theta = 1.05;
  const phi = t * 0.5;
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

  // basis-state labels
  ctx.font = '500 13px "IBM Plex Mono", monospace';
  ctx.fillStyle = 'rgba(203, 222, 235, 0.6)';
  ctx.textAlign = 'center';
  ctx.fillText('|0⟩', cx, cy - (r * 1.12) - 10);
  ctx.fillText('|1⟩', cx, cy + (r * 1.12) + 20);
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

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = makeParticles(width, height);
    };

    const render = (now) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, width, height);
      drawWaves(ctx, width, height, t);
      drawParticles(ctx, particles, height, t);
      drawBlochSphere(ctx, width, height, t);
      if (!reducedMotion) rafId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    if (reducedMotion) {
      render(0);
    } else {
      rafId = window.requestAnimationFrame(render);
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
};

export default QuantumField;
