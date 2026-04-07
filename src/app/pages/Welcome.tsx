import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    // DIKUNCI: h-[100dvh] memastikan pas 1 layar penuh tanpa scroll.
    // pb-[100px] md:pb-[140px] memberikan ruang kosong ekstra di bawah agar tombol aman dari AIVoiceIndicator
    <div className="h-[100dvh] w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pb-[100px] md:pb-[140px]">
      
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source
            src="/asset/video baru.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient tipis untuk memastikan teks putih tetap kontras */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* YSL Logo - Dibuat responsif ukurannya untuk HP & iPad */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 right-6 md:top-10 md:right-12 z-20 w-12 md:w-16 lg:w-20"
      >
        <img 
          src="/asset/ysl logo.png" 
          alt="Yves Saint Laurent Logo" 
          className="w-full h-auto object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Konten Utama */}
      <div className="text-center w-full max-w-5xl relative z-10 px-6 md:px-12 flex flex-col items-center mt-auto md:mt-0">
        
        {/* HEADLINE: Ukuran disesuaikan agar tidak tumpah di layar iPad 4:3 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-[100px] leading-tight mb-4 md:mb-6 tracking-widest uppercase font-serif font-bold drop-shadow-2xl"
        >
          SCENT POWER
        </motion.h1>

        {/* SUBHEADLINE: Diperkecil sedikit agar elegan dan muat dalam 1-2 baris */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xs md:text-lg lg:text-2xl mb-12 md:mb-16 tracking-[0.2em] md:tracking-[0.3em] uppercase font-light text-gray-200 drop-shadow-md"
        >
          Explore Your Luxury Layering Scent Journey
        </motion.p>

        {/* BUTTON: Dibuat responsif */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          onClick={() => navigate("/journey-steps")}
          className="bg-white text-black px-10 py-4 md:px-16 md:py-5 text-sm md:text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Journey
        </motion.button>
      </div>

      <AIVoiceIndicator />
    </div>
  );
}