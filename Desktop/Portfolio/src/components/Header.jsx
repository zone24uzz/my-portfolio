import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { List, X } from "@phosphor-icons/react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/services", label: t("nav.services") },
    { path: "/projects", label: t("nav.projects") },
    { path: "/experience", label: t("nav.experience") },
    { path: "/contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: scrolled ? "rgba(11, 16, 36, 0.75)" : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(140%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04)" : "none",
          transition: "all 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="section-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? "64px" : "80px",
            transition: "height 700ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
            }}
          >
            <img
              src="/logo.png"
              alt="Komron Xidoyatov"
              width="38"
              height="38"
              fetchpriority="high"
              decoding="async"
              style={{
                height: 38,
                width: 38,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "1.2rem",
                letterSpacing: "-0.03em",
                color: "var(--color-text-primary)",
              }}
            >
              Komron Xidoyatov
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                style={({ isActive }) => ({
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  color: isActive ? "var(--color-accent-400)" : "var(--color-text-secondary)",
                  backgroundColor: isActive ? "rgba(255, 255, 255, 0.08)" : "transparent",
                  textDecoration: "none",
                  transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                  position: "relative",
                })}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Language Switcher */}
            <div style={{ marginLeft: "12px" }}>
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="mobile-menu-btn">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text-primary)",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "var(--radius-sm)",
                transition: "all var(--transition-fast)",
              }}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          backgroundColor: "rgba(11, 16, 36, 0.96)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "all" : "none",
          transition: "all 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="mobile-menu"
      >
        {navLinks.map((link, i) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            onClick={() => setIsMenuOpen(false)}
            style={({ isActive }) => ({
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              fontWeight: 600,
              color: isActive ? "var(--color-accent-400)" : "var(--color-text-primary)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
              transform: isMenuOpen ? "translateY(0)" : "translateY(30px)",
              opacity: isMenuOpen ? 1 : 0,
              transitionDelay: isMenuOpen ? `${i * 60}ms` : "0ms",
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <style>{`
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          header .section-container > a span { font-size: 1rem !important; }
          header .section-container > a img { height: 32px !important; width: 32px !important; }
        }
      `}</style>
    </>
  );
}
