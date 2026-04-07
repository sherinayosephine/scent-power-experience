import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { Music, PlayCircle, PauseCircle, RotateCcw, ArrowRight } from "lucide-react";

// ==========================================
// KAMUS CADANGAN (JALAN PINTAS ANTI-GAGAL)
// ==========================================
const FALLBACK_SCENES: Record<string, string> = {
  "saharienne": "Imagine stepping out of the cool shadows of a stone villa into the blazing midday sun. A crisp, white linen shirt flutters in the warm breeze as the sharp, radiant energy of citrus and neroli awakens your skin.",
  "blouse": "Imagine the sensation of cold, sheer silk slipping over your shoulders. You are in a grand Parisian apartment; the windows are wide open to a spring garden, and the soft, velvety touch of rose petals floats through the air.",
  "lavalierre": "Imagine standing inside a lush, overgrown greenhouse at twilight. The air is humid and vibrating with life. You take a bite of a dark, perfectly ripe fig—a sudden clash of sharp greenery and sweet, juicy rebellion.",
  "lavarielle": "Imagine standing inside a lush, overgrown greenhouse at twilight. The air is humid and vibrating with life. You take a bite of a dark, perfectly ripe fig—a sudden clash of sharp greenery and sweet, juicy rebellion.",
  "capéline": "Imagine standing on a cliffside terrace overlooking a calm, turquoise sea. The air is filled with the majestic, creamy scent of white lilies and a hint of warm vanilla. Everything feels pure, elegant, and perfectly still.",
  "capeline": "Imagine standing on a cliffside terrace overlooking a calm, turquoise sea. The air is filled with the majestic, creamy scent of white lilies and a hint of warm vanilla. Everything feels pure, elegant, and perfectly still.",
  "babycat": "Imagine it is 2 AM in a secret underground jazz club. You are wearing a worn-in leather jacket, leaning against a velvet booth. The air is thick with the intoxicating, smoky aroma of dark bourbon vanilla and mystery.",
  "trench": "Imagine walking through Paris just as a sudden, cool rain begins to fall. You pull a high-collar trench coat against the wind. The air feels incredibly pure, transparent, and clean—as if the rain has washed the entire city."
};

export default function MusicExperience() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const audioObjRef = useRef<HTMLAudioElement | null>(null);

  // 1. Ambil data dari Session Storage
  const currentNoteRaw = sessionStorage.getItem("currentNote");
  const currentNote = currentNoteRaw ? JSON.parse(currentNoteRaw) : {};
  const heroPerfumeRaw = sessionStorage.getItem("heroPerfume");
  const heroPerfume = heroPerfumeRaw ? JSON.parse(heroPerfumeRaw) : {};

  // 2. Siapkan URL Media
  const targetAudioUrl = currentNote.audioUrl ? encodeURI(currentNote.audioUrl) : "/asset/florent.mp3";
  const targetVideoUrl = currentNote.bgVideoUrl ? encodeURI(currentNote.bgVideoUrl) : null;
  
  // 3. Siapkan Gambar
  const noteImg = currentNote.bottleImageUrl || currentNote.imageUrl || "/asset/florent.jpg";
  const perfumeImg = heroPerfume.bottleImageUrl || heroPerfume.imageUrl || "/asset/libre.png";
  
  // 4. SIAPKAN TEKS IMAGINARY SCENE (DENGAN JALAN PINTAS)
  // Ambil nama parfum dan ubah jadi huruf kecil semua untuk dicocokkan dengan kamus cadangan
  const noteNameForMatch = (currentNote.name || currentNote.id || "").toLowerCase();
  const sceneText = currentNote.imaginaryScene || FALLBACK_SCENES[noteNameForMatch] || "";

  useEffect(() => {
    const audio = new Audio(targetAudioUrl);
    audio.volume = 0.5;
    audioObjRef.current = audio;

    const startExperience = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn("Autoplay ditahan browser. Menunggu interaksi user.", error);
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
      setIsFinished(true); 
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
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 md:px-12 overflow-hidden">
      
      {/* VIDEO BACKGROUND */}
      {targetVideoUrl && (
        <>
          <video
            key={targetVideoUrl} 
            src={targetVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            style={{ zIndex: 0 }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90 pointer-events-none" 
            style={{ zIndex: 1 }} 
          />
        </>
      )}

      {/* KONTEN UTAMA */}
      <div className="relative w-full text-center max-w-4xl mx-auto flex flex-col items-center mt-12 md:mt-0" style={{ zIndex: 10 }}>
        
        {/* YSL Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-12 md:-top-24 right-0 w-12 md:w-16 hidden md:block"
        >
          <img src="/asset/ysl logo.png" alt="YSL" className="w-full h-auto object-contain drop-shadow-lg" />
        </motion.div>
        <img src="/asset/ysl logo.png" alt="YSL Logo" className="absolute -top-16 w-12 object-contain md:hidden drop-shadow-lg" />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl mb-4 tracking-wider uppercase font-bold drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
        >
          Crafting Your Power
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-xl mb-8 md:mb-10 text-gray-200 tracking-widest uppercase drop-shadow-md"
        >
          Experience the scent while the music plays
        </motion.p>

        {/* Circles Visualizer */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8 scale-75 md:scale-100">
          
          <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/40 p-2 shadow-[0_0_40px_rgba(255,255,255,0.15)] backdrop-blur-md">
              <div className="w-full h-full rounded-full overflow-hidden bg-black/60">
                <img src={encodeURI(noteImg)} className="w-full h-full object-cover" alt="Note" />
              </div>
            </div>
          </motion.div>

          <div className="hidden md:flex gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div key={i} animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]" />
            ))}
          </div>

          <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/40 p-2 shadow-[0_0_40px_rgba(255,255,255,0.15)] backdrop-blur-md">
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black/60">
                <img src={encodeURI(perfumeImg)} className="w-24 h-36 md:w-32 md:h-48 object-contain drop-shadow-2xl" alt="Perfume" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Note Name & Imaginary Scene Text */}
        <div className="mb-8 px-4 max-w-2xl mx-auto flex flex-col items-center">
          <motion.h2 
            className="text-3xl md:text-4xl mb-3 tracking-widest uppercase font-bold drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]" 
            style={{ color: currentNote.color || "white" }}
          >
            {currentNote.name || "FLORENT"}
          </motion.h2>
          
          {/* TEKS MUNCUL DI SINI */}
          {sceneText && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-base text-gray-300 italic tracking-wide leading-relaxed drop-shadow-md text-center max-w-xl bg-black/30 p-4 rounded-lg backdrop-blur-sm border border-white/10"
            >
              "{sceneText}"
            </motion.p>
          )}
        </div>

        {/* Player Controls */}
        <div className="h-24 w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center">
                <button onClick={togglePlayPause} className="mb-6 w-14 h-14 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-black transition-all backdrop-blur-sm bg-black/30 shadow-lg cursor-pointer">
                  {isPlaying ? <PauseCircle size={28} /> : <PlayCircle size={28} />}
                </button>
                <div className="w-full max-w-md">
                  <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm">
                    <motion.div className="h-full bg-white shadow-[0_0_10px_white]" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="finished" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row gap-4 w-full max-w-md">
                <button onClick={handleReplay} className="flex-1 border border-white/40 py-4 font-bold tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all backdrop-blur-sm bg-black/40 cursor-pointer">
                  <RotateCcw size={18} /> Replay
                </button>
                <button onClick={() => navigate("/rating")} className="flex-1 bg-white text-black py-4 font-bold tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-2 hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all cursor-pointer">
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