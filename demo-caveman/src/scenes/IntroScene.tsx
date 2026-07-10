import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { FadeIn, SlideUp, Typewriter, W } from "../utils";
import { Background } from "../Background";

export function IntroScene() {
  const frame = useCurrentFrame();

  // Background parallax
  const bgScale = interpolate(frame, [0, 90], [1.02, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          transform: `scale(${bgScale})`,
          transformOrigin: "center center",
        }}
      >
        <Background accentColor="#9fe870" />
      </div>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "system-ui, -apple-system, -apple-system, sans-serif",
          padding: 60,
        }}
      >
        {/* White card */}
        <FadeIn delayFrames={5} durationFrames={30}>
          <div
            style={{
              backgroundColor: W.white,
              borderRadius: 32,
              border: `1px solid ${W.border}`,
              padding: "60px 70px",
              boxShadow:
                "0 2px 6px rgba(0,0,0,0.03), 0 12px 32px rgba(0,0,0,0.04)",
              maxWidth: 800,
              width: "100%",
              textAlign: "center",
            }}
          >
            {/* Eyebrow */}
            <FadeIn delayFrames={12} durationFrames={25}>
              <div
                style={{
                  color: W.inkDeep,
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: 6,
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                AI Coding Tools
              </div>
            </FadeIn>

            {/* Title */}
            <SlideUp delayFrames={25} durationFrames={40}>
              <div
                style={{
                  color: W.ink,
                  fontSize: 80,
                  fontWeight: 900,
                  letterSpacing: -2,
                  lineHeight: 1.05,
                }}
              >
                Caveman{" "}
                <span style={{ color: W.primary }}>&</span>{" "}
                Ponytail
              </div>
            </SlideUp>

            {/* Subtitle */}
            <FadeIn delayFrames={60} durationFrames={30}>
              <div
                style={{
                  color: W.body,
                  fontSize: 30,
                  marginTop: 28,
                  lineHeight: 1.4,
                  minHeight: 44,
                }}
              >
                <Typewriter
                  text="让 AI 少说，少写，更高效"
                  delayFrames={60}
                  charsPerSecond={14}
                  cursor
                />
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
