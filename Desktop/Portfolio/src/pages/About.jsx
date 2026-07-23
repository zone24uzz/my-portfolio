import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { ArrowRight, Code, Database, PlugsConnected, Devices, Brain, GitBranch } from "@phosphor-icons/react";
import SkillBar from "../components/SkillBar";

const skills = [
  { name: "HTML5 / CSS3", level: 92 },
  { name: "JavaScript (ES6+)", level: 85 },
  { name: "React", level: 80 },
  { name: "Node.js", level: 45 },
  { name: "Express.js", level: 45 },
  { name: "Tailwind CSS", level: 88 },
  { name: "Git & GitHub", level: 75 },
  { name: "API Integration", level: 78 },
  { name: "AI / Prompting", level: 82 },
  { name: "Responsive Design", level: 85 },
];

const expertiseKeys = [
  { icon: Code, titleKey: "about.frontend", descKey: "about.frontendDesc" },
  { icon: Database, titleKey: "about.backend", descKey: "about.backendDesc" },
  { icon: PlugsConnected, titleKey: "about.apiIntegration", descKey: "about.apiDesc" },
  { icon: Devices, titleKey: "about.responsive", descKey: "about.responsiveDesc" },
  { icon: Brain, titleKey: "about.ai", descKey: "about.aiDesc" },
  { icon: GitBranch, titleKey: "about.git", descKey: "about.gitDesc" },
];

const quickFacts = [
  { labelKey: "about.location", valueKey: "about.locationVal" },
  { labelKey: "about.currentWork", valueKey: "about.currentWorkVal" },
  { labelKey: "about.experience", valueKey: "about.experienceVal" },
  { labelKey: "about.availability", valueKey: "about.availabilityVal" },
  { labelKey: "about.education", valueKey: "about.educationVal" },
];

