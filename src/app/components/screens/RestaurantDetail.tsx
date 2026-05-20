import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Star, MapPin, Clock, Gift, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const restaurantData: Record<string, any> = {
  "1": {
    name: "Nargiz Restaurant",
    rating: 4.8,
    reviews: 234,
    category: "Azerbaijani",
    distance: "0.8 km",
    pickupTime: "18:00 - 20:00",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop",
    mysteryBox: {
      price: 15,
      originalPrice: 30,
      description: "Surprise mix of today's fresh Azerbaijani dishes"
    },
    meals: [
      { id: 1, name: "Plov with Lamb", price: 8, originalPrice: 16, image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=200&h=200&fit=crop" },
      { id: 2, name: "Dolma Platter", price: 6, originalPrice: 12, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200&h=200&fit=crop" },
      { id: 3, name: "Lavangi Chicken", price: 7, originalPrice: 14, image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200&h=200&fit=crop" },
      { id: 4, name: "Kebab Mix", price: 10, originalPrice: 20, image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=200&h=200&fit=crop" }
    ]
  }
};

export function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"mystery" | "choose">("mystery");
  const [selectedMeals, setSelectedMeals] = useState<number[]>([]);

  const restaurant = restaurantData[id || "1"];

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  const toggleMeal = (mealId: number) => {
    setSelectedMeals(prev =>
      prev.includes(mealId)
        ? prev.filter(id => id !== mealId)
        : [...prev, mealId]
    );
  };

  const handleReserve = () => {
    navigate("/order");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Image */}
      <div className="relative h-96">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <button
          onClick={() => navigate("/home")}
          className="absolute top-8 left-6 w-14 h-14 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl hover:bg-white transition-all hover:scale-105"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>

        <div className="absolute bottom-8 left-6 right-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl text-white mb-3 drop-shadow-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
              {restaurant.name}
            </h1>
            <div className="flex items-center gap-4 text-white text-sm">
              <div className="flex items-center gap-2 bg-white/25 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/30 shadow-xl">
                <Star className="w-5 h-5 fill-accent text-accent drop-shadow-lg" />
                <span className="font-bold text-white text-base">{restaurant.rating}</span>
                <span className="text-white/80">({restaurant.reviews})</span>
              </div>
              <div className="bg-white/25 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/30 shadow-xl">
                <span className="font-semibold">{restaurant.category}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-around gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5 text-primary" />
            <span>{restaurant.pickupTime}</span>
          </div>
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{restaurant.distance}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-6 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex gap-3 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab("mystery")}
            className={`flex-1 py-4 px-5 rounded-2xl transition-all duration-300 ${
              activeTab === "mystery"
                ? "bg-gradient-to-r from-primary to-[#3D7A56] text-white shadow-xl shadow-primary/30 scale-105"
                : "bg-secondary text-muted-foreground hover:bg-secondary/70"
            }`}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            <div className="flex items-center justify-center gap-2.5">
              <Gift className="w-6 h-6" />
              <span className="text-base">Mystery Box</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("choose")}
            className={`flex-1 py-4 px-5 rounded-2xl transition-all duration-300 ${
              activeTab === "choose"
                ? "bg-gradient-to-r from-primary to-[#3D7A56] text-white shadow-xl shadow-primary/30 scale-105"
                : "bg-secondary text-muted-foreground hover:bg-secondary/70"
            }`}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
          >
            <div className="flex items-center justify-center gap-2.5">
              <ShoppingBag className="w-6 h-6" />
              <span className="text-base">Choose Items</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {activeTab === "mystery" ? (
          <motion.div
            key="mystery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-[2rem] p-8 border-2 border-primary/20 shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-28 h-28 bg-gradient-to-br from-primary to-[#3D7A56] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30"
                  >
                    <Gift className="w-14 h-14 text-white" />
                  </motion.div>
                  <h2 className="text-4xl mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                    Mystery Box
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {restaurant.mysteryBox.description}
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-2xl mb-6 border border-border/30">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide">Special Price</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl text-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                          ₼{restaurant.mysteryBox.price}
                        </span>
                        <span className="text-xl text-muted-foreground line-through">
                          ₼{restaurant.mysteryBox.originalPrice}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-accent to-[#FFB84D] text-white px-6 py-3 rounded-2xl shadow-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                      -50%
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-primary/5 px-4 py-3 rounded-2xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-foreground">Available until {restaurant.pickupTime.split(' - ')[1]}</span>
                  </div>
                </div>

                <div className="bg-accent/10 border-2 border-accent/30 rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">💡</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 text-lg">What's inside?</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        A curated selection of today's best dishes - it's a delicious surprise every time!
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReserve}
                  className="w-full bg-gradient-to-r from-primary via-[#3D7A56] to-primary text-white py-5 rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.03] group relative overflow-hidden"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
                >
                  <span className="relative z-10 text-lg">Reserve Mystery Box</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="choose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {restaurant.meals.map((meal: any, index: number) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleMeal(meal.id)}
                className={`group bg-card rounded-[2rem] shadow-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                  selectedMeals.includes(meal.id)
                    ? "border-primary shadow-2xl shadow-primary/20 scale-[1.03]"
                    : "border-transparent hover:shadow-xl hover:scale-[1.01]"
                }`}
              >
                <div className="flex gap-5 p-5">
                  <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
                    {selectedMeals.includes(meal.id) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] rounded-2xl flex items-center justify-center"
                      >
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl">
                          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                        {meal.name}
                      </h3>
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-3xl text-primary" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                          ₼{meal.price}
                        </span>
                        <span className="text-base text-muted-foreground line-through">
                          ₼{meal.originalPrice}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-accent/20 to-accent/10 text-accent px-4 py-2 rounded-xl inline-block w-fit" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      -50% OFF
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {selectedMeals.length > 0 && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={handleReserve}
                className="w-full bg-primary text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mt-6"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Reserve {selectedMeals.length} Item{selectedMeals.length > 1 ? 's' : ''}
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
