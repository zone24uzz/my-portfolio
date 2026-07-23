import { CalendarDot, Briefcase, MapPin } from "@phosphor-icons/react";

export default function TimelineItem({ item, index }) {
  const { role, company, companyUrl, location, period, description, achievements } = item;

  return (
    <div
      className="timeline-item"
      style={{
        position: "relative",
        paddingLeft: "40px",
        paddingBottom: "var(--space-3xl)",
        opacity: 0,
        animation: `slideInLeft 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        animationDelay: `${index * 150}ms`,
      }}
    >
      {/* Timeline Line */}
      <div
        style={{
          position: "absolute",
          left: "15px",
          top: "28px",
          bottom: 0,
          width: "1.5px",
          background: "linear-gradient(to bottom, var(--color-accent-400), var(--color-border))",
          opacity: 0.3,
        }}
      />

      {/* Timeline Dot */}
      <div
        style={{
          position: "absolute",
          left: "7px",
          top: "4px",
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-500))",
          boxShadow: "0 0 16px var(--color-accent-glow)",
          zIndex: 2,
        }}
      />

      {/* Content Card */}
      <div
        style={{
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border)",
          padding: "var(--space-xl)",
          transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.transform = "translateX(4px)";
          e.currentTarget.style.boxShadow = "var(--shadow-md)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.transform = "translateX(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "var(--space-sm)",
            marginBottom: "var(--space-md)",
          }}
          className="timeline-header"
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: "4px",
                letterSpacing: "-0.02em",
              }}
            >
              {role}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "var(--color-accent-400)",
                  fontFamily: "var(--font-subheading)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                <Briefcase size={14} weight="bold" />
                {companyUrl ? (
                  <a
                    href={companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                      borderBottom: "1px solid transparent",
                      transition: "border-color 0.3s, opacity 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderBottomColor = "var(--color-accent-400)";
                      e.currentTarget.style.opacity = "0.8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderBottomColor = "transparent";
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    {company}
                    <span style={{ fontSize: "0.65rem", marginLeft: "3px", opacity: 0.6 }}>&#8599;</span>
                  </a>
                ) : (
                  company
                )}
              </span>
              {location && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8rem",
                  }}
                >
                  <MapPin size={14} weight="regular" />
                  {location}
                </span>
              )}
            </div>
          </div>

          {/* Period */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "var(--color-accent-400)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 500,
              border: "1px solid rgba(255, 255, 255, 0.12)",
              whiteSpace: "nowrap",
            }}
          >
            <CalendarDot size={14} weight="bold" />
            {period}
          </span>
        </div>

        {/* Description */}
        {description && (
          <p
            style={{
              fontSize: "0.9rem",
              marginBottom: achievements ? "var(--space-md)" : 0,
              lineHeight: 1.7,
            }}
          >
            {description}
          </p>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {achievements.map((achievement, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  fontSize: "0.85rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    color: "var(--color-accent-400)",
                    flexShrink: 0,
                    marginTop: "4px",
                    fontSize: "0.6rem",
                  }}
                >
                  &#9670;
                </span>
                {achievement}
              </li>
            ))}
          </ul>
        )}
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @media (max-width: 768px) {
          .timeline-header {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
