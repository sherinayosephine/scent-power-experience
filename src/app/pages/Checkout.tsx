import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { LAYERING_NOTES } from "../data/fragrances";
import { Check, Mail, Phone, User } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();

  // Get ratings from session storage
  const ratings = JSON.parse(sessionStorage.getItem("noteRatings") || "{}");

  const ratingToScore: { [key: string]: number } = {
    love: 5,
    like: 4,
    neutral: 3,
    dislike: 2,
    hate: 1,
  };

  // Get top rated notes (4 or 5 stars)
  const recommendedNotes = LAYERING_NOTES.filter((note) => {
    const score = ratingToScore[ratings[note.id]] || 0;
    return score >= 4;
  });

  const handleComplete = () => {
    alert("Thank you for experiencing our fragrance journey!");
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
        onClick={() => navigate("/profile")}
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
            Your Personalized Collection
          </h1>
          <p className="text-gray-400 text-xl tracking-wide">
            Curated based on your unique preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Recommended Products */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl mb-8 tracking-wider uppercase">Recommended for You</h2>

            <div className="space-y-6">
              {recommendedNotes.length > 0 ? (
                recommendedNotes.map((note, index) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex gap-6 border border-white p-6 hover:bg-white/5 transition-colors"
                  >
                    <div className="w-32 h-32 flex-shrink-0 overflow-hidden">
                      <img
                        src={note.imageUrl}
                        alt={note.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl mb-2 tracking-wider">
                        {note.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {note.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-lg">$85.00</span>
                        <span className="text-xs text-gray-500 tracking-wider uppercase flex items-center gap-2">
                          <Check className="w-4 h-4 text-white" />
                          Highly Rated
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p>Complete the fragrance journey to see recommendations</p>
                </div>
              )}
            </div>

            {recommendedNotes.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 p-6 border border-white"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 tracking-wider uppercase text-sm">Subtotal</span>
                  <span className="text-xl">${(recommendedNotes.length * 85).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 tracking-wider uppercase text-sm">Layering Set Discount</span>
                  <span className="text-white text-xl">-$15.00</span>
                </div>
                <div className="border-t border-white pt-4 flex justify-between items-center">
                  <span className="text-lg tracking-wider uppercase">Total</span>
                  <span className="text-3xl">
                    ${(recommendedNotes.length * 85 - 15).toFixed(2)}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl mb-8 tracking-wider uppercase">Complete Your Order</h2>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleComplete(); }}>
              <div>
                <label className="block text-sm text-gray-400 tracking-wider uppercase mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent border border-white px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/5 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 tracking-wider uppercase mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    required
                    className="w-full bg-transparent border border-white px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/5 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 tracking-wider uppercase mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    required
                    className="w-full bg-transparent border border-white px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:bg-white/5 transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-white text-black py-5 text-lg tracking-widest uppercase hover:bg-gray-200 transition-colors duration-300"
                  disabled={recommendedNotes.length === 0}
                >
                  {recommendedNotes.length > 0 ? "Complete Order" : "Complete Journey First"}
                </button>
              </div>

              <div className="text-center text-xs text-gray-500 tracking-wider">
                <p>By completing this order, you agree to our Terms & Conditions</p>
                <p className="mt-2">Secure checkout powered by YSL Beauty</p>
              </div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 p-6 border border-white"
            >
              <h3 className="text-lg mb-3 tracking-wider uppercase">
                Exclusive Benefits
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                  <span>Free shipping on orders over $150</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                  <span>Complimentary gift wrapping</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                  <span>30-day satisfaction guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                  <span>Access to exclusive layering tutorials</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}