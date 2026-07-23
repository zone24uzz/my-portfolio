import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense, useRef } from "react";
import { CaretUp } from "@phosphor-icons/react";
import { MotionProvider, useMotion } from "./utils/motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AnimatedPage from "./components/AnimatedPage";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Projects = lazy(() => import("./pages/Projects"));
const Experience = lazy(() => import("./pages/Experience"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollProgress() {
  const { useScroll, useSpring, motion, isDesktop } = useMotion();
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.01,
  });
  const MotionDiv = motion.div || 'div';

  if (!isDesktop) return null;

  return (
    <MotionDiv
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
  const [visible, setVisible] = useState(false);
  const { motion, isDesktop } = useMotion();

  // Simple scroll listener with rAF throttling (no motion useScroll)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > window.innerHeight * 0.15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isDesktop) {
    const MotionBtn = motion.button || 'button';
    return (
      <MotionBtn
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
      </MotionBtn>
    );
  }

  return (
    <button
      onClick={scrollToTop}
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
        opacity: visible ? 0.9 : 0,
        transition: "opacity 300ms",
        pointerEvents: visible ? "auto" : "none",
      }}
      aria-label="Scroll to top"
    >
      <CaretUp size={18} weight="bold" />
    </button>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [pageReady, setPageReady] = useState(true);
  const [curtainActive, setCurtainActive] = useState(false);
  const { motion, useAnimationControls, isDesktop } = useMotion();
  const curtainControls = useAnimationControls();
  const prevPathRef = useRef(location.pathname);
  const isAnimatingRef = useRef(false);
  const MotionDiv = motion.div || 'div';

  useEffect(() => {
    const prevPath = prevPathRef.current;
    prevPathRef.current = location.pathname;

    if (prevPath !== location.pathname && !isAnimatingRef.current) {
      isAnimatingRef.current = true;
      setPageReady(false);
      setCurtainActive(true);
      runCurtainAnimation();
    }
  }, [location]);

  async function runCurtainAnimation() {
    // Phase 1: curtain slides in from the left, covering the page
    await curtainControls.start(
      { x: "0%" },
      { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    );

    // Phase 2: short pause to let the new lazy chunk render behind the curtain
    await new Promise((r) => setTimeout(r, 80));

    // Phase 3: curtain slides out to the right, revealing the new page
    await curtainControls.start(
      { x: "100%" },
      { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    );

    // Phase 4: reset curtain position
    curtainControls.set({ x: "-100%" });
    setPageReady(true);
    // Small delay before hiding shimmer to let curtain fully settle
    await new Promise((r) => setTimeout(r, 50));
    setCurtainActive(false);
    isAnimatingRef.current = false;
  }

  return (
    <>
      <div id="main-content" tabIndex="-1" style={{ outline: "none", position: "relative", zIndex: 1 }}>
        <Suspense fallback={<PageLoader />}>
          <ErrorBoundary>
            <AnimatedPage key={location.pathname} ready={pageReady}>
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
          </ErrorBoundary>
        </Suspense>
      </div>

      {/* Page transition curtain — slides left→center, then right→out */}
      <MotionDiv
        animate={curtainControls}
        initial={{ x: "-100%" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100dvh",
          zIndex: 9998,
          background: "linear-gradient(135deg, var(--color-accent-400), var(--color-accent-500))",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Diagonal line pattern overlay */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.08,
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="curtainPattern"
              patternUnits="userSpaceOnUse"
              width="20"
              height="20"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="20"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#curtainPattern)" />
        </svg>

        {/* Shimmer glow - only rendered during page transitions */}
        {curtainActive ? (
          <MotionDiv
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "30%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              transform: "skewX(-20deg)",
            }}
          />
        ) : null}
      </MotionDiv>
    </>
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
    <MotionProvider>
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
    </MotionProvider>
  );
}
