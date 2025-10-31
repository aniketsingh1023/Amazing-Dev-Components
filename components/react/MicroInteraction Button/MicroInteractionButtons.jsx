import React, { useState } from "react";
import { motion } from "framer-motion";

// 🌟 Ripple Effect Button
const RippleButton = ({ label }) => {
  const [ripple, setRipple] = useState({ x: -1, y: -1, show: false });

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
    setTimeout(() => setRipple({ x: -1, y: -1, show: false }), 500);
  };

  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition focus:outline-none"
    >
      {ripple.show && (
        <span
          className="absolute bg-white/50 rounded-full animate-ping"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: 50,
            height: 50,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      {label}
    </button>
  );
};

// 💫 Scale (Press) Animation Button
const PressButton = ({ label }) => (
  <motion.button
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.05 }}
    className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 focus:outline-none"
  >
    {label}
  </motion.button>
);

// ⚡ Glow on Hover Button
const GlowButton = ({ label }) => (
  <motion.button
    whileHover={{
      boxShadow: "0px 0px 12px rgba(59, 130, 246, 0.7)",
      scale: 1.03,
    }}
    transition={{ duration: 0.3 }}
    className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold focus:outline-none"
  >
    {label}
  </motion.button>
);

// 🌀 Loading Spinner Button
const LoadingButton = ({ label }) => {
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
      }}
      className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700 flex items-center justify-center gap-2"
    >
      {loading ? (
        <motion.div
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          transition={{ duration: 0.5 }}
        />
      ) : (
        <span>{label}</span>
      )}
    </button>
  );
};

// 💥 Icon Pop Button
const IconPopButton = ({ icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.1, rotate: 2 }}
    whileTap={{ scale: 0.9 }}
    className="flex items-center gap-2 bg-rose-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-rose-700 transition focus:outline-none"
  >
    <span className="text-lg">{icon}</span>
    {label}
  </motion.button>
);

// 🔘 Main Demo Component
const MicroInteractionButtons = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        🎨 Micro-Interaction Button Library
      </h1>

      <div className="flex flex-wrap justify-center gap-5">
        <RippleButton label="Ripple Effect" />
        <PressButton label="Press Effect" />
        <GlowButton label="Glow Hover" />
        <LoadingButton label="Loading State" />
        <IconPopButton icon="⚡" label="Pop Icon" />
      </div>
    </div>
  );
};

export default MicroInteractionButtons;
