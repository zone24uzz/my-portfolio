import { useTranslation } from "react-i18next";
import { ArrowUpRight, Clock, Code } from "@phosphor-icons/react";

export default function ProjectCard({ project, index }) {
  const { t } = useTranslation();
  const { title, titleKey, description, descKey, category, tags, image, year, link } = project;
  const resolvedTitle = titleKey ? t(titleKey) : title;
  const resolvedDesc = descKey ? t(descKey) : description;

  return (
    <div
      style={{
        perspective: "1000px",
        opacity: 0,
        animation: `fadeInUp 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        animationDelay: `${index * 100}ms`,
      }}
    >
      <a
        href={link || "#"}
        target={link ? "_blank" : undefined}
        rel={link ? "noopener noreferrer" : undefined}
        style={{ textDecoration: "none", display: "block" }}
      >
        <div
          className="project-card"
          style={{
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            backgroundColor: "var(--color-bg-secondary)",
            border: "1px solid var(--color-border)",
            transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            cursor: "pointer",
            position: "relative",
            height: "100%",
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget;
            card.style.transform = "translateY(-8px)";
            card.style.borderColor = "rgba(255, 255, 255, 0.3)";
            card.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.08)";
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.transform = "translateY(0)";
            card.style.borderColor = "var(--color-border)";
            card.style.boxShadow = "none";
          }}
        >
          {/* Image */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              aspectRatio: "16 / 10",
              backgroundColor: "var(--color-bg-tertiary)",
            }}
          >
            <img
              src={image || `https://picsum.photos/seed/${(resolvedTitle || "project").toLowerCase().replace(/\s+/g, "-")}/800/500`}
              alt={resolvedTitle}
              loading="lazy"
              decoding="async"
              width="800"
              height="500"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="project-card-img img-fade-in"
            />

            {/* Overlay on hover */}
            <div
              className="project-card-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(11, 16, 36, 0.8), transparent)",
                opacity: 0,
                display: "flex",
                alignItems: "flex-end",
                padding: "var(--space-lg)",
                transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "var(--color-accent-400)",
                  fontFamily: "var(--font-subheading)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  backdropFilter: "blur(10px)",
                }}
              >
                View Project <ArrowUpRight size={16} weight="bold" />
              </span>
            </div>

            {/* Category Badge */}
            {category && (
              <span
                style={{
                  position: "absolute",
                  top: "var(--space-md)",
                  left: "var(--space-md)",
                  padding: "4px 12px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(11, 16, 36, 0.7)",
                  backdropFilter: "blur(8px)",
                  color: "var(--color-accent-400)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                {category}
              </span>
            )}

            {/* Year */}
            {year && (
              <span
                style={{
                  position: "absolute",
                  top: "var(--space-md)",
                  right: "var(--space-md)",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "rgba(11, 16, 36, 0.7)",
                  backdropFilter: "blur(8px)",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  border: "1px solid var(--color-border-light)",
                }}
              >
                {year}
              </span>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: "var(--space-lg)" }}>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "var(--space-sm)",
                letterSpacing: "-0.02em",
              }}
            >
              {resolvedTitle}
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-secondary)",
                marginBottom: "var(--space-lg)",
                lineHeight: 1.7,
              }}
            >
              {resolvedDesc}
            </p>

            {/* Tags */}
            <div
              className="project-tags"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {tags?.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "rgba(50, 61, 89, 0.3)",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    border: "1px solid var(--color-border-light)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .project-card:hover .project-card-img {
          transform: scale(1.05);
        }
        .project-card:hover .project-card-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
