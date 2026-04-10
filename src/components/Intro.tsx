
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import { LOGO_IMAGE_URL, TREX_IMAGE_URL } from '../constants';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Generate stars once
  const stars = useMemo(() =>
    Array.from({ length: 65 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 82}%`,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 1.5,
    })), []);

  // Reveal phases
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 350),   // logo
      setTimeout(() => setPhase(2), 950),   // title
      setTimeout(() => setPhase(3), 1650),  // subtitle
      setTimeout(() => setPhase(4), 2300),  // press start + running char
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleStart = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onComplete, 420);
  }, [exiting, onComplete]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['Space', 'Enter', 'ArrowUp'].includes(e.code)) {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleStart]);

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-[#020c1b] flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
      animate={exiting ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.38 }}
      onClick={handleStart}
    >
      {/* Twinkling stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={{ opacity: [0.1, 0.85, 0.1] }}
          transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines-overlay pointer-events-none" />

      {/* Glow pulse in background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-blue-700/10 blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4 px-4 text-center">

        {/* Windmar logo */}
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: -35, scale: 0.75 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 190, damping: 14 }}
            className="relative"
          >
            <div className="absolute inset-0 scale-[2.5] blur-2xl bg-blue-600/20 rounded-full" />
            <img src={LOGO_IMAGE_URL} alt="Windmar Home" className="h-10 sm:h-14 w-auto relative" />
          </motion.div>
        )}

        {/* Game title */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-cartoon neon-blue-title leading-none tracking-wide">
              WINDMAR
            </h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-cartoon leading-tight tracking-widest"
              style={{ color: '#fde047', textShadow: '0 0 18px rgba(253,224,71,0.65), 0 0 40px rgba(253,224,71,0.3)' }}>
              RUNNER
            </h1>
          </motion.div>
        )}

        {/* Tagline */}
        {phase >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.6 }}
            className="text-slate-300 text-[11px] sm:text-sm font-bold uppercase tracking-[0.22em]"
          >
            ¡Lleva energía solar a toda Puerto Rico!
          </motion.p>
        )}

        {/* Press start */}
        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 sm:mt-5"
          >
            <p className="press-start-blink font-cartoon text-base sm:text-xl text-yellow-400 uppercase tracking-[0.25em]">
              ✦ TOCA PARA CONTINUAR ✦
            </p>
          </motion.div>
        )}
      </div>

      {/* Jhonny running at bottom */}
      {phase >= 4 && (
        <div className="absolute bottom-6 sm:bottom-10 left-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="run-intro-char"
          >
            <img src={TREX_IMAGE_URL} alt="Jhonny" className="h-10 sm:h-14 w-auto" />
          </motion.div>
        </div>
      )}

      {/* Ground line */}
      <div className="absolute bottom-5 sm:bottom-9 left-0 right-0 h-px bg-blue-900/35 pointer-events-none" />
    </motion.div>
  );
};

export default Intro;
