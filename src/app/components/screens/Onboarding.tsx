import { useNavigate } from "react-router";
import { motion } from "motion/react";
import logo from "../../../imports/image.png";

export function Onboarding() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-gradient-to-b from-[#FAFAF7] via-[#F0F5F2] to-[#E8F1ED] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl scale-110" />
          <img src={logo} alt="YumMyst" className="w-56 h-56 relative z-10 drop-shadow-2xl" />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="text-6xl mb-6 text-foreground leading-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
            Taste the Prize,<br />
            <span className="bg-gradient-to-r from-primary to-[#3D7A56] bg-clip-text text-transparent">
              At Half the Price.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed px-6">
            Discover discounted meals from nearby restaurants and help reduce food waste.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full space-y-4"
        >
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-gradient-to-r from-primary via-[#3D7A56] to-primary text-white py-5 rounded-3xl shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.03] relative overflow-hidden group"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            <span className="relative z-10 text-lg">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </button>
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-card border-2 border-primary/30 text-foreground py-5 rounded-3xl hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            <span className="text-lg">Login</span>
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-8 relative z-10"
      >
        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-3xl shadow-xl border border-primary/10">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="text-3xl"
          >
            🌱
          </motion.span>
          <div className="text-left">
            <p className="text-sm font-bold text-foreground">10,000+ Members</p>
            <p className="text-xs text-muted-foreground">Reducing food waste together</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}