import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Reusable Tooltip Component
const Tooltip = ({
  children,
  content,
  position = "top",
  theme = "light",
  delay = 150,
}) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const tooltipRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  // Handle keyboard accessibility (focus/blur)
  const handleKeyDown = (e) => {
    if (e.key === "Escape") setVisible(false);
  };

  useEffect(() => {
    if (visible) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible]);

  // Positioning styles
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const themeClasses = {
    light: "bg-white text-gray-800 border border-gray-200 shadow-lg",
    dark: "bg-gray-800 text-white shadow-lg border border-gray-700",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      <span
        tabIndex="0"
        className="cursor-pointer outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
        aria-describedby="tooltip"
      >
        {children}
      </span>

      <AnimatePresence>
        {visible && (
          <motion.div
            ref={tooltipRef}
            id="tooltip"
            role="tooltip"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 px-3 py-2 text-sm rounded-md ${positionClasses[position]} ${themeClasses[theme]}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Example Usage Component
const AccessibleTooltipDemo = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold text-gray-800">
        🎯 Accessible & Themed Tooltip / Popover System
      </h1>

      <Tooltip content="Light theme tooltip above" position="top" theme="light">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Hover or Focus Me
        </button>
      </Tooltip>

      <Tooltip content="Dark themed tooltip below" position="bottom" theme="dark">
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
          Dark Tooltip
        </button>
      </Tooltip>

      <Tooltip content="Appears on the right side" position="right" theme="light">
        <span className="text-blue-600 underline cursor-pointer">
          Text Tooltip Example
        </span>
      </Tooltip>
    </div>
  );
};

export default AccessibleTooltipDemo;
