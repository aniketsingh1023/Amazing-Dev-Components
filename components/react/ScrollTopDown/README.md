# Scroll to Top Button

A smooth, customizable scroll-to-top button component for React. Shows a floating button when users scroll down, and smoothly scrolls back to the top when clicked.


## Features

 **Smooth Scrolling** - Animated scroll to top with customizable behavior  
 **Auto Show/Hide** - Appears after scrolling past a threshold  
 **Multiple Positions** - 5 position options (corners and center)  
 **Two Variants** - Circle icon or pill with text  
 **Three Icon Styles** - Arrow, chevron, or rocket  
 **Four Size Options** - Small to extra large  
 **Lightweight** - No external dependencies  
 **Accessible** - ARIA labels and keyboard support  
 **Beautiful Animations** - Smooth fade-in and hover effects

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

# Copy the ScrollToTop.jsx file
# Place it in src/components/ScrollToTop.jsx
```

2. **Ensure Tailwind CSS is set up** in your project. If not already installed:

```bash
npm install -D tailwindcss
npx tailwindcss init
```

## Usage

### Basic Example

```jsx
import React from 'react';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div>
      <YourContent />
      <ScrollToTop />
    </div>
  );
}
```

### Custom Position

```jsx
{/* Bottom right (default) */}
<ScrollToTop position="bottom-right" />

{/* Bottom left */}
<ScrollToTop position="bottom-left" />

{/* Bottom center */}
<ScrollToTop position="bottom-center" />

{/* Top right */}
<ScrollToTop position="top-right" />

{/* Top left */}
<ScrollToTop position="top-left" />
```

### Different Sizes

```jsx
{/* Small */}
<ScrollToTop size="sm" />

{/* Medium (default) */}
<ScrollToTop size="md" />

{/* Large */}
<ScrollToTop size="lg" />

{/* Extra Large */}
<ScrollToTop size="xl" />
```

### Button Variants

```jsx
{/* Circle with icon only (default) */}
<ScrollToTop variant="circle" />

{/* Pill with icon and text */}
<ScrollToTop variant="pill" />
```

### Icon Options

```jsx
{/* Arrow icon (default) */}
<ScrollToTop icon="arrow" />

{/* Chevron icon */}
<ScrollToTop icon="chevron" />

{/* Rocket icon */}
<ScrollToTop icon="rocket" />
```

### Custom Scroll Threshold

```jsx
{/* Show button after scrolling 500px */}
<ScrollToTop showAt={500} />

{/* Show immediately */}
<ScrollToTop showAt={0} />

{/* Show after scrolling 1000px */}
<ScrollToTop showAt={1000} />
```

### Instant Scroll (No Animation)

```jsx
{/* Smooth scroll (default) */}
<ScrollToTop smooth={true} />

{/* Instant scroll */}
<ScrollToTop smooth={false} />
```

### Complete Customization Example

```jsx
<ScrollToTop
  showAt={400}
  position="bottom-right"
  size="lg"
  variant="pill"
  icon="rocket"
  smooth={true}
/>
```

### Blog Post Example

```jsx
import React from 'react';
import ScrollToTop from './components/ScrollToTop';

function BlogPost() {
  return (
    <article className="max-w-4xl mx-auto p-8">
      <h1>My Blog Post</h1>
      <div className="prose">
        {/* Your long content here */}
      </div>
      
      {/* Scroll to top button */}
      <ScrollToTop
        showAt={300}
        position="bottom-right"
        size="md"
        icon="arrow"
      />
    </article>
  );
}
```

### E-commerce Product Page

```jsx
import React from 'react';
import ScrollToTop from './components/ScrollToTop';

function ProductPage() {
  return (
    <div>
      <ProductGallery />
      <ProductDetails />
      <Reviews />
      <RelatedProducts />
      
      {/* Large, prominent scroll button */}
      <ScrollToTop
        showAt={500}
        position="bottom-right"
        size="lg"
        variant="pill"
        icon="chevron"
      />
    </div>
  );
}
```

### Documentation Site

```jsx
import React from 'react';
import ScrollToTop from './components/ScrollToTop';

