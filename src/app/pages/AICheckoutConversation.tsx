import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";
import { useState, useEffect } from "react";

export default function AICheckoutConversation() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ text: string; isAI: boolean }[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  // Mengambil nama note yang sedang dipakai
  const currentNoteRaw = sessionStorage.getItem("currentNote");
  const currentNote = currentNoteRaw ? JSON.parse(currentNoteRaw) : { name: "your layering note" };

  useEffect(() => {
    // Initial AI message setelah user selesai mencoba di badan
    setTimeout(() => {
      setMessages([
        { 
          text: `That combination of your Hero Perfume and ${currentNote.name} smells absolutely incredible on your skin.`, 
          isAI: true 
        }
      ]);
      
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Are you ready to proceed to checkout and claim your new signature power?",
            isAI: true
          }
        ]);
        setTimeout(() => setShowOptions(true), 1000);
      }, 2000);
      
    }, 500);
  }, [currentNote.name]);

  const handleProceedCheckout = () => {
    setMessages((prev) => [
      ...prev,
      { text: "Yes, proceed to checkout.", isAI: false },
      { text: "Perfect. Let me prepare your final product recommendations...", isAI: true }
    ]);
    
    setTimeout(() => {
      // Sesuai request: Ke AI Recommendation dulu untuk milih scent/produk
      navigate("/ai-recommendation");
    }, 2500);
  };

  const handleNotYet = () => {
    setMessages((prev) => [
      ...prev,
      { text: "Not yet, I want to see my profile again.", isAI: false },
      { text: "Of course. Let's take another look at your olfactive journey.", isAI: true }
    ]);
    
    setTimeout(() => {
      // Kalau user belum mau checkout, lempar balik ke Profile atau Note Selection
      navigate("/profile");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 md:px-12 relative">
      
      {/* YSL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-12 right-12 w-16 z-30 hidden md:block"
      >
        <img
          src="/asset/ysl logo.png"
          alt="YSL Logo"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      <img 
        src="/asset/ysl logo.png" 
        alt="YSL Logo" 
        className="absolute top-8 w-12 object-contain z-30 md:hidden" 
      />

      <div className="max-w-3xl w-full mt-20 md:mt-0">
        
        {/* AI Avatar/Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-8"
        >
          <AIVoiceIndicator />
        </motion.div>

        {/* Messages Flow */}
        <div className="space-y-6 mb-12">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, x: message.isAI ? -20 : 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`flex ${message.isAI ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-xl p-5 md:p-6 ${
                    message.isAI
                      ? "bg-white/10 border border-white/20 rounded-sm"
                      : "bg-white text-black rounded-sm"
                  }`}
                >
                  <p className="text-base md:text-lg tracking-wide leading-relaxed font-medium">
                    {message.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        {showOptions && messages.length <= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleNotYet}
              className="border-2 border-white px-8 md:px-12 py-4 text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300 font-bold"
            >
              NOT YET
            </button>
            <button
              onClick={handleProceedCheckout}
              className="bg-[#C2813F] text-black px-8 md:px-12 py-4 text-xs md:text-sm tracking-widest uppercase hover:bg-white transition-colors duration-300 font-bold shadow-[0_0_20px_rgba(194,129,63,0.3)]"
            >
              PROCEED TO CHECKOUT
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}