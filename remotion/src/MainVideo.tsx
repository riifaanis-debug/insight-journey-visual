import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Bg } from "./components/Bg";
import { Intro, CycleOverview, Interstitial } from "./scenes/Intro";
import {
  S01,
  S02,
  S03,
  S04,
  S05,
  S06,
  S07,
  S08,
  S09,
  S10,
  S11,
  S12,
} from "./scenes/Cycle1";
import { A1, A2, A3, A4, A5, A6, A7, A8 } from "./scenes/Applied";
import { Finale } from "./scenes/Finale";
import { FSTACK } from "./font";

const TRANSITION = 18;

const SCENES: { c: React.FC; d: number }[] = [
  { c: Intro, d: 140 },
  { c: S01, d: 115 },
  { c: S02, d: 110 },
  { c: S03, d: 115 },
  { c: S04, d: 130 },
  { c: S05, d: 115 },
  { c: S06, d: 110 },
  { c: S07, d: 115 },
  { c: S08, d: 135 },
  { c: S09, d: 115 },
  { c: S10, d: 115 },
  { c: S11, d: 110 },
  { c: S12, d: 115 },
  { c: CycleOverview, d: 130 },
  { c: Interstitial, d: 100 },
  { c: A1, d: 115 },
  { c: A2, d: 135 },
  { c: A3, d: 135 },
  { c: A4, d: 110 },
  { c: A5, d: 125 },
  { c: A6, d: 135 },
  { c: A7, d: 120 },
  { c: A8, d: 140 },
  { c: Finale, d: 215 },
];

export const TOTAL =
  SCENES.reduce((a, s) => a + s.d, 0) - TRANSITION * (SCENES.length - 1);

export const MainVideo: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: FSTACK }}>
    <Bg />
    <TransitionSeries>
      {SCENES.flatMap((s, i) => {
        const Comp = s.c;
        const nodes = [
          <TransitionSeries.Sequence key={`s${i}`} durationInFrames={s.d}>
            <Comp />
          </TransitionSeries.Sequence>,
        ];
        if (i < SCENES.length - 1) {
          nodes.push(
            <TransitionSeries.Transition
              key={`t${i}`}
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANSITION })}
            />,
          );
        }
        return nodes;
      })}
    </TransitionSeries>
  </AbsoluteFill>
);
