const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const QRCode = require('qrcode');

const app = express();

// Bütün brauzer mühitləri üçün CORS təhlükəsizlik icazələri
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());

// Statik faylları (index.html və s.) birbaşa kök qovluqdan oxuyur
app.use(express.static(path.join(__dirname)));

// MongoDB-yə qoşulma
mongoose.connect('mongodb://127.0.0.1:27017/qrendirim')
    .then(() => {
        console.log('Lokal MongoDB-yə uğurla qoşuldu. 🌱');
        seedDatabase();
    })
    .catch(err => console.error('MongoDB qoşulma xətası:', err));

// Verilənlər Bazası Modelləri
const MenuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    oldPrice: Number,
    newPrice: Number,
    emoji: String,
    isMystery: Boolean
});

const CafeSchema = new mongoose.Schema({
    name: String,
    location: String,
    discountTag: String,
    menu: [MenuItemSchema]
});

const Cafe = mongoose.model('Cafe', CafeSchema);

// Kafelərin siyahısını göndərən API
app.get('/api/cafes', async (req, res) => {
    try {
        const cafes = await Cafe.find();
        res.json(cafes);
    } catch (error) {
        res.status(500).json({ message: "Məlumatlar gətirilərkən xəta baş verdi." });
    }
});

// Real QR kod yaradan marşrut
app.get('/api/generate-qr/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const qrCode = await QRCode.toDataURL(`qrendirim://product/${productId}`);
        res.json({ qrCode, qrCodeUrl: qrCode });
    } catch (error) {
        res.status(500).json({ message: "QR kod yaradılarkən xəta baş verdi." });
    }
});

// Baza boşdursa avtomatik doldurulacaq test məlumatları
async function seedDatabase() {
    try {
        const count = await Cafe.countDocuments();
        if (count === 0) {
            await Cafe.create([
                {
                    name: "Coffeetea Baku",
                    location: "Elmlər Akademiyası m.",
                    discountTag: "-50% FRESH MEAL",
                    menu: [
                        { name: "Iced Latte", description: "Xüsusi qovrulmuş qəhvə dənələri və soyuq süd ilə.", oldPrice: 8.40, newPrice: 4.20, emoji: "☕️", isMystery: false },
                        { name: "San Sebastian", description: "Yumşaq qaymaqlı tekstura, xüsusi şokolad sousu ilə.", oldPrice: 11.00, newPrice: 5.50, emoji: "🍰", isMystery: false }
                    ]
                },
                {
                    name: "Burger House",
                    location: "Nərimanov r.",
                    discountTag: "-50% SON DƏQİQƏ",
                    menu: [
                        { name: "Cheeseburger", description: "150qr dana əti, xüsusi sous və çedar pendiri.", oldPrice: 13.50, newPrice: 6.75, emoji: "🍔", isMystery: false },
                        { name: "Böyük Fri", description: "Xırtıldayan kənd kartofu, xüsusi ədviyyatla.", oldPrice: 5.20, newPrice: 2.60, emoji: "🍟", isMystery: false },
                        { name: "Şanslı Mystery Box", description: "Günün sürpriz burger və yan məhsullar qutusu.", oldPrice: 18.00, newPrice: 9.00, emoji: "🎁", isMystery: true }
                    ]
                }
            ]);
            console.log("Figma UI-a uyğun test məlumatları bazaya yazıldı. ✅");
        }
    } catch (err) {
        console.error("Data yüklənərkən xəta:", err);
    }
}

// Express 5 RegExp Catch-all Uyğunluğu: /api marşrutlarına toxunmur, qalan hər şeyi index.html-ə yönləndirir
app.get(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Port sazlanması
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda aktivdir. 🚀`);
});