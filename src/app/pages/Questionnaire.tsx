import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { PRESENCE_OPTIONS } from "../data/fragrances";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function Questionnaire() {
  const navigate = useNavigate();
  const [selectedPresence, setSelectedPresence] = useState<string | null>(null);

  // Array of string paths matching the exact order of your 6 PRESENCE_OPTIONS
  const backgroundImages = [
    "/asset/8.jpg",
    "/asset/9.jpg",
    "/asset/10.jpg",
    "/asset/11.jpg",
    "/asset/12.jpg",
    "/asset/13.jpg"
  ];

  const handleContinue = () => {
    if (selectedPresence) {
      sessionStorage.setItem("selectedPresence", selectedPresence);
      navigate("/journey-steps?step=2");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-12 flex flex-col relative overflow-hidden">
      
      {/* YSL Logo */}
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

      {/* Back Button */}
      <button
        onClick={() => navigate("/hero")}
        className="absolute top-12 left-12 text-white text-sm tracking-widest hover:text-gray-400 transition-colors z-30"
      >
        &lt;Back
      </button>

      <div className="max-w-6xl mx-auto mt-20 flex-1 flex flex-col justify-center w-full z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider uppercase">
            Define Your Presence
          </h2>
          <p className="text-gray-400 tracking-widest text-lg uppercase">
            How do you wish to be perceived?
          </p>
        </motion.div>

        {/* Grid of presence options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PRESENCE_OPTIONS.map((option, index) => {
            const isSelected = selectedPresence === option.id;
            
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  // Dim unselected options slightly to make the choice stand out
                  opacity: selectedPresence === null || isSelected ? 1 : 0.4,
                  y: 0 
                }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedPresence(option.id)}
                // We use 'group' here so we can trigger hover effects on inner elements
                className={`group relative h-48 md:h-56 overflow-hidden transition-all duration-300 border ${
                  isSelected
                    ? "border-white ring-2 ring-white/50"
                    : "border-transparent hover:border-white/30"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Image Layer */}
                <img 
                  src={backgroundImages[index]} 
                  alt={option.label}
                  // Scale up slightly on hover for a premium feel
                  className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
                />

                {/* Dark Overlay Layer - Makes it darker if not selected, lighter if selected */}
                <div 
                  className={`absolute inset-0 z-0 transition-colors duration-500 ${
                    isSelected ? "bg-black/30" : "bg-black/60 group-hover:bg-black/40"
                  }`} 
                />

                {/* Text Content Layer */}
                <div className="relative z-10 p-6 h-full flex flex-col justify-end text-left">
                  <h3 className={`text-xl tracking-wider mb-2 uppercase drop-shadow-lg font-bold ${
                    isSelected ? "text-white" : "text-gray-200"
                  }`}>
                    {option.label}
                  </h3>
                  <p className="text-sm text-gray-300 tracking-wide drop-shadow-md">
                    {option.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center mt-auto pb-8">
          <button
            onClick={handleContinue}
            disabled={!selectedPresence}
            className="bg-white text-black px-24 py-5 text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white font-bold"
          >
            Continue
          </button>
        </div>
      </div>

      <AIVoiceIndicator />
    </div>
  );
}