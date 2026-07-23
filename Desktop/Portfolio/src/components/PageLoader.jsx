import { useMotion } from "../utils/motion";

export default function PageLoader() {
  const { motion } = useMotion();
  const M = motion || { div: 'div', p: 'p' };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100dvh",
        gap: "1rem",
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      {/* Animated logo placeholder */}
      <M.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-500))",
        }}
      />
      <M.p
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          color: "var(--color-text-muted)",
          letterSpacing: "0.05em",
        }}
      >
        Loading...
      </M.p>
    </div>
  );
}
