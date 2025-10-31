# Confetti Celebration Button 

A delightful React button component that launches animated confetti particles when clicked. Perfect for celebrations, achievements, success messages, and adding joy to user interactions!

## Features

-  **Animated Confetti** - Physics-based particle animation with gravity
-  **Customizable Colors** - Define your own color schemes
-  **Multiple Sizes** - Four size options (sm, md, lg, xl)
-  **Beautiful Variants** - Five pre-styled variants including rainbow
-  **Configurable** - Control particle count, colors, and behavior
-  **Three Particle Shapes** - Circle, square, and triangle confetti
-  **Icon Support** - Add icons from Lucide React
-  **Accessible** - Proper disabled states and button semantics
-  **Smooth Animations** - Fade out effect and rotation

## Installation

```bash
npm install lucide-react
```

Make sure you have Tailwind CSS configured in your project.

## Basic Usage

```jsx
import ConfettiButton from './ConfettiButton';

const App = () => {
  return (
    <ConfettiButton onClick={() => console.log('Celebrated!')}>
      Celebrate! 🎉
    </ConfettiButton>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `'Celebrate! 🎉'` | Button content/text |
| `onClick` | `function` | `undefined` | Callback function when button is clicked |
| `variant` | `'primary' \| 'success' \| 'warning' \| 'info' \| 'rainbow'` | `'primary'` | Button color variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `confettiCount` | `number` | `50` | Number of confetti particles |
| `confettiColors` | `string[]` | `['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']` | Array of hex color codes for confetti |
| `disabled` | `boolean` | `false` | Disable button and confetti |
| `icon` | `LucideIcon` | `undefined` | Lucide React icon component |
| `className` | `string` | `''` | Additional CSS classes |

## Variants

### Primary
```jsx
<ConfettiButton variant="primary">
  Primary Button
</ConfettiButton>
```
Purple to pink gradient

### Success
```jsx
<ConfettiButton variant="success">
  Success! ✓
</ConfettiButton>
```
Green to emerald gradient

### Warning
```jsx
<ConfettiButton variant="warning">
  Achievement! 
</ConfettiButton>
```
Orange to yellow gradient

### Info
```jsx
<ConfettiButton variant="info">
  Information! 
</ConfettiButton>
```
Blue to cyan gradient

### Rainbow
```jsx
<ConfettiButton variant="rainbow">
  Rainbow Party! 
</ConfettiButton>
```
Multi-color gradient effect

## Examples

### With Custom Colors

```jsx
<ConfettiButton
  variant="success"
  confettiColors={['#10b981', '#34d399', '#6ee7b7', '#a7f3d0']}
>
  Green Theme 
</ConfettiButton>
```

### With More Confetti

```jsx
<ConfettiButton
  variant="rainbow"
  confettiCount={100}
>
  Epic Celebration! 
</ConfettiButton>
```

### With Icon

```jsx
import { Trophy, Star, Heart } from 'lucide-react';

<ConfettiButton
  variant="warning"
  icon={Trophy}
  onClick={handleAchievement}
>
  Achievement Unlocked!
</ConfettiButton>
```

### Different Sizes

```jsx
<ConfettiButton size="sm">Small</ConfettiButton>
<ConfettiButton size="md">Medium</ConfettiButton>
<ConfettiButton size="lg">Large</ConfettiButton>
<ConfettiButton size="xl">Extra Large</ConfettiButton>
```

### Disabled State

```jsx
<ConfettiButton disabled>
  Can't Celebrate Yet
</ConfettiButton>
```

### With Custom Callback

```jsx
const handleCelebration = () => {
  console.log('User celebrated!');
  // Track analytics
  // Play sound
  // Update state
};

<ConfettiButton onClick={handleCelebration}>
  Click Me! 🎊
</ConfettiButton>
```

## Color Schemes

### Monochrome Themes

```jsx
// Blue theme
<ConfettiButton confettiColors={['#3b82f6', '#60a5fa', '#93c5fd']}>
  Blue Celebration
</ConfettiButton>

// Pink theme
<ConfettiButton confettiColors={['#ec4899', '#f472b6', '#f9a8d4']}>
  Pink Love 
</ConfettiButton>

// Gold theme
<ConfettiButton confettiColors={['#fbbf24', '#fcd34d', '#fde68a']}>
  Golden Success 
</ConfettiButton>
```

### Holiday Themes

```jsx
// Christmas
<ConfettiButton confettiColors={['#dc2626', '#16a34a', '#ffffff']}>
  Merry Christmas! 
</ConfettiButton>

// Halloween
<ConfettiButton confettiColors={['#f97316', '#000000', '#a855f7']}>
  Happy Halloween! 
</ConfettiButton>

// Easter
<ConfettiButton confettiColors={['#fbbf24', '#ec4899', '#a78bfa', '#4ade80']}>
  Happy Easter! 
</ConfettiButton>
```

## Use Cases

### Achievement System
```jsx
const UnlockAchievement = ({ achievement }) => (
  <ConfettiButton
    variant="warning"
    icon={Trophy}
    confettiCount={75}
    onClick={() => saveAchievement(achievement)}
  >
    Unlock Achievement
  </ConfettiButton>
);
```

### Form Success
```jsx
const SubmitButton = ({ onSubmit }) => (
  <ConfettiButton
    variant="success"
    icon={CheckCircle}
    onClick={onSubmit}
  >
    Submit Form
  </ConfettiButton>
);
```

### Milestone Celebration
```jsx
const MilestoneButton = ({ milestone }) => (
  <ConfettiButton
    variant="rainbow"
    confettiCount={100}
    size="lg"
  >
    {milestone} Reached! 
  </ConfettiButton>
);
```

### Social Interactions
```jsx
const LikeButton = ({ onLike }) => (
  <ConfettiButton
    variant="primary"
    icon={Heart}
    size="sm"
    confettiCount={30}
    confettiColors={['#ec4899', '#f472b6']}
    onClick={onLike}
  >
    Like
  </ConfettiButton>
);
```

## Animation Details

The confetti animation includes:
- **Physics-based movement**: Particles follow gravity and initial velocity
- **Random trajectories**: Each particle has unique horizontal and vertical velocity
- **Rotation**: Particles rotate as they fall
- **Fade out**: Opacity decreases over time
- **Multiple shapes**: Circle, square, and triangle particles
- **2-second duration**: Particles animate and then clean up automatically

## Performance Considerations

- Default particle count (50) is optimized for smooth performance
- Particles are removed from DOM after animation completes
- Button prevents multiple simultaneous confetti bursts
- Consider reducing `confettiCount` on lower-end devices

## Accessibility

- Uses semantic `<button>` element
- Proper `disabled` state handling
- Visual feedback on hover and active states
- Keyboard accessible (Space and Enter keys work)

## Browser Support

Works in all modern browsers that support:
- CSS transforms
- RequestAnimationFrame
- ES6+ JavaScript

## Customization Tips

1. **Match brand colors**: Use your brand's color palette for confetti
2. **Adjust intensity**: More confetti = bigger celebration
3. **Size appropriately**: Use larger buttons for important actions
4. **Add sound**: Combine with audio for enhanced effect
5. **Combine with other effects**: Use alongside toasts or notifications

## Common Issues

**Confetti appears behind other elements?**
- Confetti uses `z-index: 9999` but check for higher z-index elements

**Animation feels slow?**
- Reduce `confettiCount` for better performance

**Colors don't match design?**
- Customize `confettiColors` array with your color scheme

## Dependencies

- `react` - ^18.0.0
- `lucide-react` - ^0.263.0
- `tailwindcss` - ^3.0.0

