import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

type RatingType = "love" | "like" | "neutral" | "dislike" | "hate" | null;

export default function Rating() {
  const navigate = useNavigate();
  const [rating, setRating] = useState<RatingType>(null);

  const currentNote = JSON.parse(sessionStorage.getItem("currentNote") || "{}");
  const currentNoteIndex = parseInt(sessionStorage.getItem("currentNoteIndex") || "0");

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
      // Store rating
      const ratings = JSON.parse(sessionStorage.getItem("noteRatings") || "{}");
      ratings[currentNote.id] = rating;
      sessionStorage.setItem("noteRatings", JSON.stringify(ratings));

      // Increment trial count
      const trialCount = parseInt(sessionStorage.getItem("trialCount") || "0");
      sessionStorage.setItem("trialCount", (trialCount + 1).toString());

      // If disliked, go to AI conversation, otherwise ask if want to explore more
      if (rating === "dislike" || rating === "hate") {
        navigate("/ai-conversation");
      } else {
        navigate("/ai-conversation");
      }
    }
  };

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
          How Did You Like It?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl mb-4 text-gray-400"
        >
          {currentNote.name}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg mb-16 text-gray-500"
        >
          Share your honest impression
        </motion.p>

        {/* Rating Emojis */}
        <div className="flex justify-center gap-6 mb-16">
          {ratingEmojis.map((emoji) => (
            <motion.button
              key={emoji.type}
              onClick={() => handleRating(emoji.type)}
              className={`flex flex-col items-center gap-3 p-6 rounded-lg border-2 transition-all ${
                rating === emoji.type
                  ? "border-white bg-white/10 scale-110"
                  : "border-gray-700 hover:border-gray-500"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: rating === emoji.type ? [1, 1.2, 1.1] : 1
              }}
              transition={{ 
                delay: 0.4 + ratingEmojis.indexOf(emoji) * 0.1,
                scale: { duration: 0.3 }
              }}
            >
              <span className="text-6xl">{emoji.icon}</span>
              <span className="text-xs text-gray-400 tracking-wider uppercase">
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
          className="bg-white text-black px-20 py-5 text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
}