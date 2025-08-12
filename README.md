# Mini eCommerce Platform — Next.js + MongoDB

**وصف سريع**

مشروع Mini eCommerce هو تطبيق مصغر لمتجر إلكتروني بنيته باستخدام Next.js للواجهات وـAPI، وMongoDB (Mongoose) للـ database. الهدف من المشروع هو إبراز مهارات Fullstack: تصميم موديلات البيانات، بناء REST API، ربط الواجهة بالباكند، وإضافة واجهة بسيطة للإدارة.

---

## ماذا قمت ببنائه

* واجهة المستخدم العامة: صفحة رئيسية بعرض المنتجات، صفحة تفاصيل المنتج، وصفحة سلة مشتريات (Cart).
* REST API (Next.js API routes) بدعم CRUD للمنتجات: GET all, GET by id, POST, PUT, DELETE.
* تخزين المنتجات في MongoDB باستخدام Mongoose (schema + validation + timestamps).
* حالة السلة مخزنة في **React Context** مع استمرارية في `localStorage` (حتى لو عملت ريفرش يفضل تفضيل المستخدم).
* واجهة إدارة بسيطة (Admin) لإضافة وتعديل وحذف المنتجات عبر نفس الـAPI.
* بحث/فلتر بسيط باسم المنتج وفلترة على الكاتيجوري (bonus).
* ستايل بسيط وحديث باستخدام **Tailwind CSS**.
* سكربت بسيط لعمل seeding لبيانات تجريبية.
* جاهز للنشر (مثال: Vercel) — تعليمات النشر مذكورة أدناه.

> ملاحظة: אם المشروع يتضمن اختلافات صغيرة (TypeScript vs JavaScript، أو استخدام Zustand بدلاً من Context)، عدّل الحقول في هذا الـREADME لتطابق الكود في المستودع.

---

## التقنيات المستخدمة

* Next.js (Pages router + API routes)
* React
* MongoDB (Atlas or local)
* Mongoose
* Tailwind CSS
* React Context + localStorage (Cart)
* Node.js (v18+ recommended)

---

## بنية المجلدات (مثال)

```
/pages
  /index.js            # Home (product listing)
  /product/[id].js     # Product details
  /cart.js             # Cart page
  /admin               # Admin pages (add / edit)
/api
  /products
    index.js           # GET, POST
    [id].js            # GET by id, PUT, DELETE
/models
  Product.js           # Mongoose schema
/lib
  dbConnect.js         # MongoDB connection helper
/components
  ProductCard.js
  Navbar.js
  ProductForm.js       # used in admin
/scripts
  seed.js              # simple seeder to add demo products
/public
  /images              # (optional) demo images

README.md
package.json
.env.local
```

---

## متطلبات قبل التشغيل

* Node.js v18 أو أعلى
* npm أو yarn
* MongoDB Atlas account أو تثبيت MongoDB محلي

---

## إعداد المتغيرات البيئية (.env.local)

انشئ ملف `.env.local` في جذر المشروع بالمحتوى التالي:

```
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority"
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

عدل قيمة `MONGODB_URI` لتشير إلى قاعدة بياناتك. لو تستخدم MongoDB محلي فاستخدم `mongodb://localhost:27017/ecommerce`.

---

## تشغيل المشروع محلياً

1. تثبيت الحزم

```bash
npm install
# أو
# yarn
```

2. تشغيل المشروع في وضع التطوير

```bash
npm run dev
# أو
# yarn dev
```

الموقع سيكون متاح على `http://localhost:3000` افتراضياً.

---

## سكربت Seeding (إضافة بيانات تجريبية)

أضفت سكربت بسيط `scripts/seed.js` لملء قاعدة البيانات ببعض المنتجات التجريبية. لتشغيله:

```bash
node scripts/seed.js
# أو عبر npm script
# npm run seed
```

مثال على شكل منتج في السكربت:

```json
{
  "title": "Roses Bouquet",
  "description": "A fresh bouquet of red roses.",
  "price": 29.99,
  "category": "Flowers",
  "imageUrl": "https://example.com/roses.jpg",
  "createdAt": "2025-08-10T00:00:00.000Z"
}
```

