import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { LAYERING_NOTES } from "../data/fragrances";
import { Sparkles, ArrowRight } from "lucide-react";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function OlfactiveProfile() {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<any[]>([]);
  
  // STATE BARU: Untuk menyimpan note mana yang diklik/dipilih user
  const [selectedFinalNote, setSelectedFinalNote] = useState<string | null>(null);

  useEffect(() => {
    // 1. SAFELY PULL ALL POSSIBLE RATING DATA FROM SESSION
    let ratingsDict: Record<string, any> = {};
    try {
      ratingsDict = JSON.parse(sessionStorage.getItem("noteRatings") || "{}");
    } catch (e) {
      console.error("Could not parse noteRatings");
    }

    // Fallback: If the rating page only saved the single most recent rating
    const currentNote = JSON.parse(sessionStorage.getItem("currentNote") || "{}");
    const singleRating = sessionStorage.getItem("currentRating");
    
    if (currentNote.id && singleRating) {
      ratingsDict[currentNote.id] = singleRating;
    }

    // 2. BULLETPROOF SCORE CONVERTER
    const getScore = (rawRating: any): number => {
      if (!rawRating) return 0;
      if (typeof rawRating === 'number') return rawRating;
      if (!isNaN(Number(rawRating))) return Number(rawRating);

      const text = String(rawRating).toLowerCase().trim();
      if (text.includes("love") || text === "5") return 5;
      if (text.includes("like") || text === "4") return 4;
      if (text.includes("neutral") || text === "3") return 3;
      if (text.includes("dislike") || text === "2") return 2;
      if (text.includes("hate") || text === "1") return 1;
      
      return 0;
    };

    // 3. BUILD THE CHART DATA
    const formattedData = LAYERING_NOTES.map((note, index) => ({
      name: note.name.split(" ")[0],
      fullName: note.name,
      score: getScore(ratingsDict[note.id]), 
      color: note.color,
      id: note.id,
      uniqueKey: `${note.id}-${index}`,
    }));

    setChartData(formattedData);
  }, []);

  // Calculate favorites based on the robust data
  const ratedData = chartData.filter(d => d.score > 0);
  const maxScore = ratedData.length > 0 ? Math.max(...ratedData.map(d => d.score)) : 0;
  const favoriteNotes = chartData.filter(d => d.score === maxScore && d.score > 0);

  // Auto-select the first one by default if not yet selected
  useEffect(() => {
    if (favoriteNotes.length > 0 && !selectedFinalNote) {
      setSelectedFinalNote(favoriteNotes[0].fullName);
    }
  }, [favoriteNotes, selectedFinalNote]);

  // Custom Dot for the Chart
  const CustomDot = (props: any) => {
    const { cx, cy, payload, index } = props;
    const isHighest = payload.score === maxScore && payload.score > 0;
    const isRated = payload.score > 0;

    if (!isRated) return null; 

    return (
      <g key={`dot-${payload.id}-${index}`}>
        <circle
          cx={cx}
          cy={cy}
          r={isHighest ? 8 : 5}
          fill={isHighest ? "white" : "#666"}
          stroke="white"
          strokeWidth={2}
        />
        {isHighest && (
          <circle
            cx={cx}
            cy={cy}
            r={14}
            fill="none"
            stroke="white"
            strokeWidth={2}
            opacity={0.5}
            className="animate-ping"
          />
        )}
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-12 relative overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-12 right-12 w-16 z-30 hidden md:block"
      >
        <img
          src="/asset/ysl logo.png"
          alt="YSL"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      <button
        onClick={() => navigate(-1)} // Balik ke halaman sebelumnya (AI Conversation)
        className="absolute top-12 left-6 md:left-12 text-white text-xs md:text-sm tracking-widest hover:text-gray-400 transition-colors z-30 uppercase"
      >
        &lt; Back
      </button>

      <div className="max-w-6xl mx-auto mt-16 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl mb-4 tracking-wider uppercase font-bold">
            Your Fragrance Journey
          </h1>
          <p className="text-gray-400 text-sm md:text-xl tracking-widest uppercase">
            Discover your unique olfactive preferences
          </p>
        </motion.div>

        {/* Chart Section */}
        {chartData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-white/20 bg-white/5 backdrop-blur-sm p-4 md:p-12 mb-16 shadow-2xl"
          >
            <h2 className="text-xl md:text-3xl mb-8 tracking-widest text-center uppercase font-bold">
              Your Preference Profile
            </h2>
            
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#888"
                  tick={{ fill: '#aaa' }}
                  style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}
                  tickMargin={15}
                />
                <YAxis
                  stroke="#888"
                  tick={{ fill: '#aaa' }}
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  style={{ fontSize: '10px' }}
                  tickFormatter={(val) => {
                    if (val === 5) return "LOVE";
                    if (val === 3) return "NEUTRAL";
                    if (val === 1) return "HATE";
                    return "";
                  }}
                />
                <Tooltip
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    border: '1px solid #fff',
                    borderRadius: '0',
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  formatter={(value: number) => {
                    if (value === 5) return ["Love", "Rating"];
                    if (value === 4) return ["Like", "Rating"];
                    if (value === 3) return ["Neutral", "Rating"];
                    if (value === 2) return ["Dislike", "Rating"];
                    if (value === 1) return ["Hate", "Rating"];
                    return ["Unrated", "Rating"];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#fff"
                  strokeWidth={3}
                  dot={<CustomDot />}
                  activeDot={{ r: 8, fill: "white" }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Favorite Notes - CLICKABLE SELECTION */}
        {favoriteNotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-4xl mb-3 tracking-widest text-center uppercase font-bold">
              {favoriteNotes.length > 1 ? "Choose Your Signature Note" : "Your Signature Note"}
            </h2>
            
            {favoriteNotes.length > 1 && (
              <p className="text-center text-[#C2813F] text-sm mb-8 tracking-widest uppercase font-medium">
                You have multiple top-rated notes. Select your ultimate favorite.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center mt-8">
              {favoriteNotes.map((note, index) => {
                const fullNote = LAYERING_NOTES.find(n => n.name === note.fullName);
                const isSelected = selectedFinalNote === note.fullName; // Cek apakah sedang dipilih
                
                return (
                  <motion.div
                    key={note.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: isSelected ? 1.05 : 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => setSelectedFinalNote(note.fullName)} // Set note saat di-klik
                    className={`border p-6 text-center shadow-lg cursor-pointer transition-all duration-300 ${
                      isSelected ? "border-[#C2813F] bg-[#C2813F]/10 ring-1 ring-[#C2813F]" : "border-white/20 bg-white/5 hover:border-white/50"
                    }`}
                  >
                    {isSelected && (
                      <div className="flex justify-center mb-3">
                        <Sparkles size={20} className="text-[#C2813F] animate-pulse" />
                      </div>
                    )}
                    <div className="w-full aspect-[3/4] mb-4 overflow-hidden border border-white/10">
                      <img
                        src={fullNote?.imageUrl}
                        alt={note.fullName}
                        className={`w-full h-full object-cover transition-all ${isSelected ? "opacity-100" : "opacity-70 grayscale"}`}
                      />
                    </div>
                    <h3 className={`text-xl md:text-2xl tracking-widest mb-2 font-bold uppercase ${isSelected ? "text-[#C2813F]" : "text-white"}`}>
                      {note.fullName}
                    </h3>
                    <div className="flex justify-center gap-2 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xl ${i < note.score ? (isSelected ? "text-[#C2813F] drop-shadow-[0_0_8px_rgba(194,129,63,0.8)]" : "text-white") : "text-gray-800"}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4 justify-center pb-12"
        >
          <button
            onClick={() => {
              navigate("/note-selection");
            }}
            className="border-2 border-white px-10 py-5 text-xs md:text-sm tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-colors duration-300 font-bold"
          >
            Explore More
          </button>
          
          <button
            onClick={() => {
              // Simpan final choice ke session storage sebelum pindah
              if (selectedFinalNote) {
                const topNote = LAYERING_NOTES.find(n => n.name === selectedFinalNote);
                if (topNote) {
                  sessionStorage.setItem("currentNote", JSON.stringify(topNote));
                }
              }
              navigate("/layering-education");
            }}
            className="bg-white text-black px-10 py-5 text-xs md:text-sm tracking-[0.3em] uppercase hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center gap-3 font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            LEARN HOW TO WEAR IT <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      <AIVoiceIndicator />
    </div>
  );
}