import React, { useState, useEffect } from 'react';
import { Sparkles, PartyPopper, Trophy, Star, Zap, Heart } from 'lucide-react';

const ConfettiButton = ({
  children = 'Celebrate! 🎉',
  onClick,
  variant = 'primary',
  size = 'md',
  confettiCount = 50,
  confettiColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  disabled = false,
  icon: Icon,
  className = ''
}) => {
  const [confetti, setConfetti] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const variants = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white',
    warning: 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white',
    rainbow: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 hover:opacity-90 text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const createConfetti = (e) => {
    if (disabled || isAnimating) return;

    setIsAnimating(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newConfetti = Array.from({ length: confettiCount }, (_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      velocityX: (Math.random() - 0.5) * 8,
      velocityY: (Math.random() - 0.5) * 8 - 3,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)]
    }));

    setConfetti(newConfetti);

    setTimeout(() => {
      setConfetti([]);
      setIsAnimating(false);
    }, 2000);

    onClick?.();
  };

  return (
    <>
      <button
        onClick={createConfetti}
        disabled={disabled}
        className={`
          ${variants[variant]}
          ${sizes[size]}
          ${className}
          font-semibold rounded-lg shadow-lg transform transition-all duration-200
          ${!disabled && 'hover:scale-105 active:scale-95'}
          ${disabled && 'opacity-50 cursor-not-allowed'}
          flex items-center gap-2 justify-center relative overflow-hidden
        `}
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span className="relative z-10">{children}</span>
        {isAnimating && (
          <span className="absolute inset-0 bg-white opacity-30 animate-pulse"></span>
        )}
      </button>

      {confetti.map((piece) => (
        <Confetti key={piece.id} {...piece} />
      ))}
    </>
  );
};

const Confetti = ({ id, x, y, color, rotation, scale, velocityX, velocityY, shape }) => {
  const [position, setPosition] = useState({ x, y });
  const [currentRotation, setCurrentRotation] = useState(rotation);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame++;
      const gravity = 0.3;
      const newY = y + velocityY * frame + gravity * frame * frame * 0.5;
      const newX = x + velocityX * frame;
      const newRotation = rotation + frame * 10;
      const newOpacity = Math.max(0, 1 - frame / 60);

      setPosition({ x: newX, y: newY });
      setCurrentRotation(newRotation);
      setOpacity(newOpacity);

      if (frame < 60) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-sm',
    triangle: 'clip-triangle'
  };

  return (
    <div
      className={`fixed pointer-events-none ${shapeStyles[shape]}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${10 * scale}px`,
        height: `${10 * scale}px`,
        backgroundColor: color,
        transform: `translate(-50%, -50%) rotate(${currentRotation}deg)`,
        opacity: opacity,
        zIndex: 9999
      }}
    />
  );
};

const ConfettiDemo = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  const celebrations = [
    { text: 'Awesome! 🌟', variant: 'primary', icon: Sparkles },
    { text: 'You did it! 🏆', variant: 'success', icon: Trophy },
    { text: 'Amazing! ⭐', variant: 'warning', icon: Star },
    { text: 'Fantastic! ⚡', variant: 'info', icon: Zap },
    { text: 'Wonderful! 💖', variant: 'rainbow', icon: Heart }
  ];

  const handleCelebrate = (text) => {
    setCount(count + 1);
    setMessage(text);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎉 Confetti Celebration Button 🎊
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Click any button to launch confetti particles!
          </p>
          <div className="text-lg font-semibold text-purple-600">
            Celebrations: {count}
          </div>
        </div>

        {message && (
          <div className="text-center mb-8 animate-bounce">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {message}
            </span>
          </div>
        )}

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Different Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {celebrations.map((celebration, idx) => (
                <ConfettiButton
                  key={idx}
                  variant={celebration.variant}
                  icon={celebration.icon}
                  onClick={() => handleCelebrate(celebration.text)}
                >
                  {celebration.text}
                </ConfettiButton>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Different Sizes</h2>
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <ConfettiButton
                size="sm"
                variant="primary"
                onClick={() => handleCelebrate('Small! 🎈')}
              >
                Small
              </ConfettiButton>
              <ConfettiButton
                size="md"
                variant="success"
                onClick={() => handleCelebrate('Medium! 🎯')}
              >
                Medium
              </ConfettiButton>
              <ConfettiButton
                size="lg"
                variant="warning"
                onClick={() => handleCelebrate('Large! 🎪')}
              >
                Large
              </ConfettiButton>
              <ConfettiButton
                size="xl"
                variant="info"
                onClick={() => handleCelebrate('Extra Large! 🎆')}
              >
                Extra Large
              </ConfettiButton>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Custom Confetti</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ConfettiButton
                variant="rainbow"
                confettiCount={100}
                icon={PartyPopper}
                onClick={() => handleCelebrate('Epic! 💥')}
              >
                100 Confetti Pieces
              </ConfettiButton>
              <ConfettiButton
                variant="success"
                confettiCount={30}
                confettiColors={['#10b981', '#34d399', '#6ee7b7']}
                onClick={() => handleCelebrate('Green Power! 🍀')}
              >
                Green Theme
              </ConfettiButton>
              <ConfettiButton
                variant="warning"
                confettiColors={['#fbbf24', '#fcd34d', '#fde68a']}
                icon={Star}
                onClick={() => handleCelebrate('Golden! ✨')}
              >
                Golden Confetti
              </ConfettiButton>
              <ConfettiButton
                variant="primary"
                confettiColors={['#ec4899', '#f472b6', '#f9a8d4']}
                icon={Heart}
                onClick={() => handleCelebrate('Love it! 💕')}
              >
                Pink Love
              </ConfettiButton>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">States</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <ConfettiButton
                variant="primary"
                onClick={() => handleCelebrate('Active! ⚡')}
              >
                Active Button
              </ConfettiButton>
              <ConfettiButton
                variant="primary"
                disabled
              >
                Disabled Button
              </ConfettiButton>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            🎨 Customize colors, count, and variants to match your celebration needs!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfettiDemo;