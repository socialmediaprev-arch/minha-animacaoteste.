# PrevSaúde — anúncio 9:16 (Remotion)
1. `npm install`
2. `npm run dev` — prévia no navegador (Remotion Studio)
3. `npm run build` — gera `out/prevsaude.mp4` (1080×1920, 30 fps, ~33,5 s)

Narração: coloque `cena1.mp3`…`cena6.mp3` em `public/audio/narration/` e ligue `NARRATION_ENABLED` em `src/config.ts`.
Efeitos sonoros: liste em `SFX` (mesmo arquivo). Duração das cenas/transições: `src/config.ts`.
Cada cena é um componente independente em `src/scenes/index.tsx`; o gatinho é `src/Cat.tsx`.
