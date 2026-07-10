import { useCurrentFrame, interpolate, Easing } from "remotion";

// ─── Wise Design Tokens ───
export const W = {
  bg: "#e8ebe6",
  white: "#ffffff",
  ink: "#0e0f0c",
  inkDeep: "#163300",
  body: "#454745",
  mute: "#868685",
  primary: "#9fe870",
  primaryPale: "#e2f6d5",
  primaryActive: "#cdffad",
  positive: "#2ead4b",
  negative: "#d03238",
  negativeBg: "#320707",
  accentOrange: "#ffc091",
  accentCyan: "#38c8ff",
  border: "#d4d8d0",
};

// ─── Utility: clamp easing ───
const clampEase = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
};

export function FadeIn({
  children,
  delayFrames = 0,
  durationFrames = 25,
}: {
  children: React.ReactNode;
  delayFrames?: number;
  durationFrames?: number;
}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delayFrames, [0, durationFrames], [0, 1], clampEase);
  return <div style={{ opacity }}>{children}</div>;
}

export function SlideUp({
  children,
  delayFrames = 0,
  durationFrames = 30,
  offsetPx = 24,
}: {
  children: React.ReactNode;
  delayFrames?: number;
  durationFrames?: number;
  offsetPx?: number;
}) {
  const frame = useCurrentFrame();
  const ty = interpolate(frame - delayFrames, [0, durationFrames], [offsetPx, 0], clampEase);
  const opacity = interpolate(
    frame - delayFrames,
    [0, Math.floor(durationFrames * 0.6)],
    [0, 1],
    clampEase
  );
  return (
    <div
      style={{
        opacity,
        translate: `0px ${ty}px`,
      }}
    >
      {children}
    </div>
  );
}

export function ScaleIn({
  children,
  delayFrames = 0,
  durationFrames = 35,
  from = 0.92,
}: {
  children: React.ReactNode;
  delayFrames?: number;
  durationFrames?: number;
  from?: number;
}) {
  const frame = useCurrentFrame();
  const scale = interpolate(frame - delayFrames, [0, durationFrames], [from, 1], clampEase);
  const opacity = interpolate(
    frame - delayFrames,
    [0, Math.floor(durationFrames * 0.5)],
    [0, 1],
    clampEase
  );
  return (
    <div
      style={{
        opacity,
        scale,
      }}
    >
      {children}
    </div>
  );
}

export function Typewriter({
  text,
  delayFrames = 0,
  charsPerSecond = 16,
  cursor = false,
  cursorColor = W.primary,
}: {
  text: string;
  delayFrames?: number;
  charsPerSecond?: number;
  cursor?: boolean;
  cursorColor?: string;
}) {
  const frame = useCurrentFrame();
  const totalFrames = (text.length * 30) / charsPerSecond;
  const charIndex = Math.floor(
    interpolate(frame - delayFrames, [0, totalFrames], [0, text.length], clampEase)
  );
  const displayText = text.slice(0, charIndex);

  return (
    <span>
      {displayText}
      {cursor && charIndex < text.length && (
        <span
          style={{
            display: "inline-block",
            width: 3,
            height: 0.75,
            backgroundColor: cursorColor,
            marginLeft: 4,
            verticalAlign: "text-bottom",
          }}
        />
      )}
    </span>
  );
}

export function CountUp({
  end,
  delayFrames = 0,
  durationFrames = 35,
  suffix = "",
  prefix = "",
}: {
  end: number;
  delayFrames?: number;
  durationFrames?: number;
  suffix?: string;
  prefix?: string;
}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delayFrames, [0, durationFrames], [0, 1], {
    ...clampEase,
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const current = Math.round(progress * end);
  return <span>{prefix}{current}{suffix}</span>;
}

export function ProgressBar({
  percent,
  delayFrames = 0,
  durationFrames = 50,
  color = W.primary,
  height = 10,
  showLabel = false,
}: {
  percent: number;
  delayFrames?: number;
  durationFrames?: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
}) {
  const frame = useCurrentFrame();
  const width = interpolate(frame - delayFrames, [0, durationFrames], [0, percent], clampEase);

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          height,
          backgroundColor: W.border,
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: height / 2,
          }}
        />
      </div>
      {showLabel && (
        <div
          style={{
            color: W.mute,
            fontSize: 14,
            marginTop: 6,
            textAlign: "right",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <CountUp end={Math.round(percent)} delayFrames={delayFrames} durationFrames={durationFrames} suffix="%" />
        </div>
      )}
    </div>
  );
}

export function Divider({
  color = W.border,
  delayFrames = 0,
}: {
  color?: string;
  delayFrames?: number;
}) {
  const frame = useCurrentFrame();
  const scaleX = interpolate(frame - delayFrames, [0, 18], [0, 1], clampEase);
  return (
    <div
      style={{
        width: "100%",
        height: 1,
        backgroundColor: color,
        transform: `scaleX(${scaleX})`,
        transformOrigin: "center",
      }}
    />
  );
}

// ─── Wise UI Card ───
export function WiseCard({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        backgroundColor: W.white,
        borderRadius: 24,
        border: `1px solid ${W.border}`,
        padding: 24,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Token pill ───
export function TokenPill({
  label,
  value,
  delayFrames,
  color = W.primary,
}: {
  label: string;
  value: string | number;
  delayFrames: number;
  color?: string;
}) {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delayFrames, [0, 20], [0, 1], clampEase);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "6px 14px",
        opacity,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
        }}
      />
      <span
        style={{
          color: "#868685",
          fontSize: 13,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color: "#e2e8f0",
          fontSize: 15,
          fontWeight: 700,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
    </div>
  );
}
