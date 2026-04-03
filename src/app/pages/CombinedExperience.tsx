import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Sparkles, Wind } from "lucide-react";
import { motion } from "motion/react";

export default function CombinedExperience() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"spraying" | "ready">("spraying");
  const [countdown, setCountdown] = useState(3);

  // Ambil note dari session (dinamis). Jika tidak ada, pakai default VECTOR.
  const currentNoteRaw = sessionStorage.getItem("currentNote");
  const currentNote = currentNoteRaw ? JSON.parse(currentNoteRaw) : { name: "VECTOR" };
  const recommendedNote = currentNote.name;

  useEffect(() => {
    if (phase === "spraying") {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase("ready");
      }
    }
  }, [countdown, phase]);

  const handleNextToMusic = () => {
    navigate("/music-experience");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-15 relative overflow-hidden">
      
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

      {/* DIPERLEBAR: max-w-xl diubah menjadi max-w-5xl agar gambar bisa lebih besar */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center mt-16 md:mt-0">

        {/* ================= FASE 1: SPRAYING COUNTDOWN ================= */}
        {phase === "spraying" && (
          <div className="flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 min-h-[50vh]">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-12">
              Preparing Your Note
            </h2>
            
            {/* Animasi Countdown Simple (Garis putus-putus putih) */}
            <div className="relative flex items-center justify-center w-36 h-36 mb-10 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-white/40 border-dashed animate-[spin_4s_linear_infinite]"></div>
              <div className="absolute inset-0 rounded-full bg-white/5 animate-pulse"></div>
              <span className="text-6xl font-serif font-bold text-white z-10" style={{ fontFamily: "Georgia, serif" }}>
                {countdown}
              </span>
            </div>

            <Wind size={28} className="text-white mb-4 animate-bounce" />

            <p className="text-sm md:text-base text-gray-400 font-medium px-8 tracking-widest leading-relaxed uppercase">
              The vending machine is currently spraying <br />
              <span className="text-white font-bold">{recommendedNote}</span> onto your second testing paper.
            </p>
          </div>
        )}

        {/* ================= FASE 2: READY TO SENSE ================= */}
        {phase === "ready" && (
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
            
            <div className="text-center mb-5">
              <h2 className="text-5xl md:text-5xl font-bold uppercase tracking-widest mb-2">
                Crafting Your Power
              </h2>
              <p className="text-gray-400 tracking-widest text-sm md:text-base uppercase">
                Now feel the emotion unfold.
              </p>
            </div>
            
            {/* GAMBAR DIPERBESAR: Menggunakan h-auto dan object-contain agar proporsi aslinya tidak terpotong */}
            <div className="w-full mb-10">
              <img 
                src="/asset/crafting.png" 
                alt="Crafting Your Power" 
                className="w-full h-auto object-contain opacity-90"
              />
            </div>

            {/* TEKS DIPINDAH KE BAWAH: Tidak lagi menggunakan 'absolute', sehingga tidak menutupi gambar */}
            <div className="text-center mb-5">
              <Sparkles size={24} className="text-[#C2813F] mx-auto mb-4 animate-pulse" />
              <p className="text-base md:text-lg font-bold leading-relaxed tracking-wider text-white uppercase drop-shadow-lg">
                Bring both your Hero Perfume paper <br className="hidden md:block"/>
                and the <span className="underline underline-offset-4 text-[#C2813F]">{recommendedNote}</span> paper close to your nose.
              </p>
            </div>

            <button 
              onClick={handleNextToMusic}
              className="w-full max-w-sm bg-white text-black py-4 md:py-5 rounded-none font-bold text-sm md:text-base uppercase tracking-widest hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              PROCEED TO SOUND <ArrowRight size={20} />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}