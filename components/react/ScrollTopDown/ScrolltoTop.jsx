import React, { useState, useEffect } from 'react';

const ScrollToTop = ({ 
  showAt = 300,
  position = 'bottom-right',
  size = 'md',
  variant = 'circle',
  smooth = true,
  icon = 'arrow'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAt) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAt]);

  const scrollToTop = () => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const positions = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'bottom-center': 'bottom-8 left-1/2 -translate-x-1/2',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8'
  };

  const sizes = {
    sm: variant === 'circle' ? 'w-10 h-10' : 'px-3 py-2 text-sm',
    md: variant === 'circle' ? 'w-12 h-12' : 'px-4 py-2 text-base',
    lg: variant === 'circle' ? 'w-14 h-14' : 'px-5 py-3 text-lg',
    xl: variant === 'circle' ? 'w-16 h-16' : 'px-6 py-3 text-xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const renderIcon = () => {
    if (icon === 'arrow') {
      return (
        <svg
          className={iconSizes[size]}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      );
    } else if (icon === 'chevron') {
      return (
        <svg
          className={iconSizes[size]}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      );
    } else if (icon === 'rocket') {
      return (
        <svg
          className={iconSizes[size]}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed ${positions[position]} ${sizes[size]}
        ${variant === 'circle' ? 'rounded-full' : 'rounded-lg'}
        bg-gradient-to-r from-blue-600 to-purple-600
        text-white shadow-lg hover:shadow-xl
        hover:scale-110 active:scale-95
        transition-all duration-300 ease-in-out
        flex items-center justify-center gap-2
        z-50 focus:outline-none focus:ring-4 focus:ring-blue-300
        animate-fadeIn
      `}
      aria-label="Scroll to top"
    >
      {renderIcon()}
      {variant === 'pill' && <span className="font-medium">Top</span>}
    </button>
  );
};

// Demo component
export default function App() {
  const [showAt, setShowAt] = useState(300);
  const [position, setPosition] = useState('bottom-right');
  const [size, setSize] = useState('md');
  const [variant, setVariant] = useState('circle');
  const [icon, setIcon] = useState('arrow');
  const [smooth, setSmooth] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-md z-40 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Scroll to Top Button Component
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Scroll down to see the button appear
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="top-right">Top Right</option>
                <option value="top-left">Top Left</option>
              </select>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Size
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>

            {/* Variant */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variant
              </label>
              <select
                value={variant}
                onChange={(e) => setVariant(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="circle">Circle</option>
                <option value="pill">Pill with Text</option>
              </select>
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon
              </label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="arrow">Arrow</option>
                <option value="chevron">Chevron</option>
                <option value="rocket">Rocket</option>
              </select>
            </div>

            {/* Show At */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Show after scrolling: {showAt}px
              </label>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={showAt}
                onChange={(e) => setShowAt(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Smooth Scroll */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smooth}
                  onChange={(e) => setSmooth(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Smooth Scrolling
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Content sections */}
        {[1, 2, 3, 4, 5].map((section) => (
          <div key={section} className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Section {section}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </p>
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">End of Content</h2>
          <p>Scroll back up to see the button in action!</p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop
        showAt={showAt}
        position={position}
        size={size}
        variant={variant}
        icon={icon}
        smooth={smooth}
      />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}