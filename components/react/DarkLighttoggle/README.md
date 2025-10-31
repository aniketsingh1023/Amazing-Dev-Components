# Dark/Light Toggle Button

A beautiful, accessible React toggle component for switching between dark and light modes.


## Features

 **Smooth Animations** - Fluid transitions between states  
 **Three Size Options** - Small, medium, and large variants  
 **Fully Accessible** - ARIA labels and keyboard support  
 **Animated Icons** - Sun and moon icons with smooth transitions  
 **Simple API** - Easy to integrate with just a few props  
 **Styled with Tailwind** - Uses Tailwind CSS utility classes

## Installation

### Prerequisites

This component requires:
- React 16.8+ (uses hooks)
- Tailwind CSS configured in your project

### Steps

1. **Copy the component file** to your project:

```bash
# Create a components directory if you don't have one
mkdir -p src/components

# Copy the DarkLightToggle.jsx file
# Place it in src/components/DarkLightToggle.jsx
```

2. **Ensure Tailwind CSS is set up** in your project. If not already installed:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

Make sure your `tailwind.config.js` includes the component path:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Usage

### Basic Example

```jsx
import React, { useState } from 'react';
import DarkLightToggle from './components/DarkLightToggle';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div>
      <DarkLightToggle 
        onChange={(darkMode) => setIsDark(darkMode)}
      />
    </div>
  );
}
```

### With Initial Dark Mode

```jsx
<DarkLightToggle 
  defaultDark={true}
  onChange={(darkMode) => {
    console.log('Dark mode enabled:', darkMode);
  }}
/>
```

### Different Sizes

```jsx
{/* Small */}
<DarkLightToggle size="sm" onChange={handleChange} />

{/* Medium (default) */}
<DarkLightToggle size="md" onChange={handleChange} />

{/* Large */}
<DarkLightToggle size="lg" onChange={handleChange} />
```

### Integration with Theme Context

```jsx
import React, { createContext, useContext, useState } from 'react';
import DarkLightToggle from './components/DarkLightToggle';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <div className={isDark ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

function Header() {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <header>
      <DarkLightToggle 
        defaultDark={isDark}
        onChange={setIsDark}
      />
    </header>
  );
}
```

### With Local Storage Persistence

```jsx
import React, { useState, useEffect } from 'react';
import DarkLightToggle from './components/DarkLightToggle';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    // Apply dark class to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <DarkLightToggle 
      defaultDark={isDark}
      onChange={setIsDark}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onChange` | `(isDark: boolean) => void` | `() => {}` | Callback function called when toggle state changes. Receives the new dark mode state. |
| `defaultDark` | `boolean` | `false` | Initial state of the toggle. `true` for dark mode, `false` for light mode. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant of the toggle button. |

## Customization

### Changing Colors

The component uses Tailwind classes. You can modify the colors by editing the component:

```jsx
// In DarkLightToggle.jsx
// Light mode background
className="bg-amber-400"  // Change to your preferred color

// Dark mode background
className="bg-slate-700"  // Change to your preferred color
```

### Custom Sizes

Add your own size variant:

```jsx
const sizeClasses = {
  sm: 'w-12 h-6',
  md: 'w-16 h-8',
  lg: 'w-20 h-10',
  xl: 'w-24 h-12',  // Add custom size
};
```

## Accessibility

The component follows accessibility best practices:

-  Proper ARIA labels (`aria-label`, `aria-checked`)
-  Semantic `role="switch"`
-  Keyboard accessible (can be toggled with Space/Enter)
-  Focus indicators with ring styles
-  Screen reader friendly

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid & Flexbox
- CSS Transitions

