import { createBrowserRouter, Navigate } from "react-router";

// --- IMPORT SEMUA PAGES ---
import Welcome from "./pages/Welcome";
import JourneySteps from "./pages/JourneySteps";
import HeroPerfume from "./pages/HeroPerfume";
import Questionnaire from "./pages/Questionnaire";
import PrepareHeroPaper from "./pages/PrepareHeroPaper";
import NoteSelection from "./pages/NoteSelection";
import CombinedExperience from "./pages/CombinedExperience";
import MusicExperience from "./pages/MusicExperience";
import Rating from "./pages/Rating";
import AIConversation from "./pages/AIConversation";
import AIRecommendation from "./pages/AIRecommendation";
import LayeringEducation from "./pages/LayeringEducation";
import ApplicationGuide from "./pages/ApplicationGuide";
import ProductSelection from "./pages/ProductSelection";
import Checkout from "./pages/Checkout";
import OlfactiveProfile from "./pages/OlfactiveProfile";
import AICheckoutConversation from "./pages/AICheckoutConversation";
import RatingBody from "./pages/RatingBody";

export const router = createBrowserRouter([
  // AWAL JOURNEY
  { path: "/", element: <Welcome /> },
  { path: "/journey-steps", element: <JourneySteps /> },
  { path: "/hero", element: <HeroPerfume /> },
  { path: "/questionnaire", element: <Questionnaire /> },
  
  // FASE 1: TRIAL DI KERTAS
  { path: "/prepare-hero-paper", element: <PrepareHeroPaper /> }, 
  { path: "/note-selection", element: <NoteSelection /> }, 
  { path: "/experience-layering", element: <CombinedExperience /> }, // Nyium 2 kertas aja (Tanpa Musik)
  { path: "/music-experience", element: <MusicExperience /> }, // Dengerin Musik di sini
  { path: "/rating", element: <Rating /> }, 
  { path: "/ai-conversation", element: <AIConversation /> },
  
  // FASE 2: REKOMENDASI FINAL & EDUKASI BADAN
  { path: "/ai-recommendation", element: <AIRecommendation /> }, // Liat hasil final sblm edukasi
  { path: "/layering-education", element: <LayeringEducation /> }, // Edukasi Stack/Split
  { path: "/apply-body", element: <ApplicationGuide /> }, // Semprot ke badan
  
  // FASE 3: PEMBELIAN (CHECKOUT)
  { path: "/rating-body", element: <RatingBody /> },
  { path: "/checkout-conversation", element: <AICheckoutConversation /> },
  { path: "/product-selection", element: <ProductSelection /> },
  { path: "/checkout", element: <Checkout /> },
  
  // LAIN-LAIN
  { path: "/profile", element: <OlfactiveProfile /> },
  { path: "*", element: <Navigate to="/" replace /> }, // Fallback jika URL tidak ditemukan
]);