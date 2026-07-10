import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../Background";
import { FadeIn, SlideUp, CountUp, W } from "../utils";

// ─── Code diff: over-engineered → optimized ───
const OVER_ENGINEERED_LINES = [
  "// Over-engineered: 340 tokens",
  "class TokenReducer {",
  "  constructor(ctx, opts = {}) {",
  "    this.ctx = ctx || {};",
  "    this.opts = Object.assign({max:100},opts);",
  "  }",
  "  async compress(input) {",
  "    if (!input) return null;",
  "    const tokens = this.tokenize(input);",
  "    const filtered = await this.filter(tokens);",
  "    const deduped = this.dedup(filtered);",
  "    return this.rebuild(deduped);",
  "  }",
  "  tokenize(t) { /* 80 lines... */ }",
  "  filter(t)   { /* 60 lines... */ }",
  "  dedup(t)    { /* 40 lines... */ }",
  "  rebuild(t)  { /* 50 lines... */ }",
  "}",
];

const OPTIMIZED_LINES = [
  "// Optimized: 22 tokens",
  "compress(input) {",
  "  return input?.split(/\\s+/)",
  "    .filter((v,i,a) => a.indexOf(v) === i)",
  "    .join(\" \");",
  "}",
];

// ─── Mock IDE window ───
function CodeEditorWindow({ accentColor = "#fb923c" }: { accentColor?: string }) {
  const frame = useCurrentFrame();

  // Left (before) line count: 14 → 2
  const leftLineCount = Math.max(2, Math.round(interpolate(frame, [20, 80], [14, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })));

  // Right (after) line count: 2 → 6
  const rightLineCount = Math.max(2, Math.round(interpolate(frame, [80, 120], [2, 6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })));

  return (
    <div
      style={{
        backgroundColor: W.white,
        borderRadius: 16,
        border: `1px solid ${W.border}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderBottom: `1px solid ${W.border}`,
          backgroundColor: "#fafbfa",
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
        </div>
        <div
          style={{
            color: W.mute,
            fontSize: 13,
            fontFamily: "SF Mono, Monaco, monospace",
          }}
        >
          compress.ts — Ponytail
        </div>
      </div>

      {/* Diff view */}
      <div
        style={{
          display: "flex",
          fontFamily: "SF Mono, Monaco, 'Fira Code', monospace",
          fontSize: 14,
          lineHeight: 1.6,
          minHeight: 240,
        }}
      >
        {/* Left: before (over-engineered) */}
        <div
          style={{
            flex: 1,
            padding: "20px 16px",
            borderRight: `1px solid ${W.border}`,
            backgroundColor: "#fffafa",
            position: "relative",
          }}
        >
          {/* Line count badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: W.negativeBg,
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 6,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {leftLineCount} lines
          </div>
          <div style={{ color: "#a71e24", marginBottom: 10, fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>
            BEFORE
          </div>
          <pre
            style={{
              color: W.ink,
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {OVER_ENGINEERED_LINES.slice(0, leftLineCount).join("\n")}
            {leftLineCount < OVER_ENGINEERED_LINES.length ? "\n..." : ""}
          </pre>
        </div>

        {/* Center divider with reduction badge */}
        <div
          style={{
            width: 1,
            backgroundColor: W.border,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#e2f6d5",
              color: "#163300",
              fontSize: 13,
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: 8,
              whiteSpace: "nowrap",
              boxShadow: "0 2px 6px rgba(159,232,112,0.3)",
            }}
          >
            <CountUp end={94} delayFrames={70} durationFrames={30} suffix="% ↓" />
          </div>
        </div>

        {/* Right: after (optimized) */}
        <div
          style={{
            flex: 1,
            padding: "20px 16px",
            backgroundColor: "#f7fdf4",
            position: "relative",
          }}
        >
          {/* Line count badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "#163300",
              color: W.primary,
              fontSize: 12,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 6,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {rightLineCount} lines
          </div>
          <div style={{ color: "#163300", marginBottom: 10, fontSize: 12, fontWeight: 700, letterSpacing: 2 }}>
            AFTER
          </div>
          <pre
            style={{
              color: W.ink,
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {OPTIMIZED_LINES.slice(0, rightLineCount).join("\n")}
          </pre>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderTop: `1px solid ${W.border}`,
          backgroundColor: "#fafbfa",
        }}
      >
        <div style={{ display: "flex", gap: 14 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: W.body,
              fontSize: 14,
            }}
          >
            <span style={{ color: "#d03238" }}>−</span> Token 22%
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: W.body,
              fontSize: 14,
            }}
          >
            <span style={{ color: "#d03238" }}>−</span> 成本 20%
          </div>
        </div>
        <div
          style={{
            color: W.positive,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          ✓ optimized
        </div>
      </div>
    </div>
  );
}

// ─── Ponytail scene ───
export function PonytailScene() {
  const frame = useCurrentFrame();

  // Entrance
  const entranceOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const entranceTY = interpolate(frame, [0, 35], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <Background accentColor="#fb923c" />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: 60,
        }}
      >
        <div
          style={{
            opacity: entranceOpacity,
            transform: `translateY(${entranceTY}px)`,
            width: "100%",
            maxWidth: 880,
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 32, display: "flex", alignItems: "baseline", gap: 20 }}>
            <FadeIn delayFrames={5} durationFrames={25}>
              <div
                style={{
                  color: "#a71e24",
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: 7,
                  textTransform: "uppercase",
                }}
              >
                Ponytail
              </div>
            </FadeIn>
            <FadeIn delayFrames={15} durationFrames={25}>
              <div
                style={{
                  color: W.body,
                  fontSize: 22,
                }}
              >
                让 Codex{" "}
                <span
                  style={{
                    color: "#a71e24",
                    fontWeight: 700,
                    backgroundColor: "#ffe4e5",
                    borderRadius: 8,
                    padding: "2px 10px",
                  }}
                >
                  少写
                </span>
              </div>
            </FadeIn>
          </div>

          {/* IDE mockup */}
          <SlideUp delayFrames={20} durationFrames={35}>
            <CodeEditorWindow accentColor="#fb923c" />
          </SlideUp>

          {/* Stats grid */}
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 24,
            }}
          >
            {[
              { label: "Token 平均减少", value: 22, suffix: "%", delay: 90 },
              { label: "成本平均减少", value: 20, suffix: "%", delay: 110 },
              { label: "执行时间平均减少", value: 27, suffix: "%", delay: 130 },
              { label: "新增代码平均减少", value: 54, suffix: "%", delay: 150 },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: W.white,
                  borderRadius: 16,
                  border: `1px solid ${W.border}`,
                  padding: "14px 16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
              >
                <FadeIn delayFrames={stat.delay} durationFrames={20}>
                  <div
                    style={{
                      color: W.mute,
                      fontSize: 12,
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.label}
                  </div>
                </FadeIn>
                <SlideUp delayFrames={stat.delay + 5} durationFrames={25}>
                  <div
                    style={{
                      color: W.ink,
                      fontSize: 30,
                      fontWeight: 800,
                      fontVariantNumeric: "tabular-nums",
                      lineHeight: 1,
                    }}
                  >
                    <CountUp
                      end={stat.value}
                      delayFrames={stat.delay + 5}
                      durationFrames={35}
                      suffix={stat.suffix}
                    />
                  </div>
                </SlideUp>
              </div>
            ))}
          </div>

          {/* Highlight: 94% */}
          <FadeIn delayFrames={170} durationFrames={30}>
            <div
              style={{
                marginTop: 18,
                backgroundColor: W.negativeBg,
                borderRadius: 14,
                padding: "16px 24px",
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  color: W.white,
                  fontSize: 16,
                  lineHeight: 1.4,
                }}
              >
                特定过度设计任务：代码量最高减少
              </div>
              <div
                style={{
                  color: W.primary,
                  fontSize: 42,
                  fontWeight: 900,
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                }}
              >
                <CountUp end={94} delayFrames={175} durationFrames={40} suffix="%" />
              </div>
            </div>
          </FadeIn>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
