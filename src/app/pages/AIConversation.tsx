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

  const currentNote = JSON.parse(sessionStorage.getItem("currentNote") || "{}");
  const ratings = JSON.parse(sessionStorage.getItem("noteRatings") || "{}");
  const lastRating = ratings[currentNote.id];
  const trialCount = parseInt(sessionStorage.getItem("trialCount") || "0");

  useEffect(() => {
    // Initial AI message based on rating
    setTimeout(() => {
      if (lastRating === "dislike" || lastRating === "hate") {
        setMessages([
          { 
            text: `Oh, I see ${currentNote.name} wasn't quite right for you. Would you like to try another fragrance note?`, 
            isAI: true 
          }
        ]);
      } else {
        setMessages([
          { 
            text: `I'm glad you enjoyed ${currentNote.name}! Would you like to explore more notes or see your complete olfactive profile?`, 
            isAI: true 
          }
        ]);
      }
      setTimeout(() => setShowOptions(true), 1000);
    }, 500);
  }, []);

  const handleExploreMore = () => {
    setMessages([
      ...messages,
      { text: "Yes, I want to try more", isAI: false },
      { text: "Sure! What kind of scent are you looking for? Let me guide you to another note...", isAI: true }
    ]);
    
    setTimeout(() => {
      // Check if we've tried all notes
      if (trialCount >= LAYERING_NOTES.length) {
        navigate("/profile");
      } else {
        navigate("/note-selection");
      }
    }, 2000);
  };

  const handleViewProfile = () => {
    setMessages([
      ...messages,
      { text: "Show me my profile", isAI: false },
      { text: "Perfect! Let me show you your unique olfactive journey...", isAI: true }
    ]);
    
    setTimeout(() => {
      navigate("/journey-steps?step=3");
    }, 2000);
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
                      ? "bg-white/10 border border-white/20"
                      : "bg-white text-black"
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
              className="border-2 border-white px-12 py-4 text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300"
            >
              {trialCount >= 3 ? "Try More Notes" : "Explore More"}
            </button>
            <button
              onClick={handleViewProfile}
              className="bg-white text-black px-12 py-4 text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300"
            >
              View My Profile
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}