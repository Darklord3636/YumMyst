import { useNavigate } from "react-router";
import { ArrowLeft, Clock, MapPin, ShoppingBag, Gift } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function OrderPickup() {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState("18:00");

  const timeSlots = ["18:00", "18:30", "19:00", "19:30", "20:00"];

  const handlePayment = () => {
    navigate("/success");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-[#3D7A56] text-white p-6">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Order & Pickup
          </h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Selected Items */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-card rounded-3xl shadow-md p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Mystery Box
              </h2>
              <p className="text-sm text-muted-foreground">Nargiz Restaurant</p>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl text-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  ₼15
                </span>
                <span className="text-sm text-muted-foreground line-through">₼30</span>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 flex items-center gap-3">
            <Gift className="w-5 h-5 text-accent" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-accent">Bonus Points</p>
              <p className="text-xs text-muted-foreground">You'll earn 0.75 points (5%) from this order</p>
            </div>
          </div>
        </motion.div>

        {/* Pickup Time Selector */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-3xl shadow-md p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Select Pickup Time
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-4 rounded-2xl transition-all duration-300 ${
                  selectedTime === time
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                {time}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pickup Location */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-3xl shadow-md p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-primary" />
            <h2 className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Pickup Location
            </h2>
          </div>

          <div className="bg-secondary/50 rounded-2xl p-4">
            <p className="font-semibold mb-1">Nargiz Restaurant</p>
            <p className="text-sm text-muted-foreground">28 May St, Baku, Azerbaijan</p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-6 border-2 border-primary/20"
        >
          <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            📋 Pickup Instructions
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Pickup before closing time ({selectedTime})</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Bring your own bag (help us reduce waste!)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Show your order confirmation at the counter</span>
            </li>
          </ul>
        </motion.div>

        {/* Total */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-3xl shadow-md p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg text-muted-foreground">Total</span>
            <span className="text-4xl text-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              ₼15
            </span>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-primary text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Confirm & Pay
          </button>
        </motion.div>
      </div>
    </div>
  );
}
