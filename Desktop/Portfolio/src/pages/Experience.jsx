import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { DownloadSimple, FileText } from "@phosphor-icons/react";
import TimelineItem from "../components/TimelineItem";

export default function Experience() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("work");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    document.title = "Experience — Komron Khidoyatov | Frontend Developer Journey & Skills";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = "Komron Khidoyatov (Xidoyatov Komron) — frontend developer experience. 15-year-old web developer from Uzbekistan with expertise in React, Tailwind CSS, and modern JavaScript.";
  }, []);

  const experiences = [
    {
      roleKey: "experience.roleAidevix",
      companyKey: "experience.companyAidevix",
      companyUrl: "https://aidevix.uz",
      locationKey: "experience.locAidevix",
      periodKey: "experience.periodAidevix",
      descKey: "experience.descAidevix",
      achievements: ["experience.achieveAidevix1", "experience.achieveAidevix2", "experience.achieveAidevix3", "experience.achieveAidevix4", "experience.achieveAidevix5"],
    },
    {
      roleKey: "experience.roleProject",
      companyKey: "experience.companyProject",
      locationKey: "experience.locProject",
      periodKey: "experience.periodProject",
      descKey: "experience.descProject",
      achievements: ["experience.achieveProject1", "experience.achieveProject2", "experience.achieveProject3", "experience.achieveProject4", "experience.achieveProject5"],
    },
  ];

  const education = [
    {
      roleKey: "experience.eduFrontend",
      companyKey: "experience.eduSchool",
      periodKey: "experience.eduPeriod",
      descKey: "experience.eduDesc",
    },
  ];

  const funFacts = [
    { number: "8+", labelKey: "experience.companies" },
    { number: "6", labelKey: "experience.mentored" },
    { number: "10+", labelKey: "experience.contributed" },
    { number: "8", labelKey: "experience.languages" },
    { number: "\u221E", labelKey: "experience.coffee" },
    { number: "100%", labelKey: "experience.growth" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const resolveItem = (item) => ({
    role: t(item.roleKey),
    company: t(item.companyKey),
    companyUrl: item.companyUrl || null,
    location: item.locationKey ? t(item.locationKey) : undefined,
    period: t(item.periodKey),
    description: t(item.descKey),
    achievements: item.achievements ? item.achievements.map((k) => t(k)) : undefined,
  });

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: "140px", paddingBottom: "var(--space-4xl)", position: "relative" }}>
        <div className="section-container">
          <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="section-label">
            {t("experience.label")}
          </motion.span>
          <div className="exp-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4xl)", alignItems: "flex-end" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h1 style={{ marginBottom: "var(--space-md)" }}>
                {t("experience.title")} <span className="gradient-text">{t("experience.titleHighlight")}</span>
              </h1>
              <p style={{ fontSize: "1.05rem", maxWidth: "520px", lineHeight: 1.8 }}>{t("experience.subtitle")}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: "flex", gap: "var(--space-md)", justifyContent: "flex-end" }} className="exp-ctas">
              <motion.a href="/resume.pdf" download className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.75rem 1.5rem" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <DownloadSimple size={16} weight="bold" />
                {t("experience.downloadCV")}
              </motion.a>
              <motion.button className="btn-secondary" style={{ fontSize: "0.85rem", padding: "0.75rem 1.5rem" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <FileText size={16} weight="regular" />
                {t("experience.viewResume")}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tab Switcher */}
      <section>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "flex", gap: "4px", padding: "5px", borderRadius: "var(--radius-full)", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", width: "fit-content", marginBottom: "var(--space-2xl)" }}
          >
            {[
              { key: "work", labelKey: "experience.workTab" },
              { key: "education", labelKey: "experience.educationTab" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  backgroundColor: activeTab === tab.key ? "var(--color-text-primary)" : "transparent",
                  color: activeTab === tab.key ? "var(--color-bg-primary)" : "var(--color-text-secondary)",
                  fontFamily: "var(--font-subheading)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all var(--transition-base)",
                }}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Content */}
      <section className="section-padding" style={{ paddingTop: 0 }} ref={sectionRef}>
        <div className="section-container">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === "work"
                ? experiences.map((exp, i) => <TimelineItem key={`${exp.roleKey}-${i}`} item={resolveItem(exp)} index={i} />)
                : education.map((edu, i) => <TimelineItem key={`${edu.roleKey}-${i}`} item={resolveItem(edu)} index={i} />)
              }
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="section-padding" style={{ borderTop: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-secondary)" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-2xl)", textAlign: "center" }}
            className="fun-facts-grid"
          >
            {funFacts.map((fact) => (
              <motion.div
                key={fact.labelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -6, borderColor: "rgba(255, 255, 255, 0.15)" }}
                style={{ padding: "var(--space-xl)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", transition: "border-color 0.4s" }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "6px" }}>
                  {fact.number}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                  {t(fact.labelKey)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { 
          .exp-hero-grid { grid-template-columns: 1fr !important; gap: var(--space-xl) !important; } 
          .exp-ctas { justify-content: flex-start !important; flex-wrap: wrap; } 
          .exp-hero-grid h1 { max-width: none !important; }
          .exp-hero-grid p { max-width: none !important; }
        }
        @media (max-width: 768px) { 
          .fun-facts-grid { grid-template-columns: repeat(2, 1fr) !important; gap: var(--space-md) !important; }
          .fun-facts-grid > div { padding: var(--space-lg) !important; }
          .exp-ctas a, .exp-ctas button { width: 100%; justify-content: center; }
          .exp-ctas { flex-direction: column; width: 100%; }
          .exp-ctas a, .exp-ctas button { width: 100%; text-align: center; justify-content: center; }
          [style*="width: fit-content"][style*="border-radius: var(--radius-full)"] { 
            width: 100% !important; 
            overflow-x: auto;
            flex-wrap: nowrap !important;
          }
          [style*="width: fit-content"][style*="border-radius: var(--radius-full)"] button { 
            white-space: nowrap; 
            flex-shrink: 0;
            padding: 10px 18px !important;
            font-size: 0.8rem !important;
          }
          .timeline-item { padding-left: 32px !important; }
          .timeline-item > div:first-child { padding: var(--space-lg) !important; }
        }
        @media (max-width: 480px) { 
          .fun-facts-grid { grid-template-columns: repeat(2, 1fr) !important; gap: var(--space-sm) !important; }
          .fun-facts-grid > div { padding: var(--space-md) !important; }
          .fun-facts-grid > div div:first-child { font-size: clamp(1.25rem, 4vw, 1.75rem) !important; }
          .timeline-item > div:first-child { padding: var(--space-md) var(--space-lg) !important; }
          .timeline-item h3 { font-size: 1rem !important; }
          .timeline-item p { font-size: 0.8rem !important; }
          .timeline-item li { font-size: 0.8rem !important; }
          .timeline-item span[style*="mono"] { font-size: 0.7rem !important; }
          .timeline-header span[style*="white-space: nowrap"] { 
            white-space: normal !important; 
            font-size: 0.7rem !important; 
            padding: 4px 10px !important;
          }
        }
        @media (max-width: 360px) {
          .timeline-item { padding-left: 28px !important; }
          .timeline-item > div:first-child { padding: var(--space-sm) var(--space-md) !important; }
          .fun-facts-grid > div { padding: var(--space-sm) !important; }
        }
      `}</style>
    </main>
  );
}
