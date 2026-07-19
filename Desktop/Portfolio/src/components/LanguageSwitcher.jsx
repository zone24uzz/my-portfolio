import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GlobeHemisphereWest, Check } from "@phosphor-icons/react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const languages = [
    { code: "en", label: "EN", full: "English" },
    { code: "uz", label: "UZ", full: "O'zbek" },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lang", code);
    setIsOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "var(--radius-full)",
          border: "1px solid var(--color-border)",
          backgroundColor: "transparent",
          color: "var(--color-text-secondary)",
          fontFamily: "var(--font-subheading)",
          fontSize: "0.8rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          letterSpacing: "0.03em",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-accent-400)";
          e.currentTarget.style.color = "var(--color-accent-400)";
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.color = "var(--color-text-secondary)";
          }
        }}
        aria-label="Switch language"
      >
        <GlobeHemisphereWest size={14} weight="bold" />
        {currentLang.label}
      </button>

      {/* Dropdown */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          minWidth: "140px",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--color-bg-secondary)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-lg)",
          overflow: "hidden",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transform: isOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 200,
        }}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "10px 14px",
              border: "none",
              backgroundColor: i18n.language === lang.code
                ? "rgba(255, 255, 255, 0.08)"
                : "transparent",
              color: i18n.language === lang.code
                ? "var(--color-accent-400)"
                : "var(--color-text-secondary)",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              fontWeight: i18n.language === lang.code ? 600 : 400,
              cursor: "pointer",
              transition: "all 200ms ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                i18n.language === lang.code ? "rgba(255, 255, 255, 0.08)" : "transparent";
            }}
          >
            <span>{lang.full}</span>
            {i18n.language === lang.code && (
              <Check size={14} weight="bold" style={{ flexShrink: 0 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
