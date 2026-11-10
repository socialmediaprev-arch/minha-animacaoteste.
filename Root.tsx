import React from "react";
import {Composition, AbsoluteFill, Audio, Sequence, staticFile} from "remotion";
import {TransitionSeries, linearTiming} from "@remotion/transitions";
import {slide} from "@remotion/transitions/slide";
import {fade} from "@remotion/transitions/fade";
import {wipe} from "@remotion/transitions/wipe";
import {FPS, SCENE_FRAMES, TRANSITION, TOTAL, NARRATION_ENABLED, narrationFile, SFX} from "./config";
import {Scene1, Scene2, Scene3, Scene4, Scene5, Scene6} from "./scenes";

const list = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6];
const trans = [
  slide({direction: "from-right"}),
  fade(),
  wipe({direction: "from-left"}),
  slide({direction: "from-bottom"}),
  fade(),
];

const Main: React.FC = () => (
  <AbsoluteFill style={{background: "#17324D"}}>
    <TransitionSeries>
      {list.map((S, i) => (
        <React.Fragment key={i}>
          <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES}>
            <S />
            {NARRATION_ENABLED && <Audio src={staticFile(narrationFile(i + 1))} />}
            {SFX.filter((s) => s.scene === i + 1).map((s, k) => (
              <Sequence key={k} from={s.at}>
                <Audio src={staticFile(s.file)} volume={s.volume ?? 0.8} />
              </Sequence>
            ))}
          </TransitionSeries.Sequence>
          {i < list.length - 1 && (
            <TransitionSeries.Transition presentation={trans[i]} timing={linearTiming({durationInFrames: TRANSITION})} />
          )}
        </React.Fragment>
      ))}
    </TransitionSeries>
  </AbsoluteFill>
);

export const Root: React.FC = () => (
  <Composition id="PrevSaude" component={Main} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
);
