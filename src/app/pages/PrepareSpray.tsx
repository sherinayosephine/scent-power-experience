import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";

export default function PrepareSpray() {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);
  
  const isHero = location.pathname === "/prepare-hero";
  const title = isHero ? "Prepare for Your Hero Perfume" : "Prepare for Layering Note";
  const warning = isHero 
    ? "Please position yourself for application" 
    : "The machine will automatically spray the layering note for you";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Navigate to application guide
      const nextPath = isHero ? "/apply-hero" : "/apply-layering";
      setTimeout(() => navigate(nextPath), 500);
    }
  }, [countdown, navigate, isHero]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-12">
      {/* YSL Logo - Consistent with other pages */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-12 right-12 w-16 z-30"
      >
        <img
          src="/asset/ysl logo.png"
          alt="Yves Saint Laurent Logo"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      <div className="text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl mb-8 tracking-wider uppercase"
        >
          {title}
        </motion.h1>

        {/* Warning/Info Box */}
        {!isHero && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-amber-400/10 border-2 border-amber-400 px-8 py-4 mb-12"
          >
            <p className="text-amber-400 tracking-wider text-lg uppercase">
              ⚠️ {warning}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="text-9xl font-bold">
            {countdown}
          </div>
        </motion.div>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl tracking-wider text-gray-400 uppercase"
        >
          Get Ready...
        </motion.p>
      </div>
    </div>
  );
}