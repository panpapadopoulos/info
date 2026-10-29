"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/* A faint field of drifting nodes linked like a distributed system. Small lime "packets"
   travel along the links; near the pointer, links light up. It pauses off-screen and
   in background tabs, and is a still frame under reduced motion. */

const LIME = "193, 255, 114";
const LINK_DIST = 150;
const GLOW_DIST = 190;
const AREA_PER_NODE = 10000;
const MAX_NODES = 80;
const PACKET_EVERY_MS = 420;
const PACKET_MS = 1300;

type Node = { x: number; y: number; vx: number; vy: number };
type Packet = { a: number; b: number; born: number };

export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let lastPacket = 0;
    let visible = false;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(MAX_NODES, Math.round((width * height) / AREA_PER_NODE));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
      packets = [];
    };

    /** Pairs of nodes close enough to be linked, with their distance. */
    const links = () => {
      const out: [number, number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < LINK_DIST) out.push([i, j, d]);
        }
      }
      return out;
    };

    const glowAt = (x: number, y: number) =>
      pointer ? Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / GLOW_DIST) : 0;

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const pairs = links();

      for (const [i, j, d] of pairs) {
        const a = nodes[i];
        const b = nodes[j];
        const near = 1 - d / LINK_DIST;
        const glow = glowAt((a.x + b.x) / 2, (a.y + b.y) / 2);
        ctx.strokeStyle =
          glow > 0
            ? `rgba(${LIME}, ${(0.1 + glow * 0.75) * near})`
            : `rgba(255, 255, 255, ${0.07 * near})`;
        ctx.lineWidth = glow > 0 ? 1 + glow : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (const n of nodes) {
        const glow = glowAt(n.x, n.y);
        ctx.fillStyle = glow > 0 ? `rgba(${LIME}, ${0.3 + glow * 0.7})` : "rgba(255, 255, 255, 0.16)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6 + glow * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (reduced) return;

      // Packets: spawn on a random link, travel its length, fade in and out.
      if (pairs.length && now - lastPacket > PACKET_EVERY_MS) {
        const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
        packets.push(Math.random() < 0.5 ? { a, b, born: now } : { a: b, b: a, born: now });
        lastPacket = now;
      }
      packets = packets.filter((p) => now - p.born < PACKET_MS);
      for (const p of packets) {
        const t = (now - p.born) / PACKET_MS;
        const a = nodes[p.a];
        const b = nodes[p.b];
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        ctx.fillStyle = `rgba(${LIME}, ${Math.sin(t * Math.PI) * 0.9})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (now: number) => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw(now);
      frame = requestAnimationFrame(tick);
    };

    const play = () => {
      if (!reduced && visible && !document.hidden && !frame) frame = requestAnimationFrame(tick);
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    seed();
    draw(performance.now());

    const resize = new ResizeObserver(() => {
      seed();
      draw(performance.now());
    });
    resize.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? pause() : play());
    document.addEventListener("visibilitychange", onVisibility);

    // The canvas ignores the pointer (the text above it stays clickable), so track it on the window.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      pointer = x >= 0 && y >= 0 && x <= r.width && y <= r.height ? { x, y } : null;
      if (reduced) draw(performance.now());
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      pause();
      resize.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 size-full" />;
}
