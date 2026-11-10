import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {Cat} from "../Cat";
import {C, Camera, Coin, FONT, Floaters, Floor, SlideText, useSpring} from "../ui";

const R = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const abs = (s: React.CSSProperties): React.CSSProperties => ({position: "absolute", ...s});
const Desk: React.FC<{top: number; color?: string}> = ({top, color = "#8A5A3C"}) => (
  <>
    <div style={abs({left: -40, right: -40, top, height: 70, background: color, borderRadius: 24, boxShadow: "0 24px 0 rgba(0,0,0,.2)"})} />
    <div style={abs({left: 0, right: 0, top: top + 70, bottom: 0, background: "#6B4128"})} />
  </>
);

/* CENA 1 — gatinho trabalhador */
export const Scene1: React.FC = () => {
  const f = useCurrentFrame();
  const cup = interpolate(f, [90, 115, 135, 150], [0, 1, 1, 0], R);
  const sip = interpolate(f, [90, 115], [0, 1], R);
  return (
    <AbsoluteFill style={{background: `linear-gradient(${C.mint}, #9ADBD0)`}}>
      <Camera from={1} to={1.35} ox={50} oy={55}>
        <div style={abs({left: 90, top: 260, width: 360, height: 420, background: "#BDE8FF", borderRadius: 30, border: "14px solid #fff"})}>
          <div style={abs({left: ((f * 2) % 500) - 120, top: 80, width: 120, height: 46, borderRadius: 30, background: "#fff"})} />
        </div>
        <div style={abs({right: 90, top: 330, width: 300, height: 360, background: "#fff", borderRadius: 20, opacity: 0.8})}>
          {[0, 1, 2, 3].map((i) => <div key={i} style={abs({left: 30, right: 30, top: 40 + i * 80, height: 36, background: i % 2 ? C.teal : C.sun, borderRadius: 10})} />)}
        </div>
        <Floaters n={6} />
        <div style={abs({left: 0, right: 0, top: 1200})}><Desk top={0} /></div>
        <div style={abs({left: 240, top: 780})}>
          <Cat tie typing mood="neutral" lookX={Math.sin(f / 14)} lookY={0.4} scale={1.5} pawRY={-cup * 70} style={{}} />
        </div>
        {/* notebook */}
        <div style={abs({left: 260, top: 1050, width: 560, height: 330})}>
          <div style={abs({inset: 0, background: "#2D3748", borderRadius: 24, border: "10px solid #CBD5E0"})}>
            {[0, 1, 2, 3, 4].map((i) => <div key={i} style={abs({left: 30, top: 30 + i * 52, height: 22, borderRadius: 10, background: i % 2 ? C.teal : C.sun, width: 80 + ((f * 7 + i * 90) % 340)})} />)}
          </div>
          <div style={abs({left: -50, right: -50, top: 320, height: 34, background: "#CBD5E0", borderRadius: 14})} />
        </div>
        {/* café com vapor */}
        <div style={abs({left: 820, top: 1130 - cup * 120 * sip, width: 90, height: 100})}>
          <div style={abs({inset: "20px 0 0 0", background: "#fff", borderRadius: "10px 10px 40px 40px", border: `6px solid ${C.coral}`})} />
          {[0, 1].map((i) => <div key={i} style={abs({left: 22 + i * 34, top: 10 - ((f * 1.5 + i * 15) % 30), width: 10, height: 30, background: "rgba(255,255,255,.8)", borderRadius: 8, opacity: 1 - ((f * 1.5 + i * 15) % 30) / 30})} />)}
        </div>
      </Camera>
    </AbsoluteFill>
  );
};

