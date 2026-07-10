import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Background } from "../Background";
import { FadeIn, SlideUp, CountUp, TokenPill, W } from "../utils";

// ─── Mock terminal window ───
function TerminalWindow({ accentColor = "#9fe870" }: { accentColor?: string }) {
  const frame = useCurrentFrame();

  // Glow pulse
  const glowPulse = interpolate(
    frame,
    [0, 30, 60],
    [0.6, 1, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease) }
  );

  // Typing progress
  const totalBars = 40;
  const filled = Math.min(totalBars, Math.floor(frame / 3));
  const empty = Math.max(0, totalBars - filled);
  const pct = Math.min(100, Math.round((frame / 3 / totalBars) * 100));

  const line = `> Analyzing task context...
> Loading conversation history... [${accentColor}${"█".repeat(filled)}${"░".repeat(empty)}] ${pct}%
> Compressing memory files...
> Ready. Output tokens reduced.`;

  const visibleLength = Math.min(line.length, Math.floor(frame / 2));

  // Convert glowPulse (0.6-1) to hex alpha (roughly 0c-14)
  const glowAlpha = "0" + Math.round(glowPulse * 20).toString(16);

  return (
    <div
      style={{
        backgroundColor: W.ink,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: `0 0 60px ${accentColor}${glowAlpha}`,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "rgba(255,255,255,0.03)",
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28c840" }} />
        <div
          style={{
            marginLeft: 12,
            color: "#868685",
            fontSize: 14,
            fontFamily: "SF Mono, Monaco, monospace",
          }}
        >
          caveman-agent — zsh
        </div>
      </div>

      {/* Terminal body */}
      <div
        style={{
          padding: 24,
          fontFamily: "SF Mono, Monaco, 'Fira Code', monospace",
          fontSize: 18,
          lineHeight: 1.7,
          color: "#e2e8f0",
          minHeight: 200,
        }}
      >
        <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {line.slice(0, visibleLength)}
          {visibleLength < line.length && (
            <span
              style={{
                display: "inline-block",
                width: 10,
                height: 18,
                backgroundColor: accentColor,
                verticalAlign: "text-bottom",
                marginLeft: 2,
              }}
            />
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 18px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "rgba(255,255,255,0.02)",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <TokenPill label="input" value={visibleLength > 100 ? "~46%" : "..."} delayFrames={60} color={accentColor} />
          <TokenPill label="output" value={visibleLength > 100 ? "-65%" : "..."} delayFrames={80} color={accentColor} />
        </div>
        <div
          style={{
            color: "#868685",
            fontSize: 13,
            fontFamily: "SF Mono, Monaco, monospace",
          }}
        >
          ✓ done
        </div>
      </div>
    </div>
  );
}

// ─── Caveman scene ───
export function CavemanScene() {
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
      <Background accentColor="#9fe870" />

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
                  color: "#163300",
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: 7,
                  textTransform: "uppercase",
                }}
              >
                Caveman
              </div>
            </FadeIn>
            <FadeIn delayFrames={15} durationFrames={25}>
              <div
                style={{
                  color: "#454745",
                  fontSize: 22,
                }}
              >
                让 Codex{" "}
                <span
                  style={{
                    color: "#163300",
                    fontWeight: 700,
                    backgroundColor: "#e2f6d5",
                    borderRadius: 8,
                    padding: "2px 10px",
                  }}
                >
                  少说
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Terminal UI mockup */}
          <SlideUp delayFrames={20} durationFrames={35}>
            <TerminalWindow accentColor="#9fe870" />
          </SlideUp>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 28,
            }}
          >
            {[
              { label: "输出 Token 平均减少", value: 65, suffix: "%", delay: 60 },
              { label: "测试范围", value: "22%–87%", isString: true as const, delay: 80 },
              { label: "记忆文件输入 Token", value: 46, suffix: "%", delay: 100 },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: W.white,
                  borderRadius: 20,
                  border: `1px solid ${W.border}`,
                  padding: "18px 20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
              >
                <FadeIn delayFrames={stat.delay} durationFrames={20}>
                  <div
                    style={{
                      color: W.mute,
                      fontSize: 14,
                      marginBottom: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </div>
                </FadeIn>
                <SlideUp delayFrames={stat.delay + 5} durationFrames={25}>
                  <div
                    style={{
                      color: W.ink,
                      fontSize: 40,
                      fontWeight: 800,
                      fontVariantNumeric: "tabular-nums",
                      lineHeight: 1,
                    }}
                  >
                    {stat.isString ? (
                      stat.value
                    ) : (
                      <CountUp
                        end={stat.value as number}
                        delayFrames={stat.delay + 5}
                        durationFrames={40}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>
                </SlideUp>
              </div>
            ))}
          </div>

          {/* Caveat */}
          <FadeIn delayFrames={130} durationFrames={25}>
            <div
              style={{
                color: W.mute,
                fontSize: 17,
                marginTop: 20,
                textAlign: "right",
                fontStyle: "italic",
              }}
            >
              * 不减少推理 Token；完整任务未必节省 65%
            </div>
          </FadeIn>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
