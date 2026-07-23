import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Code,
  Palette,
  MagnifyingGlass,
  PlugsConnected,
  Devices,
  ArrowArcLeft,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react";
import MagneticButton from "../components/MagneticButton";

const services = [
  { icon: Code, titleKey: "services.webDev", descKey: "services.webDevDesc" },
  { icon: Palette, titleKey: "services.uiDesign", descKey: "services.uiDesignDesc" },
  { icon: MagnifyingGlass, titleKey: "services.seoOpt", descKey: "services.seoOptDesc" },
  { icon: PlugsConnected, titleKey: "services.apiInteg", descKey: "services.apiIntegDesc" },
  { icon: Devices, titleKey: "services.responsive", descKey: "services.responsiveDesc" },
  { icon: ArrowArcLeft, titleKey: "services.redesign", descKey: "services.redesignDesc" },
];

const processSteps = [
  { step: "01", titleKey: "services.step1Title", descKey: "services.step1Desc" },
  { step: "02", titleKey: "services.step2Title", descKey: "services.step2Desc" },
  { step: "03", titleKey: "services.step3Title", descKey: "services.step3Desc" },
  { step: "04", titleKey: "services.step4Title", descKey: "services.step4Desc" },
];

export default function Services() {
  const { t } = useTranslation();
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    document.title = "Frontend Development Services — Komron Khidoyatov from Tashkent, Uzbekistan";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = "Professional frontend development services by Komron Khidoyatov (Xidoyatov Komron) — web development, UI design, SEO optimization, API integration, and responsive design.";
  }, []);

  useEffect(() => {
    const observers = [];
    ["services", "process"].forEach((section) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisibleSections((prev) => ({ ...prev, [section]: true }));
        },
        { threshold: 0.1 }
      );
      if (sectionRefs.current[section]) observer.observe(sectionRefs.current[section]);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: "140px", paddingBottom: "var(--space-4xl)", position: "relative", overflow: "hidden" }}>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ position: "absolute", top: "-10%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 70%)", pointerEvents: "none" }}
        />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="section-label">
            {t("services.label")}
          </motion.span>
          <div className="services-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4xl)", alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h1 style={{ marginBottom: "var(--space-lg)" }}>
                {t("services.title")} <span className="gradient-text">{t("services.titleHighlight")}</span>
              </h1>
              <p style={{ fontSize: "1.05rem", maxWidth: "480px", lineHeight: 1.8, marginBottom: "var(--space-2xl)" }}>
                {t("services.subtitle")}
              </p>
              <MagneticButton>
                <Link to="/contact" className="btn-primary">
                  {t("services.ctaButton")}
                  <ArrowRight size={18} weight="bold" />
                </Link>
              </MagneticButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="services-visual"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}
            >
              {services.slice(0, 4).map((service, i) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.titleKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.2)" }}
                    style={{
                      padding: "var(--space-md)",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: "var(--color-bg-secondary)",
                      border: "1px solid var(--color-border)",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <div style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", backgroundColor: "rgba(255, 255, 255, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "var(--space-sm)" }}>
                      <IconComponent size={18} weight="bold" style={{ color: "var(--color-accent-400)" }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>
                      {t(service.titleKey)}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={(el) => (sectionRefs.current.services = el)} className="section-padding" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections.services ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: "var(--space-3xl)", maxWidth: "600px" }}
          >
            <span className="section-label">{t("services.label")}</span>
            <h2 style={{ marginBottom: "var(--space-md)" }}>
              {t("services.title")} <span className="gradient-text">{t("services.titleHighlight")}</span>
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8 }}>{t("services.subtitle")}</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-xl)" }} className="services-grid">
            {services.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.titleKey}
                  initial={{ opacity: 0, y: 30 }}
                  animate={visibleSections.services ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6, borderColor: "rgba(255, 255, 255, 0.15)" }}
                  style={{
                    padding: "var(--space-2xl)",
                    borderRadius: "var(--radius-xl)",
                    backgroundColor: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border)",
                    transition: "border-color 0.4s",
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "var(--space-lg)",
                    }}
                  >
                    <IconComponent size={24} weight="bold" style={{ color: "var(--color-text-primary)" }} />
                  </motion.div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", letterSpacing: "-0.02em" }}>
                    {t(service.titleKey)}
                  </h3>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>{t(service.descKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section ref={(el) => (sectionRefs.current.process = el)} className="section-padding" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visibleSections.process ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "var(--space-4xl)" }}
          >
            <span className="section-label">{t("services.process")}</span>
            <h2 style={{ maxWidth: "480px", margin: "0 auto" }}>
              {t("services.process")}
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-xl)", position: "relative" }} className="process-grid">
            {/* Connector line */}
            <div style={{ position: "absolute", top: "32px", left: "8%", right: "8%", height: "1px", background: "linear-gradient(90deg, var(--color-accent-400), var(--color-accent-500))", opacity: 0.2, pointerEvents: "none" }} className="process-connector" />

            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={visibleSections.process ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{ textAlign: "center", position: "relative" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={visibleSections.process ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "var(--radius-full)",
                    background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-500))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--space-lg)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--color-bg-primary)",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {step.step}
                </motion.div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-sm)", letterSpacing: "-0.02em" }}>
                  {t(step.titleKey)}
                </h3>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.7, maxWidth: "240px", margin: "0 auto" }}>
                  {t(step.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: "var(--radius-2xl)",
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-border)",
              padding: "var(--space-4xl) var(--space-3xl)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255, 255, 255, 0.06), transparent 70%)", pointerEvents: "none" }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <motion.div initial={{ rotate: -30, opacity: 0 }} whileInView={{ rotate: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}>
                <Sparkle size={32} weight="fill" style={{ color: "var(--color-accent-400)", marginBottom: "var(--space-lg)" }} />
              </motion.div>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "var(--space-md)" }}>
                {t("services.cta")}
              </h2>
              <p style={{ fontSize: "1rem", margin: "0 auto var(--space-2xl)", maxWidth: "440px" }}>
                {t("services.ctaDesc")}
              </p>
              <Link to="/contact" className="btn-primary" style={{ fontSize: "1rem" }}>
                {t("services.ctaButton")}
                <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .services-hero-grid { grid-template-columns: 1fr !important; }
          .services-visual { display: none !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; gap: var(--space-2xl) !important; }
          .process-connector { display: none; }
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .services-grid > div { padding: var(--space-xl) !important; }
        }
      `}</style>
    </main>
  );
}