/* CENA 2 — orçamento começa a miar */
export const Scene2: React.FC = () => {
  const f = useCurrentFrame();
  const mood = f < 50 ? "neutral" : f < 110 ? "shock" : "worry";
  const bills = useSpring(5, 10);
  const pop = useSpring(55, 8);
  const shake = f > 110 ? Math.sin(f * 2) * 4 : 0;
  return (
    <AbsoluteFill style={{background: "linear-gradient(#7B6A8F, #4A3F5E)"}}>
      <Camera from={1} to={1.9} ox={50} oy={50}>
        <Floor top={1280} color="#3C334D" />
        <Desk top={1230} color="#9A6A48" />
        <div style={abs({left: 260 + shake, top: 740})}><Cat mood={mood} lookX={f < 50 ? 0 : 0.8} lookY={0.6} ears={f > 55 && f < 110 ? 1 : 0} scale={1.5} /></div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={abs({left: 120 + i * 150, top: 1050 + i * 12 - (1 - bills) * 900, width: 190, height: 250, background: "#fff", borderRadius: 10, transform: `rotate(${(i - 2) * 9}deg)`, boxShadow: "0 8px 0 rgba(0,0,0,.2)"})}>
            {[0, 1, 2].map((k) => <div key={k} style={abs({left: 16, right: 16 + k * 20, top: 30 + k * 34, height: 14, background: "#CBD5E0"})} />)}
            <div style={abs({left: 16, bottom: 20, fontFamily: FONT, color: C.coral, fontSize: 40})}>R$ {320 + i * 77}</div>
          </div>
        ))}
        <div style={abs({left: 760, top: 1060, width: 170, height: 230, background: "#222", borderRadius: 18, transform: `rotate(6deg) translateY(${Math.sin(f / 5) * 4}px)`})}>
          <div style={abs({left: 14, right: 14, top: 14, height: 50, background: "#9AE6B4", fontFamily: FONT, fontSize: 34, textAlign: "right", paddingRight: 8})}>{f > 70 ? "-4.280" : "..."}</div>
        </div>
        <div style={abs({left: 130, top: 700, transform: `scale(${pop})`, fontFamily: FONT, fontSize: 150, color: C.sun})}>?!</div>
        {[0, 1, 2, 3, 4].map((i) => <Coin key={i} x={300 + i * 110} delay={115 + i * 6} />)}
      </Camera>
      <SlideText text="Consultas e exames?" delay={20} top={240} size={92} bg={C.coral} />
    </AbsoluteFill>
  );
};

/* CENA 3 — descoberta + 70% */
export const Scene3: React.FC = () => {
  const f = useCurrentFrame();
  const found = f > 60;
  const n = useSpring(70, 7);
  const swipe = interpolate(f, [10, 55], [0, -260], R);
  const shake = f > 70 && f < 90 ? Math.sin(f * 3) * 10 * (1 - (f - 70) / 20) : 0;
  const burst = interpolate(f, [70, 95], [0, 1], R);
  const pf = useSpring(62, 12);
  return (
    <AbsoluteFill style={{background: found ? C.teal : "#5C6E8A", transition: "none"}}>
      <Camera from={1.05} to={1.15} ox={50} oy={75}>
        <AbsoluteFill>
          {found && Array.from({length: 16}).map((_, i) => <div key={i} style={abs({left: 540, top: 700, width: 14, height: 1500 * burst, background: "rgba(255,255,255,.18)", transformOrigin: "50% 0", transform: `rotate(${i * 22.5}deg)`})} />)}
        </AbsoluteFill>
        <div style={abs({left: 240, top: 1050})}><Cat mood={found ? "happy" : "worry"} ears={found ? 1 : 0} lookX={0} lookY={found ? -0.2 : 0.8} scale={1.5} /></div>
        <div style={abs({left: 370, top: 1230 + (found ? Math.sin(f / 6) * 5 : 0), width: 340, height: 600, background: "#111", borderRadius: 50, border: "10px solid #333", overflow: "hidden"})}>
          <div style={abs({left: 0, right: 0, top: swipe, height: 1200, background: "linear-gradient(#fff 0 25%, #DDE3EA 25% 50%, #fff 50% 75%, #EEF2F6 75%)"})} />
          {found && <div style={abs({inset: 0, background: C.teal, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT, color: "#fff", fontSize: 56, transform: `scale(${pf})`})}>PrevSaúde</div>}
        </div>
      </Camera>
      <div style={abs({left: 0, right: 0, top: 210, textAlign: "center", fontFamily: FONT, fontWeight: 800, color: "#fff", transform: `translate(${shake}px, ${shake}px) scale(${n})`})}>
        <div style={{fontSize: 430, lineHeight: 0.9, textShadow: `0 18px 0 ${C.navy}`}}>70%</div>
        <div style={{fontSize: 80, background: C.sun, color: C.navy, display: "inline-block", padding: "0 40px", borderRadius: 30, transform: "rotate(-3deg)"}}>de desconto</div>
        <div style={{fontSize: 64, marginTop: 24}}>em consultas e exames</div>
      </div>
    </AbsoluteFill>
  );
};

