import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { AIVoiceIndicator } from "../components/AIVoiceIndicator";

// TODO: Replace these placeholder images with your actual product images
const discoveryKitImg = "https://images.unsplash.com/photo-1587304946998-46c19a031b44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmFncmFuY2UlMjBkaXNjb3ZlcnklMjBraXQlMjBsdXh0cnl8ZW58MXx8fHwxNzczOTI4NDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const vectorEdtImg = "https://images.unsplash.com/photo-1758871993077-e084cc7eca86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh0cnklMjBwZXJmdW1lJTIwYm90dGxlJTIwYmxhY2slMjBnb2xkfGVufDF8fHx8MTc3MzkyODQ0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const products = [
  {
    id: "discovery-kit",
    name: "DISCOVERY KIT",
    description: "Les Pouvoirs de Sillage Collection - 6 Layering Fragrances",
    image: discoveryKitImg,
  },
  {
    id: "ysl-vector",
    name: "YSL VECTOR EDT",
    description: "Full size 100ml - Your power layering signature",
    image: vectorEdtImg,
  },
];

export default function ProductSelection() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleCheckout = () => {
    if (selectedProduct) {
      sessionStorage.setItem("selectedProduct", selectedProduct);
      // In-store experience - just show completion message
      alert("Thank you! Please proceed to the cashier to complete your purchase.");
      sessionStorage.clear();
      navigate("/");
    }
  };

  const handleDiscoverAgain = () => {
    sessionStorage.clear();
    navigate("/");
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
        onClick={() => navigate("/ai-recommendation")}
        className="text-white text-sm tracking-widest hover:text-gray-400 transition-colors"
      >
        &lt;Back
      </button>

      <div className="max-w-7xl mx-auto mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-7xl mb-6 tracking-wider uppercase">
            Continue Your Power
          </h1>
          <p className="text-gray-400 text-2xl tracking-wide">
            Take your power with you.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {products.map((product, index) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedProduct(product.id)}
              className={`relative group overflow-hidden transition-all duration-300 ${
                selectedProduct === product.id
                  ? "ring-4 ring-white"
                  : "hover:scale-105"
              }`}
            >
              {/* Product Image */}
              <div className="aspect-[3/4] overflow-hidden bg-zinc-900">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 text-center bg-black border border-white">
                <h3 className="text-xl tracking-wider mb-3 uppercase">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 tracking-wide">
                  {product.description}
                </p>
              </div>

              {/* Selected Indicator */}
              {selectedProduct === product.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={handleDiscoverAgain}
            className="border-2 border-white text-white px-16 py-5 text-lg tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300"
          >
            Discover Again
          </button>
          
          <button
            onClick={handleCheckout}
            disabled={!selectedProduct}
            className="bg-white text-black px-16 py-5 text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            Proceed to Checkout
          </button>
        </motion.div>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-500 text-sm tracking-wider mt-8"
        >
          This is an in-store experience. Please take your selection to the cashier.
        </motion.p>
      </div>

      <AIVoiceIndicator />
    </div>
  );
}