import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { LAYERING_NOTES } from "../data/fragrances";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function AIRecommendation() {
  const navigate = useNavigate();

  // Get ratings from session storage
  const ratings = JSON.parse(sessionStorage.getItem("noteRatings") || "{}");

  const ratingToScore: { [key: string]: number } = {
    love: 5,
    like: 4,
    neutral: 3,
    dislike: 2,
    hate: 1,
  };

  // Get top rated notes (4 or 5 stars)
  const recommendedNotes = LAYERING_NOTES.filter((note) => {
    const score = ratingToScore[ratings[note.id]] || 0;
    return score >= 4;
  }).slice(0, 6); // Show up to 6 recommendations

  const handleConfirm = () => {
    navigate("/product-selection");
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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 mt-8"
        >
          <h1 className="text-7xl mb-6 tracking-wider uppercase">
            Your Final Recommendation
          </h1>
          <p className="text-gray-400 text-2xl tracking-wide">
            Select your favorite layering
          </p>
        </motion.div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {recommendedNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`group relative overflow-hidden aspect-[3/4] ${
                note.id === "florent" ? "ring-4 ring-amber-400 shadow-2xl shadow-amber-400/50" : ""
              }`}
            >
              {/* Background Image */}
              <img
                src={note.imageUrl}
                alt={note.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80" />

              {/* Florent Badge */}
              {note.id === "florent" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute top-4 right-4 bg-amber-400 text-black px-4 py-2 text-xs tracking-widest uppercase font-bold"
                >
                  Recommended
                </motion.div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className={`text-xl tracking-wider mb-2 uppercase ${
                  note.id === "florent" ? "text-amber-400" : ""
                }`}>
                  {note.name}
                </h3>
                <p className="text-sm text-gray-300 tracking-wide">
                  {note.description}
                </p>
              </div>

              {/* Color Accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: note.id === "florent" ? "#fbbf24" : note.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={handleConfirm}
            className="bg-white text-black px-24 py-6 text-xl tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300"
          >
            Confirm
          </button>
        </motion.div>
      </div>

      <AIVoiceIndicator />
    </div>
  );
}