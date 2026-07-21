import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { ArrowRight, CaretRight, Sparkle } from "@phosphor-icons/react";

const featuredProjects = [
  {
    titleKey: "projects.abcAutoTitle",
    categoryKey: "projects.webApp",
    image: "/images/project-abcauto.png",
    link: "https://abc-auto-xidoyatovvv.vercel.app/",
    tags: ["React", "TailwindCSS", "JavaScript"],
  },
  {
    titleKey: "projects.sansiroTitle",
    categoryKey: "projects.webApp",
    image: "/images/project-sansiro.png",
    link: "https://sansiro-online-shop.vercel.app/",
    tags: ["React", "TailwindCSS", "JavaScript"],
  },
  {
    titleKey: "projects.autokranTitle",
    categoryKey: "projects.webApp",
    image: "/images/project-autokran.png",
    link: "https://www.autokran.uz/",
    tags: ["React", "TailwindCSS", "JavaScript", "SEO"],
  },
];

const stats = [
  { number: "1", labelKey: "stats.yearsExp" },
  { number: "10+", labelKey: "stats.projectsDelivered" },
  { number: "5+", labelKey: "stats.happyClients" },
  { number: "8+", labelKey: "stats.techStack" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Home() {
  const { t } = useTranslation();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    document.title = "Komron Khidoyatov — Frontend Developer & Web Developer from Tashkent, Uzbekistan";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = "Komron Khidoyatov (Xidoyatov Komron) — 15-year-old frontend developer from Tashkent, Uzbekistan. Specializing in React, Tailwind CSS, and modern web technologies. View my portfolio and projects.";
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section
        style={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.12, 0.08] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.08), transparent 70%)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{
              position: "absolute",
              bottom: "-10%",
              left: "-5%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 70%)",
            }}
          />
        </div>

        <div className="section-container" style={{ width: "100%", zIndex: 1 }}>
          <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4xl)", alignItems: "center" }}>
            {/* Left Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px 6px 6px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  marginBottom: "var(--space-xl)",
                }}
              >
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "var(--color-accent-400)",
                    color: "var(--color-bg-primary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("hero.available")}
                </span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-accent-400)", fontWeight: 500 }}>
                  {t("hero.forNewProjects")}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: "var(--space-lg)" }}
              >
                {t("hero.titleLine1")}
                <br />
                <span className="gradient-text">{t("hero.titleHighlight")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: "1.1rem", marginBottom: "var(--space-2xl)", maxWidth: "520px" }}
              >
                {t("hero.subtitle")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap" }}
                className="hero-ctas"
              >
                <Link to="/projects" className="btn-primary">
                  {t("hero.viewWork")}
                  <ArrowRight size={18} weight="bold" />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  {t("hero.getInTouch")}
                </Link>
              </motion.div>
            </div>

            {/* Right - Hero Visual with Photos */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hero-visual"
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "var(--space-md)",
                  position: "relative",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  style={{
                    borderRadius: "var(--radius-2xl)",
                    overflow: "hidden",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-lg)",
                    aspectRatio: "3/4",
                    backgroundColor: "var(--color-bg-secondary)",
                  }}
                >
          <img
            src="/images/IMG_1353.jpg"
            alt="Komron Khidoyatov — Frontend Developer from Tashkent, Uzbekistan"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    style={{
                      borderRadius: "var(--radius-2xl)",
                      overflow: "hidden",
                      border: "1px solid var(--color-border)",
                      boxShadow: "var(--shadow-lg)",
                      aspectRatio: "1/1",
                      backgroundColor: "var(--color-bg-secondary)",
                    }}
                  >
          <img
            src="/images/IMG_1350.jpg"
            alt="Komron Xidoyatov — Frontend Developer Portfolio"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    style={{
                      borderRadius: "var(--radius-2xl)",
                      overflow: "hidden",
                      border: "1px solid var(--color-border)",
                      boxShadow: "var(--shadow-lg)",
                      aspectRatio: "16/9",
                      backgroundColor: "var(--color-bg-secondary)",
                    }}
                  >
          <img
            src="/images/IMG_0925.jpg"
            alt="Komron Xidoyatov — Web Developer in Tashkent"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} style={{ padding: "var(--space-4xl) 0", borderTop: "1px solid var(--color-border)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-xl)" }} className="stats-grid">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 30 }}
                animate={statsVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: "center", padding: "var(--space-xl)", borderRadius: "var(--radius-lg)", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
                whileHover={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.2)", boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 700,
                    background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-500))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                    marginBottom: "4px",
                  }}
                >
                  {stat.number}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
                  {t(stat.labelKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-3xl)", flexWrap: "wrap", gap: "var(--space-lg)" }}
            className="section-header"
          >
            <div>
              <span className="section-label">{t("featured.label")}</span>
              <h2>
                {t("featured.title")} <span className="gradient-text">{t("featured.titleHighlight")}</span>
              </h2>
            </div>
            <Link
              to="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
                fontFamily: "var(--font-subheading)",
                fontSize: "0.85rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all var(--transition-base)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent-400)";
                e.currentTarget.style.color = "var(--color-accent-400)";
                e.currentTarget.style.gap = "12px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-text-secondary)";
                e.currentTarget.style.gap = "8px";
              }}
            >
              {t("featured.viewAll")}
              <CaretRight size={14} weight="bold" />
            </Link>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-xl)" }} className="projects-grid-home">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.titleKey}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", transition: "border-color 0.4s, box-shadow 0.4s" }}
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ aspectRatio: "16/10", overflow: "hidden", backgroundColor: "var(--color-bg-tertiary)" }}>
                    <motion.img
                      src={project.image}
                      alt={t(project.titleKey)}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div style={{ padding: "var(--space-lg)" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-accent-400)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                      {t(project.categoryKey)}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 600, color: "var(--color-text-primary)", marginTop: "4px", letterSpacing: "-0.02em" }}>
                      {t(project.titleKey)}
                    </h3>
                    <div style={{ display: "flex", gap: "6px", marginTop: "var(--space-md)", flexWrap: "wrap" }}>
                      {project.tags.map((tag) => (
                        <span key={tag} style={{ padding: "3px 10px", borderRadius: "var(--radius-full)", backgroundColor: "rgba(50, 61, 89, 0.3)", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 400, border: "1px solid var(--color-border-light)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "var(--space-5xl) 0", borderTop: "1px solid var(--color-border)" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderRadius: "var(--radius-2xl)", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", padding: "var(--space-4xl) var(--space-3xl)", textAlign: "center", position: "relative", overflow: "hidden" }}
            className="cta-section"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "400px", height: "400px", borderRadius: "50%",              background: "radial-gradient(circle, rgba(255, 255, 255, 0.06), transparent 70%)", pointerEvents: "none" }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <motion.div
                initial={{ rotate: -30, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Sparkle size={32} weight="fill" style={{ color: "var(--color-accent-400)", marginBottom: "var(--space-lg)" }} />
              </motion.div>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", marginBottom: "var(--space-lg)" }}>
                {t("cta.titleLine1")}
                <br />
                <span className="gradient-text">{t("cta.titleHighlight")}</span>
              </h2>
              <p style={{ fontSize: "1.05rem", margin: "0 auto var(--space-2xl)", maxWidth: "480px" }}>
                {t("cta.subtitle")}
              </p>
              <Link to="/contact" className="btn-primary" style={{ fontSize: "1rem" }}>
                {t("cta.button")}
                <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: var(--space-3xl) !important; }
          .hero-visual { display: none; }
          .projects-grid-home { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .projects-grid-home { grid-template-columns: 1fr !important; }
          .hero-ctas { flex-direction: column; }
          .hero-ctas a { width: 100%; justify-content: center; }
          .section-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </main>
  );
}
