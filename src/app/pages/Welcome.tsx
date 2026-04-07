import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function Welcome() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  // TRIK ANTI-GAGAL UNTUK IPAD/SAFARI:
  // Memaksa video untuk autoplay karena Apple sering memblokir atribut "autoPlay" bawaan HTML
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.warn("Autoplay dicegah oleh browser:", error);
      });
    }
  }, []);

  return (
    <div className="h-[100dvh] w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pb-[100px] md:pb-[140px]">
      
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline // Sangat penting untuk iOS/iPadOS agar video tidak full-screen otomatis
          className="w-full h-full object-cover opacity-60 pointer-events-none"
        >
          <source
            src="/asset/video baru.mp4"
            type="video/mp4"
          />
        </video>
        {/* Gradient tipis untuk memastikan teks putih tetap kontras */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* YSL Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-8 right-6 md:top-10 md:right-12 z-20 w-12 md:w-16 lg:w-16"
      >
        <img 
          src="/asset/ysl logo.png" 
          alt="Yves Saint Laurent Logo" 
          className="w-full h-auto object-contain drop-shadow-lg"
        />
      </motion.div>

      {/* Konten Utama */}
      <div className="text-center w-full max-w-5xl relative z-10 px-6 md:px-12 flex flex-col items-center mt-auto md:mt-0">
        
        {/* HEADLINE: Font dikecilkan agar lebih elegan dan pas di iPad */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-[80px] leading-tight mb-3 md:mb-5 tracking-widest uppercase font-serif font-bold drop-shadow-2xl"
        >
          SCENT POWER
        </motion.h1>

        {/* SUBHEADLINE: Font dikecilkan sedikit agar proporsional */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[10px] md:text-sm lg:text-lg mb-10 md:mb-14 tracking-[0.2em] md:tracking-[0.3em] uppercase font-light text-gray-200 drop-shadow-md"
        >
          Explore Your Luxury Layering Scent Journey
        </motion.p>

        {/* BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          onClick={() => navigate("/journey-steps")}
          className="bg-white text-black px-10 py-4 md:px-16 md:py-5 text-xs md:text-sm tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]"
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