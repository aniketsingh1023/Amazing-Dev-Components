# TiltCard — 3D Tilt Card (React)

A lightweight, reusable 3D tilt card component built with React and CSS.
Features:
- Smooth tilt on mouse move
- Optional glare highlight that follows mouse
- Click "press" effect
- Disabled on mobile (configurable)
- Respects `prefers-reduced-motion`

## Installation (for this repo)
Place the `TiltCard.jsx` and `TiltCard.css` inside `components/react/TiltCard/`.

## Usage
```jsx
import TiltCard from "./components/raect/TiltCard/TiltCard";
import "./components/react/TiltCard/TiltCard.css";

function Demo() {
  return (
    <div style={{ padding: 24 }}>
      <TiltCard
        image="/path/to/image.jpg"
        title="3D Tilt Card"
        description="A polished tilt card component for UI showcases."
        width="300px"
        height="380px"
        maxTilt={18}
        glare={true}
      />
    </div>
  );
}
