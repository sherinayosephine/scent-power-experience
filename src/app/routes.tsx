import { createBrowserRouter } from "react-router";
import Welcome from "./pages/Welcome";
import JourneySteps from "./pages/JourneySteps";
import HeroPerfume from "./pages/HeroPerfume";
import Questionnaire from "./pages/Questionnaire";
import PrepareSpray from "./pages/PrepareSpray";
import ApplicationGuide from "./pages/ApplicationGuide";
import WaitingPhase from "./pages/WaitingPhase";
import NoteSelection from "./pages/NoteSelection";
import MusicExperience from "./pages/MusicExperience";
import Rating from "./pages/Rating";
import AIConversation from "./pages/AIConversation";
import OlfactiveProfile from "./pages/OlfactiveProfile";
import AIRecommendation from "./pages/AIRecommendation";
import ProductSelection from "./pages/ProductSelection";
import Checkout from "./pages/Checkout";
import { Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/journey-steps",
    element: <JourneySteps />,
  },
  {
    path: "/hero",
    element: <HeroPerfume />,
  },
  {
    path: "/questionnaire",
    element: <Questionnaire />,
  },
  {
    path: "/prepare-hero",
    element: <PrepareSpray />,
  },
  {
    path: "/apply-hero",
    element: <ApplicationGuide />,
  },
  {
    path: "/waiting",
    element: <WaitingPhase />,
  },
  {
    path: "/note-selection",
    element: <NoteSelection />,
  },
  {
    path: "/prepare-layering",
    element: <PrepareSpray />,
  },
  {
    path: "/apply-layering",
    element: <ApplicationGuide />,
  },
  {
    path: "/music",
    element: <MusicExperience />,
  },
  {
    path: "/rating",
    element: <Rating />,
  },
  {
    path: "/ai-conversation",
    element: <AIConversation />,
  },
  {
    path: "/profile",
    element: <OlfactiveProfile />,
  },
  {
    path: "/ai-recommendation",
    element: <AIRecommendation />,
  },
  {
    path: "/product-selection",
    element: <ProductSelection />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);