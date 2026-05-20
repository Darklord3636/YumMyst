```markdown
# 🍏 YumMyst — Full-Stack Eco-Friendly Food Delivery Prototype

YumMyst, Bakı şəhərindəki kafelərdə günün sonunda qalan təzə və keyfiyyətli təamları yarı qiymətinə istehlakçılara təqdim edərək qida israfının (Food Waste) qarşısını almağı hədəfləyən, interaktiv və müasir bir **Full-Stack** mobil-veb tətbiq prototipidir. Layihə monorepo strukturunda yığılmışdır və real vaxt rejimində bulud sistemləri ilə inteqrasiya olunub.

---

## Layihənin arxitekturası

Tətbiq üç əsas bulud infrastrukturunun sinxronizasiyası üzərində tam asinxron şəkildə işləyir:

* **Frontend (Vercel):** İstifadəçi interfeysi (UI/UX), cəlbedici animasiyalar (`Framer Motion`) və dinamik səhifələmə idarəetməsi.
* **Backend API (Render):** Biznes məntiqləri, daxili təhlükəsizlik marşrutları (CORS) və dinamik QR kod generasiyası üçün Node.js + Express mühərriki.
* **Database (MongoDB Atlas):** Kafelərin dinamik menyularını, endirimli məhsulları və test datalarını 7/24 canlı saxlayan NoSQL bulud verilənlər bazası.

---

## İstifadə Olunan Texnologiyalar

### Frontend
* **React 19 & TypeScript:** Tip təhlükəsizliyi və komponent əsaslı struktur.
* **Vite:** Ultra sürətli daxili mühit və yığım (build) prosesi.
* **Tailwind CSS & Lucide React:** Müasir, minimalist və responsiv dizayn memarlığı.
* **Framer Motion (`motion/react`):** Yumşaq keçidlər və interaktiv modal animasiyalar.

### Backend & Database
* **Node.js & Express.js:** RESTful API arxitekturası.
* **Mongoose:** MongoDB Atlas verilənlər bazası üçün sxem əsaslı modelləşdirmə.
* **QRCode (npm):** Sifarişlərin restoran tərəfindən təsdiqlənməsi üçün daxili unikal `base64` QR kod yaradıcısı.


```

---

## Canlı Sistem Linkləri

Layihə tam olaraq internet mühitinə daşınmışdır və aşağıdakı linklər üzərindən canlı rejimdə yoxlanıla bilər:

* **Canlı Tətbiq (Frontend):** [YumMyst on Vercel]([[https://yum-myst.vercel.app/]) 
* **Canlı API İdarəetmə (Backend):** `https://yummyst-backend.onrender.com`
* **Kafelərin JSON Data Axışı:** [YumMyst API - Cafes](https://www.google.com/search?q=https://yummyst-backend.onrender.com/api/cafes)

---

## Lokal Mühitdə Başlatmaq (Installation)

Layihəni öz kompüterinizdə klonlayıb işə salmaq üçün:

1. Layihəni klonlayın:
```bash
git clone [https://github.com/Darklord3636/YumMyst.git](https://github.com/Darklord3636/YumMyst.git)
cd YumMyst

```


2. Asılılıqları quraşdırın (pnpm tövsiyə olunur):
```bash
pnpm install

```


3. Backend serveri başladın (Local port: `5001` və ya dinamik mühit):
```bash
cd backend
node server.cjs

```


4. Frontend mühitini başladın:
```bash
cd ..
pnpm run dev

```



---

## 💡 Əsas Funksional İmkanlar

* **Dinamik Data Axışı:** Kafelər local yaddaşdan deyil, birbaşa buluddakı MongoDB-dən çəkilərək anlıq ekranda render olunur.
* **Dinamik QR Generasiyası:** "Əldə et" düyməsinə kliklədikdə backend hər məhsulun özünəməxsus ID-sinə uyğun xüsusi `qrendirim://product/:id` linki hazırlayır və bunu saniyələr içində canlı QR koda çevirib modal pəncərədə təqdim edir.
* **Avtomatik Seeding:** Verilənlər bazası boş olduqda, server işə düşən an daxili test kafelərini (`Coffeetea Baku`, `Burger House`) avtomatik olaraq bazaya doldurur.

```
