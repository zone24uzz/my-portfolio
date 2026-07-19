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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(11,16,36,0.85)] backdrop-blur-2xl border-b border-[rgba(39,48,74,0.3)]"
            : "bg-transparent"
        }`}
        style={{
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
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "1.35rem",
              letterSpacing: "-0.03em",
              color: "var(--color-text-primary)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-md)",
                background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-500))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.9rem",
                color: "var(--color-bg-primary)",
              }}
            >
              P
            </span>
            Portfolio
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
      `}</style>
    </>
  );
}
