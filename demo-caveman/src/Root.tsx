import { Composition, Sequence } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { CavemanScene } from "./scenes/CavemanScene";
import { PonytailScene } from "./scenes/PonytailScene";
import { OutroScene } from "./scenes/OutroScene";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CavemanPonytail"
        component={Main}
        durationInFrames={460}
        fps={30}
        width={1080}
        height={1080}
      />
    </>
  );
};

const INTRO_END = 90;
const CAVEMAN_START = INTRO_END;
const CAVEMAN_END = CAVEMAN_START + 150;
const PONYTAIL_START = CAVEMAN_END + 20;
const PONYTAIL_END = PONYTAIL_START + 150;
const OUTRO_START = PONYTAIL_END + 20;

function Main() {
  return (
    <>
      {/* Intro */}
      <SceneWrapper start={0} end={CAVEMAN_START}>
        <IntroScene />
      </SceneWrapper>

      {/* Caveman */}
      <SceneWrapper start={CAVEMAN_START} end={CAVEMAN_END}>
        <CavemanScene />
      </SceneWrapper>

      {/* Ponytail */}
      <SceneWrapper start={PONYTAIL_START} end={PONYTAIL_END}>
        <PonytailScene />
      </SceneWrapper>

      {/* Outro */}
      <SceneWrapper start={OUTRO_START} end={460}>
        <OutroScene />
      </SceneWrapper>
    </>
  );
}

function SceneWrapper({
  start,
  end,
  children,
}: {
  start: number;
  end: number;
  children: React.ReactNode;
}) {
  return (
    <Sequence from={start} durationInFrames={end - start} layout="none">
      {children}
    </Sequence>
  );
}
