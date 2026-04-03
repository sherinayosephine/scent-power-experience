import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

export default function GazeCursor() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  
  const requestRef = useRef<number>(0); 
  const isBlinkingRef = useRef<boolean>(false);
  const lastClickTimeRef = useRef<number>(0);
  
  const cursorPosRef = useRef({ 
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, 
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0 
  });

  const calculateEAR = (eyePoints: any[]) => {
    if (!eyePoints || eyePoints.length < 6) return 0;
    const verticalDist1 = Math.hypot(eyePoints[1].x - eyePoints[5].x, eyePoints[1].y - eyePoints[5].y);
    const verticalDist2 = Math.hypot(eyePoints[2].x - eyePoints[4].x, eyePoints[2].y - eyePoints[4].y);
    const horizontalDist = Math.hypot(eyePoints[0].x - eyePoints[3].x, eyePoints[0].y - eyePoints[3].y);
    return (verticalDist1 + verticalDist2) / (2.0 * horizontalDist);
  };

  useEffect(() => {
    let isActive = true;

    const setupCameraAndModel = async () => {
      try {
        await tf.setBackend("webgl");
        await tf.ready();

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 160, height: 120, facingMode: "user" } 
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await new Promise((resolve) => {
              videoRef.current!.onloadedmetadata = () => resolve(videoRef.current!.play());
            });
          }
        }

        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig: faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig = {
          runtime: "tfjs",
          refineLandmarks: false,
        };
        
        const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
        
        if (!isActive) return;
        setIsLoaded(true);

        let lastVideoTime = 0;

        const detectFace = async () => {
          if (!isActive) return;

          const now = Date.now();
          if (now - lastVideoTime < 50) {
            requestRef.current = requestAnimationFrame(detectFace);
            return;
          }

          if (videoRef.current && videoRef.current.readyState >= 2 && videoRef.current.videoWidth > 0) {
            try {
              lastVideoTime = now;
              const faces = await detector.estimateFaces(videoRef.current, { flipHorizontal: false });

              if (faces.length > 0) {
                const keypoints = faces[0].keypoints;
                const eyesCenter = keypoints[168]; 
                
                const videoWidth = videoRef.current.videoWidth || 160;
                const videoHeight = videoRef.current.videoHeight || 120;
                const winWidth = window.innerWidth || 1000;
                const winHeight = window.innerHeight || 800;

                if (eyesCenter && eyesCenter.x != null && eyesCenter.y != null) {
                  const SENSITIVITY_X = 1.8; 
                  const SENSITIVITY_Y = 1.5;

                  let rawX = winWidth - (eyesCenter.x / videoWidth) * winWidth;
                  let rawY = (eyesCenter.y / videoHeight) * winHeight;

                  const centerX = winWidth / 2;
                  const centerY = winHeight / 2;
                  
                  let targetX = centerX + (rawX - centerX) * SENSITIVITY_X;
                  let targetY = centerY + (rawY - centerY) * SENSITIVITY_Y;

                  targetX = Math.max(0, Math.min(winWidth, targetX));
                  targetY = Math.max(0, Math.min(winHeight, targetY));

                  cursorPosRef.current = { 
                    x: cursorPosRef.current.x + (targetX - cursorPosRef.current.x) * 0.3, 
                    y: cursorPosRef.current.y + (targetY - cursorPosRef.current.y) * 0.3 
                  };

                  if (cursorRef.current && !isNaN(cursorPosRef.current.x)) {
                    cursorRef.current.style.transform = `translate(${cursorPosRef.current.x - 16}px, ${cursorPosRef.current.y - 16}px)`;
                  }

                  // === LOGIKA KEDIP DUA MATA (FULL BLINK) ===
                  const leftEyeIndices = [33, 160, 158, 133, 153, 144];
                  const rightEyeIndices = [362, 385, 387, 263, 373, 380];
                  
                  const leftEAR = calculateEAR(leftEyeIndices.map(i => keypoints[i]));
                  const rightEAR = calculateEAR(rightEyeIndices.map(i => keypoints[i]));
                  
                  const BLINK_THRESHOLD = 0.20; 
                  const OPEN_THRESHOLD = 0.23;
                  
                  const isBothEyesClosed = leftEAR < BLINK_THRESHOLD && rightEAR < BLINK_THRESHOLD;
                  
                  if (isBothEyesClosed) {
                    if (!isBlinkingRef.current && (Date.now() - lastClickTimeRef.current > 1200)) { 
                      isBlinkingRef.current = true;
                      setIsBlinking(true); 

                      triggerClickAtCursor(cursorPosRef.current.x, cursorPosRef.current.y);
                      lastClickTimeRef.current = Date.now();
                    }
                  } else {
                    if (isBlinkingRef.current && leftEAR > OPEN_THRESHOLD && rightEAR > OPEN_THRESHOLD) {
                      isBlinkingRef.current = false;
                      setIsBlinking(false);
                    }
                  }
                }
              }
            } catch (error) {
              // Abaikan frame error
            }
          }
          
          requestRef.current = requestAnimationFrame(detectFace);
        };

        detectFace();
      } catch (err) {
        console.error("Vision Error:", err);
      }
    };

    setupCameraAndModel();

    return () => {
      isActive = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, []); 

  const triggerClickAtCursor = (x: number, y: number) => {
    if (cursorRef.current) cursorRef.current.style.display = "none";
    
    if (x >= 0 && y >= 0 && x <= window.innerWidth && y <= window.innerHeight) {
      const elementsAtPoint = document.elementsFromPoint(x, y);
      
      let targetToClick: HTMLElement | null = null;

      for (const el of elementsAtPoint) {
        const htmlEl = el as HTMLElement;
        const style = window.getComputedStyle(htmlEl);
        
        if (
          htmlEl.tagName === "BUTTON" || 
          htmlEl.tagName === "A" || 
          htmlEl.closest("button") || 
          htmlEl.closest("a") || 
          style.cursor === "pointer"
        ) {
          targetToClick = htmlEl.closest("button") || htmlEl.closest("a") || htmlEl;
          break; 
        }
      }

      if (targetToClick && targetToClick instanceof HTMLElement) {
        targetToClick.style.transition = "transform 0.15s ease";
        targetToClick.style.transform = "scale(0.9)";
        setTimeout(() => {
          if (targetToClick) targetToClick.style.transform = "";
        }, 150);

        const eventConfig = { view: window, bubbles: true, cancelable: true, clientX: x, clientY: y };
        targetToClick.dispatchEvent(new MouseEvent('mousedown', eventConfig));
        targetToClick.dispatchEvent(new MouseEvent('mouseup', eventConfig));
        targetToClick.dispatchEvent(new MouseEvent('click', eventConfig));
        
        if (typeof targetToClick.click === 'function') {
           targetToClick.click();
        }
      }
    }

    if (cursorRef.current) cursorRef.current.style.display = "flex";
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width={160}
        height={120}
        className="fixed bottom-4 right-4 w-24 h-16 object-cover opacity-10 pointer-events-none rounded-lg border border-white/20 z-[9999]"
      />

      {!isLoaded && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#C2813F] text-black text-xs font-bold px-4 py-2 uppercase tracking-widest z-[9999] rounded-full animate-pulse shadow-[0_0_15px_rgba(194,129,63,0.5)]">
          Initializing Vision Engine...
        </div>
      )}

      {isLoaded && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center transition-transform duration-100 ease-out"
          style={{ willChange: "transform" }} 
        >
          <div className={`w-3 h-3 rounded-full transition-all duration-150 ${isBlinking ? "bg-[#C2813F] scale-[3]" : "bg-white shadow-[0_0_10px_white]"}`} />
          <div className={`absolute w-full h-full rounded-full border border-[#C2813F] transition-all duration-150 ${isBlinking ? "scale-[4] opacity-100 ring-2 ring-[#C2813F]" : "scale-100 opacity-30"}`} />
        </div>
      )}
    </>
  );
}