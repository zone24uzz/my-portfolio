import { motion } from "motion/react";
import { useLocation } from "react-router-dom";

export default function AnimatedPage({ children, ready = true }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.55,
        ease: [0.12, 0.74, 0.22, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
