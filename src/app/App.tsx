import { RouterProvider } from 'react-router';
import { router } from './routes';
import GazeCursor from './components/GazeCursor';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

function App() {
  // State untuk mengontrol apakah AI nyala atau mati (Default: Mati)
  const [isVisionEnabled, setIsVisionEnabled] = useState(false);

  // Cek memori saat pertama kali web dibuka, apakah user sebelumnya menyalakan AI
  useEffect(() => {
    const savedPreference = sessionStorage.getItem("visionTracking");
    if (savedPreference === "true") {
      setIsVisionEnabled(true);
    }
  }, []);

  // Fungsi saat tombol toggle ditekan
  const toggleVisionTracking = () => {
    const newState = !isVisionEnabled;
    setIsVisionEnabled(newState);
    sessionStorage.setItem("visionTracking", String(newState));
  };

  return (
    <>
      {/* Jika isVisionEnabled TRUE, maka GazeCursor (Kamera + AI) akan di-render */}
      {isVisionEnabled && <GazeCursor />}

      {/* TOMBOL TOGGLE FLOATING (Di pojok kiri bawah) */}
      <button
        onClick={toggleVisionTracking}
        className={`fixed bottom-6 md:bottom-8 left-6 md:left-12 z-[9999] flex items-center justify-center gap-3 px-4 py-3 rounded-full border transition-all duration-300 shadow-xl ${
          isVisionEnabled 
            ? "bg-[#C2813F]/20 border-[#C2813F] text-[#C2813F]" // Nyala: Emas
            : "bg-[#111] border-white/20 text-gray-400 hover:text-white" // Mati: Abu-abu gelap
        }`}
        title={isVisionEnabled ? "Turn Off YSL Vision" : "Turn On YSL Vision"}
      >
        {isVisionEnabled ? <Eye size={20} /> : <EyeOff size={20} />}
        <span className="text-xs tracking-widest uppercase font-bold hidden md:inline">
          {isVisionEnabled ? "Vision: ON" : "Vision: OFF"}
        </span>
      </button>

      {/* Kumpulan Halaman Utama */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;