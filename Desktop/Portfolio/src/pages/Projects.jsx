import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { CaretRight, Funnel, X } from "@phosphor-icons/react";
import ProjectCard from "../components/ProjectCard";

const categories = [
  { key: "projects.all", value: "All" },
  { key: "projects.webApp", value: "Web App" },
  { key: "projects.webDesign", value: "Web Design" },
];

const projects = [
  { titleKey: "projects.keyronTitle", descKey: "projects.keyronDesc", category: "Web App", tags: ["React", "TailwindCSS", "Vite"], year: "2025", link: "https://testkeyron-vifj.vercel.app/" },
  { titleKey: "projects.velocityTitle", descKey: "projects.velocityDesc", category: "Web Design", tags: ["HTML", "CSS"], year: "2025", link: "https://velocity-blush-gamma.vercel.app/" },
  { titleKey: "projects.indoreTitle", descKey: "projects.indoreDesc", category: "Web App", tags: ["HTML", "TailwindCSS", "JavaScript"], year: "2025", link: "https://plant-website-tailwindcss-main.vercel.app/" },
  { titleKey: "projects.fastfoodTitle", descKey: "projects.fastfoodDesc", category: "Web Design", tags: ["HTML", "CSS"], year: "2025", link: "https://burger-landing-one.vercel.app/" },
];

export default function Projects() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: "140px", paddingBottom: "var(--space-4xl)", position: "relative" }}>
        <div className="section-container">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            {t("projects.label")}
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "var(--space-lg)" }}
            className="projects-header"
          >
            <div>
              <h1 style={{ marginBottom: "var(--space-md)" }}>
                {t("projects.title")} <span className="gradient-text">{t("projects.titleHighlight")}</span>
              </h1>
              <p style={{ fontSize: "1.05rem", maxWidth: "480px" }}>{t("projects.subtitle")}</p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/contact" className="btn-primary">
                {t("projects.startProject")}
                <CaretRight size={16} weight="bold" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ paddingBottom: "var(--space-2xl)" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: "var(--space-md)", flexWrap: "wrap", paddingBottom: "var(--space-xl)", borderBottom: "1px solid var(--color-border)" }}
            className="filter-bar"
          >
            <Funnel size={16} weight="regular" style={{ color: "var(--color-text-muted)" }} />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                style={{
                  padding: "6px 18px",
                  borderRadius: "var(--radius-full)",
                  border: activeCategory === cat.value ? "1px solid var(--color-text-primary)" : "1px solid var(--color-border)",
                  backgroundColor: activeCategory === cat.value ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  color: activeCategory === cat.value ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat.value) {
                    e.currentTarget.style.borderColor = "var(--color-text-primary)";
                    e.currentTarget.style.color = "var(--color-text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat.value) {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                  }
                }}
              >
                {t(cat.key)}
              </button>
            ))}

            {activeCategory !== "All" && (
              <button
                onClick={() => setActiveCategory("All")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "6px 12px",
                  borderRadius: "var(--radius-full)",
                  border: "none",
                  backgroundColor: "transparent",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "color var(--transition-fast)",
                }}
              >
                <X size={14} weight="bold" />
                {t("projects.clear")}
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="section-container">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.length > 0 ? (
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-xl)" }}
                className="projects-grid"
              >
                {filteredProjects.map((project, i) => (
                  <ProjectCard key={project.titleKey} project={project} index={i} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "var(--space-5xl) var(--space-xl)" }}>
                <p style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "var(--color-text-muted)", marginBottom: "var(--space-lg)" }}>
                  {t("projects.noProjects")}
                </p>
                <button onClick={() => setActiveCategory("All")} className="btn-secondary">
                  {t("projects.viewAll")}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ borderTop: "1px solid var(--color-border)", padding: "var(--space-3xl) 0" }}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-xl)", textAlign: "center" }}
            className="project-stats-grid"
          >
            {[
              { value: "4", labelKey: "projects.projectsShown" },
              { value: "2", labelKey: "projects.categories" },
              { value: "6", labelKey: "projects.technologies" },
              { value: "100%", labelKey: "projects.passion" },
            ].map((stat) => (
              <motion.div key={stat.labelKey} whileHover={{ scale: 1.05 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.1, marginBottom: "4px" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", fontFamily: "var(--font-body)" }}>
                  {t(stat.labelKey)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .projects-header { flex-direction: column; align-items: flex-start; }
          .filter-bar { overflow-x: auto; flex-wrap: nowrap; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .filter-bar::-webkit-scrollbar { display: none; }
          .project-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: var(--space-lg) !important; }
        }
      `}</style>
    </main>
  );
}
