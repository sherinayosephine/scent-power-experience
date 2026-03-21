import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Music, PlayCircle } from "lucide-react";

export default function MusicExperience() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  
  // We use a ref to store the actual JavaScript Audio object
  const audioObjRef = useRef<HTMLAudioElement | null>(null);

  const currentNote = JSON.parse(sessionStorage.getItem("currentNote") || "{}");
  const heroPerfume = JSON.parse(sessionStorage.getItem("heroPerfume") || "{}");

  // 1. THE BULLETPROOF FALLBACK: 
  // If session storage is old/empty, force it to use florent.mp3 so you hear something!
  const targetAudioUrl = currentNote.audioUrl || "/asset/florent.mp3";

  useEffect(() => {
    // 2. Create the audio object purely in Javascript (much more reliable)
    const audio = new Audio(targetAudioUrl);
    audio.volume = 0.5;
    audioObjRef.current = audio;

    const playAudio = async () => {
      try {
        await audio.play();
        setIsBlocked(false);
      } catch (error) {
        console.warn("🚨 Browser blocked autoplay. Waiting for tap...", error);
        setIsBlocked(true);
      }
    };

    playAudio();

    // Timer logic
    const duration = 15000; // 15 seconds
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          audio.pause(); // Stop music
          setTimeout(() => navigate("/rating"), 500);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    // Cleanup when leaving the page
    return () => {
      clearInterval(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [navigate, targetAudioUrl]);

  // Fallback if user needs to tap the screen
  const handleManualPlay = () => {
    if (audioObjRef.current) {
      audioObjRef.current.play();
      setIsBlocked(false);
    }
  };

  return (
    <div 
      onClick={handleManualPlay}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-12 relative overflow-hidden cursor-pointer"
    >
      
      {/* YSL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-12 right-12 w-16 z-30"
      >
        <img
          src="/asset/ysl logo.png"
          alt="YSL"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      <div className="text-center max-w-4xl relative z-10">
        
        {/* BROWSER BLOCK WARNING UI */}
        {isBlocked && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full flex items-center gap-3 whitespace-nowrap animate-bounce shadow-[0_0_20px_white]"
          >
            <PlayCircle className="w-6 h-6" />
            <span className="font-bold tracking-widest uppercase text-sm">Tap anywhere to start music</span>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl mb-4 tracking-wider uppercase font-bold"
        >
          Crafting Your Power
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl mb-16 text-gray-400 tracking-widest uppercase"
        >
          Your New Olfactive Layering Scent
        </motion.p>

        {/* Circles Section */}
        <div className="flex items-center justify-center gap-12 mb-16 pointer-events-none">
          {/* Note Circle */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="w-64 h-64 rounded-full border-4 border-white p-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <div className="w-full h-full rounded-full border-2 border-dashed border-white/30 overflow-hidden bg-zinc-900">
                <img
                  src={currentNote.imageUrl || "/asset/florent.jpg"}
                  alt={currentNote.name || "Note"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Connection dots */}
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 rounded-full bg-white"
              />
            ))}
          </div>

          {/* Perfume Circle */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="relative"
          >
            <div className="w-64 h-64 rounded-full border-4 border-white p-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <div className="w-full h-full rounded-full border-2 border-dashed border-white/30 overflow-hidden flex items-center justify-center bg-zinc-900">
                <img
                  src={heroPerfume.imageUrl || "/asset/libre.png"} 
                  alt="Hero Perfume"
                  className="w-32 h-48 object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl mb-8 tracking-widest uppercase font-bold"
          style={{ color: currentNote.color || "white" }}
        >
          {currentNote.name || "FLORENT"}
        </motion.h2>

        {/* Music Visualization */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Music className={`w-6 h-6 text-white ${!isBlocked ? 'animate-pulse' : 'opacity-50'}`} />
          <div className="flex items-end gap-1 h-16">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-white rounded-full"
                animate={!isBlocked ? { height: ["20%", "100%", "20%"] } : { height: "20%" }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
          </div>
          <Music className={`w-6 h-6 text-white ${!isBlocked ? 'animate-pulse' : 'opacity-50'}`} />
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white shadow-[0_0_10px_white]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-6 tracking-[0.3em] uppercase">
            Experience the scent while the music plays...
          </p>
        </div>
      </div>
    </div>
  );
}