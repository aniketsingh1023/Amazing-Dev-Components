import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const images = [
  "https://picsum.photos/id/1015/400/600",
  "https://picsum.photos/id/1021/400/500",
  "https://picsum.photos/id/1027/400/400",
  "https://picsum.photos/id/1033/400/450",
  "https://picsum.photos/id/1043/400/550",
  "https://picsum.photos/id/1050/400/600",
  "https://picsum.photos/id/1062/400/500",
  "https://picsum.photos/id/1074/400/550",
  "https://picsum.photos/id/1084/400/450",
  "https://picsum.photos/id/1080/400/600",
];

const AnimatedMasonryGrid = () => {
  const [visibleImages, setVisibleImages] = useState([]);
  const containerRef = useRef(null);

  // Lazy load images when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleImages((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const imageElements = containerRef.current?.querySelectorAll(".lazy-image");
    imageElements?.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🧱 Animated Masonry Grid with Lazy Loading
      </h1>

      <div
        ref={containerRef}
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-6"
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="mb-4 overflow-hidden rounded-2xl shadow-md bg-white lazy-image"
            data-index={index}
            initial={{ opacity: 0, y: 30 }}
            animate={
              visibleImages.includes(index)
                ? { opacity: 1, y: 0 }
                : { opacity: 0 }
            }
            transition={{ duration: 0.5 }}
          >
            {visibleImages.includes(index) ? (
              <img
                src={src}
                alt={`Masonry item ${index + 1}`}
                loading="lazy"
                className="w-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="h-60 bg-gray-200 animate-pulse rounded-2xl" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedMasonryGrid;