/* CENA 4 — clínica e família */
export const Scene4: React.FC = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 70], [-500, 190], R);
  const door = interpolate(f, [55, 85], [0, 1], R);
  const fam = [0, 1, 2].map((i) => useSpring(105 + i * 10, 9));
  return (
    <AbsoluteFill style={{background: "linear-gradient(#E6F7F5, #BFE8E2)"}}>
      <Camera from={1.1} to={1} ox={50} oy={60}>
        <Floor top={1450} color="#A8D5CE" />
        <div style={abs({left: 380, top: 440, width: 320, height: 160, background: C.teal, borderRadius: 30, color: "#fff", fontFamily: FONT, fontSize: 60, textAlign: "center", lineHeight: "160px"})}>Clínica</div>
        <div style={abs({left: 405, top: 640, width: 270, height: 790, background: "#7FD1C7"})}>
          <div style={abs({inset: 0, background: "#fff", transformOrigin: "0 50%", transform: `perspective(900px) rotateY(${-door * 100}deg)`, border: "8px solid #BFE8E2"})} />
        </div>
        <div style={abs({left: 780, top: 1000, opacity: interpolate(f, [30, 40], [0, 1], R)})}><Cat hue={170} scale={0.9} mood="happy" ears={Math.sin(f / 8) > 0.5 ? 1 : 0} style={{}} /></div>
        <div style={abs({left: 880, top: 1050 + Math.sin(f / 4) * 6, width: 90, height: 40, background: "#fff", borderRadius: 20, opacity: f > 80 && f < 105 ? 1 : 0})} />
        <div style={abs({left: x, top: 880})}><Cat tie walk mood={f > 70 ? "happy" : "neutral"} ears={f > 70 ? 1 : 0} scale={1.2} /></div>
        {f > 100 && [[60, 1000, 0, 0.8], [760, 1060, 40, 0.7], [-10, 1150, 280, 0.65]].map(([l, t, h, s], i) => (
          <div key={i} style={abs({left: l, top: t, transform: `scale(${fam[i]})`, transformOrigin: "50% 100%"})}><Cat hue={h} scale={s} mood="happy" /></div>
        ))}
        {f > 110 && [0, 1, 2, 3, 4].map((i) => <div key={i} style={abs({left: 200 + i * 160, top: 760 - ((f - 110 + i * 14) * 3) % 260, color: C.coral, fontSize: 70, opacity: 0.8})}>♥</div>)}
      </Camera>
      <SlideText text="Toda a família" delay={95} from="right" top={230} bg={C.teal} />
    </AbsoluteFill>
  );
};

