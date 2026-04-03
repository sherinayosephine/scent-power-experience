import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

type RatingType = "love" | "like" | "neutral" | "dislike" | "hate" | null;

export default function RatingBody() {
  const navigate = useNavigate();
  const [rating, setRating] = useState<RatingType>(null);

  const currentNoteRaw = sessionStorage.getItem("currentNote");
  const currentNote = currentNoteRaw ? JSON.parse(currentNoteRaw) : { name: "This combination", id: "" };

  const ratingEmojis: { type: RatingType; icon: string; label: string }[] = [
    { type: "hate", icon: "☹️", label: "Dislike" },
    { type: "dislike", icon: "🙁", label: "Not for me" },
    { type: "neutral", icon: "😐", label: "Neutral" },
    { type: "like", icon: "🙂", label: "Like it" },
    { type: "love", icon: "😊", label: "Love it" },
  ];

  const handleRating = (ratingValue: RatingType) => {
    setRating(ratingValue);
  };

  const handleContinue = () => {
    if (rating) {
      // Simpan rating khusus untuk di badan
      sessionStorage.setItem("bodyRating", rating);

      // LANGSUNG ARAHKAN KE AI CHECKOUT CONVERSATION
      navigate("/checkout-conversation");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-12 relative overflow-hidden">
      
      {/* YSL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-12 right-12 w-16 z-30 hidden md:block"
      >
        <img
          src="/asset/ysl logo.png"
          alt="Yves Saint Laurent Logo"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      <img 
        src="/asset/ysl logo.png" 
        alt="YSL Logo" 
        className="absolute top-8 w-12 object-contain z-30 md:hidden" 
      />

      <div className="text-center max-w-4xl z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl mb-6 tracking-wider uppercase font-bold"
        >
          How Does It Feel <br className="md:hidden" /> On Your Skin?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl mb-4 text-white font-medium tracking-widest uppercase"
        >
          Hero Perfume + {currentNote.name}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm md:text-lg mb-16 text-gray-500 tracking-wide"
        >
          Share your honest impression of this combination
        </motion.p>

        {/* Rating Emojis */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
          {ratingEmojis.map((emoji) => (
            <motion.button
              key={emoji.type}
              onClick={() => handleRating(emoji.type)}
              className={`flex flex-col items-center gap-3 p-4 md:p-6 rounded-lg border-2 transition-all w-24 md:w-32 ${
                rating === emoji.type
                  ? "border-[#C2813F] bg-[#C2813F]/10 scale-110"
                  : "border-gray-800 hover:border-gray-600 bg-white/5"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: rating === emoji.type ? [1, 1.15, 1.1] : 1
              }}
              transition={{ 
                delay: 0.4 + ratingEmojis.indexOf(emoji) * 0.1,
                scale: { duration: 0.3 }
              }}
            >
              <span className="text-4xl md:text-6xl">{emoji.icon}</span>
              <span className={`text-[10px] md:text-xs tracking-wider uppercase font-bold ${rating === emoji.type ? "text-[#C2813F]" : "text-gray-400"}`}>
                {emoji.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: rating ? 1 : 0.3 }}
          onClick={handleContinue}
          disabled={!rating}
          className="bg-white text-black px-16 py-5 text-sm md:text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed font-bold w-full md:w-auto"
        >
          CONTINUE
        </motion.button>
      </div>
    </div>
  );
}