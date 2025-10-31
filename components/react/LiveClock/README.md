# Live Clock Component

A beautiful, real-time clock component for React with both digital and analog variants, multiple customization options, and timezone support.

![Demo](https://img.shields.io/badge/React-Component-61dafb?style=flat&logo=react)

## Features

 **Real-time Updates** - Updates every second automatically  
 **Two Variants** - Digital and analog clock styles  
 **Timezone Support** - Display time in any timezone  
 **Date Display** - Optional date information  
 **Highly Customizable** - Multiple size options and formats  
 **12/24 Hour Format** - Switch between formats easily  
 **Lightweight** - No external dependencies except React  
 **Easy to Use** - Simple props API

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

# Copy the LiveClock.jsx file
# Place it in src/components/LiveClock.jsx
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
import LiveClock from './components/LiveClock';

function App() {
  return (
    <div>
      <LiveClock />
    </div>
  );
}
```

### Digital Clock with Custom Format

```jsx
{/* 24-hour format without seconds */}
<LiveClock 
  format="24"
  showSeconds={false}
/>

{/* 12-hour format with seconds */}
<LiveClock 
  format="12"
  showSeconds={true}
/>
```

### Analog Clock

```jsx
{/* Small analog clock */}
<LiveClock 
  variant="analog"
  size="sm"
/>

{/* Large analog clock */}
<LiveClock 
  variant="analog"
  size="lg"
/>
```

### Different Sizes

```jsx
{/* Small */}
<LiveClock size="sm" />

{/* Medium (default) */}
<LiveClock size="md" />

{/* Large */}
<LiveClock size="lg" />

{/* Extra Large */}
<LiveClock size="xl" />
```

### Without Date Display

```jsx
<LiveClock showDate={false} />
```

### Different Timezones

```jsx
{/* New York time */}
<LiveClock timezone="America/New_York" />

{/* London time */}
<LiveClock timezone="Europe/London" />

{/* Tokyo time */}
<LiveClock timezone="Asia/Tokyo" />

{/* Local time (default) */}
<LiveClock timezone="local" />
```

### World Clock Dashboard Example

```jsx
import React from 'react';
import LiveClock from './components/LiveClock';

function WorldClockDashboard() {
  const timezones = [
    { name: 'New York', tz: 'America/New_York' },
    { name: 'London', tz: 'Europe/London' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'Sydney', tz: 'Australia/Sydney' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-8">
      {timezones.map(({ name, tz }) => (
        <div key={tz} className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">{name}</h3>
          <LiveClock 
            timezone={tz}
            format="12"
            size="md"
          />
        </div>
      ))}
    </div>
  );
}
```

### Full-Page Clock Example

```jsx
import React from 'react';
import LiveClock from './components/LiveClock';

function FullPageClock() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-12 rounded-3xl shadow-2xl">
        <LiveClock 
          variant="digital"
          format="12"
          showSeconds={true}
          showDate={true}
          size="xl"
        />
      </div>
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `format` | `'12' \| '24'` | `'12'` | Time format. Use '12' for 12-hour format with AM/PM, or '24' for 24-hour format. |
| `showSeconds` | `boolean` | `true` | Whether to display seconds in digital mode. |
| `showDate` | `boolean` | `true` | Whether to display the date below the time (digital mode only). |
| `timezone` | `string` | `'local'` | IANA timezone string (e.g., 'America/New_York') or 'local' for user's timezone. |
| `variant` | `'digital' \| 'analog'` | `'digital'` | Clock display style. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the clock. |

## Timezone Reference

Common timezone values:
- **Americas**: `America/New_York`, `America/Chicago`, `America/Los_Angeles`, `America/Toronto`
- **Europe**: `Europe/London`, `Europe/Paris`, `Europe/Berlin`, `Europe/Moscow`
- **Asia**: `Asia/Tokyo`, `Asia/Shanghai`, `Asia/Dubai`, `Asia/Kolkata`
- **Pacific**: `Australia/Sydney`, `Pacific/Auckland`
- **Special**: `UTC`, `local`

For a complete list of timezones, see [IANA Time Zone Database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## Customization

### Changing Digital Clock Colors

The digital clock uses a gradient. Modify the component to change colors:

```jsx
// In LiveClock.jsx, find this line:
className="... from-blue-600 to-purple-600 ..."

// Change to your preferred colors:
className="... from-green-600 to-teal-600 ..."
```

### Changing Analog Clock Colors

```jsx
// In AnalogClock component, modify these SVG elements:

// Clock face
<circle fill="white" stroke="#e5e7eb" ... />

// Hour hand
<line stroke="#1f2937" ... />

// Minute hand  
<line stroke="#4b5563" ... />

// Second hand
<line stroke="#ef4444" ... />
```

### Custom Sizes

Add your own size variant by modifying the `sizeClasses` object:

```jsx
const sizeClasses = {
  sm: { time: 'text-2xl', date: 'text-xs' },
  md: { time: 'text-4xl', date: 'text-sm' },
  lg: { time: 'text-6xl', date: 'text-base' },
  xl: { time: 'text-8xl', date: 'text-lg' },
  xxl: { time: 'text-9xl', date: 'text-xl' }  // Add custom size
};
```

## Performance Notes

- The component updates every second using `setInterval`
- Cleanup is handled automatically when component unmounts
- Minimal re-renders - only when time changes
- Lightweight with no external dependencies

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Gradients & Flexbox
- SVG (for analog clock)
- Intl.DateTimeFormat API (for timezone support)

## Common Use Cases

 Dashboard widgets  
 World clock applications  
 Meeting room displays  
 Countdown timers (with modifications)  
 Time tracking applications  
 Screensavers  
 Clock apps

## Troubleshooting

**Clock not updating:**
- Ensure component is mounted and not hidden
- Check browser console for errors

**Timezone not working:**
- Verify timezone string is valid IANA format
- Check browser support for Intl API

**Styling issues:**
- Ensure Tailwind CSS is properly configured
- Check that content paths include component files

