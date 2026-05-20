import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, DollarSign, Navigation, Filter, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const restaurants = [
  { id: 1, name: "Nargiz Restaurant", lat: 40.4093, lng: 49.8671, discount: 50, category: "Azerbaijani", distance: 0.8 },
  { id: 2, name: "Firuze Cafe", lat: 40.4050, lng: 49.8720, discount: 40, category: "European", distance: 1.2 },
  { id: 3, name: "Dolma House", lat: 40.4120, lng: 49.8650, discount: 60, category: "Traditional", distance: 0.5 },
  { id: 4, name: "Sahil Lounge", lat: 40.4000, lng: 49.8800, discount: 45, category: "Mediterranean", distance: 2.1 },
];

export function MapView() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    maxDistance: 5,
    minDiscount: 0,
    categories: [] as string[],
  });

  const categories = ["Azerbaijani", "European", "Traditional", "Mediterranean"];

  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const filteredRestaurants = restaurants.filter(r => {
    const distanceMatch = r.distance <= filters.maxDistance;
    const discountMatch = r.discount >= filters.minDiscount;
    const categoryMatch = filters.categories.length === 0 || filters.categories.includes(r.category);
    return distanceMatch && discountMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-background relative">
      {/* Map Area */}
      <div className="h-screen bg-gradient-to-br from-secondary via-primary/5 to-accent/10 relative">
        {/* Map Placeholder with Pins */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-20 h-20 text-primary/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Map view - Baku, Azerbaijan</p>
          </div>
        </div>

        {/* Restaurant Pins */}
        {filteredRestaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute cursor-pointer hover:scale-110 transition-transform"
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + (index % 2) * 20}%`,
            }}
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
          >
            <div className="relative">
              <div className="w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                <span className="text-white text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  -{restaurant.discount}%
                </span>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-primary" />
            </div>
          </motion.div>
        ))}

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background/95 to-transparent backdrop-blur-sm p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/home")}
              className="w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>

            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 bg-white shadow-lg px-4 py-3 rounded-2xl hover:shadow-xl transition-all"
            >
              <Filter className="w-5 h-5 text-primary" />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Filters
              </span>
              {(filters.categories.length > 0 || filters.minDiscount > 0) && (
                <div className="w-2 h-2 bg-accent rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Location Button */}
        <button className="absolute bottom-32 right-6 w-14 h-14 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all">
          <Navigation className="w-6 h-6 text-primary" />
        </button>

        {/* Restaurant List */}
        <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl shadow-2xl max-h-[40vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Nearby Restaurants
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredRestaurants.length} available
              </span>
            </div>

            <div className="space-y-3">
              {filteredRestaurants.map((restaurant) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                  className="bg-secondary/50 rounded-2xl p-4 cursor-pointer hover:bg-secondary transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">{restaurant.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{restaurant.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {restaurant.distance} km
                        </span>
                      </div>
                    </div>
                    <div className="bg-accent text-white px-3 py-1.5 rounded-full text-sm" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      -{restaurant.discount}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
          onClick={() => setShowFilters(false)}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card w-full rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                Filters
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Distance Filter */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <label className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Max Distance: {filters.maxDistance} km
                </label>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={filters.maxDistance}
                onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: Number(e.target.value) }))}
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(filters.maxDistance / 10) * 100}%, var(--secondary) ${(filters.maxDistance / 10) * 100}%, var(--secondary) 100%)`
                }}
              />
            </div>

            {/* Discount Filter */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <label className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  Min Discount: {filters.minDiscount}%
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="70"
                step="10"
                value={filters.minDiscount}
                onChange={(e) => setFilters(prev => ({ ...prev, minDiscount: Number(e.target.value) }))}
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(filters.minDiscount / 70) * 100}%, var(--secondary) ${(filters.minDiscount / 70) * 100}%, var(--secondary) 100%)`
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <label className="text-lg mb-3 block" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Food Type
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      filters.categories.includes(category)
                        ? "bg-primary text-white shadow-lg"
                        : "bg-secondary text-foreground hover:bg-muted"
                    }`}
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setFilters({ maxDistance: 5, minDiscount: 0, categories: [] });
                }}
                className="flex-1 bg-secondary text-foreground py-4 rounded-2xl hover:bg-muted transition-all"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Reset
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-primary text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
              >
                Show {filteredRestaurants.length} Results
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