/* CENA 5 — exame mais barato */
export const Scene5: React.FC = () => {
  const f = useCurrentFrame();
  const card = interpolate(f, [20, 55], [0, 1], R);
  const price = f < 70 ? "R$ 300" : "R$ 90";
  const tag = useSpring(75, 8);
  const coins = useSpring(100, 8);
  return (
    <AbsoluteFill style={{background: "linear-gradient(#EAF7F5, #CDEBE6)"}}>
      <Camera from={1} to={1.2} ox={50} oy={65}>
        <Floor top={1500} color="#B5DDD6" />
        <Desk top={1180} color="#D9E2EC" />
        <div style={abs({left: 130, top: 700, width: 380, height: 250, background: C.navy, borderRadius: 24, border: "10px solid #CBD5E0"})}>
          <div style={abs({left: 0, right: 0, top: 44, textAlign: "center", fontFamily: FONT, fontSize: 100, color: f < 70 ? C.coral : "#5EEAD4", textDecoration: f >= 70 && f < 75 ? "line-through" : "none"})}>{price}</div>
        </div>
        <div style={abs({left: 140, top: 560, transform: `scale(${tag}) rotate(-8deg)`, background: C.sun, color: C.navy, fontFamily: FONT, fontSize: 90, padding: "0 30px", borderRadius: 30})}>-70%</div>
        <div style={abs({left: 440, top: 850})}><Cat mood={f < 65 ? "worry" : "happy"} ears={f > 70 ? 1 : 0} lookX={-0.5} lookY={0.4} scale={1.5} pawRY={-card * 120} /></div>
        <div style={abs({left: 380 - card * 150, top: 1060 - card * 130 + (1 - card) * 120, width: 130, height: 84, background: C.teal, borderRadius: 12, transform: "rotate(-12deg)", opacity: card < 1 ? 1 : interpolate(f, [60, 70], [1, 0], R)})} />
        <div style={abs({left: 720, top: 1030, width: 240, height: 160, background: "#8A5A3C", borderRadius: 24})} />
        {[0, 1, 2, 3].map((i) => <div key={i} style={abs({left: 745 + i * 40, top: 1000 - coins * (30 + i * 16), width: 64, height: 64, borderRadius: 32, background: C.sun, border: "6px solid #E0A400", opacity: coins > 0.05 ? 1 : 0})} />)}
      </Camera>
      <SlideText text="Exame mais barato" delay={80} top={250} bg={C.teal} />
    </AbsoluteFill>
  );
};

/* CENA 6 — benefícios e fechamento */
export const Scene6: React.FC = () => {
  const f = useCurrentFrame();
  const final = f > 120;
  const icons = ["+", "%", "♥", "★", "✚"];
  const logo = useSpring(130, 10);
  return (
    <AbsoluteFill style={{background: `linear-gradient(${C.teal}, #087A6D)`}}>
      <Floaters color="rgba(255,255,255,.18)" />
      <Camera from={1} to={final ? 1.08 : 1.02} ox={50} oy={65}>
        <div style={abs({left: 120, top: 1050, width: 840, height: 640, background: C.coral, borderRadius: "300px 300px 60px 60px"})} />
        <div style={abs({left: 235, top: 820 + Math.sin(f / 15) * 4})}>
          <Cat tie shades mood="happy" ears={0} thumb={final} lookX={final ? 0 : Math.sin(f / 20)} lookY={0} scale={1.5} pawRY={-60} />
        </div>
        {icons.map((s, i) => {
          const a = f / 40 + (i * Math.PI * 2) / icons.length;
          const p = useSpring(15 + i * 8, 9);
          return <div key={i} style={abs({left: 480 + Math.cos(a) * 400, top: 880 + Math.sin(a) * 260, width: 130, height: 130, borderRadius: 65, background: C.sun, color: C.navy, fontFamily: FONT, fontSize: 90, textAlign: "center", lineHeight: "130px", transform: `scale(${p})`})}>{s}</div>;
        })}
      </Camera>
      <SlideText text="Benefícios que cuidam de você" delay={10} top={200} size={84} bg={C.navy} />
      <div style={abs({left: 0, right: 0, top: 1560, textAlign: "center", fontFamily: FONT, fontSize: 150, color: "#fff", transform: `scale(${logo})`, textShadow: `0 12px 0 ${C.navy}`})}>PrevSaúde</div>
    </AbsoluteFill>
  );
};
