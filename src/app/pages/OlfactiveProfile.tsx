import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Dot } from "recharts";
import { LAYERING_NOTES } from "../data/fragrances";
import { ShoppingBag } from "lucide-react";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

export default function OlfactiveProfile() {
  const navigate = useNavigate();

  // Get ratings from session storage
  const ratings = JSON.parse(sessionStorage.getItem("noteRatings") || "{}");

  // Convert ratings to numeric scores
  const ratingToScore: { [key: string]: number } = {
    love: 5,
    like: 4,
    neutral: 3,
    dislike: 2,
    hate: 1,
  };

  // Prepare chart data - include ALL notes, even those not rated (with 0 score)
  const chartData = LAYERING_NOTES.map((note, index) => ({
    name: note.name.split(" ")[0],
    fullName: note.name,
    score: ratingToScore[ratings[note.id]] || 0,
    color: note.color,
    id: note.id,
    uniqueKey: `${note.id}-${index}`, // Ensure uniqueness for recharts
  }));

  // Find the highest rated note(s) (excluding 0 scores)
  const ratedData = chartData.filter(d => d.score > 0);
  const maxScore = ratedData.length > 0 ? Math.max(...ratedData.map(d => d.score)) : 0;
  const favoriteNotes = chartData.filter(d => d.score === maxScore && d.score > 0);

  const CustomDot = (props: any) => {
    const { cx, cy, payload, index } = props;
    const isHighest = payload.score === maxScore && payload.score > 0;

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
          />
        )}
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-12">
      {/* YSL Logo - Consistent with other pages */}
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
        onClick={() => navigate("/ai-conversation")}
        className="text-white text-sm tracking-widest hover:text-gray-400 transition-colors"
      >
        &lt;Back
      </button>

      <div className="max-w-6xl mx-auto mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl mb-6 tracking-wider uppercase">
            Your Fragrance Journey
          </h1>
          <p className="text-gray-400 text-xl tracking-wide">
            Discover your unique olfactive preferences
          </p>
        </motion.div>

        {/* Chart */}
        {chartData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border border-white p-12 mb-16"
          >
            <h2 className="text-3xl mb-8 tracking-wider text-center uppercase">
              Your Preference Journey
            </h2>
            
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="name"
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                  style={{ fontSize: '14px' }}
                />
                <YAxis
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  style={{ fontSize: '14px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#000',
                    border: '1px solid #fff',
                    borderRadius: '0',
                    color: '#fff'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#fff"
                  strokeWidth={3}
                  dot={<CustomDot />}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="flex justify-between mt-6 text-sm text-gray-400 tracking-wider uppercase">
              <span>Dislike</span>
              <span>Love</span>
            </div>
          </motion.div>
        )}

        {/* Favorite Notes */}
        {favoriteNotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl mb-8 tracking-wider text-center uppercase">
              Your Signature Notes
            </h2>

            <div className="grid grid-cols-3 gap-6">
              {favoriteNotes.map((note, index) => {
                const fullNote = LAYERING_NOTES.find(n => n.name === note.fullName);
                return (
                  <motion.div
                    key={note.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="border-2 border-white p-6 text-center"
                  >
                    <div className="w-full aspect-square mb-4 overflow-hidden">
                      <img
                        src={fullNote?.imageUrl}
                        alt={note.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl tracking-wider mb-2">
                      {note.fullName}
                    </h3>
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < note.score ? "text-white" : "text-gray-700"}>
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
          className="flex gap-6 justify-center"
        >
          <button
            onClick={() => {
              // Reset and start over
              sessionStorage.setItem("trialCount", "0");
              navigate("/note-selection");
            }}
            className="border-2 border-white px-12 py-5 text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300"
          >
            Explore More
          </button>
          <button
            onClick={() => navigate("/ai-recommendation")}
            className="bg-white text-black px-12 py-5 text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 flex items-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            Get Your Collection
          </button>
        </motion.div>
      </div>

      <AIVoiceIndicator />
    </div>
  );
}