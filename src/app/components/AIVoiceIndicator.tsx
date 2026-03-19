import { motion } from "motion/react";
import { Mic } from "lucide-react";

export function AIVoiceIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Mic className="w-4 h-4 text-white" />
        </motion.div>
        <p className="text-white/80 text-sm tracking-wide">
          AI Voice Assistant is Active • Speak naturally to navigate or ask me anything
        </p>
      </div>
    </motion.div>
  );
}
