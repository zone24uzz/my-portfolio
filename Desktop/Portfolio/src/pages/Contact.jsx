import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import {
  PaperPlaneTilt,
  GithubLogo,
  EnvelopeSimple,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Spinner,
} from "@phosphor-icons/react";

const socialLinks = [
  { icon: GithubLogo, label: "GitHub", url: "https://github.com/komronkhidoyatov", username: "@komronkhidoyatov" },
  { icon: EnvelopeSimple, label: "Email", url: "mailto:xidoyatovkomron@gmail.com", username: "xidoyatovkomron@gmail.com" },
  { icon: Phone, label: "Telegram", url: "https://t.me/komron_dev", username: "+998 90 999 55 26" },
];

export default function Contact() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    document.title = "Contact Komron Khidoyatov — Frontend Developer in Tashkent, Uzbekistan";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = "Get in touch with Komron Khidoyatov (Xidoyatov Komron) — frontend developer from Tashkent, Uzbekistan. Hire me for your next React, Tailwind CSS, or web development project.";
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      alert(t("contact.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: "var(--radius-md)",
    backgroundColor: "var(--color-bg-primary)",
    border: focusedField === field ? "1px solid var(--color-accent-400)" : "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color var(--transition-fast)",
    boxShadow: focusedField === field ? "0 0 0 3px rgba(255, 255, 255, 0.1)" : "none",
  });

  return (
    <main>
      {/* Hero */}
      <section style={{ paddingTop: "140px", paddingBottom: "var(--space-4xl)", position: "relative" }}>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ position: "absolute", top: "-15%", left: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 70%)", pointerEvents: "none" }}
        />
        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="section-label">
            {t("contact.label")}
          </motion.span>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="contact-hero-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4xl)" }}
          >
            <div>
              <h1 style={{ marginBottom: "var(--space-md)" }}>
                {t("contact.title")} <span className="gradient-text">{t("contact.titleHighlight")}</span>
              </h1>
              <p style={{ fontSize: "1.05rem", maxWidth: "480px", lineHeight: 1.8 }}>{t("contact.subtitle")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding" style={{ paddingTop: 0 }} ref={sectionRef}>
        <div className="section-container">
          <div className="contact-content-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "var(--space-3xl)", alignItems: "start" }}>
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              style={{ borderRadius: "var(--radius-xl)", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", padding: "var(--space-2xl)" }}
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: "center", padding: "var(--space-4xl) var(--space-xl)" }}
                  >
                    <motion.div
                      initial={{ rotate: -30, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                      style={{ width: 64, height: 64, borderRadius: "var(--radius-full)", backgroundColor: "rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto var(--space-lg)" }}
                    >
                      <CheckCircle size={32} weight="fill" style={{ color: "var(--color-accent-400)" }} />
                    </motion.div>
                    <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-md)", letterSpacing: "-0.02em" }}>
                      {t("contact.successTitle")}
                    </h2>
                    <p style={{ fontSize: "0.95rem", margin: "0 auto var(--space-xl)", maxWidth: "400px" }}>{t("contact.successDesc")}</p>
                    <motion.button onClick={() => setIsSubmitted(false)} className="btn-secondary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      {t("contact.sendAnother")}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-lg)" }} className="form-row">
                      <div>
                        <label htmlFor="name" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "6px", display: "block" }}>
                          {t("contact.yourName")}
                        </label>
                        <motion.input whileFocus={{ scale: 1.01 }} type="text" id="name" name="name" value={formState.name} onChange={handleChange} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} required placeholder="John Doe" style={inputStyle("name")} />
                      </div>
                      <div>
                        <label htmlFor="email" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "6px", display: "block" }}>
                          {t("contact.yourEmail")}
                        </label>
                        <motion.input whileFocus={{ scale: 1.01 }} type="email" id="email" name="email" value={formState.email} onChange={handleChange} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} required placeholder="john@example.com" style={inputStyle("email")} />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "6px", display: "block" }}>
                        {t("contact.subject")}
                      </label>
                      <motion.input whileFocus={{ scale: 1.01 }} type="text" id="subject" name="subject" value={formState.subject} onChange={handleChange} onFocus={() => setFocusedField("subject")} onBlur={() => setFocusedField(null)} required placeholder={t("contact.subjectPlaceholder")} style={inputStyle("subject")} />
                    </div>

                    <div>
                      <label htmlFor="message" style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "6px", display: "block" }}>
                        {t("contact.message")}
                      </label>
                      <motion.textarea whileFocus={{ scale: 1.01 }} id="message" name="message" value={formState.message} onChange={handleChange} onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} required rows={5} placeholder={t("contact.messagePlaceholder")}
                        style={{ ...inputStyle("message"), resize: "vertical", minHeight: "120px" }}
                      />
                    </div>

                    <motion.button type="submit" disabled={isSubmitting} className="btn-primary" style={{ alignSelf: "flex-start", opacity: isSubmitting ? 0.8 : 1 }}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    >
                      {isSubmitting ? (
                        <><Spinner size={18} weight="bold" className="spinning" />{t("contact.sending")}</>
                      ) : (
                        <>{t("contact.sendMessage")}<PaperPlaneTilt size={18} weight="bold" /></>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info & Social */}
            <div>
              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ borderRadius: "var(--radius-xl)", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", padding: "var(--space-2xl)", marginBottom: "var(--space-xl)" }}
              >
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-lg)", letterSpacing: "-0.02em" }}>
                  {t("contact.contactInfo")}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
                  {[
                    { icon: MapPin, labelKey: "contact.location", valueKey: "contact.locationVal" },
                    { icon: Phone, labelKey: "contact.phone", valueKey: "contact.phoneVal" },
                    { icon: Clock, labelKey: "contact.hours", valueKey: "contact.hoursVal" },
                  ].map((info) => (
                    <div key={info.labelKey} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-md)" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", backgroundColor: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <info.icon size={18} weight="bold" style={{ color: "var(--color-accent-400)" }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>
                          {t(info.labelKey)}
                        </div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-text-primary)", fontWeight: 500 }}>
                          {t(info.valueKey)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ borderRadius: "var(--radius-xl)", backgroundColor: "var(--color-bg-secondary)", border: "1px solid var(--color-border)", padding: "var(--space-2xl)" }}
              >
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "var(--space-lg)", letterSpacing: "-0.02em" }}>
                  {t("contact.followMe")}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4, borderColor: "rgba(255, 255, 255, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-md)",
                        padding: "var(--space-md) var(--space-lg)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--color-border)",
                        textDecoration: "none",
                        color: "var(--color-text-secondary)",
                        transition: "border-color 0.3s, background-color 0.3s",
                      }}
                    >
                      <social.icon size={20} weight="bold" style={{ color: "var(--color-accent-400)" }} />
                      <div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 500, color: "var(--color-text-primary)" }}>{social.label}</div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-text-muted)" }}>{social.username}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spinning { animation: spin 1s linear infinite; }
        @media (max-width: 1024px) { .contact-hero-grid { grid-template-columns: 1fr !important; } .contact-content-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 768px) { .form-row { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) {
          .contact-content-grid > div:first-child > div { padding: var(--space-xl) !important; }
          .contact-content-grid > div:last-child > div { padding: var(--space-xl) !important; }
        }
      `}</style>
    </main>
  );
}
