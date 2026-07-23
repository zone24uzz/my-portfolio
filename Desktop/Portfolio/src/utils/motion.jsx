import { createContext, useContext, useState, useEffect } from "react";

// ===== Fallback hooks for mobile - no scroll listeners, no animation physics =====
const noop = () => {};
const staticMotionValue = { get: () => 0, onChange: noop, on: noop };

const fallbackUseScroll = () => ({ scrollYProgress: staticMotionValue });
const fallbackUseTransform = () => staticMotionValue;
const fallbackUseSpring = () => staticMotionValue;
const fallbackUseAnimationControls = () => ({
  start: async () => {},
  set: noop,
  stop: noop,
});
const FallbackAnimatePresence = ({ children }) => children;

// On mobile, motion.div → 'div', motion.button → 'button', etc.
// React renders these as plain HTML elements and ignores framer-motion-specific props.
const fallbackMotion = new Proxy(
  {},
  {
    get: (target, prop) => {
      if (typeof prop === "string") return prop;
      return prop;
    },
  }
);

// ===== Context =====
const MotionContext = createContext({
  isDesktop: true,
  loaded: false,
  motion: fallbackMotion,
  useScroll: fallbackUseScroll,
  useTransform: fallbackUseTransform,
  useSpring: fallbackUseSpring,
  useAnimationControls: fallbackUseAnimationControls,
  AnimatePresence: FallbackAnimatePresence,
});

// Shared promise so multiple providers share one load
let loadPromise = null;

export function MotionProvider({ children }) {
  const [state, setState] = useState({
    isDesktop: true,
    loaded: false,
    motion: fallbackMotion,
    useScroll: fallbackUseScroll,
    useTransform: fallbackUseTransform,
    useSpring: fallbackUseSpring,
    useAnimationControls: fallbackUseAnimationControls,
    AnimatePresence: FallbackAnimatePresence,
  });

  useEffect(() => {
    const isDesktop =
      window.innerWidth >= 768 &&
      !("ontouchstart" in window) &&
      navigator.maxTouchPoints <= 0;

    if (!isDesktop) {
      // Mobile – never load motion
      setState((prev) => ({ ...prev, isDesktop: false, loaded: true }));
      return;
    }

    // Desktop – lazy-load motion ONCE
    if (!loadPromise) {
      loadPromise = import("motion/react");
    }

    loadPromise.then((mod) => {
      setState({
        isDesktop: true,
        loaded: true,
        motion: mod.motion || fallbackMotion,
        useScroll: mod.useScroll || fallbackUseScroll,
        useTransform: mod.useTransform || fallbackUseTransform,
        useSpring: mod.useSpring || fallbackUseSpring,
        useAnimationControls: mod.useAnimationControls || fallbackUseAnimationControls,
        AnimatePresence: mod.AnimatePresence || FallbackAnimatePresence,
      });
    });
  }, []);

  return (
    <MotionContext.Provider value={state}>{children}</MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}
