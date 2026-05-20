import { useNavigate } from "react-router";
import { MapPin, Gift, Search, Map, User, Star, Clock, Flame, X, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

// 1. TypeScript üçün verilənlər bazasından (MongoDB Atlas) gələn obyektlərin strukturu
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  oldPrice: number;
  newPrice: number;
  emoji: string;
  isMystery: boolean;
}

interface Restaurant {
  _id: string;
  name: string;
  location: string;
  discountTag: string; 
  menu: MenuItem[];
  rating?: number;
  image?: string;
  category?: string;
  distance?: string;
}

export function Home() {
  const navigate = useNavigate();
  const [bonusPoints] = useState(245);

  // Canlı Render Backend API Ünvanı
  const BACKEND_API_URL = "https://yummyst-backend.onrender.com";

  // Bazadan gələn kafeləri və yüklənmə statusunu yadda saxlayacaq state-lər
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // QR Modal-ın vəziyyətini və seçilmiş məhsulu idarə edən state-lər
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [qrLoading, setQrLoading] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    cafeName: string;
    productName: string;
    price: number;
    qrCodeUrl: string;
  } | null>(null);

  // Səhifə açılanda Render-dəki canlı Express backendimizə sorğu göndəririk
  useEffect(() => {
    fetch(`${BACKEND_API_URL}/api/cafes`)
      .then((res) => res.json())
      .then((data) => {
        const enrichedData = data.map((item: any, index: number) => ({
          ...item,
          rating: item.rating || (4.5 + (index * 0.2)),
          category: item.category || (index % 2 === 0 ? "Azerbaijani" : "Fast Food"),
          distance: item.distance || "1.2 km",
          image: item.image || (index % 2 === 0 
            ? "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop"
            : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
          )
        }));

        setRestaurants(enrichedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend API-dan məlumat çəkilərkən xəta baş verdi:", err);
        setLoading(false);
      });
  }, []);

  // "Əldə et" düyməsinə basıldıqda işə düşən və canlı backend-dən QR kodu gətirən funksiya
  const handleGetQrCode = async (e: React.MouseEvent, cafeName: string, item: MenuItem) => {
    e.stopPropagation(); // Kartın özünə kliklənmə funksiyasının (navigate) işləməsini bloklayır
    setQrLoading(true);
    setSelectedProduct({
      cafeName,
      productName: item.name,
      price: item.newPrice,
      qrCodeUrl: '', // QR kod gələnə qədər müvəqqəti boş qalır
    });
    setIsModalOpen(true);

    try {
      // Render üzərindəki dinamik QR kod marşrutuna müraciət edirik
      const res = await fetch(`${BACKEND_API_URL}/api/generate-qr/${item._id}`);
      const data = await res.json();
      setSelectedProduct(prev => prev ? { ...prev, qrCodeUrl: data.qrCode } : null);
    } catch (err) {
      console.error('QR kod alınarkən xəta baş verdi:', err);
    } finally {
      setQrLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"
        />
        <p className="text-muted-foreground font-medium">Kafelər bazadan yüklənir...</p>
      </div>
    );
  }

  const mysteryBoxes = restaurants.filter(r => r.menu && r.menu.some(item => item.isMystery));
  const regularMeals = restaurants.filter(r => r.menu && r.menu.some(item => !item.isMystery));

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary via-[#3D7A56] to-[#2F6443] text-white p-6 rounded-b-[3rem] shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm opacity-80 mb-1 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Location</span>
              </p>
              <div className="flex items-center gap-2">
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }} className="text-xl">
                  Baku, Azerbaijan
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md hover:bg-white/30 transition-all hover:scale-105 border border-white/20 shadow-lg"
            >
              <User className="w-6 h-6" />
            </button>
          </div>

          {/* Bonus Points Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative bg-gradient-to-r from-accent via-[#FFB84D] to-[#F5A847] p-6 rounded-3xl shadow-2xl mb-4 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="w-16 h-16 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-lg"
                >
                  <Gift className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <p className="text-xs text-white/90 mb-1 uppercase tracking-wider">Bonus Points</p>
                  <p className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>
                    {bonusPoints}
                  </p>
                </div>
              </div>
              <div className="text-right bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/30">
                <p className="text-xs text-white mb-1">Earn 5%</p>
                <p className="text-sm font-bold text-white">every order</p>
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              className="w-full bg-white text-foreground pl-14 pr-4 py-5 rounded-3xl shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:shadow-2xl transition-all border border-white/50"
              style={{ fontFamily: 'var(--font-body)' }}
            />
          </div>
        </div>
      </div>

      {/* AVAILABLE NOW BÖLMƏSİ */}
      <div className="px-6 mt-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-[#FFB84D] rounded-2xl flex items-center justify-center shadow-lg">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Available Now
          </h2>
        </div>

        <div className="space-y-4">
          {restaurants.slice(0, 2).map((restaurant, index) => (
            <motion.div
              key={restaurant._id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/restaurant/${restaurant._id}`)}
              className="group bg-card rounded-[2rem] shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-border/50 p-5"
            >
              <div className="relative h-48 overflow-hidden rounded-2xl mb-4">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 right-3 bg-gradient-to-r from-accent to-[#FFB84D] text-white px-4 py-1.5 rounded-full text-xs font-bold border border-white/20">
                  {restaurant.discountTag.split(' ')[0] || "-50%"}
                </div>
                <div className="absolute bottom-3 left-3 bg-white/95 text-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  {restaurant.category}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1">{restaurant.name}</h3>
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">📍 {restaurant.location}</p>
                
                <div className="space-y-2 mt-2">
                  {restaurant.menu.map((item) => (
                    <div key={item._id} className="flex justify-between items-center bg-secondary/30 p-3 rounded-xl border border-border/40 hover:bg-secondary/50 transition">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.emoji}</span>
                        <div>
                          <p className="text-sm font-bold text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[10px] text-muted-foreground line-through block">{item.oldPrice.toFixed(2)} ₼</span>
                          <span className="text-sm font-extrabold text-primary">{item.newPrice.toFixed(2)} ₼</span>
                        </div>
                        <button 
                          onClick={(e) => handleGetQrCode(e, restaurant.name, item)}
                          className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md active:scale-95 flex items-center gap-1"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Əldə et</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MYSTERY BOXES BÖLMƏSİ */}
      <div className="px-6 mt-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-[#3D7A56] rounded-2xl flex items-center justify-center shadow-lg">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Mystery Boxes
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {mysteryBoxes.map((restaurant, index) => 
            restaurant.menu.filter(item => item.isMystery).map((item) => (
              <motion.div
                key={`mystery-card-${item._id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group flex-shrink-0 w-80 bg-card rounded-[2rem] shadow-lg overflow-hidden border border-border/50 p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 overflow-hidden rounded-2xl mb-3">
                    <img src={restaurant.image} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-accent to-[#FFB84D] text-white px-3 py-1 rounded-full text-xs font-bold">
                      {restaurant.discountTag.split(' ')[0]}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-primary text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <span>{item.emoji}</span>
                      <span>Mystery Box</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{restaurant.name} • {restaurant.location}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{item.description}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-border/40">
                  <div>
                    <span className="text-[10px] text-muted-foreground line-through block">{item.oldPrice.toFixed(2)} ₼</span>
                    <span className="text-base font-black text-primary">{item.newPrice.toFixed(2)} ₼</span>
                  </div>
                  <button 
                    onClick={(e) => handleGetQrCode(e, restaurant.name, item)}
                    className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md active:scale-95"
                  >
                    Əldə et
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* CHOOSE YOUR MEAL BÖLMƏSİ */}
      <div className="px-6 mt-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-[#8BC9A8] to-primary rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🍽️</span>
          </div>
          <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            Choose Your Meal
          </h2>
        </div>

        <div className="space-y-4">
          {regularMeals.map((restaurant) => 
            restaurant.menu.filter(item => !item.isMystery).map((item, index) => (
              <motion.div
                key={`regular-card-${item._id}`}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card rounded-[2rem] shadow-lg overflow-hidden border border-border/50 p-4 flex gap-4"
              >
                <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-secondary flex items-center justify-center text-4xl">
                  {item.emoji}
                  <div className="absolute bottom-1 right-1 bg-accent text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
                    {restaurant.discountTag.split(' ')[0]}
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-base font-bold text-foreground line-clamp-1">{item.name}</h3>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium">{restaurant.name} • 📍 {restaurant.location}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{item.description}</p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-muted-foreground line-through">{item.oldPrice.toFixed(2)} ₼</span>
                      <span className="text-base font-extrabold text-primary">{item.newPrice.toFixed(2)} ₼</span>
                    </div>
                    <button 
                      onClick={(e) => handleGetQrCode(e, restaurant.name, item)}
                      className="bg-primary hover:bg-primary/90 text-white text-xs font-bold px-4 py-1.5 rounded-xl transition shadow-md active:scale-95"
                    >
                      Əldə et
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* QR KOD MODAL PANELI */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-card rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl border border-border p-6 text-center z-10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground bg-secondary w-8 h-8 rounded-full flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">Sifariş QR Kodu</h3>
              <p className="text-xs text-muted-foreground font-medium px-4 mb-5">
                Bu QR kodu restorandakı kassirə göstərərək endirimli məhsulunuzu təhvil alın.
              </p>

              <div className="bg-secondary/40 border border-border/60 rounded-2xl p-4 mb-5 text-left">
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">{selectedProduct.cafeName}</p>
                <h4 className="font-bold text-foreground text-base line-clamp-1">{selectedProduct.productName}</h4>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/40">
                  <span className="text-xs text-muted-foreground font-medium">Ödəniləcək məbləğ:</span>
                  <span className="text-lg font-black text-primary">{selectedProduct.price.toFixed(2)} ₼</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 inline-block border border-border shadow-inner mb-4 relative min-w-[180px] min-h-[180px]">
                {qrLoading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 rounded-2xl">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full mb-2"
                    />
                    <p className="text-[11px] text-muted-foreground font-medium">QR Yaradılır...</p>
                  </div>
                ) : selectedProduct.qrCodeUrl ? (
                  <motion.img 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={selectedProduct.qrCodeUrl} 
                    alt="Sifariş QR Kod" 
                    className="w-40 h-40 object-contain mix-blend-multiply mx-auto"
                  />
                ) : (
                  <div className="text-xs text-destructive flex items-center justify-center h-40">QR yüklənə bilmədi.</div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-amber-600 bg-amber-500/10 dark:bg-amber-500/20 rounded-xl py-2.5 px-3 font-semibold border border-amber-500/20">
                <span>⚡️</span>
                <span>Kassir üçün: QR kodu skan edin.</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 shadow-2xl">
        <div className="flex items-center justify-around px-8 py-5 max-w-2xl mx-auto">
          <button className="flex flex-col items-center gap-2 text-primary group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-[#3D7A56] rounded-2xl flex items-center justify-center shadow-lg">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-card" />
            </div>
            <span className="text-xs font-bold">Home</span>
          </button>
          <button
            onClick={() => navigate("/map")}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-all group"
          >
            <div className="w-12 h-12 bg-secondary group-hover:bg-primary/10 rounded-2xl flex items-center justify-center transition-all">
              <Map className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold">Map</span>
          </button>
          <button
            onClick={() => navigate("/order")}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-all group"
          >
            <div className="w-12 h-12 bg-secondary group-hover:bg-primary/10 rounded-2xl flex items-center justify-center transition-all">
              <Gift className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold">Orders</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-all group"
          >
            <div className="w-12 h-12 bg-secondary group-hover:bg-primary/10 rounded-2xl flex items-center justify-center transition-all">
              <User className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}