# Popup Modal / Dialog Box

A fully-featured and accessible React modal component for displaying information, forms, confirmations, and custom content in an overlay dialog.

## Features

-  **Smooth Animations** - Elegant fade-in and scale effects
-  **Accessible** - ARIA attributes and keyboard navigation support
-  **Focus Trap** - Prevents body scrolling when modal is open
-  **Keyboard Support** - Close with Escape key
-  **Overlay Click** - Optional close on backdrop click
-  **Multiple Sizes** - 5 pre-defined size options (sm, md, lg, xl, full)
-  **Customizable** - Flexible header, body, and footer sections
-  **Responsive** - Works seamlessly on all screen sizes
-  **Close Control** - Configurable close behavior

## Installation

```bash
npm install lucide-react
```

Make sure you have Tailwind CSS configured in your project.

## Basic Usage

```jsx
import { useState } from 'react';
import Modal from './Modal';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal"
      >
        <p>This is the modal content!</p>
      </Modal>
    </>
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **required** | Controls modal visibility |
| `onClose` | `function` | **required** | Callback function when modal closes |
| `title` | `string` | `undefined` | Modal title displayed in header |
| `children` | `ReactNode` | **required** | Modal content |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Modal size |
| `showCloseButton` | `boolean` | `true` | Show/hide the X close button |
| `closeOnOverlayClick` | `boolean` | `true` | Close modal when clicking outside |
| `closeOnEscape` | `boolean` | `true` | Close modal when pressing Escape |
| `footer` | `ReactNode` | `undefined` | Custom footer content (typically buttons) |
| `className` | `string` | `''` | Additional CSS classes for modal container |

## Size Options

| Size | Max Width | Best For |
|------|-----------|----------|
| `sm` | 28rem (448px) | Simple confirmations, alerts |
| `md` | 32rem (512px) | Standard dialogs, short forms |
| `lg` | 42rem (672px) | Longer forms, detailed content |
| `xl` | 56rem (896px) | Rich content, complex forms |
| `full` | Full width - 1rem margin | Maximum content area |

## Examples

### Information Modal

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Important Information"
  size="md"
>
  <p>This is some important information for the user.</p>
</Modal>
```

### Form Modal

```jsx
const [formData, setFormData] = useState({ name: '', email: '' });

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Contact Form"
  size="lg"
  footer={
    <>
      <button onClick={() => setIsOpen(false)}>
        Cancel
      </button>
      <button onClick={handleSubmit}>
        Submit
      </button>
    </>
  }
>
  <div>
    <label>Name</label>
    <input
      type="text"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
  </div>
  <div>
    <label>Email</label>
    <input
      type="email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
  </div>
</Modal>
```

### Confirmation Dialog

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="sm"
  closeOnOverlayClick={false}
  footer={
    <>
      <button onClick={() => setIsOpen(false)}>
        Cancel
      </button>
      <button onClick={handleConfirm}>
        Confirm
      </button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Modal Without Header

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  showCloseButton={false}
  size="md"
>
  <div className="text-center">
    <h3>Custom Header</h3>
    <p>Content without the default header.</p>
  </div>
</Modal>
```

### Full-Screen Modal

```jsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Full Screen Content"
  size="full"
>
  <div className="h-screen">
    <p>This modal takes up almost the entire screen.</p>
  </div>
</Modal>
```

## Accessibility Features

- **ARIA Attributes**: Properly labeled with `role="dialog"` and `aria-modal="true"`
- **Keyboard Navigation**: Escape key closes modal (configurable)
- **Focus Management**: Body scroll disabled when modal is open
- **Screen Reader Support**: Title properly associated with `aria-labelledby`

## Styling

The component uses Tailwind CSS utility classes. The modal includes:

- Backdrop with blur effect (`backdrop-blur-sm`)
- Smooth fade-in animation
- Responsive max-heights for content area
- Hover states for interactive elements

### Custom Styling

You can customize the modal appearance by:

1. **Using the className prop**:
```jsx
<Modal className="custom-modal-class" />
```

2. **Modifying Tailwind classes** directly in the component

3. **Wrapping with a custom container**:
```jsx
<div className="my-custom-wrapper">
  <Modal {...props} />
</div>
```

## Behavior

### Body Scroll Lock

When the modal opens, body scrolling is automatically prevented to keep focus on the modal content. This is restored when the modal closes.

### Close Methods

The modal can be closed by:
1. Clicking the X button (if `showCloseButton={true}`)
2. Pressing the Escape key (if `closeOnEscape={true}`)
3. Clicking the backdrop/overlay (if `closeOnOverlayClick={true}`)
4. Calling the `onClose` function programmatically

### Preventing Accidental Closes

For critical actions (like confirmations), disable overlay click:

```jsx
<Modal closeOnOverlayClick={false} />
```

## Best Practices

1. **Always provide a way to close**: Either show the close button or provide action buttons in the footer
2. **Use appropriate sizes**: Don't use `xl` or `full` for simple messages
3. **Keep content focused**: Modals should have a single, clear purpose
4. **Use confirmations wisely**: For destructive actions, use confirmation modals with `closeOnOverlayClick={false}`
5. **Handle state properly**: Always control `isOpen` state in parent component

## Common Patterns

### Multi-Step Modal

```jsx
const [step, setStep] = useState(1);

<Modal
  isOpen={isOpen}
  title={`Step ${step} of 3`}
  footer={
    <>
      {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
      {step < 3 && <button onClick={() => setStep(step + 1)}>Next</button>}
      {step === 3 && <button onClick={handleFinish}>Finish</button>}
    </>
  }
>
  {step === 1 && <div>Step 1 content</div>}
  {step === 2 && <div>Step 2 content</div>}
  {step === 3 && <div>Step 3 content</div>}
</Modal>
```

### Nested Modals

While generally not recommended, you can nest modals by managing separate state:

```jsx
const [modal1, setModal1] = useState(false);
const [modal2, setModal2] = useState(false);

<Modal isOpen={modal1} onClose={() => setModal1(false)}>
  <button onClick={() => setModal2(true)}>Open Another</button>
  <Modal isOpen={modal2} onClose={() => setModal2(false)}>
    Nested modal content
  </Modal>
</Modal>
```

## Dependencies

- `react` - ^18.0.0
- `lucide-react` - ^0.263.0
- `tailwindcss` - ^3.0.0

## Browser Support

Works in all modern browsers that support ES6+ and CSS transforms.

