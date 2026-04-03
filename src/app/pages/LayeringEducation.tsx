import React from "react";
import { useNavigate } from "react-router";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

export default function LayeringEducation() {
  const navigate = useNavigate();
  
  // Mengambil note final dari pilihan user (dinamis)
  const currentNoteRaw = sessionStorage.getItem("currentNote");
  const currentNote = currentNoteRaw ? JSON.parse(currentNoteRaw) : { name: "VECTOR" };
  const selectedNote = currentNote.name;

  // Logika edukasi: Kalau Bold (seperti Vector/Lumen), sarankan Split. Selain itu Stack.
  const isBoldNote = selectedNote === "VECTOR" || selectedNote === "LUMEN";
  const recommendedTechnique = isBoldNote ? "SPLIT" : "STACK";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-12 px-6 pb-10 animate-in fade-in duration-500 relative">
      
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

      <div className="w-full max-w-2xl mx-auto flex flex-col items-center mt-12 md:mt-4">
        
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-8 text-center">
          How to Wear It
        </h2>

        {/* Gambar Stack vs Split */}
        <div className="mb-10 bg-[#111]">
          <img 
            src="/asset/layer.png" 
            alt="Stack vs Split Layering" 
            className="w-full rounded-sm object-cover opacity-90" 
          />
        </div>

        {/* WARNING/EDUCATION BOX - DIPERBESAR */}
        <div className={`w-full p-8 md:p-10 rounded-xl border-2 mb-12 shadow-2xl ${isBoldNote ? "bg-[#111] border-white" : "bg-[#111] border-gray-600"}`}>
          <div className="flex items-center gap-4 mb-6">
            <AlertTriangle className="text-white" size={32} strokeWidth={2.5} />
            <h3 className="font-bold uppercase tracking-widest text-xl md:text-2xl text-white">
              AI Recommendation: {recommendedTechnique}
            </h3>
          </div>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed tracking-wide">
            Since you have chosen <span className="font-bold text-white uppercase">{selectedNote}</span>, 
            which has a {isBoldNote ? "clashing and bold" : "harmonious and smooth"} profile, 
            we highly recommend using the <span className="font-bold text-white uppercase underline underline-offset-4">{recommendedTechnique} LAYERING</span> technique.
            <br/><br/>
            <span className="text-white font-medium">
              {isBoldNote 
                ? "Apply your Hero Perfume on your neck, and the layering note on your wrists to let them dance together without overpowering each other."
                : "Spray your Hero Perfume and layer it directly on top of the same pulse points to build a seamless new identity."}
            </span>
          </p>
        </div>

        <button 
          onClick={() => navigate("/apply-body")}
          className="w-full max-w-sm bg-white text-black py-5 rounded-none font-bold text-base uppercase tracking-widest hover:bg-gray-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-auto"
        >
          APPLY TO BODY <ArrowRight size={20} />
        </button>

      </div>
    </div>
  );
}