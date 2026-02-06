import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export const Badge: React.FC<{ children: React.ReactNode, variant?: 'primary' | 'secondary' | 'outline' | 'success' }> = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-primary-900/30 text-primary-400 border-primary-800/50',
    secondary: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    outline: 'bg-transparent text-zinc-400 border-zinc-800',
    success: 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
};

export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className, onClick }) => (
  <div
    className={`bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-800/50 shadow-sm hover:shadow-md transition-all duration-200 ${onClick ? 'cursor-pointer hover:border-zinc-700' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);
