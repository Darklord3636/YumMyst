import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Gift, MapPin, Clock, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function Success() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAF7] via-[#F0F5F2] to-[#E8F1ED] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 1, rotate: 0 }}
              animate={{
                y: window.innerHeight + 100,
                rotate: 360,
                opacity: 0
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: "linear"
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#4C9A6D', '#F5A847', '#8BC9A8', '#D4A373'][Math.floor(Math.random() * 4)]
              }}
            />
          ))}
        </>
      )}

      <div className="max-w-md w-full">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
          className="relative w-40 h-40 mx-auto mb-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#3D7A56] to-primary rounded-full blur-2xl opacity-50" />
          <div className="relative w-40 h-40 bg-gradient-to-br from-primary to-[#3D7A56] rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 border-8 border-white">
            <CheckCircle className="w-24 h-24 text-white" strokeWidth={2.5} />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-accent to-[#FFB84D] rounded-full flex items-center justify-center shadow-xl border-4 border-white"
          >
            <span className="text-3xl">✨</span>
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-6xl mb-5 leading-tight" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
            Order<br />
            <span className="bg-gradient-to-r from-primary to-[#3D7A56] bg-clip-text text-transparent">
              Confirmed!
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.span
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
              className="text-5xl"
            >
              🎉
            </motion.span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2, delay: 0.2 }}
              className="text-5xl"
            >
              ✨
            </motion.span>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed px-4">
            Your mystery box is reserved and ready for pickup
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-card rounded-[2rem] shadow-2xl p-8 mb-6 border-2 border-border/50"
        >
          <div className="flex items-center gap-5 mb-8 pb-6 border-b-2 border-border/50">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-[#3D7A56] rounded-3xl flex items-center justify-center shadow-xl">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1.5 uppercase tracking-wide">Restaurant</p>
              <h3 className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                Nargiz Restaurant
              </h3>
            </div>
          </div>

          <div className="space-y-5 mb-8">
            <div className="flex items-start gap-4 bg-secondary/50 p-4 rounded-2xl">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pickup Time</p>
                <p className="font-bold text-lg">Today at 18:00</p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-secondary/50 p-4 rounded-2xl">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-bold text-lg">28 May St, Baku, Azerbaijan</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border-2 border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-lg text-muted-foreground">Total Paid</span>
              <span className="text-5xl text-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                ₼15
              </span>
            </div>
          </div>
        </motion.div>

        {/* Sustainability Message */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-[2rem] p-8 border-2 border-primary/20 mb-6 relative overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />

          <div className="relative z-10 flex items-start gap-5">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="w-20 h-20 bg-gradient-to-br from-primary to-[#3D7A56] rounded-3xl flex items-center justify-center flex-shrink-0 shadow-xl"
            >
              <span className="text-4xl">🌱</span>
            </motion.div>
            <div>
              <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                You just saved food from being wasted!
              </h3>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                Thank you for helping reduce food waste and supporting local restaurants.
              </p>
              <div className="bg-gradient-to-r from-accent to-[#FFB84D] text-white px-5 py-3 rounded-2xl inline-flex items-center gap-3 shadow-lg">
                <Gift className="w-5 h-5" />
                <span className="font-bold">+0.75 bonus points earned</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reminder */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-card rounded-2xl p-6 mb-6 border-2 border-border/50 shadow-lg"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-lg">📋</span>
            </div>
            <h4 className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Pickup Reminders
            </h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-secondary/50 p-3 rounded-xl">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-sm font-medium text-foreground">Arrive before 18:00 for pickup</span>
            </li>
            <li className="flex items-start gap-3 bg-secondary/50 p-3 rounded-xl">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-sm font-medium text-foreground">Bring your own bag</span>
            </li>
            <li className="flex items-start gap-3 bg-secondary/50 p-3 rounded-xl">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-sm font-medium text-foreground">Show this confirmation at the counter</span>
            </li>
          </ul>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-4"
        >
          <button
            onClick={() => navigate("/home")}
            className="w-full bg-gradient-to-r from-primary via-[#3D7A56] to-primary text-white py-5 rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.03] group relative overflow-hidden"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            <span className="relative z-10 text-lg">Back to Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-card border-2 border-primary/30 text-foreground py-5 rounded-2xl hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] shadow-lg"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            <span className="text-lg">View Order History</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
