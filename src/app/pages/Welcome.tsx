import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source
            src="/asset/ysl-scent-power.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/0
        " />
      </div>

      {/* YSL Logo - Refined placement and sizing */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-10 right-10 z-20"
      >
        {/* We increased width from w-16 to w-24 for the actual image */}
        <div className="w-24">
          <img 
            src="/asset/ysl logo.png" 
            alt="Yves Saint Laurent Logo" 
            className="w-full h-auto object-contain"
          />
        </div>
      </motion.div>

      <div className="text-center max-w-4xl relative z-10 px-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-6xl md:text-9xl lg:text-[110px] leading-tight mb-8 tracking-wider uppercase font-luxury"
        >
          SCENT POWER
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-3xl mb-16 tracking-wide"
        >
          EXPLORE YOUR LUXURY LAYERING SCENT JOURNEY
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          onClick={() => navigate("/journey-steps")}
          className="bg-white text-black px-16 py-5 text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Journey
        </motion.button>
      </div>

      <AIVoiceIndicator />
    </div>
  );
}