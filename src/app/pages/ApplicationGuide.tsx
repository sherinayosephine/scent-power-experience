import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router";

export default function ApplicationGuide() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHero = location.pathname === "/apply-hero";
  
  const handleContinue = () => {
    if (isHero) {
      navigate("/waiting");
    } else {
      navigate("/music");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-12">
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

      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl mb-6 tracking-wider uppercase text-center"
        >
          {isHero ? "Heaviest First" : "Lightest Last"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl mb-16 text-center text-gray-400"
        >
          {isHero ? "Apply your hero perfume to these pulse points" : "Layer the fragrance on these areas"}
        </motion.p>

        {/* Body diagrams - Heavy, Midweight, Light */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {/* Heavy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-xl mb-6 uppercase tracking-wider">Heavy</h3>
            <div className="relative mb-6 border-2 border-gray-800 p-8 aspect-[3/4]">
              {/* Body silhouette - simplified */}
              <svg viewBox="0 0 200 400" className="w-full h-full">
                {/* Head */}
                <ellipse cx="100" cy="40" rx="25" ry="30" fill="white" />
                {/* Neck */}
                <rect x="90" y="60" width="20" height="20" fill="white" />
                {/* Body */}
                <rect x="70" y="80" width="60" height="120" rx="10" fill="white" />
                {/* Arms */}
                <rect x="30" y="90" width="40" height="15" rx="7" fill="white" />
                <rect x="130" y="90" width="40" height="15" rx="7" fill="white" />
                {/* Forearms */}
                <rect x="20" y="105" width="35" height="60" rx="7" fill="white" />
                <rect x="145" y="105" width="35" height="60" rx="7" fill="white" />
                {/* Legs */}
                <rect x="75" y="200" width="20" height="150" rx="10" fill="white" />
                <rect x="105" y="200" width="20" height="150" rx="10" fill="white" />
                
                {/* Highlight points - Heavy (chest, ankles) */}
                <circle cx="100" cy="120" r="12" fill="#FF9A3C" opacity="0.8" />
                <circle cx="85" cy="340" r="12" fill="#FF9A3C" opacity="0.8" />
                <circle cx="115" cy="340" r="12" fill="#FF9A3C" opacity="0.8" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">Chest, Ankles</p>
          </motion.div>

          {/* Midweight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h3 className="text-xl mb-6 uppercase tracking-wider">Midweight</h3>
            <div className="relative mb-6 border-2 border-gray-800 p-8 aspect-[3/4]">
              <svg viewBox="0 0 200 400" className="w-full h-full">
                <ellipse cx="100" cy="40" rx="25" ry="30" fill="white" />
                <rect x="90" y="60" width="20" height="20" fill="white" />
                <rect x="70" y="80" width="60" height="120" rx="10" fill="white" />
                <rect x="30" y="90" width="40" height="15" rx="7" fill="white" />
                <rect x="130" y="90" width="40" height="15" rx="7" fill="white" />
                <rect x="20" y="105" width="35" height="60" rx="7" fill="white" />
                <rect x="145" y="105" width="35" height="60" rx="7" fill="white" />
                <rect x="75" y="200" width="20" height="150" rx="10" fill="white" />
                <rect x="105" y="200" width="20" height="150" rx="10" fill="white" />
                
                {/* Highlight points - Midweight (inner elbows, wrists) */}
                <circle cx="30" cy="115" r="12" fill="#9D4EDD" opacity="0.8" />
                <circle cx="170" cy="115" r="12" fill="#9D4EDD" opacity="0.8" />
                <circle cx="25" cy="155" r="12" fill="#9D4EDD" opacity="0.8" />
                <circle cx="175" cy="155" r="12" fill="#9D4EDD" opacity="0.8" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">Inner Elbows, Wrists</p>
          </motion.div>

          {/* Light */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h3 className="text-xl mb-6 uppercase tracking-wider">Light</h3>
            <div className="relative mb-6 border-2 border-gray-800 p-8 aspect-[3/4]">
              <svg viewBox="0 0 200 400" className="w-full h-full">
                <ellipse cx="100" cy="40" rx="25" ry="30" fill="white" />
                <rect x="90" y="60" width="20" height="20" fill="white" />
                <rect x="70" y="80" width="60" height="120" rx="10" fill="white" />
                <rect x="30" y="90" width="40" height="15" rx="7" fill="white" />
                <rect x="130" y="90" width="40" height="15" rx="7" fill="white" />
                <rect x="20" y="105" width="35" height="60" rx="7" fill="white" />
                <rect x="145" y="105" width="35" height="60" rx="7" fill="white" />
                <rect x="75" y="200" width="20" height="150" rx="10" fill="white" />
                <rect x="105" y="200" width="20" height="150" rx="10" fill="white" />
                
                {/* Highlight points - Light (neck, hair, hands) */}
                <circle cx="100" cy="35" r="12" fill="#FFD700" opacity="0.8" />
                <circle cx="100" cy="70" r="12" fill="#FFD700" opacity="0.8" />
                <circle cx="30" cy="90" r="12" fill="#FFD700" opacity="0.8" />
                <circle cx="170" cy="90" r="12" fill="#FFD700" opacity="0.8" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">Neck, Hair, Shoulders</p>
          </motion.div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="bg-white text-black px-20 py-5 text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300"
          >
            Applied
          </button>
        </div>
      </div>
    </div>
  );
}