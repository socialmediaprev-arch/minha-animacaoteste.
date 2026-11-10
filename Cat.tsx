import React from "react";
import {useCurrentFrame} from "remotion";

export type Mood = "neutral" | "worry" | "happy" | "shock";
type P = {
  mood?: Mood; lookX?: number; lookY?: number; ears?: number; tie?: boolean; shades?: boolean;
  typing?: boolean; thumb?: boolean; walk?: boolean; pawLY?: number; pawRY?: number;
  scale?: number; hue?: number; style?: React.CSSProperties;
};
const FUR = "#F28C28", DARK = "#C96A12", LIGHT = "#FFD9A8", INK = "#2B1B12";

/** Gatinho laranja em SVG com sombreamento em camadas. Mesma identidade em todas as cenas. */
export const Cat: React.FC<P> = ({mood = "neutral", lookX = 0, lookY = 0, ears = 0, tie = false, shades = false, typing = false, thumb = false, walk = false, pawLY = 0, pawRY = 0, scale = 1, hue = 0, style}) => {
  const f = useCurrentFrame();
  const blink = f % 100 < 4 ? 0.1 : 1;
  const bob = Math.sin(f / 10) * (walk ? 8 : 3);
  const tail = Math.sin(f / 12) * 16;
  const tp = typing ? Math.sin(f * 1.2) * 12 : 0;
  const er = mood === "shock" ? 31 : mood === "happy" ? 25 : 27;
  const px = lookX * 9, py = lookY * 7;
  const leg = walk ? Math.sin(f / 3.5) * 14 : 0;
  const mouth = {
    neutral: <path d="M180 226 Q190 238 200 228 Q210 238 220 226" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />,
    worry: <path d="M178 238 Q200 216 222 238" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />,
    happy: <path d="M172 220 Q200 266 228 220 Z" fill="#B23A48" stroke={INK} strokeWidth="5" strokeLinejoin="round" />,
    shock: <ellipse cx="200" cy="236" rx="13" ry="18" fill="#B23A48" stroke={INK} strokeWidth="5" />,
  }[mood];
  const eye = (cx: number) => (
    <g>
      <ellipse cx={cx} cy={176} rx={er} ry={er * blink} fill="#fff" stroke={INK} strokeWidth="4" />
      <circle cx={cx + px} cy={176 + py} r={(mood === "happy" ? 17 : mood === "shock" ? 9 : 15) * (blink < 1 ? 0.2 : 1)} fill={INK} />
      <circle cx={cx + px - 5} cy={176 + py - 6} r={mood === "happy" ? 8 : 5} fill="#fff" />
      {mood === "happy" && <circle cx={cx + px + 6} cy={176 + py + 6} r="4" fill="#fff" />}
      {mood === "worry" && <path d={`M${cx - 30} ${cx < 200 ? 138 : 150} L${cx + 30} ${cx < 200 ? 150 : 138}`} stroke={INK} strokeWidth="6" strokeLinecap="round" />}
    </g>
  );
  return (
    <svg viewBox="0 0 400 480" width={400 * scale} height={480 * scale} style={{overflow: "visible", filter: hue ? `hue-rotate(${hue}deg)` : undefined, ...style}}>
      <g transform={`translate(0 ${bob})`}>
        {/* cauda */}
        <g transform={`rotate(${tail} 290 380)`}><path d="M290 380 Q380 360 360 280 Q350 250 372 240" stroke={FUR} strokeWidth="34" fill="none" strokeLinecap="round" /><path d="M360 285 Q352 255 372 240" stroke={DARK} strokeWidth="12" fill="none" strokeLinecap="round" /></g>
        {/* pernas */}
        <ellipse cx={150 + leg} cy="450" rx="42" ry="22" fill={FUR} stroke={DARK} strokeWidth="4" />
        <ellipse cx={250 - leg} cy="450" rx="42" ry="22" fill={FUR} stroke={DARK} strokeWidth="4" />
        {/* corpo */}
        <ellipse cx="200" cy="350" rx="108" ry="105" fill={FUR} />
        <ellipse cx="200" cy="375" rx="62" ry="68" fill={LIGHT} />
        <path d="M105 320 q22 8 28 26 M295 320 q-22 8 -28 26" stroke={DARK} strokeWidth="9" strokeLinecap="round" fill="none" />
        {tie && <g><polygon points="188,262 212,262 206,278 194,278" fill="#0E9F8E" /><polygon points="194,278 206,278 216,340 200,356 184,340" fill="#0E9F8E" stroke="#0A7A6D" strokeWidth="4" /></g>}
        {/* orelhas */}
        <g transform={`translate(0 ${-ears * 18})`}>
          <polygon points="104,110 118,28 178,78" fill={FUR} stroke={DARK} strokeWidth="5" strokeLinejoin="round" /><polygon points="120,92 126,52 156,78" fill="#F5A3A0" />
          <polygon points="296,110 282,28 222,78" fill={FUR} stroke={DARK} strokeWidth="5" strokeLinejoin="round" /><polygon points="280,92 274,52 244,78" fill="#F5A3A0" />
        </g>
        {/* cabeça */}
        <ellipse cx="200" cy="172" rx="112" ry="100" fill={FUR} />
        <ellipse cx="200" cy="215" rx="58" ry="42" fill={LIGHT} />
        <path d="M200 74 v28 M172 80 l6 24 M228 80 l-6 24" stroke={DARK} strokeWidth="9" strokeLinecap="round" />
        {eye(152)}{eye(248)}
        {shades && <g><rect x="112" y="148" width="84" height="56" rx="22" fill="#111" /><rect x="204" y="148" width="84" height="56" rx="22" fill="#111" /><rect x="190" y="162" width="20" height="8" fill="#111" /><path d="M122 160 l30 0" stroke="#fff" strokeOpacity=".5" strokeWidth="6" strokeLinecap="round" /></g>}
        <ellipse cx="116" cy="214" rx="16" ry="9" fill="#F5A3A0" opacity=".6" /><ellipse cx="284" cy="214" rx="16" ry="9" fill="#F5A3A0" opacity=".6" />
        <path d="M188 204 h24 l-12 14 z" fill="#E0707A" />{mouth}
        <g stroke={INK} strokeWidth="2.5" opacity=".6"><path d="M130 222 l-48 -6 M130 232 l-48 6 M270 222 l48 -6 M270 232 l48 6" /></g>
        {/* patas */}
        <ellipse cx={150} cy={372 + pawLY + tp} rx="34" ry="26" fill={FUR} stroke={DARK} strokeWidth="4" />
        {thumb ? (
          <g><ellipse cx="290" cy="270" rx="34" ry="40" fill={FUR} stroke={DARK} strokeWidth="4" /><rect x="278" y="214" width="22" height="48" rx="11" fill={FUR} stroke={DARK} strokeWidth="4" /></g>
        ) : (
          <ellipse cx={250} cy={372 + pawRY - tp} rx="34" ry="26" fill={FUR} stroke={DARK} strokeWidth="4" />
        )}
      </g>
    </svg>
  );
};
