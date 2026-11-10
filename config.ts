// Ajustes centrais: duração, transição e áudio.
export const FPS = 30;
export const SCENE_FRAMES = 180; // 6 s por cena
export const TRANSITION = 15; // 0,5 s
export const SCENES = 6;
export const TOTAL = SCENES * SCENE_FRAMES - (SCENES - 1) * TRANSITION; // 1005 f ≈ 33,5 s

// Coloque os MP3 em public/audio/narration/cena1.mp3 ... cena6.mp3 e mude para true.
export const NARRATION_ENABLED = false;
export const narrationFile = (n: number) => `audio/narration/cena${n}.mp3`;
// Efeitos sonoros opcionais: arquivo em public/audio/sfx/, frame local da cena.
export const SFX: {scene: number; file: string; at: number; volume?: number}[] = [
  // {scene: 3, file: "audio/sfx/impacto.mp3", at: 70},
];