function Documentation() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <DocumentationContent />
        
        {/* Bottom center for wide layouts */}
        <ScrollToTop
          showAt={400}
          position="bottom-center"
          size="md"
          icon="arrow"
        />
      </main>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showAt` | `number` | `300` | Number of pixels to scroll before button appears. |
| `position` | `'bottom-right' \| 'bottom-left' \| 'bottom-center' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Position of the button on screen. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the button. |
| `variant` | `'circle' \| 'pill'` | `'circle'` | Button shape. Circle shows icon only, pill shows icon with "Top" text. |
| `icon` | `'arrow' \| 'chevron' \| 'rocket'` | `'arrow'` | Icon to display in the button. |
| `smooth` | `boolean` | `true` | Enable smooth scrolling animation. When false, scrolls instantly. |

## Customization

### Changing Colors

The button uses a gradient. Modify the component to change colors:

```jsx
// In ScrollToTop.jsx, find this line:
className="... bg-gradient-to-r from-blue-600 to-purple-600 ..."

// Change to your preferred colors:
className="... bg-gradient-to-r from-green-600 to-teal-600 ..."

// For solid colors:
className="... bg-blue-600 ..."
```

### Changing Animation Duration

```jsx
// In ScrollToTop.jsx, find:
className="... transition-all duration-300 ..."

// Change to faster (150ms) or slower (500ms):
className="... transition-all duration-150 ..."
className="... transition-all duration-500 ..."
```

### Custom Hover Effects

```jsx
// Current hover effect:
className="... hover:scale-110 ..."

// Alternative effects:
className="... hover:scale-105 ..."  // Subtle scale
className="... hover:rotate-12 ..."  // Rotation
className="... hover:shadow-2xl ..." // Larger shadow
```

### Adding Custom Icons

You can add your own icons by modifying the `renderIcon` function:

```jsx
const renderIcon = () => {
  if (icon === 'custom') {
    return (
      <svg className={iconSizes[size]} viewBox="0 0 24 24">
        {/* Your custom SVG path */}
      </svg>
    );
  }
  // ... rest of the function
};
```

## Performance Notes

- Uses `window.addEventListener` with proper cleanup
- Button only renders when visible (returns `null` when hidden)
- Smooth scroll uses native `window.scrollTo` with `behavior: 'smooth'`
- Minimal re-renders - only updates on scroll threshold crossing

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Transforms & Transitions
- Smooth scroll behavior (all modern browsers)

**Note**: For older browsers without smooth scroll support, the component gracefully falls back to instant scroll.

## Accessibility

The component follows accessibility best practices:

-  Proper ARIA label (`aria-label="Scroll to top"`)
-  Keyboard accessible (can be activated with Enter/Space)
-  Focus indicators with ring styles
-  Semantic `<button>` element
-  High contrast colors for visibility

## Common Use Cases

Blog posts and articles  
Long-form content pages  
E-commerce product pages  
Documentation sites  
News websites  
Portfolio pages  
Landing pages with multiple sections

## Best Practices

1. **Position**: Use `bottom-right` for most layouts. Use `bottom-center` for wide, centered content.
2. **Show threshold**: Set to 300-500px for most pages. Higher for very long pages.
3. **Size**: Use `md` for most cases. Use `lg` or `xl` for pages where it's a primary navigation element.
4. **Variant**: Use `circle` for minimal design, `pill` when you want more emphasis.
5. **Icon**: `arrow` is most universally understood. `rocket` adds personality.

## Troubleshooting

**Button not appearing:**
- Check that page is scrollable and exceeds `showAt` threshold
- Verify component is rendered in the DOM
- Check z-index conflicts with other fixed elements

**Smooth scroll not working:**
- Some browsers may not support smooth scroll
- Check for CSS that sets `scroll-behavior: auto`
- Try reducing `showAt` value

**Button appears immediately:**
- Increase `showAt` value (default 300px)
- Check initial scroll position on page load

**Styling issues:**
- Ensure Tailwind CSS is properly configured
- Check that content paths include component files
- Verify no conflicting global styles

