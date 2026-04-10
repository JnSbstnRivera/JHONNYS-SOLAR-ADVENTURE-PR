
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS } from '../constants';
import { Character } from '../types';

interface CharacterSelectProps {
  onStart: (character: Character) => void;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ onStart }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<'right' | 'left'>('right');
  const touchStartX = useRef(0);

  const char = CHARACTERS[selectedIndex];

  const prev = () => {
    setSlideDir('left');
    setSelectedIndex(i => (i - 1 + CHARACTERS.length) % CHARACTERS.length);
  };

  const next = () => {
    setSlideDir('right');
    setSelectedIndex(i => (i + 1) % CHARACTERS.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') { prev(); return; }
      if (e.code === 'ArrowRight') { next(); return; }
      if ((e.code === 'Space' || e.code === 'Enter') && char.available) {
        e.preventDefault();
        onStart(char);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [char, onStart]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 38) {
      if (diff > 0) next();
      else prev();
    }
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38 }}
        className="bg-slate-900/95 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-8 max-w-md w-full border-2 border-blue-600 shadow-2xl text-white flex flex-col items-center"
      >
        {/* Header */}
        <motion.div
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.12, type: 'spring', stiffness: 220 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl sm:text-4xl font-cartoon text-blue-400 uppercase tracking-tight">
            ELIGE TU HÉROE
          </h2>
          <div className="h-0.5 w-16 bg-yellow-500 mx-auto mt-1 rounded-full" />
        </motion.div>

        {/* Carousel */}
        <div
          className="w-full flex items-center gap-1 sm:gap-2 mb-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left arrow */}
          <button
            onClick={prev}
            className="text-2xl sm:text-3xl text-blue-400 hover:text-white hover:scale-125 active:scale-95 transition-all duration-150 shrink-0 p-1.5 sm:p-2 select-none"
            aria-label="Anterior personaje"
          >
            ◀
          </button>

          {/* Card slot */}
          <div
            className="flex-1 overflow-hidden flex items-center justify-center"
            style={{ minHeight: 195 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, x: slideDir === 'right' ? 65 : -65 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: slideDir === 'right' ? -65 : 65 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center w-full"
              >
                {/* Character card */}
                <div
                  className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border-2 flex items-center justify-center overflow-hidden mb-3"
                  style={{
                    borderColor: char.accentColor,
                    boxShadow: `0 0 22px ${char.accentColor}45`,
                    background: `${char.accentColor}10`,
                  }}
                >
                  {char.available ? (
                    <motion.img
                      src={char.imageUrl}
                      alt={char.name}
                      className="absolute inset-0 w-full h-full object-contain p-3"
                      animate={{ y: [0, -7, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 opacity-45 pointer-events-none">
                      <span className="text-4xl">🔒</span>
                      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider text-center leading-tight">
                        Próximamente
                      </span>
                    </div>
                  )}
                </div>

                {/* Name */}
                <p
                  className="font-cartoon text-xl sm:text-2xl uppercase tracking-wide"
                  style={{ color: char.accentColor }}
                >
                  {char.name}
                </p>
                {/* Description */}
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 text-center">
                  {char.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="text-2xl sm:text-3xl text-blue-400 hover:text-white hover:scale-125 active:scale-95 transition-all duration-150 shrink-0 p-1.5 sm:p-2 select-none"
            aria-label="Siguiente personaje"
          >
            ▶
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          {CHARACTERS.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                setSlideDir(i > selectedIndex ? 'right' : 'left');
                setSelectedIndex(i);
              }}
              className="rounded-full transition-all duration-200 hover:opacity-80"
              style={{
                width: i === selectedIndex ? 20 : 8,
                height: 8,
                backgroundColor: i === selectedIndex ? c.accentColor : '#475569',
              }}
              aria-label={`Seleccionar personaje ${i + 1}`}
            />
          ))}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full mb-4 sm:mb-5">
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-blue-500/30">
            <h4 className="font-cartoon text-blue-400 text-[11px] uppercase mb-1">Controles</h4>
            <p className="text-[10px] text-slate-400">
              <span className="text-yellow-500">MÓVIL:</span> Toca la pantalla
            </p>
            <p className="text-[10px] text-slate-400">
              <span className="text-yellow-500">PC:</span> Espacio / ↑
            </p>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-xl border border-yellow-500/30">
            <h4 className="font-cartoon text-yellow-400 text-[11px] uppercase mb-1">Poderes</h4>
            <p className="text-[10px] text-slate-400">☀️ 5 soles = +1 vida</p>
            <p className="text-[10px] text-slate-400">⚡ Nitro = ¡A fuego!</p>
          </div>
        </div>

        {/* Start button */}
        <motion.button
          onClick={() => char.available && onStart(char)}
          whileHover={char.available ? { scale: 1.04, boxShadow: `0 0 30px ${char.accentColor}70` } : {}}
          whileTap={char.available ? { scale: 0.97 } : {}}
          className={`group relative w-full py-4 font-cartoon text-2xl sm:text-3xl rounded-xl uppercase tracking-widest overflow-hidden transition-all
            ${char.available
              ? 'bg-blue-600 text-white shadow-[0_4px_0_rgb(30,58,138)] cursor-pointer'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
        >
          <span className="relative z-10">
            {char.available ? '¡ARRANCAR!' : 'NO DISPONIBLE'}
          </span>
          {char.available && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CharacterSelect;
