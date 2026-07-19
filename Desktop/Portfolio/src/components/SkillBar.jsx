import { useState, useEffect, useRef } from "react";

export default function SkillBar({ name, level, color = "var(--color-accent-400)", index = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} style={{ marginBottom: "var(--space-lg)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-sm)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "var(--color-text-primary)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--color-text-muted)",
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "6px",
          borderRadius: "var(--radius-full)",
          backgroundColor: "rgba(50, 61, 89, 0.3)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: isVisible ? `${level}%` : "0%",
            height: "100%",
            borderRadius: "var(--radius-full)",
            background: `linear-gradient(90deg, ${color}, var(--color-accent-500))`,
            transition: "width 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "var(--color-accent-500)",
              boxShadow: "0 0 12px var(--color-accent-glow-strong)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
