import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState, lazy, Suspense } from "react";
import { CaretUp } from "@phosphor-icons/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AnimatedPage from "./components/AnimatedPage";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const Experience = lazy(() => import("./pages/Experience"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        transformOrigin: "0% 0%",
        scaleX: scaleY,
        zIndex: 999,
        background: "linear-gradient(90deg, var(--color-accent-400), var(--color-accent-500))",
        pointerEvents: "none",
      }}
    />
  );
}

function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setVisible(v > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
        y: visible ? 0 : 10,
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 900,
        width: 44,
        height: 44,
        borderRadius: "var(--radius-full)",
        border: "1px solid var(--color-border)",
        backgroundColor: "var(--color-bg-secondary)",
        color: "var(--color-text-muted)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        transition: "color 300ms, border-color 300ms, box-shadow 300ms",
        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-accent-400)";
        e.currentTarget.style.color = "var(--color-accent-400)";
        e.currentTarget.style.boxShadow = "0 0 20px var(--color-accent-glow-strong)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.color = "var(--color-text-muted)";
        e.currentTarget.style.boxShadow = "none";
      }}
      aria-label="Scroll to top"
    >
      <CaretUp size={18} weight="bold" />
    </motion.button>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div id="main-content" tabIndex="-1" style={{ outline: "none" }}>
        <Suspense fallback={<div style={{ minHeight: "100dvh" }} />}>
          <AnimatedPage key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatedPage>
        </Suspense>
      </div>
    </AnimatePresence>
  );
}

function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: "fixed",
        top: "-100%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10000,
        padding: "12px 24px",
        backgroundColor: "var(--color-accent-400)",
        color: "var(--color-bg-primary)",
        fontFamily: "var(--font-body)",
        fontSize: "0.9rem",
        fontWeight: 600,
        borderRadius: "0 0 var(--radius-md) var(--radius-md)",
        textDecoration: "none",
        transition: "top 300ms ease",
      }}
      onFocus={(e) => { e.currentTarget.style.top = "0"; }}
      onBlur={(e) => { e.currentTarget.style.top = "-100%"; }}
    >
      Skip to content
    </a>
  );
}

export default function App() {
  return (
    <Router>
      <SkipLink />
      <ScrollProgress />
      <BackToTop />
      <div className="noise-overlay" />
      <div className="bg-orbs" aria-hidden="true">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
      </div>
      <ScrollToTop />
      <Header />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
}
