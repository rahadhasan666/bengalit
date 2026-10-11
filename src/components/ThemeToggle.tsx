import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-cyan-400/50 ${
        isDark
          ? 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-800'
          : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-cyan-600 hover:border-cyan-500/40 hover:bg-slate-50'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun
          className={`w-5 h-5 transition-all duration-500 transform ${
            isDark
              ? 'opacity-100 rotate-0 scale-100 text-cyan-400'
              : 'opacity-0 -rotate-90 scale-50 absolute pointer-events-none'
          }`}
        />
        <Moon
          className={`w-5 h-5 transition-all duration-500 transform ${
            !isDark
              ? 'opacity-100 rotate-0 scale-100 text-slate-800'
              : 'opacity-0 rotate-90 scale-50 absolute pointer-events-none'
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
