import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react"; // Fixed missing import
import { useNavigate } from "react-router";
import { LAYERING_NOTES } from "../data/fragrances";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function NoteSelection() {
  const navigate = useNavigate();
  const [isHighlighting, setIsHighlighting] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasTriedAll, setHasTriedAll] = useState(false);

  useEffect(() => {
    // 1. CHECK HISTORY FIRST
    let triedNotes: number[] = [];
    try {
      triedNotes = JSON.parse(sessionStorage.getItem("triedNotes") || "[]");
    } catch (e) {
      console.error("Could not parse triedNotes");
    }

    // 2. IF ALL 6 ARE TRIED -> FREE SELECTION MODE
    if (triedNotes.length >= LAYERING_NOTES.length) {
      setHasTriedAll(true);
      setIsHighlighting(false); // Skip animation
      setActiveIndex(0); // Default highlight the first one
      return; // Stop here, no AI math needed
    }

    // 3. IF NOT ALL TRIED -> AI RECOMMENDER MODE
    const selectedPresence = sessionStorage.getItem("selectedPresence");
    let idealIndex = 0;

    if (selectedPresence === "summer-warm") idealIndex = 1;
    else if (selectedPresence === "silent") idealIndex = 4;
    else if (selectedPresence === "electric") idealIndex = 2;
    else if (selectedPresence === "commanding") idealIndex = 3;
    else if (selectedPresence === "everyday") idealIndex = 5;

    let targetIndex = idealIndex;

    // If ideal is already tried, pick a random available one
    if (triedNotes.includes(idealIndex)) {
      const availableIndices = [0, 1, 2, 3, 4, 5].filter(i => !triedNotes.includes(i));
      if (availableIndices.length > 0) {
        targetIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      }
    }

    // Run the scanning animation
    let startTime = Date.now();
    const duration = 3000; 
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        setActiveIndex((prev) => (prev + 1) % LAYERING_NOTES.length);
      } else {
        clearInterval(interval);
        setActiveIndex(targetIndex);
        setTimeout(() => setIsHighlighting(false), 500);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    const selectedNote = LAYERING_NOTES[activeIndex];
    
    // Save the chosen note for the music player
    sessionStorage.setItem("currentNote", JSON.stringify(selectedNote));
    sessionStorage.setItem("currentNoteIndex", activeIndex.toString());

    // Only add to history if we are still in AI mode
    if (!hasTriedAll) {
      let triedNotes: number[] = [];
      try {
        triedNotes = JSON.parse(sessionStorage.getItem("triedNotes") || "[]");
      } catch (e) {}
      
      if (!triedNotes.includes(activeIndex)) {
        triedNotes.push(activeIndex);
        sessionStorage.setItem("triedNotes", JSON.stringify(triedNotes));
      }
    }

    navigate("/prepare-layering");
  };

  const currentNote = LAYERING_NOTES[activeIndex];

  return (
    <div className="h-screen w-full bg-black text-white p-6 md:px-12 md:py-8 flex flex-col items-center relative overflow-hidden">
      
      {/* YSL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 right-12 w-14 z-30"
      >
        <img src="/asset/ysl logo.png" alt="YSL" className="w-full h-auto" />
      </motion.div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/waiting")}
        className="absolute top-8 left-12 text-white text-xs tracking-[0.3em] uppercase opacity-50 hover:opacity-100 z-30"
      >
        &lt; Back
      </button>

      {/* 1. Header Section */}
      <header className="text-center mt-10 mb-4 shrink-0">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-widest uppercase"
        >
          {hasTriedAll ? "Your Complete Collection" : "Discover Your New Powers"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs tracking-[0.6em] text-gray-500 uppercase mt-2"
        >
          YSL Les Pouvoirs de Sillage
        </motion.p>
      </header>

      {/* 2. Grid Section */}
      <div className="w-full max-w-6xl mt-20 shrink-0">
        <div className="grid grid-cols-6 gap-3 md:gap-4 border border-white/10 p-5 md:p-6 bg-white/5 backdrop-blur-sm relative">
          {LAYERING_NOTES.map((note, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={note.id}
                onClick={() => {
                  // ONLY allow clicking if all notes have been unlocked
                  if (hasTriedAll) setActiveIndex(index);
                }}
                animate={{ 
                  opacity: isActive ? 1 : 0.2,
                  scale: isActive ? 1.05 : 1,
                }}
                className={`text-center ${hasTriedAll ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
              >
                <div className={`aspect-[3/4] mb-3 overflow-hidden border transition-colors duration-500 ${isActive ? "border-white" : "border-white/10"}`}>
                  <img
                    src={note.imageUrl}
                    alt={note.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className={`text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold ${isActive ? "text-white" : "text-gray-600"}`}>
                  {note.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Recommendation / Selection Box */}
      <div className="flex-1 flex flex-col justify-start mt-20 w-full max-w-2xl min-h-0">
        <AnimatePresence mode="wait">
          {!isHighlighting && (
            <motion.div
              key={currentNote.id} // Forces animation when user clicks a new note
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="bg-white/10 border border-white/20 p-6 mb-8 backdrop-blur-md">
                <p className="text-xl md:text-2xl tracking-tight mb-3 italic text-gray-200">
                  {hasTriedAll ? (
                    <>You have explored all the powers. Select <span className="text-white font-bold not-italic underline underline-offset-8 decoration-1 italic">{currentNote.name}</span> again?</>
                  ) : (
                    <>Based on your profile, I recommend <span className="text-white font-bold not-italic underline underline-offset-8 decoration-1 italic">{currentNote.name}</span> for you.</>
                  )}
                </p>
                <p className="text-xs md:text-sm text-gray-400 tracking-wide leading-relaxed">
                  {currentNote.description}
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="bg-white text-black px-16 py-4 text-sm tracking-[0.4em] uppercase hover:bg-gray-200 transition-all font-bold shadow-xl active:scale-95"
              >
                Experience Note
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AIVoiceIndicator />
    </div>
  );
}