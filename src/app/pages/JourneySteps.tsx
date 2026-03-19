import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate, useSearchParams } from "react-router";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

const steps = [
  {
    number: "01",
    title: "YOUR\nSCENT",
    image: "/asset/1.jpg",
    nextRoute: "/hero",
  },
  {
    number: "02",
    title: "YOUR\nPOWER",
    image: "/asset/2.jpg",
    nextRoute: "/prepare-hero",
  },
  {
    number: "03",
    title: "NEW\nLAYERING\nSCENT",
    image: "/asset/3.jpg",
    nextRoute: "/profile",
  },
];

export default function JourneySteps() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stepParam = searchParams.get("step");
  const targetStep = stepParam ? parseInt(stepParam) - 1 : 0; // Convert to 0-indexed
  
  const [currentStep, setCurrentStep] = useState<number | null>(null); // null means all highlighted

  useEffect(() => {
    // First show all highlighted for 2 seconds
    const initialTimer = setTimeout(() => {
      setCurrentStep(targetStep); // Highlight the target step
    }, 2000);

    return () => clearTimeout(initialTimer);
  }, [targetStep]);

  useEffect(() => {
    if (currentStep === null) return;

    // After highlighting the step, navigate to next route
    const timer = setTimeout(() => {
      navigate(steps[currentStep].nextRoute);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentStep, navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
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

      {/* Step indicator */}
      {currentStep !== null && (
        <div className="absolute bottom-8 left-8 text-2xl tracking-wider z-20">
          {currentStep + 1}/{steps.length}
        </div>
      )}

      {/* Three panels side by side */}
      <div className="flex w-full h-screen">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative flex-1 h-full"
            animate={{
              opacity: currentStep === null || currentStep === index ? 1 : 0.3,
              filter: currentStep === null || currentStep === index ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.5)",
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  scale: currentStep === null || currentStep === index ? 1 : 0.95,
                }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="text-8xl font-bold tracking-wider mb-6 opacity-90">
                  {step.number}
                </div>
                <h2 className="text-5xl font-bold tracking-wider leading-tight whitespace-pre-line uppercase">
                  {step.title}
                </h2>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <AIVoiceIndicator />
    </div>
  );
}