import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { Music, PlayCircle, PauseCircle, RotateCcw, ArrowRight } from "lucide-react";

export default function MusicExperience() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const audioObjRef = useRef<HTMLAudioElement | null>(null);

  const currentNoteRaw = sessionStorage.getItem("currentNote");
  const currentNote = currentNoteRaw ? JSON.parse(currentNoteRaw) : { name: "FLORENT", color: "white" };
  const heroPerfumeRaw = sessionStorage.getItem("heroPerfume");
  const heroPerfume = heroPerfumeRaw ? JSON.parse(heroPerfumeRaw) : {};

  const targetAudioUrl = currentNote.audioUrl || "/asset/florent.mp3";

  useEffect(() => {
    // Inisialisasi Audio
    const audio = new Audio(targetAudioUrl);
    audio.volume = 0.5;
    audioObjRef.current = audio;

    // LANGSUNG PLAY: Karena user sudah klik "Proceed" di page sebelumnya, 
    // browser biasanya akan mengizinkan autoplay di sini.
    const startExperience = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Autoplay failed, but will resume on next user interaction", error);
      }
    };

    startExperience();

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsFinished(true); // Memunculkan tombol Replay/Continue
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [targetAudioUrl]);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioObjRef.current) {
      if (isPlaying) {
        audioObjRef.current.pause();
        setIsPlaying(false);
      } else {
        audioObjRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioObjRef.current) {
      audioObjRef.current.currentTime = 0;
      audioObjRef.current.play();
      setIsFinished(false);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 md:px-12 relative overflow-hidden">
      
      {/* YSL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-12 right-12 w-16 z-30 hidden md:block"
      >
        <img src="/asset/ysl logo.png" alt="YSL" className="w-full h-auto object-contain" />
      </motion.div>
      <img src="/asset/ysl logo.png" alt="YSL Logo" className="absolute top-8 w-12 object-contain z-30 md:hidden" />

      <div className="w-full text-center max-w-4xl mx-auto flex flex-col items-center mt-12 md:mt-0 relative z-10">
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl mb-4 tracking-wider uppercase font-bold"
        >
          Crafting Your Power
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-xl mb-12 md:mb-16 text-gray-400 tracking-widest uppercase"
        >
          Experience the scent while the music plays
        </motion.p>

        {/* Circles Visualizer */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-12 scale-75 md:scale-100">
          <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white p-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
                <img src={currentNote.imageUrl || "/asset/florent.jpg"} className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          <div className="hidden md:flex gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-3 h-3 rounded-full bg-white" />
            ))}
          </div>

          <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white p-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-zinc-900">
                <img src={heroPerfume.imageUrl || "/asset/libre.png"} className="w-24 h-36 md:w-32 md:h-48 object-contain" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.h2 className="text-3xl md:text-4xl mb-8 tracking-widest uppercase font-bold" style={{ color: currentNote.color || "white" }}>
          {currentNote.name || "FLORENT"}
        </motion.h2>

        {/* Dynamic Controls Section */}
        <div className="h-32 w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center">
                <button onClick={togglePlayPause} className="mb-6 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  {isPlaying ? <PauseCircle size={28} /> : <PlayCircle size={28} />}
                </button>
                <div className="w-full max-w-md">
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-white shadow-[0_0_10px_white]" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="finished" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row gap-4 w-full max-w-md">
                <button onClick={handleReplay} className="flex-1 border border-white/40 py-4 font-bold tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <RotateCcw size={18} /> Replay
                </button>
                <button onClick={() => navigate("/rating")} className="flex-1 bg-white text-black py-4 font-bold tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-2 hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                  Proceed <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}