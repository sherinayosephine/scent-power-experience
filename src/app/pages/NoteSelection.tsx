import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { LAYERING_NOTES } from "../data/fragrances";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function NoteSelection() {
  const navigate = useNavigate();
  const [isHighlighting, setIsHighlighting] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasTriedAll, setHasTriedAll] = useState(false);

  useEffect(() => {
    // 1. AMBIL HISTORY
    let triedNotes: number[] = [];
    try {
      const stored = sessionStorage.getItem("triedNotes");
      if (stored) triedNotes = JSON.parse(stored);
    } catch (e) {}

    // 2. CEK APAKAH SUDAH COBA SEMUA 6 NOTES
    const allTried = triedNotes.length >= LAYERING_NOTES.length;
    setHasTriedAll(allTried);

    // 3. TENTUKAN TARGET (Anti-Nyangkut)
    let targetIndex = 0;
    const availableIndices = [0, 1, 2, 3, 4, 5].filter(i => !triedNotes.includes(i));

    if (allTried) {
      targetIndex = Math.floor(Math.random() * LAYERING_NOTES.length);
    } else {
      const selectedPresence = sessionStorage.getItem("selectedPresence") || "";
      let idealIndex = -1;

      if (selectedPresence.includes("warm") || selectedPresence === "1") idealIndex = 1;
      else if (selectedPresence.includes("silent") || selectedPresence === "4") idealIndex = 4;
      else if (selectedPresence.includes("electric") || selectedPresence === "2") idealIndex = 2;
      else if (selectedPresence.includes("commanding") || selectedPresence === "3") idealIndex = 3;
      else if (selectedPresence.includes("everyday") || selectedPresence === "5") idealIndex = 5;
      else idealIndex = 0;

      if (triedNotes.includes(idealIndex)) {
        if (availableIndices.length > 0) {
          targetIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        }
      } else {
        targetIndex = idealIndex;
      }
    }

    // 4. JALANKAN ANIMASI SPIN
    setIsHighlighting(true);
    let startTime = Date.now();
    const duration = 2500; 
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        setActiveIndex((prev) => (prev + 1) % LAYERING_NOTES.length);
      } else {
        clearInterval(interval);
        setActiveIndex(targetIndex); 
        setTimeout(() => setIsHighlighting(false), 400); 
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    const selectedNote = LAYERING_NOTES[activeIndex];
    
    sessionStorage.setItem("currentNote", JSON.stringify(selectedNote));
    sessionStorage.setItem("currentNoteIndex", activeIndex.toString());

    if (!hasTriedAll) {
      let triedNotes: number[] = [];
      try {
        const stored = sessionStorage.getItem("triedNotes");
        if (stored) triedNotes = JSON.parse(stored);
      } catch (e) {}
        
      if (!triedNotes.includes(activeIndex)) {
        triedNotes.push(activeIndex);
        sessionStorage.setItem("triedNotes", JSON.stringify(triedNotes));
      }
    }

    navigate("/experience-layering");
  };

  const currentNote = LAYERING_NOTES[activeIndex];

  return (
    // DIKUNCI: h-[100dvh] overflow-hidden (GA ADA SCROLL SAMA SEKALI)
    // pb-[120px] memastikan ada ruang kosong super besar di bawah agar tombol aman dari AI Voice Indicator
    <div className="h-[100dvh] w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-6 pt-20 pb-[100px] md:px-12 md:pt-24 md:pb-[140px]">
      
      {/* YSL Logo - Posisi Fixed Absolute */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-8 right-6 md:top-10 md:right-12 w-12 md:w-16 z-30">
        <img src="/asset/ysl logo.png" alt="YSL" className="w-full h-auto" />
      </motion.div>

      {/* Back Button - Posisi Fixed Absolute */}
      <button
        onClick={() => navigate("/prepare-hero-paper")}
        className="absolute top-8 left-6 md:top-10 md:left-12 text-white text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-50 hover:opacity-100 z-30 font-bold"
      >
        &lt; Back
      </button>

      {/* WADAH UTAMA KONTEN TENGAH - Menggunakan gap agar elemen bernapas, tidak didempetin */}
      <div className="w-full h-full max-w-5xl flex flex-col items-center justify-center gap-6 md:gap-10">
        
        {/* 1. Header Section */}
        <header className="text-center shrink-0">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase">
            Discover Your New Powers
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] md:text-xs tracking-[0.6em] text-gray-500 uppercase mt-2 md:mt-3">
            YSL Les Pouvoirs de Sillage
          </motion.p>
        </header>

        {/* 2. Grid Section - Dibuat pas dengan layar */}
        <div className="w-full max-w-4xl shrink-0">
          <div className="grid grid-cols-6 gap-2 md:gap-4 border border-white/10 p-3 md:p-5 bg-white/5 backdrop-blur-sm relative">
            {LAYERING_NOTES.map((note, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={note.id}
                  onClick={() => { if (!isHighlighting && hasTriedAll) setActiveIndex(index); }}
                  animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1.05 : 1 }}
                  className={`text-center ${hasTriedAll && !isHighlighting ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
                >
                  <div className={`aspect-[3/4] mb-2 md:mb-3 overflow-hidden border transition-colors duration-500 ${isActive ? "border-white" : "border-white/10"}`}>
                    <img src={note.imageUrl} alt={note.name} className="w-full h-full object-cover" />
                  </div>
                  <p className={`text-[8px] md:text-[10px] lg:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase font-bold leading-tight ${isActive ? "text-white" : "text-gray-600"}`}>
                    {note.name}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 3. Recommendation / Selection Box */}
        <div className="flex flex-col items-center justify-start w-full max-w-2xl min-h-[160px] md:min-h-[180px] shrink-0 z-20">
          <AnimatePresence mode="wait">
            {!isHighlighting && (
              <motion.div key={currentNote.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center w-full">
                
                <div className="bg-white/10 border border-white/20 p-4 md:p-6 mb-5 md:mb-6 backdrop-blur-md rounded-sm">
                  <p className="text-sm md:text-xl lg:text-2xl tracking-tight mb-2 italic text-gray-200">
                    {hasTriedAll ? (
                      <>You have explored all the powers. Select <span className="text-white font-bold not-italic underline underline-offset-8 decoration-1 italic">{currentNote.name}</span> again?</>
                    ) : (
                      <>Based on your profile, I recommend <span className="text-white font-bold not-italic underline underline-offset-8 decoration-1 italic">{currentNote.name}</span> for you.</>
                    )}
                  </p>
                  <p className="text-[10px] md:text-xs lg:text-sm text-gray-400 tracking-wide leading-relaxed font-medium">
                    {currentNote.description}
                  </p>
                </div>

                <button
                  onClick={handleContinue}
                  className="bg-white text-black px-12 md:px-20 py-3 md:py-4 text-[10px] md:text-sm tracking-[0.4em] uppercase hover:bg-gray-200 transition-all font-bold shadow-xl active:scale-95 w-full md:w-auto"
                >
                  Experience Note
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <AIVoiceIndicator />
    </div>
  );
}