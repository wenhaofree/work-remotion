import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { FadeIn, SlideUp, W } from "../utils";

export function OutroScene() {
  const frame = useCurrentFrame();

  // Core phrase entrance
  const phraseOpacity = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const phraseScale = interpolate(frame, [5, 35], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Number row
  const numbersOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const numbersTY = interpolate(frame, [50, 80], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Bottom note
  const bottomOpacity = interpolate(frame, [95, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: W.bg,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 60,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 50,
          }}
        >
          {/* Core message */}
          <SlideUp delayFrames={5} durationFrames={35}>
            <div
              style={{
                opacity: phraseOpacity,
                transform: `scale(${phraseScale})`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: W.ink,
                  fontSize: 52,
                  fontWeight: 800,
                  lineHeight: 1.4,
                  maxWidth: 960,
                  letterSpacing: -1,
                }}
              >
                Caveman 让 Codex{" "}
                <span
                  style={{
                    color: W.inkDeep,
                    backgroundColor: W.primaryPale,
                    padding: "4px 16px",
                    borderRadius: 10,
                  }}
                >
                  少说
                </span>
                <span style={{ color: W.mute, margin: "0 18px", fontWeight: 400 }}>
                  /
                </span>
                Ponytail 让 Codex{" "}
                <span
                  style={{
                    color: "#a71e24",
                    backgroundColor: "#ffe4e5",
                    padding: "4px 16px",
                    borderRadius: 10,
                  }}
                >
                  少写
                </span>
              </div>
            </div>
          </SlideUp>

          {/* Number highlight */}
          <SlideUp delayFrames={50} durationFrames={30}>
            <div
              style={{
                opacity: numbersOpacity,
                transform: `translateY(${numbersTY}px)`,
                display: "flex",
                gap: 60,
                alignItems: "center",
              }}
            >
              {/* Caveman card */}
              <div
                style={{
                  backgroundColor: W.white,
                  borderRadius: 24,
                  border: `1px solid ${W.border}`,
                  padding: "28px 36px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  textAlign: "center",
                  minWidth: 220,
                }}
              >
                <div
                  style={{
                    color: W.inkDeep,
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Caveman
                </div>
                <div
                  style={{
                    color: W.primary,
                    fontSize: 72,
                    fontWeight: 900,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                    backgroundColor: W.primaryPale,
                    borderRadius: 16,
                    padding: "10px 24px",
                  }}
                >
                  65<span style={{ fontSize: 40 }}>%</span>
                </div>
                <div
                  style={{
                    color: W.body,
                    fontSize: 15,
                    marginTop: 10,
                  }}
                >
                  输出 Token 减少
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  height: 100,
                  backgroundColor: W.border,
                }}
              />

              {/* Ponytail card */}
              <div
                style={{
                  backgroundColor: W.white,
                  borderRadius: 24,
                  border: `1px solid ${W.border}`,
                  padding: "28px 36px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  textAlign: "center",
                  minWidth: 220,
                }}
              >
                <div
                  style={{
                    color: "#a71e24",
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Ponytail
                </div>
                <div
                  style={{
                    color: "#a71e24",
                    fontSize: 72,
                    fontWeight: 900,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                    backgroundColor: "#ffe4e5",
                    borderRadius: 16,
                    padding: "10px 24px",
                  }}
                >
                  22<span style={{ fontSize: 40 }}>%</span>
                </div>
                <div
                  style={{
                    color: W.body,
                    fontSize: 15,
                    marginTop: 10,
                  }}
                >
                  真实任务 Token 减少
                </div>
              </div>
            </div>
          </SlideUp>

          {/* Bottom tagline */}
          <FadeIn delayFrames={100} durationFrames={25}>
            <div
              style={{
                opacity: bottomOpacity,
                color: W.mute,
                fontSize: 20,
                textAlign: "center",
                lineHeight: 1.5,
                maxWidth: 700,
              }}
            >
              一个减少输出，一个减少代码。双剑合璧，让 AI 编码更高效。
            </div>
          </FadeIn>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
