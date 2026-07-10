import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

const clampEase = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
  easing: Easing.bezier(0.16, 1, 0.3, 1),
};

export function Background({ accentColor = "#9fe870" }: { accentColor?: string }) {
  const frame = useCurrentFrame();

  // Subtle breathing glow
  const glowOpacity = interpolate(
    frame,
    [0, 60, 120],
    [0.5, 0.8, 0.5],
    { ...clampEase, easing: Easing.inOut(Easing.ease) }
  );

  return (
    <AbsoluteFill>
      {/* Canvas-soft sage base */}
      <AbsoluteFill
        style={{
          backgroundColor: "#e8ebe6",
          backgroundImage: `
            radial-gradient(circle at 50% 30%, ${accentColor}18 0%, transparent 60%)
          `,
        }}
      />

      {/* Breathing glow */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
          opacity: glowOpacity,
          filter: "blur(80px)",
        }}
      />
    </AbsoluteFill>
  );
}
