import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { LAYERING_NOTES } from "../data/fragrances";

export default function AIConversation() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ text: string; isAI: boolean }[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const currentNoteRaw = sessionStorage.getItem("currentNote");
  const currentNote = currentNoteRaw ? JSON.parse(currentNoteRaw) : { name: "that note", id: "" };
  
  const ratingsRaw = sessionStorage.getItem("noteRatings");
  const ratings = ratingsRaw ? JSON.parse(ratingsRaw) : {};
  const lastRating = ratings[currentNote.id];

  useEffect(() => {
    // Initial AI message based on rating
    setTimeout(() => {
      if (lastRating === "dislike" || lastRating === "hate") {
        setMessages([
          { 
            text: `Oh, I see ${currentNote.name} wasn't quite right for you. Would you like to explore our other fragrance notes?`, 
            isAI: true 
          }
        ]);
      } else {
        setMessages([
          { 
            text: `I'm glad you enjoyed ${currentNote.name}! Would you like to explore more notes, or are you ready to finalize your signature combination?`, 
            isAI: true 
          }
        ]);
      }
      setTimeout(() => setShowOptions(true), 1000);
    }, 500);
  }, [currentNote.name, lastRating]);

  const handleExploreMore = () => {
    setMessages((prev) => [
      ...prev,
      { text: "Yes, I want to try another note.", isAI: false },
      { text: "Sure! Let's go back to the collection so you can discover another perfect match.", isAI: true }
    ]);
    
    setTimeout(() => {
      // Kembali ke halaman pemilihan note untuk nyoba note yang belum
      navigate("/note-selection");
    }, 2500);
  };

  const handleConfirmCombination = () => {
    setMessages((prev) => [
      ...prev,
      { text: "I'm ready to finalize my choice.", isAI: false },
      { text: "Excellent. Let me compile your Olfactive Profile so you can select your ultimate favorite...", isAI: true }
    ]);
    
    setTimeout(() => {
      // Lanjut ke halaman Profile untuk review dan milih Final Note
      navigate("/profile");
    }, 2500);
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

      <div className="max-w-3xl w-full">
        {/* AI Avatar/Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-8"
        >
          <AIVoiceIndicator />
        </motion.div>

        {/* Messages */}
        <div className="space-y-6 mb-12">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, x: message.isAI ? -20 : 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-xl p-6 ${
                    message.isAI
                      ? "bg-white/10 border border-white/20 rounded-lg"
                      : "bg-white text-black rounded-lg"
                  }`}
                >
                  <p className="text-lg tracking-wide">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Options */}
        {showOptions && messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center"
          >
            <button
              onClick={handleExploreMore}
              className="border-2 border-white px-12 py-4 text-sm md:text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300 rounded-md font-bold"
            >
              EXPLORE MORE
            </button>
            <button
              onClick={handleConfirmCombination}
              className="bg-white text-black px-12 py-4 text-sm md:text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 rounded-md font-bold"
            >
              CONFIRM COMBINATION
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}