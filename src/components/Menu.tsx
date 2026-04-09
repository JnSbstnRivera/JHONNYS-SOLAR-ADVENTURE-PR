
import React from 'react';
import { motion } from 'motion/react';
import { TREX_IMAGE_URL } from '../constants';

interface MenuProps {
  onStart: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/95 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 max-w-xl w-full border-2 border-blue-600 shadow-2xl text-white flex flex-col items-center"
      >
        
        {/* Encabezado */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl sm:text-5xl font-cartoon text-blue-400 leading-tight uppercase tracking-tight">
            ¡DALE JHONNY!
          </h2>
          <div className="h-1 w-20 bg-yellow-500 mx-auto mt-1 rounded-full"></div>
        </motion.div>

        {/* Explicación Ligera */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6 px-2"
        >
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed italic">
            "Jhonny el T-Rex tiene una misión: llevar energía solar a todo Puerto Rico. ¡Esquiva los obstáculos de LUMA y recoge los soles para iluminar la isla!"
          </p>
        </motion.div>

        {/* Personaje con animación de "arrastre" */}
        <div className="relative mb-6">
          <div className="absolute -inset-3 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <motion.div 
            initial={{ x: -500, rotate: -45, opacity: 0 }}
            animate={{ x: 0, rotate: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 12,
              delay: 0.6,
              duration: 1
            }}
            className="relative w-20 h-20 sm:w-28 sm:h-28 bg-slate-800 rounded-full border-2 border-blue-500 flex items-center justify-center overflow-hidden"
          >
             <motion.img 
               src={TREX_IMAGE_URL} 
               alt="Jhonny" 
               className="w-4/5 h-4/5 object-contain"
               animate={{ 
                 y: [0, -5, 0],
                 rotate: [0, 2, -2, 0]
               }}
               transition={{ 
                 repeat: Infinity, 
                 duration: 2,
                 ease: "easeInOut"
               }}
             />
          </motion.div>
        </div>
        
        {/* Controles e Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8">
          <motion.div 
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(59, 130, 246, 0.8)",
              backgroundColor: "rgba(30, 41, 59, 0.9)"
            }}
            className="bg-slate-800/80 p-3 rounded-xl border border-blue-500/30 transition-colors"
          >
            <h4 className="font-cartoon text-blue-400 text-xs sm:text-sm mb-1 uppercase">Controles</h4>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] sm:text-xs text-slate-400"><span className="text-yellow-500">MÓVIL:</span> Toca la pantalla</p>
              <p className="text-[10px] sm:text-xs text-slate-400"><span className="text-yellow-500">PC:</span> Espacio / Flecha Arriba</p>
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(234, 179, 8, 0.8)",
              backgroundColor: "rgba(30, 41, 59, 0.9)"
            }}
            className="bg-slate-800/80 p-3 rounded-xl border border-yellow-500/30 transition-colors"
          >
            <h4 className="font-cartoon text-yellow-400 text-xs sm:text-sm mb-1 uppercase">Poderes</h4>
            <div className="flex flex-col gap-1">
              <p className="text-[10px] sm:text-xs text-slate-400">☀️ <span className="font-bold">5 SOLES</span> = +1 VIDA</p>
              <p className="text-[10px] sm:text-xs text-slate-400">⚡ <span className="font-bold text-blue-300">NITRO</span> = ¡A FUEGO!</p>
            </div>
          </motion.div>
        </div>

        {/* Botón Acción con más interacción */}
        <motion.button 
          onClick={onStart}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#3b82f6",
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-full py-4 bg-blue-600 text-white font-cartoon text-2xl sm:text-4xl rounded-xl shadow-[0_4px_0_rgb(30,58,138)] transition-all uppercase tracking-widest overflow-hidden"
        >
          <span className="relative z-10">¡ARRANCAR!</span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Menu;
