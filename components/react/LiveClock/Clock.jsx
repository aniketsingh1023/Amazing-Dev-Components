import React, { useState, useEffect } from 'react';

const LiveClock = ({ 
  format = '12',
  showSeconds = true,
  showDate = true,
  timezone = 'local',
  variant = 'digital',
  size = 'md'
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: format === '12',
      ...(timezone !== 'local' && { timeZone: timezone })
    };
    return date.toLocaleTimeString('en-US', options);
  };

  const formatDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(timezone !== 'local' && { timeZone: timezone })
    };
    return date.toLocaleDateString('en-US', options);
  };

  const sizeClasses = {
    sm: { time: 'text-2xl', date: 'text-xs' },
    md: { time: 'text-4xl', date: 'text-sm' },
    lg: { time: 'text-6xl', date: 'text-base' },
    xl: { time: 'text-8xl', date: 'text-lg' }
  };

  if (variant === 'analog') {
    return <AnalogClock time={time} size={size} />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className={`font-mono font-bold ${sizeClasses[size].time} bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
        {formatTime(time)}
      </div>
      {showDate && (
        <div className={`${sizeClasses[size].date} text-gray-600 font-medium`}>
          {formatDate(time)}
        </div>
      )}
    </div>
  );
};

const AnalogClock = ({ time, size }) => {
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const secondDeg = seconds * 6;

  const sizeMap = {
    sm: 120,
    md: 200,
    lg: 280,
    xl: 360
  };

  const clockSize = sizeMap[size] || sizeMap.md;
  const radius = clockSize / 2;

  return (
    <div className="relative" style={{ width: clockSize, height: clockSize }}>
      <svg width={clockSize} height={clockSize} className="drop-shadow-xl">
        {/* Clock face */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - 10}
          fill="white"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = radius + (radius - 30) * Math.cos(angle);
          const y1 = radius + (radius - 30) * Math.sin(angle);
          const x2 = radius + (radius - 20) * Math.cos(angle);
          const y2 = radius + (radius - 20) * Math.sin(angle);
          
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#374151"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1={radius}
          y1={radius}
          x2={radius + (radius - 60) * Math.cos((hourDeg - 90) * (Math.PI / 180))}
          y2={radius + (radius - 60) * Math.sin((hourDeg - 90) * (Math.PI / 180))}
          stroke="#1f2937"
          strokeWidth="6"
          strokeLinecap="round"
          style={{ transition: 'all 0.5s ease-in-out' }}
        />

        {/* Minute hand */}
        <line
          x1={radius}
          y1={radius}
          x2={radius + (radius - 40) * Math.cos((minuteDeg - 90) * (Math.PI / 180))}
          y2={radius + (radius - 40) * Math.sin((minuteDeg - 90) * (Math.PI / 180))}
          stroke="#4b5563"
          strokeWidth="4"
          strokeLinecap="round"
          style={{ transition: 'all 0.5s ease-in-out' }}
        />

        {/* Second hand */}
        <line
          x1={radius}
          y1={radius}
          x2={radius + (radius - 30) * Math.cos((secondDeg - 90) * (Math.PI / 180))}
          y2={radius + (radius - 30) * Math.sin((secondDeg - 90) * (Math.PI / 180))}
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle cx={radius} cy={radius} r="8" fill="#1f2937" />
        <circle cx={radius} cy={radius} r="4" fill="#ef4444" />
      </svg>
    </div>
  );
};

// Demo component
export default function App() {
  const [variant, setVariant] = useState('digital');
  const [format, setFormat] = useState('12');
  const [showSeconds, setShowSeconds] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [size, setSize] = useState('md');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Live Clock Component
        </h1>

        {/* Clock Display */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 min-h-[300px] flex items-center justify-center">
          <LiveClock
            format={format}
            showSeconds={showSeconds}
            showDate={showDate}
            variant={variant}
            size={size}
          />
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <button
              onClick={() => setVariant('digital')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                variant === 'digital'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Digital
            </button>
            <button
              onClick={() => setVariant('analog')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                variant === 'analog'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Analog
            </button>
          </div>

          {variant === 'digital' && (
            <>
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <button
                  onClick={() => setFormat('12')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    format === '12'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  12-Hour
                </button>
                <button
                  onClick={() => setFormat('24')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    format === '24'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  24-Hour
                </button>
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSeconds}
                    onChange={(e) => setShowSeconds(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Show Seconds</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showDate}
                    onChange={(e) => setShowDate(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Show Date</span>
                </label>
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-2 items-center justify-center">
            {['sm', 'md', 'lg', 'xl'].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  size === s
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}