import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

export default function WaitingPhase() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 10000; // 10 seconds animation
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate("/note-selection"), 500);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-12">
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
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 text-white text-sm tracking-widest hover:text-gray-400 transition-colors"
      >
        &lt;Back
      </button>

      <div className="max-w-5xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl mb-6 tracking-wider uppercase text-center"
        >
          Wait 30-60 Seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl mb-16 text-gray-400 tracking-wide text-center"
        >
          Allow the alcohol to evaporate for the best layering experience
        </motion.p>

        {/* Wave Animation Container */}
        <div className="relative w-full h-96 mb-8">
          {/* Time markers */}
          <div className="absolute top-0 left-0 right-0 flex justify-between text-white text-lg mb-4 px-8">
            <span>20 sec</span>
            <span>40 sec</span>
            <span>60 sec</span>
          </div>

          {/* Skin surface line with fragrance notes */}
          <div className="absolute bottom-24 left-0 right-0">
            {/* Skin label */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 text-center">
              <div className="h-px w-24 bg-white mb-2 mx-auto" />
              <span className="text-lg text-gray-400 tracking-wider">Skin Surface</span>
            </div>

            {/* Fragrance note circles */}
            <div className="flex justify-around items-center px-12 relative z-10">
              {[
                "https://images.unsplash.com/photo-1615634260167-c8cdede054de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZHJvcCUyMGFtYmVyfGVufDF8fHx8MTc3MzkxNzE5OHww&ixlib=rb-4.1.0&q=80&w=200",
                "https://images.unsplash.com/photo-1644409496856-a92543edbc64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZpZWxkJTIwcHVycGxlJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NzM4Nzk5OTh8MA&ixlib=rb-4.1.0&q=80&w=200",
                "https://images.unsplash.com/photo-1585557934446-ae31c9bcc8df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGphc21pbmUlMjBmbG93ZXJzJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzM5MTcyMDR8MA&ixlib=rb-4.1.0&q=80&w=200",
                "https://images.unsplash.com/photo-1674046710872-cc6a2ff94c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBwZXRhbHMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzM5MTcxOTh8MA&ixlib=rb-4.1.0&q=80&w=200",
                "https://images.unsplash.com/photo-1771099077435-6dbcac9fd65e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NlJTIwcGV0YWxzJTIwbHV4dXJ5JTIwcGlua3xlbnwxfHx8fDE3NzM5MTcyMDV8MA&ixlib=rb-4.1.0&q=80&w=200",
                "https://images.unsplash.com/photo-1644409496856-a92543edbc64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXZlbmRlciUyMGZpZWxkJTIwcHVycGxlJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NzM4Nzk5OTh8MA&ixlib=rb-4.1.0&q=80&w=200",
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-lg"
                >
                  <img src={img} alt="Fragrance note" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>

            {/* Skin surface baseline */}
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent mt-4" />
          </div>

          {/* Wave SVG - animated to fill left to right and rise up */}
          <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden">
            <svg
              viewBox="0 0 1200 300"
              className="absolute bottom-0 left-0 right-0 w-full h-full"
            >
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e40af" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
                <clipPath id="progressClip">
                  <rect
                    x="0"
                    y="0"
                    width={`${(progress / 100) * 1200}`}
                    height="300"
                  />
                </clipPath>
              </defs>
              
              {/* Animated wave path - rising from bottom to top as it moves left to right */}
              <motion.path
                d={`M0,${300 - (progress * 2)} Q100,${270 - (progress * 2)} 200,${300 - (progress * 2)} T400,${300 - (progress * 2)} T600,${300 - (progress * 2)} T800,${300 - (progress * 2)} T1000,${300 - (progress * 2)} T1200,${300 - (progress * 2)} L1200,300 L0,300 Z`}
                fill="url(#waveGradient)"
                clipPath="url(#progressClip)"
                animate={{
                  d: [
                    `M0,${300 - (progress * 2)} Q100,${270 - (progress * 2)} 200,${300 - (progress * 2)} T400,${300 - (progress * 2)} T600,${300 - (progress * 2)} T800,${300 - (progress * 2)} T1000,${300 - (progress * 2)} T1200,${300 - (progress * 2)} L1200,300 L0,300 Z`,
                    `M0,${300 - (progress * 2)} Q100,${280 - (progress * 2)} 200,${300 - (progress * 2)} T400,${300 - (progress * 2)} T600,${300 - (progress * 2)} T800,${300 - (progress * 2)} T1000,${300 - (progress * 2)} T1200,${300 - (progress * 2)} L1200,300 L0,300 Z`,
                    `M0,${300 - (progress * 2)} Q100,${270 - (progress * 2)} 200,${300 - (progress * 2)} T400,${300 - (progress * 2)} T600,${300 - (progress * 2)} T800,${300 - (progress * 2)} T1000,${300 - (progress * 2)} T1200,${300 - (progress * 2)} L1200,300 L0,300 Z`,
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Alcohol label with arrow */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: progress > 20 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <text
                  x={Math.min((progress / 100) * 1200 - 100, 1100)}
                  y={Math.max(200 - (progress * 1.5), 50)}
                  textAnchor="middle"
                  fill="white"
                  fontSize="24"
                  fontWeight="300"
                  letterSpacing="2"
                >
                  Alcohol →
                </text>
              </motion.g>
            </svg>
          </div>
        </div>

        {/* Progress percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-3xl text-white tracking-wider mb-2">
            {Math.round(progress)}%
          </p>
          <p className="text-sm text-gray-500 tracking-wider">
            {progress < 100 ? "Evaporating..." : "Ready for layering!"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}