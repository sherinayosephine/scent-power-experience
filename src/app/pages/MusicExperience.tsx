import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Music } from "lucide-react";

export default function MusicExperience() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  
  // 1. Create a reference for the audio player
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get current note and perfume from session storage
  const currentNote = JSON.parse(sessionStorage.getItem("currentNote") || "{}");
  const heroPerfume = JSON.parse(sessionStorage.getItem("heroPerfume") || "{}");

  useEffect(() => {
    // 2. Play the music automatically on load
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set to 50% volume
      audioRef.current.play().catch(error => {
        console.log("Autoplay was prevented. User interaction may be required.", error);
      });
    }

    const duration = 15000; // 15 seconds
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // 3. Fade out or stop music before navigating
          if (audioRef.current) audioRef.current.pause();
          setTimeout(() => navigate("/rating"), 500);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
      if (audioRef.current) audioRef.current.pause();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-12 relative">
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        // This grabs the audioUrl and ensures it has a leading slash
        src={currentNote.audioUrl?.startsWith('/') ? currentNote.audioUrl : `/${currentNote.audioUrl}`} 
        preload="auto"
      />

      {/* YSL Logo */}
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
        <div className="flex items-center justify-center gap-12 mb-16">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="w-64 h-64 rounded-full border-4 border-white p-2">
              <div className="w-full h-full rounded-full border-2 border-dashed border-white/30 overflow-hidden">
                <img
                  src={currentNote.imageUrl}
                  alt={currentNote.name}
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

          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="relative"
          >
            <div className="w-64 h-64 rounded-full border-4 border-white p-2">
              <div className="w-full h-full rounded-full border-2 border-dashed border-white/30 overflow-hidden flex items-center justify-center bg-zinc-900">
                <img
                  src={heroPerfume.imageUrl || "/asset/8.jpg"} 
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
          {currentNote.name}
        </motion.h2>

        {/* Music Visualization */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Music className="w-6 h-6 text-white animate-pulse" />
          <div className="flex items-end gap-1 h-16">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-white rounded-full"
                animate={{ height: ["20%", "100%", "20%"] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
          </div>
          <Music className="w-6 h-6 text-white animate-pulse" />
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