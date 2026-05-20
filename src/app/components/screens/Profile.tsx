import { useNavigate } from "react-router";
import { ArrowLeft, User, Mail, MapPin, Gift, History, Heart, Settings, HelpCircle, LogOut, Star } from "lucide-react";
import { motion } from "motion/react";

const orderHistory = [
  { id: 1, restaurant: "Nargiz Restaurant", date: "Apr 12, 2026", amount: 15, points: 0.75, type: "Mystery Box" },
  { id: 2, restaurant: "Dolma House", date: "Apr 10, 2026", amount: 22, points: 1.1, type: "Pick Items" },
  { id: 3, restaurant: "Firuze Cafe", date: "Apr 8, 2026", amount: 18, points: 0.9, type: "Mystery Box" },
];

export function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-[#3D7A56] text-white p-6 rounded-b-[3rem] shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Profile
          </h1>
        </div>

        {/* Profile Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl border-4 border-white/30">
            👤
          </div>
          <div>
            <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Huseyn Damirli
            </h2>
            <p className="text-white/90 text-sm">huseyndamirli7@gmail.com</p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-accent" />
              <span className="text-sm text-white/80">Bonus Points</span>
            </div>
            <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              245
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <History className="w-5 h-5 text-accent" />
              <span className="text-sm text-white/80">Total Orders</span>
            </div>
            <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              {orderHistory.length}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Account Details */}
      <div className="px-6 mt-6">
        <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Account Details
        </h3>

        <div className="bg-card rounded-3xl shadow-md overflow-hidden">
          <div className="p-4 flex items-center gap-4 border-b border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-0.5">Name</p>
              <p className="font-semibold">Huseyn Damirli</p>
            </div>
          </div>

          <div className="p-4 flex items-center gap-4 border-b border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-0.5">Email</p>
              <p className="font-semibold">huseyndamirli7@gmail.com</p>
            </div>
          </div>

          <div className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-0.5">Location</p>
              <p className="font-semibold">Baku, Azerbaijan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div className="px-6 mt-6">
        <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Order History
        </h3>

        <div className="space-y-3">
          {orderHistory.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl shadow-md p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold mb-1">{order.restaurant}</h4>
                  <p className="text-sm text-muted-foreground">{order.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">₼{order.amount}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
              </div>
              <div className="bg-accent/10 rounded-lg px-3 py-2 flex items-center gap-2">
                <Gift className="w-4 h-4 text-accent" />
                <span className="text-sm text-accent font-semibold">
                  +{order.points} points earned
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Saved Restaurants */}
      <div className="px-6 mt-6">
        <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Saved Restaurants
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {["Nargiz Restaurant", "Dolma House"].map((name, index) => (
            <motion.div
              key={name}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl shadow-md p-4 text-center"
            >
              <Heart className="w-8 h-8 text-primary fill-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">{name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="px-6 mt-6">
        <h3 className="text-lg mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          Preferences
        </h3>

        <div className="bg-card rounded-3xl shadow-md overflow-hidden">
          <button className="w-full p-4 flex items-center gap-4 hover:bg-secondary transition-all border-b border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 text-left font-semibold">Mystery Box Priority</span>
          </button>

          <button className="w-full p-4 flex items-center gap-4 hover:bg-secondary transition-all border-b border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 text-left font-semibold">Settings</span>
          </button>

          <button className="w-full p-4 flex items-center gap-4 hover:bg-secondary transition-all border-b border-border">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <span className="flex-1 text-left font-semibold">Help & Support</span>
          </button>

          <button className="w-full p-4 flex items-center gap-4 hover:bg-secondary transition-all text-destructive">
            <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <span className="flex-1 text-left font-semibold">Logout</span>
          </button>
        </div>
      </div>

      {/* Sustainability Impact */}
      <div className="px-6 mt-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-6 border-2 border-primary/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              Your Impact
            </h3>
          </div>
          <p className="text-muted-foreground mb-4">
            You've helped save approximately <strong className="text-primary">12 meals</strong> from being wasted!
          </p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-accent fill-accent" />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
