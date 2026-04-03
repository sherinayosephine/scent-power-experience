import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

export default function ApplicationGuide() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Sesuai flow baru: Setelah di-apply ke tubuh, user memberi rating.
    // Nanti dari /rating, arahkan ke /profile, lalu ke /checkout.
    navigate("/rating-body");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-12 flex flex-col relative overflow-hidden">
      
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

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-12 left-6 md:left-12 text-white text-xs md:text-sm tracking-widest hover:text-gray-400 transition-colors z-30 uppercase"
      >
        &lt; Back
      </button>

      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-3xl mx-auto mt-16 md:mt-0 z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-widest uppercase">
            Heaviest First, Lightest Last
          </h1>
          <p className="text-gray-400 text-sm md:text-lg tracking-widest uppercase">
            Master the art of layering on your skin
          </p>
        </motion.div>

        {/* Kotak Gambar Tunggal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full aspect-square md:aspect-video border  bg-[#111] mb-12 relative group"
        >
          {/* GANTI SOURCE GAMBAR INI NANTI 
            (Pastikan gambar baru Anda ditaruh di folder public/asset/ dengan nama body-guide.jpg)
          */}
          <img 
            src="/asset/heavy light.png" 
            alt="Application Guide" 
            className="w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
            onError={(e) => {
              // Fallback jika gambar belum ada
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1596462502278-27bf84033005?q=80&w=2000&auto=format&fit=crop";
            }}
          />
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full flex justify-center"
        >
          <button
            onClick={handleContinue}
            className="w-full md:w-auto bg-white text-black px-16 py-5 text-sm md:text-base tracking-[0.3em] uppercase hover:bg-gray-200 active:scale-95 transition-all duration-300 font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            I HAVE APPLIED <ArrowRight size={20} />
          </button>
        </motion.div>

      </div>
    </div>
  );
}