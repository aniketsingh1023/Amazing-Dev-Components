import React, { useRef, useEffect } from "react";
import "./TiltCard.css";

export default function TiltCard({
  image = "",
  title = "Tilt Card",
  description = "A subtle 3D tilting card with optional glare and press effect.",
  width = "280px",
  height = "360px",
  maxTilt = 15,
  glare = true,
  perspective = 1000,
  transitionSpeed = 300,
  disabledOnMobile = true,
}) {
  const rootRef = useRef(null);
  const contentRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (disabledOnMobile && isTouch) {
      contentRef.current.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
      return;
    }

    let rect = null;
    let update = { rotateX: 0, rotateY: 0, translateZ: 0, glareX: 50, glareY: 50 };

    function onMove(e) {
      rect = el.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;

      const rotateY = ((x - halfWidth) / halfWidth) * -maxTilt;
      const rotateX = ((y - halfHeight) / halfHeight) * maxTilt;

      const distanceFromCenter = Math.hypot(x - halfWidth, y - halfHeight);
      const maxDistance = Math.hypot(halfWidth, halfHeight);
      const translateZ = (1 - distanceFromCenter / maxDistance) * 20; // px

      update.rotateX = rotateX;
      update.rotateY = rotateY;
      update.translateZ = translateZ;
      update.glareX = (x / rect.width) * 100;
      update.glareY = (y / rect.height) * 100;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    function animate() {
      rafRef.current = null;
      const { rotateX, rotateY, translateZ, glareX, glareY } = update;
      const transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
      contentRef.current.style.transform = transform;
      if (glare) {
        const glareEl = el.querySelector(".tilt-card__glare");
        if (glareEl) {
          glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.28), rgba(255,255,255,0.06) 30%, transparent 60%)`;
        }
      }
    }

    function onLeave() {
      contentRef.current.style.transition = `transform ${transitionSpeed}ms cubic-bezier(.2,.8,.2,1)`;
      contentRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
      const glareEl = el.querySelector(".tilt-card__glare");
      if (glareEl) glareEl.style.background = "transparent";
      setTimeout(() => {
        if (contentRef.current) contentRef.current.style.transition = "";
      }, transitionSpeed + 20);
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchend", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchend", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [maxTilt, glare, perspective, transitionSpeed, disabledOnMobile]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    function onDown() {
      contentRef.current.style.transition = `transform 150ms ease-out`;
      contentRef.current.style.transform += " translateZ(6px) scale(0.995)";
    }
    function onUp() {
      contentRef.current.style.transition = `transform 200ms cubic-bezier(.2,.8,.2,1)`;
      setTimeout(() => {
        contentRef.current.style.transition = "";
      }, 220);
    }

    root.addEventListener("mousedown", onDown);
    root.addEventListener("mouseup", onUp);
    root.addEventListener("touchstart", onDown, { passive: true });
    root.addEventListener("touchend", onUp);

    return () => {
      root.removeEventListener("mousedown", onDown);
      root.removeEventListener("mouseup", onUp);
      root.removeEventListener("touchstart", onDown);
      root.removeEventListener("touchend", onUp);
    };
  }, []);

  const wrapperStyle = { width, height };

  return (
    <div
      className="tilt-card__wrapper"
      ref={rootRef}
      style={wrapperStyle}
      aria-label={title}
      role="article"
    >
      <div className="tilt-card__content" ref={contentRef}>
        {image && (
          <div className="tilt-card__media">
            <img src={image} alt={title} loading="lazy" />
          </div>
        )}
        <div className="tilt-card__body">
          <h3 className="tilt-card__title">{title}</h3>
          <p className="tilt-card__desc">{description}</p>
        </div>
      </div>

      {glare && <div className="tilt-card__glare" aria-hidden="true" />}
    </div>
  );
}
