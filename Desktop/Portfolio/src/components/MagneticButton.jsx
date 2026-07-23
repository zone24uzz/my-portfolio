import { useRef, useEffect, useState } from "react";
import { useMotion } from "../utils/motion";

export default function MagneticButton({ children, className = "", as = "div", ...props }) {
  const ref = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { motion } = useMotion();

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // On touch devices, render a plain element to avoid motion overhead
  if (isTouchDevice) {
    const Tag = as;
    return (
      <Tag ref={ref} className={className} {...props}>
        {children}
      </Tag>
    );
  }

  const M = motion || { div: 'div', button: 'button' };
  const Component = as === "button" ? M.button : M.div;

  return (
    <Component
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
