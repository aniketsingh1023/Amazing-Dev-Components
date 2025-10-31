import React, { useState } from 'react';

const DarkLightToggle = ({ 
  onChange = () => {}, 
  defaultDark = false,
  size = 'md' 
}) => {
  const [isDark, setIsDark] = useState(defaultDark);

  const handleToggle = () => {
    const newState = !isDark;
    setIsDark(newState);
    onChange(newState);
  };

  const sizeClasses = {
    sm: 'w-12 h-6',
    md: 'w-16 h-8',
    lg: 'w-20 h-10'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleToggle}
      className={`${sizeClasses[size]} relative rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDark 
          ? 'bg-slate-700 focus:ring-slate-500' 
          : 'bg-amber-400 focus:ring-amber-300'
      }`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={isDark}
    >
      <span
        className={`absolute top-1 ${size === 'sm' ? 'left-1' : size === 'md' ? 'left-1' : 'left-1.5'} transform transition-transform duration-300 ease-in-out ${
          isDark ? (size === 'sm' ? 'translate-x-6' : size === 'md' ? 'translate-x-8' : 'translate-x-10') : 'translate-x-0'
        } ${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-7 h-7'} bg-white rounded-full shadow-md flex items-center justify-center`}
      >
        {isDark ? (
          <svg
            className={`${iconSizes[size]} text-slate-700`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg
            className={`${iconSizes[size]} text-amber-400`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </button>
  );
};

// Demo component
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className={`p-8 rounded-2xl shadow-2xl transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <h1 className={`text-3xl font-bold mb-6 text-center transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-slate-800'
        }`}>
          Dark/Light Toggle
        </h1>
        
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Small
            </span>
            <DarkLightToggle 
              size="sm"
              defaultDark={isDarkMode}
              onChange={(dark) => setIsDarkMode(dark)}
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Medium (Default)
            </span>
            <DarkLightToggle 
              size="md"
              defaultDark={isDarkMode}
              onChange={(dark) => setIsDarkMode(dark)}
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Large
            </span>
            <DarkLightToggle 
              size="lg"
              defaultDark={isDarkMode}
              onChange={(dark) => setIsDarkMode(dark)}
            />
          </div>
        </div>

        <div className={`mt-8 p-4 rounded-lg ${
          isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
        }`}>
          <p className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Current mode: <span className="font-semibold">{isDarkMode ? 'Dark' : 'Light'}</span>
          </p>
        </div>
      </div>
    </div>
  );
}