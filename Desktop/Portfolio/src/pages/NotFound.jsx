import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { House, ArrowLeft } from "@phosphor-icons/react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Page Not Found | Komron Khidoyatov Portfolio";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = "Page not found — Komron Khidoyatov (Xidoyatov Komron), frontend developer from Tashkent, Uzbekistan. Return to the homepage to view my portfolio.";
  }, []);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "404 — Page Not Found | Komron Khidoyatov Portfolio";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = "Page not found — Komron Khidoyatov (Xidoyatov Komron), frontend developer from Tashkent, Uzbekistan. Return to the homepage to view my portfolio.";
  }, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(6rem, 20vw, 12rem)",
            fontWeight: 800,
            background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-600))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 1,
            letterSpacing: "-0.05em",
            marginBottom: "var(--space-lg)",
          }}
        >
          404
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            marginBottom: "var(--space-md)",
            letterSpacing: "-0.02em",
          }}
        >
          {t("notFound.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: "1.05rem",
            maxWidth: "480px",
            margin: "0 auto var(--space-2xl)",
            lineHeight: 1.8,
          }}
        >
          {t("notFound.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: "flex", gap: "var(--space-md)", justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/" className="btn-primary">
              <House size={18} weight="bold" />
              {t("notFound.backHome")}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <button onClick={() => window.history.back()} className="btn-secondary">
              <ArrowLeft size={18} weight="bold" />
              {t("notFound.goBack")}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
