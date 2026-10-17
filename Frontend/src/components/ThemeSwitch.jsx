import { useState, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useApp();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const switchRef = useRef(null);

  const handleToggle = (e) => {
    if (isAnimating) return;

    const rect = switchRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    const overlay = document.createElement('div');
    overlay.className = 'theme-reveal-circle';
    overlay.style.left = `${x}px`;
    overlay.style.top = `${y}px`;
    overlay.style.width = '0px';
    overlay.style.height = '0px';
    overlay.style.background =
      theme === 'light'
        ? 'radial-gradient(circle, rgba(0, 212, 255, 0.25) 0%, rgba(10, 20, 45, 0.4) 60%, transparent 100%)'
        : 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 60%, transparent 100%)';
    overlay.style.opacity = '1';

    document.body.appendChild(overlay);

    setIsAnimating(true);
    requestAnimationFrame(() => {
      const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2.2;
      overlay.style.width = `${maxDim}px`;
      overlay.style.height = `${maxDim}px`;
    });

    setTimeout(() => {
      toggleTheme();
    }, 250);

    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.remove();
        setIsAnimating(false);
      }, 300);
    }, 400);
  };

  const isDarkMode = theme === 'dark';

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={switchRef}
        onClick={handleToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '92px',
          height: '42px',
          padding: '4px 6px',
          borderRadius: '9999px',
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 212, 255, 0.35)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3), 0 0 12px rgba(0, 212, 255, 0.15)',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Sun Icon (Left) */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            color: !isDarkMode ? '#fbbf24' : '#94a3b8',
            opacity: !isDarkMode ? 1 : 0.65,
            background: !isDarkMode ? 'rgba(251, 191, 36, 0.12)' : 'transparent'
          }}
        >
          <Sun size={18} strokeWidth={2.3} />
        </div>

        {/* Moon Knob (Right) */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: isDarkMode
              ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
              : 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
            boxShadow: isDarkMode
              ? '0 0 14px rgba(56, 189, 248, 0.8), inset 0 0 8px rgba(255, 255, 255, 0.4)'
              : '0 0 16px rgba(14, 165, 233, 0.85), inset 0 0 8px rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            transform: isDarkMode ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <Moon size={16} strokeWidth={2.5} fill="#ffffff" />
        </div>
      </button>

      {/* Floating Tooltip matching Reference ("Switch to Dark Mode") */}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            zIndex: 1000,
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: '600',
            color: '#f8fafc',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
            pointerEvents: 'none',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitch;
