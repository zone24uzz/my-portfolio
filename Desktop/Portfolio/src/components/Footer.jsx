import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  EnvelopeSimple,
  ArrowUpRight,
} from "@phosphor-icons/react";

const socialLinks = [
  { icon: GithubLogo, label: "GitHub", url: "https://github.com" },
  { icon: LinkedinLogo, label: "LinkedIn", url: "https://linkedin.com" },
  { icon: TwitterLogo, label: "Twitter", url: "https://twitter.com" },
  { icon: EnvelopeSimple, label: "Email", url: "mailto:xidoyatovkomron@gmail.com" },
];

const footerLinks = [
  { labelKey: "nav.home", path: "/" },
  { labelKey: "nav.about", path: "/about" },
  { labelKey: "nav.services", path: "/services" },
  { labelKey: "nav.projects", path: "/projects" },
  { labelKey: "nav.experience", path: "/experience" },
  { labelKey: "nav.contact", path: "/contact" },
];

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-secondary)",
      }}
    >
      <div className="section-container section-padding">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "var(--space-3xl)",
            marginBottom: "var(--space-4xl)",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textDecoration: "none",
                marginBottom: "var(--space-lg)",
              }}
            >
              <img
                src="/logo.png"
                alt="Komron Xidoyatov"
                style={{
                  height: 42,
                  width: 42,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  letterSpacing: "-0.03em",
                  color: "var(--color-text-primary)",
                }}
              >
                Komron Xidoyatov
              </span>
            </Link>
            <p
              style={{
                fontSize: "0.9rem",
                marginBottom: "var(--space-lg)",
                maxWidth: "360px",
              }}
            >
              {t("footer.brandDesc")}
            </p>
            {/* Social Links */}
            <div style={{ display: "flex", gap: "var(--space-sm)" }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-full)",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-text-muted)",
                    transition: "all var(--transition-base)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent-400)";
                    e.currentTarget.style.color = "var(--color-accent-400)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-glow)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.color = "var(--color-text-muted)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <social.icon size={18} weight="regular" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-subheading)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "var(--space-lg)",
              }}
            >
              {t("footer.navigation")}
            </h4>
            <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "color var(--transition-fast)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-accent-400)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                  }}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-subheading)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "var(--space-lg)",
              }}
            >
              {t("footer.getInTouch")}
            </h4>
            <p
              style={{
                fontSize: "0.9rem",
                marginBottom: "var(--space-md)",
              }}
            >
              {t("footer.ctaText")}
            </p>
            <Link
              to="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--color-accent-400)",
                fontFamily: "var(--font-subheading)",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                transition: "all var(--transition-fast)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = "12px";
                e.currentTarget.style.color = "var(--color-accent-500)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = "8px";
                e.currentTarget.style.color = "var(--color-accent-400)";
              }}
            >
              {t("footer.ctaButton")}
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "var(--space-xl)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-md)",
          }}
          className="footer-bottom"
        >
          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            &copy; {new Date().getFullYear()} Komron Xidoyatov. {t("footer.copyright")}
          </p>
          <button
            onClick={scrollToTop}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "color var(--transition-fast)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-accent-400)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            {t("footer.backToTop")} &uarr;
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: var(--space-2xl) !important;
          }
          .footer-grid > div:first-child {
            max-width: 500px;
          }
          .footer-grid > div:last-child {
            grid-row: auto;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            gap: var(--space-2xl) !important;
            margin-bottom: var(--space-3xl) !important;
          }
          .footer-grid > div:first-child {
            max-width: 100%;
          }
          .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
            justify-content: center !important;
          }
          .footer-bottom p {
            font-size: 0.75rem !important;
          }
        }

        @media (max-width: 480px) {
          footer .section-padding {
            padding: var(--space-3xl) 0 var(--space-2xl) !important;
          }
          footer .footer-grid > div:first-child > a {
            justify-content: center;
          }
          footer .footer-grid > div:first-child > a span {
            font-size: 1.1rem !important;
          }
          footer .footer-grid > div:first-child > a img {
            height: 36px !important;
            width: 36px !important;
          }
          footer .footer-grid > div:first-child > p {
            text-align: center !important;
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          footer .footer-grid > div:first-child > div {
            justify-content: center !important;
            flex-wrap: wrap !important;
          }
          footer .footer-grid > div h4 {
            text-align: center !important;
          }
          footer .footer-grid > div nav {
            align-items: center !important;
          }
          footer .footer-grid > div p {
            text-align: center !important;
          }
          footer .footer-grid > div:last-child a[href="/contact"] {
            justify-content: center !important;
          }
        }

        @media (max-width: 360px) {
          footer .footer-grid > div:first-child > a img {
            height: 30px !important;
            width: 30px !important;
          }
          footer .footer-grid > div:first-child > a span {
            font-size: 1rem !important;
          }
          footer .footer-grid > div:first-child > div a {
            width: 34px !important;
            height: 34px !important;
          }
          footer .footer-grid > div:first-child > div a svg {
            width: 15px !important;
            height: 15px !important;
          }
        }
      `}</style>
    </footer>
  );
}
