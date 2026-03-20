import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { HERO_PERFUMES } from "../data/fragrances";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function HeroPerfume() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedPerfume = HERO_PERFUMES[selectedIndex];

  // 1. Ensure the main image always has a leading slash so it looks in the public folder
  const displayImage = selectedPerfume.imageUrl.startsWith('/') 
    ? selectedPerfume.imageUrl 
    : `/${selectedPerfume.imageUrl}`;
  
  // 2. Map directly from your perfectly structured fragrances.ts data!
  const displayAccords = selectedPerfume.accords.map(accord => ({ 
    text: accord.name, 
    bkUrl: accord.bgImage?.startsWith('/') ? accord.bgImage : `/${accord.bgImage}` 
  }));

  const nextPerfume = () => {
    setSelectedIndex((prev) => (prev + 1) % HERO_PERFUMES.length);
  };

  const prevPerfume = () => {
    setSelectedIndex((prev) => (prev - 1 + HERO_PERFUMES.length) % HERO_PERFUMES.length);
  };

  const handleContinue = () => {
    sessionStorage.setItem("heroPerfume", JSON.stringify(selectedPerfume));
    navigate("/questionnaire");
  };

  return (
    <div className="h-screen w-full bg-black text-white p-8 md:p-12 flex flex-col overflow-hidden relative">
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-12 left-12 text-white text-sm tracking-widest hover:text-gray-400 transition-colors z-30"
      >
        &lt;Back
      </button>

      {/* Header */}
      <div className="relative flex justify-center items-center mb-12 shrink-0 w-full mt-4">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider text-center">
          SELECT YOUR HERO PERFUME
        </h1>
        
        {/* YSL Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute right-0 top-0 w-16"
        >
          <img
            src="/asset/ysl logo.png"
            alt="Yves Saint Laurent Logo"
            className="w-full h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-2 gap-16 min-h-0">
        
        {/* LEFT COLUMN: Carousel & Search */}
        <div className="flex flex-col h-full items-center justify-between pb-4">
          <h2 className="text-2xl tracking-wider text-center">Your Perfume</h2>

          {/* Carousel */}
          <div className="relative flex items-center justify-center w-full flex-1 min-h-0 my-4">
            <button
              onClick={prevPerfume}
              className="absolute left-0 z-10 p-2 hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full max-h-[1000px] aspect-square flex items-center justify-center"
            >
              <img
                src={displayImage}
                alt={selectedPerfume.name}
                className="max-w-[80%] max-h-[80%] object-contain drop-shadow-2xl relative z-10" 
              />
            </motion.div>

            <button
              onClick={nextPerfume}
              className="absolute right-0 z-10 p-2 hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
            <input
              type="text"
              readOnly
              value={selectedPerfume.name}
              className="w-full bg-black border border-white p-3 pl-12 text-white placeholder-white tracking-widest outline-none text-sm uppercase"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Accords */}
        <div className="flex flex-col h-full pb-4">
          <h2 className="text-2xl tracking-wider text-center mb-8">Parfume Accord</h2>

          {/* Accords Blocks */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            {displayAccords.map((accord, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="relative w-full h-24 flex items-center justify-center px-6 border border-white/10 shadow-lg overflow-hidden bg-[#1a1a1a]"
              >
                {/* Render background image only if it exists */}
                {accord.bkUrl && (
                  <>
                    <img 
                      src={accord.bkUrl} 
                      alt={accord.text}
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    <div className="absolute inset-0 bg-black/50 z-0"></div>
                  </>
                )}
                
                <p className="relative z-10 tracking-widest text-xl md:text-2xl font-bold text-white uppercase text-center drop-shadow-md">
                  {accord.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full mt-8 bg-white text-black py-4 text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 font-bold"
          >
            Continue
          </button>
        </div>

      </div>

      <AIVoiceIndicator />
    </div>
  );
}