export default function About() {
  const { t } = useTranslation();
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    document.title = "About Komron Khidoyatov — Frontend Developer & Web Developer from Uzbekistan";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = "Learn more about Komron Khidoyatov (Xidoyatov Komron) — a 15-year-old frontend developer from Tashkent, Uzbekistan. Discover my skills, expertise in React, Tailwind CSS, and web development journey.";
  }, []);

  useEffect(() => {
    const observers = [];
    ["bio", "expertise", "skills"].forEach((section) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisibleSections((prev) => ({ ...prev, [section]: true }));
        },
        { threshold: 0.15 }
      );
      if (sectionRefs.current[section]) observer.observe(sectionRefs.current[section]);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section style={{ paddingTop: "140px", paddingBottom: "var(--space-4xl)", position: "relative", overflow: "hidden" }}>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ position: "absolute", top: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255, 255, 255, 0.04), transparent 70%)", pointerEvents: "none" }}
        />

        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            {t("about.label")}
          </motion.span>

          <div className="about-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4xl)", alignItems: "center" }}>
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 style={{ marginBottom: "var(--space-xl)" }}>
                {t("about.titleLine1")}
                <br />
                <span className="gradient-text">{t("about.titleHighlight")}</span>
              </h1>
              <p style={{ fontSize: "1.05rem", marginBottom: "var(--space-lg)", lineHeight: 1.8 }}>{t("about.para1")}</p>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-2xl)", lineHeight: 1.8 }}>{t("about.para2")}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }} className="quick-facts">
                {quickFacts.map((fact) => (
                  <motion.div
                    key={fact.labelKey}
                    whileHover={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.15)" }}
                    style={{ padding: "var(--space-md)", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)" }}
                  >
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                      {t(fact.labelKey)}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500, color: "var(--color-text-primary)" }}>
                      {t(fact.valueKey)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - Photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="about-visual"
              style={{ position: "relative", display: "flex", justifyContent: "center" }}
            >
              <div style={{ position: "relative", width: "100%", maxWidth: "420px", aspectRatio: "3/4", borderRadius: "var(--radius-2xl)", overflow: "hidden", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-secondary)", boxShadow: "var(--shadow-lg)" }}>
                <img src="/images/IMG_1355.jpg" alt="Komron Khidoyatov — Frontend Developer Portfolio" loading="lazy" width="420" height="560" decoding="async" className="img-fade-in" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "var(--space-xl)", background: "linear-gradient(to top, rgba(11, 16, 36, 0.9), transparent)" }}>
                  <span style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6 }}>
                    {t("about.creativeDev")}
                  </span>
                  <p style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 600, marginTop: "4px" }}>
                    {t("about.photoCaption")}
                  </p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", bottom: "40px", right: "-20px", padding: "12px 20px", borderRadius: "var(--radius-lg)", backgroundColor: "var(--color-card-bg)", backdropFilter: "blur(16px)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: "10px" }}
                className="floating-badge"
              >
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "var(--color-text-primary)", opacity: 0.8 }}
                />
                <span style={{ fontFamily: "var(--font-subheading)", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                  {t("about.availableWork")}
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section ref={(el) => (sectionRefs.current.expertise = el)} className="section-padding" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections.expertise ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "var(--space-3xl)", maxWidth: "600px" }}
          >
            <span className="section-label">{t("about.expertiseLabel")}</span>
            <h2>
              {t("about.expertiseTitle")} <span className="gradient-text">{t("about.expertiseHighlight")}</span>
            </h2>
            <p style={{ fontSize: "0.95rem", marginTop: "var(--space-md)" }}>{t("about.expertiseDesc")}</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-xl)" }} className="expertise-grid">
            {expertiseKeys.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.titleKey}
                  initial={{ opacity: 0, y: 30 }}
                  animate={visibleSections.expertise ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6, borderColor: "rgba(255, 255, 255, 0.15)" }}
                  style={{ padding: "var(--space-2xl)", borderRadius: "var(--radius-xl)", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", transition: "border-color 0.4s" }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    style={{ width: 48, height: 48, borderRadius: "var(--radius-lg)", backgroundColor: "rgba(255, 255, 255, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--space-lg)" }}
                  >
                    <IconComponent size={24} weight="bold" style={{ color: "var(--color-text-primary)" }} />
                  </motion.div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", letterSpacing: "-0.02em" }}>
                    {t(item.titleKey)}
                  </h3>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>{t(item.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={(el) => (sectionRefs.current.skills = el)} className="section-padding" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4xl)" }} className="skills-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visibleSections.skills ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">{t("about.skillsLabel")}</span>
              <h2 style={{ marginBottom: "var(--space-lg)" }}>
                {t("about.skillsTitle")} <span className="gradient-text">{t("about.skillsHighlight")}</span>
              </h2>
              <p style={{ fontSize: "0.9rem", marginBottom: "var(--space-xl)" }}>{t("about.skillsDesc")}</p>
              <Link
                to="/projects"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--color-text-primary)",
                  fontFamily: "var(--font-subheading)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "gap var(--transition-fast)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.gap = "12px"; }}
                onMouseLeave={(e) => { e.currentTarget.style.gap = "8px"; }}
              >
                {t("about.skillsAction")}
                <ArrowRight size={16} weight="bold" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visibleSections.skills ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .about-hero-grid { grid-template-columns: 1fr !important; gap: var(--space-2xl) !important; }
          .about-visual { order: -1; }
          .about-visual > div { max-width: 300px !important; margin: 0 auto; }
          .expertise-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .skills-grid { grid-template-columns: 1fr !important; gap: var(--space-3xl) !important; }
          .floating-badge { display: none !important; }
          .about-hero-grid h1 { max-width: none !important; }
        }
        @media (max-width: 768px) {
          .quick-facts { grid-template-columns: 1fr !important; }
          .expertise-grid { grid-template-columns: 1fr !important; gap: var(--space-md) !important; }
          .expertise-grid > div { padding: var(--space-xl) !important; }
          .about-visual > div { max-width: 260px !important; }
          .skills-grid { gap: var(--space-2xl) !important; }
        }
        @media (max-width: 480px) {
          .expertise-grid > div { padding: var(--space-lg) !important; }
          .expertise-grid > div h3 { font-size: 1rem !important; }
          .expertise-grid > div p { font-size: 0.8rem !important; }
          .quick-facts { gap: var(--space-sm) !important; }
          .quick-facts > div { padding: var(--space-sm) var(--space-md) !important; }
          .quick-facts > div div:last-child { font-size: 0.8rem !important; }
          .about-visual > div { max-width: 220px !important; border-radius: var(--radius-xl) !important; }
          .about-visual > div div[style*="gradient"] { padding: var(--space-md) !important; }
          .about-visual > div div[style*="gradient"] p { font-size: 0.9rem !important; }
        }
        @media (max-width: 360px) {
          .about-visual > div { max-width: 200px !important; }
          .expertise-grid > div { padding: var(--space-md) var(--space-lg) !important; }
        }
      `}</style>
    </main>
  );
}
