import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Droplet, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function PrepareHeroPaper() {
  const navigate = useNavigate();

  // TAMBAHAN BARU: HARD RESET MEMORI DI SINI
  useEffect(() => {
    // Setiap kali user masuk ke halaman persiapan kertas ini, 
    // kita paksa hapus semua riwayat notes sebelumnya agar selalu mulai dari awal.
    sessionStorage.removeItem("triedNotes");
    sessionStorage.removeItem("currentNote");
    sessionStorage.removeItem("currentNoteIndex");
    sessionStorage.removeItem("noteRatings");
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 relative">
      
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

      <div className="w-full max-w-md flex flex-col items-center text-center mt-12 md:mt-0">
        
        <div className="w-24 h-24 bg-white/5 border border-white/20 rounded-full flex items-center justify-center mb-8">
          <Droplet size={36} className="text-white" strokeWidth={1.5} />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-6">
          Prepare Your Notes
        </h2>
        
        <p className="text-base text-gray-400 font-medium leading-relaxed mb-10 tracking-wide">
          Please take <span className="text-white font-bold">1 testing paper</span> for your Hero Perfume, and keep <span className="text-white font-bold">5 other papers</span> ready for the layering notes.
          <br /><br />
          Now, <span className="text-white font-bold uppercase underline underline-offset-4">spray your Hero Perfume</span> onto the first paper.
        </p>

        <button 
          onClick={() => navigate("/note-selection")}
          className="w-full bg-white text-black py-5 rounded-none font-bold text-sm md:text-base uppercase tracking-widest hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          I'M READY <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}