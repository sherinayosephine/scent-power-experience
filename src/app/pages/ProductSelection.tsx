import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";
import { ArrowDownToLine, ShoppingBag, Info } from "lucide-react";

export default function ProductSelection() {
  const navigate = useNavigate();
  
  // 1. DYNAMICALLY LOAD THEIR SELECTION
  // Get the exact note they chose from the previous page
  const finalSelection = JSON.parse(sessionStorage.getItem("finalNoteSelection") || "null");
  
  const mainProduct = {
    id: "ysl-sillage-main",
    name: finalSelection ? `YSL ${finalSelection.name} Sillage EDT` : "YSL Les Pouvoirs de Sillage EDT",
    description: "Full size 100ml - Your personalized power layering signature.",
    
    // CHANGED: Now uses bottleImageUrl, with a safe fallback!
    image: finalSelection ? finalSelection.bottleImageUrl : "/asset/florent bottle.png", 
  };

  const addons = [
    {
      id: "dual-spray",
      name: "DUAL SPRAY",
      description: "Travel-size double spray or elegant bag charm.",
      image: "/asset/Travel Kit Spray.png",
    },
    {
      id: "discovery-kit",
      name: "DISCOVERY KIT",
      description: "Collection of all 6 Layering Fragrances to explore.",
      image: "/asset/discovery kit.png",
    },
  ];

  // Default selection to the main dispensed product
  const [selectedProduct, setSelectedProduct] = useState<string | null>(mainProduct.id);

  const handleCheckout = () => {
    if (selectedProduct) {
      sessionStorage.setItem("selectedProduct", selectedProduct);
      
      if (selectedProduct === mainProduct.id) {
        alert("Dispensing initiated! Please wait while the machine formulates your bottle.");
      } else {
        alert("Thank you! Please proceed to the cashier to complete your purchase.");
      }
      
      sessionStorage.clear();
      navigate("/");
    }
  };

  const handleDiscoverAgain = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-12 relative overflow-hidden flex flex-col">
      
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

      {/* Back Button */}
      <button
        onClick={() => navigate("/ai-recommendation")}
        className="absolute top-12 left-12 text-white text-sm tracking-widest hover:text-gray-400 transition-colors z-30 uppercase"
      >
        &lt; Back
      </button>

      <div className="max-w-7xl mx-auto mt-12 w-full flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 shrink-0"
        >
          <h1 className="text-5xl md:text-6xl mb-4 tracking-widest uppercase font-bold">
            Take Your Power
          </h1>
          <p className="text-gray-400 text-lg tracking-widest uppercase">
            Select your preferred format to complete the experience
          </p>
        </motion.div>

        {/* ---------------- PRODUCT LAYOUT ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 flex-1 min-h-0">
          
          {/* LEFT: MAIN DISPENSED PRODUCT (Massive) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <button
              onClick={() => setSelectedProduct(mainProduct.id)}
              className={`relative flex-1 group overflow-hidden transition-all duration-300 flex flex-col text-left ${
                selectedProduct === mainProduct.id
                  ? "ring-4 ring-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.2)]"
                  : "ring-1 ring-white/20 hover:ring-white/50 opacity-80 hover:opacity-100"
              }`}
            >
              <div className="w-full flex-1 relative bg-zinc-900 overflow-hidden min-h-[300px]">
                <img
                  src={mainProduct.image}
                  alt={mainProduct.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Checkmark */}
                {selectedProduct === mainProduct.id && (
                  <div className="absolute top-6 right-6 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-lg z-10">
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
              </div>

              {/* MACHINE WARNING BANNER */}
              <div className="bg-amber-400 text-black px-6 py-4 flex items-center gap-4 shrink-0">
                <ArrowDownToLine className="w-8 h-8 animate-bounce" />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm">Machine Dispensed</h4>
                  <p className="text-xs font-medium opacity-80">This item will be formulated and released directly from this kiosk.</p>
                </div>
              </div>

              <div className="p-8 bg-black border-x border-b border-amber-400/30 shrink-0">
                <h3 className="text-3xl tracking-widest mb-2 uppercase font-bold text-amber-400">
                  {mainProduct.name}
                </h3>
                <p className="text-gray-300 tracking-wide text-lg">
                  {mainProduct.description}
                </p>
              </div>
            </button>
          </motion.div>

          {/* RIGHT: ADD-ONS (Stacked, Large but secondary) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 text-gray-400 uppercase tracking-widest text-sm mb-2 px-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Or Choose In-Store Collection:</span>
            </div>

            {addons.map((addon) => (
              <button
                key={addon.id}
                onClick={() => setSelectedProduct(addon.id)}
                className={`relative flex-1 flex flex-row group overflow-hidden transition-all duration-300 text-left min-h-[180px] ${
                  selectedProduct === addon.id
                    ? "ring-4 ring-white shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    : "ring-1 ring-white/20 hover:ring-white/50 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="w-2/5 bg-zinc-900 relative overflow-hidden shrink-0">
                  <img
                    src={addon.image}
                    alt={addon.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="w-3/5 p-6 bg-black flex flex-col justify-center border-y border-r border-white/20">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl tracking-widest uppercase font-bold text-white">
                      {addon.name}
                    </h3>
                    {selectedProduct === addon.id && (
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shrink-0 ml-2">
                        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 tracking-wide mb-4 line-clamp-2">
                    {addon.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider mt-auto">
                    <Info className="w-4 h-4" /> Collect at Cashier
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>

        {/* ---------------- ACTION BUTTONS ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center shrink-0 pb-8"
        >
          <button
            onClick={handleDiscoverAgain}
            className="border-2 border-white text-white px-12 py-5 text-sm md:text-lg tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors duration-300 font-bold"
          >
            Start Over
          </button>
          
          <button
            onClick={handleCheckout}
            disabled={!selectedProduct}
            className="bg-white text-black px-16 py-5 text-sm md:text-lg tracking-[0.3em] uppercase hover:bg-gray-200 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed font-bold shadow-xl active:scale-95"
          >
            {selectedProduct === mainProduct.id ? "Dispense Now" : "Complete Purchase"}
          </button>
        </motion.div>

      </div>

      <AIVoiceIndicator />
    </div>
  );
}