import React from "react";
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {loadFont} from "@remotion/google-fonts/Baloo2";

export const {fontFamily: FONT} = loadFont("normal", {weights: ["700", "800"]});
export const C = {teal: "#0E9F8E", navy: "#17324D", sun: "#FFC83D", coral: "#FF6B57", fur: "#F28C28", mint: "#DFF5F1", white: "#FFFFFF"};

export const useSpring = (delay = 0, damping = 12) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config: {damping, stiffness: 140}});
};

/** Câmera: zoom/pan contínuo durante a cena. */
export const Camera: React.FC<{from?: number; to: number; ox?: number; oy?: number; children: React.ReactNode}> = ({from = 1, to, ox = 50, oy = 50, children}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 180], [from, to], {extrapolateRight: "clamp"});
  return <AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: `${ox}% ${oy}%`}}>{children}</AbsoluteFill>;
};

/** Texto grande que entra pela lateral. */
export const SlideText: React.FC<{text: string; delay: number; from?: "left" | "right"; top: number; size?: number; color?: string; bg?: string}> = ({text, delay, from = "left", top, size = 96, color = C.white, bg = C.navy}) => {
  const p = useSpring(delay, 14);
  const x = (1 - p) * (from === "left" ? -1200 : 1200);
  return (
    <div style={{position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", transform: `translateX(${x}px)`}}>
      <div style={{fontFamily: FONT, fontWeight: 800, fontSize: size, color, background: bg, padding: "10px 44px", borderRadius: 40, transform: "rotate(-3deg)", boxShadow: "0 14px 0 rgba(0,0,0,.18)", textAlign: "center", lineHeight: 1.05}}>{text}</div>
    </div>
  );
};

export const Coin: React.FC<{x: number; delay: number; fall?: number}> = ({x, delay, fall = 700}) => {
  const f = useCurrentFrame();
  const t = Math.max(0, f - delay);
  const y = 0.5 * 0.9 * t * t;
  if (t === 0 || y > fall) return null;
  return (
    <div style={{position: "absolute", left: x, top: 1000 + y, width: 70, height: 70, borderRadius: 35, background: C.sun, border: "6px solid #E0A400", transform: `scaleX(${Math.cos(t / 3)})`, color: "#B07A00", fontFamily: FONT, fontSize: 38, textAlign: "center", lineHeight: "58px"}}>R$</div>
  );
};

/** Partículas flutuantes para dar vida ao fundo. */
export const Floaters: React.FC<{color?: string; n?: number}> = ({color = "rgba(255,255,255,.35)", n = 9}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {Array.from({length: n}).map((_, i) => (
        <div key={i} style={{position: "absolute", left: (i * 137) % 1000, top: ((i * 211 + f * (0.6 + (i % 3) * 0.3)) % 2000) - 60, width: 30 + (i % 4) * 18, height: 30 + (i % 4) * 18, borderRadius: "50%", background: color}} />
      ))}
    </AbsoluteFill>
  );
};

export const Floor: React.FC<{top: number; color: string}> = ({top, color}) => (
  <div style={{position: "absolute", left: 0, right: 0, top, bottom: 0, background: color}} />
);
