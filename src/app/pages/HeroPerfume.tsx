import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { HERO_PERFUMES } from "../data/fragrances";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function HeroPerfume() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedPerfume = HERO_PERFUMES[selectedIndex];

  // 1. Ensure the main image always has a leading slash
  const displayImage = selectedPerfume.imageUrl.startsWith('/') 
    ? selectedPerfume.imageUrl 
    : `/${selectedPerfume.imageUrl}`;
  
  // 2. Map directly from fragrances.ts data
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
    // DIKUNCI: h-[100dvh] overflow-hidden (GA ADA SCROLL)
    // pb-[100px] md:pb-[140px] memberikan ruang kosong di bawah agar AI Voice Indicator aman
    <div className="h-[100dvh] w-full bg-black text-white px-6 pt-20 pb-[100px] md:px-12 md:pt-24 md:pb-[140px] flex flex-col relative overflow-hidden">
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-6 md:top-10 md:left-12 text-white text-[10px] md:text-sm tracking-[0.3em] md:tracking-widest uppercase opacity-50 hover:opacity-100 transition-colors z-30 font-bold"
      >
        &lt; Back
      </button>

      {/* YSL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 right-6 md:top-10 md:right-12 w-12 md:w-16 z-30"
      >
        <img
          src="/asset/ysl logo.png"
          alt="Yves Saint Laurent Logo"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* HEADER SECTION */}
      <div className="shrink-0 w-full mb-6 md:mb-10">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider text-center drop-shadow-lg">
          SELECT YOUR HERO PERFUME
        </h1>
      </div>

      {/* MAIN CONTENT GRID - Menyesuaikan tinggi layar secara otomatis */}
      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 min-h-0">
        
        {/* LEFT COLUMN: Carousel & Search */}
        <div className="flex flex-col h-full items-center justify-between min-h-0">
          <h2 className="text-lg md:text-2xl tracking-wider text-center mb-2 md:mb-4 shrink-0 uppercase font-medium">
            Your Perfume
          </h2>

          {/* Carousel */}
          <div className="relative flex items-center justify-center w-full flex-1 min-h-0">
            <button
              onClick={prevPerfume}
              className="absolute left-0 z-10 p-2 hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full flex items-center justify-center min-h-0"
              >
                <img
                  src={displayImage}
                  alt={selectedPerfume.name}
                  className="max-w-[60%] max-h-[85%] md:max-h-[90%] object-contain drop-shadow-2xl relative z-10" 
                />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={nextPerfume}
              className="absolute right-0 z-10 p-2 hover:bg-white/10 transition-colors rounded-full"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-[280px] md:max-w-[320px] mt-4 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-white/50" />
            <input
              type="text"
              readOnly
              value={selectedPerfume.name}
              className="w-full bg-white/5 border border-white/20 p-2.5 md:p-3 pl-10 md:pl-12 text-white font-bold tracking-widest outline-none text-xs md:text-sm uppercase text-center"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Accords */}
        <div className="flex flex-col h-full justify-between min-h-0">
          <h2 className="text-lg md:text-2xl tracking-wider text-center mb-2 md:mb-4 shrink-0 uppercase font-medium">
            Perfume Accord
          </h2>

          {/* Accords Blocks - Tingginya responsif agar tidak mendorong tombol */}
          <div className="flex-1 flex flex-col justify-center gap-3 md:gap-5 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedPerfume.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col justify-center gap-3 md:gap-5 min-h-0"
              >
                {displayAccords.map((accord, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    // Tingginya diatur fleksibel (h-16 s/d h-24) agar muat di iPad
                    className="relative w-full h-16 md:h-20 lg:h-24 flex items-center justify-center px-4 md:px-6 border border-white/10 shadow-lg overflow-hidden bg-[#111] group"
                  >
                    {accord.bkUrl && (
                      <>
                        <img 
                          src={accord.bkUrl} 
                          alt={accord.text}
                          className="absolute inset-0 w-full h-full object-cover z-0 opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 z-0"></div>
                      </>
                    )}
                    
                    <p className="relative z-10 tracking-widest text-sm md:text-lg lg:text-xl font-bold text-white uppercase text-center drop-shadow-md">
                      {accord.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Continue Button - Shrink-0 agar ukurannya dipertahankan */}
          <button
            onClick={handleContinue}
            className="w-full mt-6 md:mt-8 shrink-0 bg-white text-black py-3.5 md:py-4 text-sm md:text-lg tracking-widest uppercase hover:bg-gray-200 transition-all duration-300 font-bold active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Continue
          </button>
        </div>

      </div>

      <AIVoiceIndicator />
    </div>
  );
}