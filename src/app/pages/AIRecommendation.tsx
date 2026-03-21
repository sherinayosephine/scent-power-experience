import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { LAYERING_NOTES } from "../data/fragrances";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function AIRecommendation() {
  const navigate = useNavigate();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  // ==========================================
  // 1. BULLETPROOF SCORE CALCULATOR
  // ==========================================
  const recommendedNotes = useMemo(() => {
    let ratingsDict: Record<string, any> = {};
    try {
      ratingsDict = JSON.parse(sessionStorage.getItem("noteRatings") || "{}");
    } catch (e) {
      console.error("Could not parse noteRatings");
    }

    const currentNoteSession = JSON.parse(sessionStorage.getItem("currentNote") || "{}");
    const singleRating = sessionStorage.getItem("currentRating");
    if (currentNoteSession.id && singleRating) {
      ratingsDict[currentNoteSession.id] = singleRating;
    }

    const getScore = (rawRating: any): number => {
      if (!rawRating) return 0;
      if (typeof rawRating === 'number') return rawRating;
      if (!isNaN(Number(rawRating))) return Number(rawRating);

      const text = String(rawRating).toLowerCase().trim();
      if (text.includes("love") || text === "5") return 5;
      if (text.includes("like") || text === "4") return 4;
      if (text.includes("neutral") || text === "3") return 3;
      if (text.includes("dislike") || text === "2") return 2;
      if (text.includes("hate") || text === "1") return 1;
      return 0;
    };

    const scoredNotes = LAYERING_NOTES.map(note => ({
      ...note,
      score: getScore(ratingsDict[note.id])
    })).sort((a, b) => b.score - a.score);

    let topNotes = scoredNotes.filter(n => n.score >= 4);

    if (topNotes.length === 0) {
      const highestScore = scoredNotes[0].score;
      if (highestScore > 0) {
        topNotes = scoredNotes.filter(n => n.score === highestScore);
      } else {
        const fallbackNote = LAYERING_NOTES.find(n => n.id === currentNoteSession.id) || LAYERING_NOTES[0];
        topNotes = [{ ...fallbackNote, score: 0 }];
      }
    }

    return topNotes.slice(0, 6); 
  }, []);

  useEffect(() => {
    if (recommendedNotes.length > 0 && !selectedNoteId) {
      setSelectedNoteId(recommendedNotes[0].id);
    }
  }, [recommendedNotes, selectedNoteId]);

  const handleConfirm = () => {
    if (selectedNoteId) {
      const finalChoice = LAYERING_NOTES.find(n => n.id === selectedNoteId);
      sessionStorage.setItem("finalNoteSelection", JSON.stringify(finalChoice));
      navigate("/product-selection");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-12 relative overflow-hidden flex flex-col items-center">
      
      {/* YSL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-12 right-12 w-16 z-30"
      >
        <img src="/asset/ysl-logo.png" alt="YSL" className="w-full h-auto object-contain" />
      </motion.div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/olfactive-profile")}
        className="absolute top-12 left-12 text-white text-sm tracking-widest hover:text-gray-400 transition-colors z-30 uppercase"
      >
        &lt; Back
      </button>

      <div className="max-w-7xl mx-auto flex-1 flex flex-col justify-center w-full z-10 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl mb-4 tracking-widest uppercase font-bold">
            Your Final Recommendation
          </h1>
          <p className="text-gray-400 text-lg md:text-xl tracking-widest uppercase">
            Select your favorite layering note
          </p>
        </motion.div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto w-full">
          {recommendedNotes.map((note, index) => {
            const isSelected = note.id === selectedNoteId;
            const isTopRecommendation = index === 0; 
            
            return (
              <motion.div
                key={note.id}
                onClick={() => setSelectedNoteId(note.id)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`group relative overflow-hidden aspect-[3/4] cursor-pointer transition-all duration-300 bg-white ${
                  isSelected 
                    ? `ring-4 ${isTopRecommendation ? 'ring-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]' : 'ring-gray-300 shadow-[0_0_30px_rgba(255,255,255,0.4)]'} scale-105 z-20` 
                    : "ring-1 ring-white/20 hover:ring-white/50 opacity-80 hover:opacity-100 z-10"
                }`}
              >
                {/* Background/Bottle Image - Changed to object-cover so it completely fills the box */}
                <img
                  src={note.bottleImageUrl || note.imageUrl} 
                  alt={note.name}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay - Shrunk to just the bottom h-1/2 and reduced blur heavily */}
                <div className={`absolute bottom-0 left-0 right-0 h-1/2 transition-opacity duration-300 pointer-events-none ${
                  isSelected 
                    ? "bg-gradient-to-t from-white via-white/80 to-transparent opacity-100" 
                    : "bg-gradient-to-t from-white via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                }`} />

                {/* RECOMMENDED BADGE */}
                {isTopRecommendation && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute top-4 left-4 bg-amber-400 text-black px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs tracking-widest uppercase font-bold shadow-lg z-30"
                  >
                    Recommended
                  </motion.div>
                )}

                {/* SELECTED BADGE */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 bg-black text-white px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs tracking-widest uppercase font-bold shadow-lg z-30"
                  >
                    Selected
                  </motion.div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center z-20">
                  <h3 className={`text-xl md:text-2xl tracking-widest mb-2 uppercase font-bold ${
                    isTopRecommendation ? "text-amber-500 drop-shadow-[0_0_2px_white]" : "text-black"
                  }`}>
                    {note.name}
                  </h3>
                  <p className={`text-xs md:text-sm tracking-wide line-clamp-2 ${isSelected ? "text-gray-800" : "text-gray-500"}`}>
                    {note.description}
                  </p>
                </div>

                {/* Color Accent Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 transition-all duration-300 ${isSelected ? "h-2" : "h-1 opacity-50"}`}
                  style={{ backgroundColor: isTopRecommendation ? "#fbbf24" : note.color }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center shrink-0 pb-8"
        >
          <button
            onClick={handleConfirm}
            disabled={!selectedNoteId} 
            className="bg-white text-black px-24 py-5 text-lg md:text-xl tracking-[0.3em] uppercase hover:bg-gray-200 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-xl active:scale-95"
          >
            Confirm
          </button>
        </motion.div>
      </div>

      <AIVoiceIndicator />
    </div>
  );
}