---

## نموذج البيانات (Mongoose Product schema)

```js
// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, default: 'Uncategorized' },
  imageUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema);
```

و helper للاتصال بقاعدة البيانات (`lib/dbConnect.js`):

```js
// lib/dbConnect.js
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = dbConnect;
```

---

## توثيق الـ API (أمثلة مع `curl`)

* **GET /api/products** — جلب كل المنتجات

```bash
curl http://localhost:3000/api/products
```

* **GET /api/products/\:id** — جلب منتج واحد

```bash
curl http://localhost:3000/api/products/64d123abc...
```

* **POST /api/products** — إنشاء منتج جديد

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"New Product","description":"...","price":19.99,"category":"Gifts","imageUrl":"https://..."}'
```

* **PUT /api/products/\:id** — تحديث منتج

```bash
curl -X PUT http://localhost:3000/api/products/64d123... \
  -H "Content-Type: application/json" \
  -d '{"price":24.99}'
```

* **DELETE /api/products/\:id** — حذف منتج

```bash
curl -X DELETE http://localhost:3000/api/products/64d123...
```

**ملاحظات عن الأخطاء**: الـAPI ترجع رموز الحالة المناسبة (200, 201, 400, 404, 500) ورسائل خطأ واضحة عند المدخلات غير الصالحة.

---

## كيفية اختبار الواجهة والـAPI

* افتح الموقع `http://localhost:3000` لتجربة الواجهة.
* لاختبار الـAPI استخدم Postman أو curl (أوامر في الأعلى).
* صفحة الـAdmin تستخدم نفس الـAPI لإضافة/تعديل/حذف منتجات.

---

## قرارات التصميم وسببها

* **Next.js API routes**: سريعة للـprototyping وتسمح بوضع الواجهة والـAPI في نفس المشروع.
* **Mongoose**: يوفر schema وvalidation وبساطة في التعامل مع MongoDB.
* **React Context + localStorage** للسلة: بسيط، لا حاجة لإعداد Zustand أو Redux لمشروع صغير.
* **Tailwind CSS**: إنتاج واجهات سريعة وعصرية مع حاجة قليلة لكتابة CSS مخصصة.

---

## حدود واعتبارات (Known limitations)

* لا توجد مصادقة (Auth) على الـAdmin — حالياً أي شخص يمكنه الوصول لواجهة الإدارة إذا كانت منشورة. يجب إضافة Authentication (مثلاً NextAuth أو JWT) قبل نشرها في بيئة إنتاجية.
* لا يوجد رفع صور من الواجهة (image upload) — يعتمد المشروع على روابط صور خارجية. تحسين: رفع الصور إلى S3 أو Cloudinary.
* لا توجد اختبارات آلية (unit/integration tests) — يمكن إضافة Jest + React Testing Library.

---

## تحسينات مستقبلية

* إضافة Authentication (Admin login).
* رفع الصور وخزنها في خدمة سحابية.
* تحسين الأداء: pagination/limit على واجهة المنتجات، caching (SW cached requests / Redis).
* إضافة payments (Stripe) و checkout flow.
* إضافة اختبار آلي وCI/CD.

---

## نشر (Vercel)

1. ادفع (push) المستودع إلى GitHub.
2. افتح Vercel وابدأ مشروع جديد من GitHub repo.
3. اضف متغير البيئة `MONGODB_URI` في إعدادات المشروع على Vercel.
4. اضغط Deploy — Vercel سيبني تطبيق Next.js تلقائياً.

---

## ملاحظات أخيرة

لو حابب أكتب README بالإنجليزي أو أعدل عليه بحيث يطابق بالضبط الأكواد في المستودع بتاعك (مثلاً لو استخدمت TypeScript، أو استخدمت Zustand بدلاً من Context، أو غيرت أسماء المسارات) ابعتهولي وأنا أعدل الملف 1:1.

> لو تحب، أقدر أعمللك ملف `postman_collection.json` جاهز أو أوامر `curl` كاملة لكل endpoint بصيغة قابلة للاستيراد.

---

## تواصل

* GitHub: `{{GITHUB_REPO_URL}}`
* Author: Badr Shaban
