# IdeaSpark — Capacitor Project

تطبيق IdeaSpark جاهز للتحويل لتطبيق iOS و Android عبر Capacitor.

## المتطلبات

- **macOS** (لازم لبناء iOS) + [Xcode](https://apps.apple.com/app/xcode/id497799835) مثبت
- [Node.js](https://nodejs.org) (نسخة 18 أو أحدث)
- حساب [Apple Developer](https://developer.apple.com) ($99/سنة) — لـ iOS
- حساب [Google Play Console](https://play.google.com/console) ($25 مرة واحدة) — لـ Android
- [Android Studio](https://developer.android.com/studio) — لـ Android فقط

---

## الخطوات

### 1. فك الضغط وافتح Terminal في المجلد

```bash
cd ideaspark-capacitor
```

### 2. شغّل سكربت الإعداد

```bash
chmod +x setup.sh
./setup.sh
```

هذا السكربت يقوم بـ:
- تثبيت كل الحزم (`npm install`)
- إضافة مشروع iOS و Android
- مزامنة ملفات `www/` مع المشروعين

### 3. افتح المشروع في Xcode (لـ iOS)

```bash
npx cap open ios
```

داخل Xcode:
1. اختر المشروع من الشجرة اليسرى → تبويب **Signing & Capabilities**
2. اختر **Team** = حساب Apple Developer الخاص بك
3. تأكد إن **Bundle Identifier** = `com.ideaspark.app` (لازم يطابق حرفياً ما هو مسجل في App Store Connect)
4. لإضافة الأيقونة: افتح `App/App/Assets.xcassets/AppIcon.appiconset` واسحب `www/icon-1024.png` للخانة 1024×1024 — Xcode يولّد باقي المقاسات تلقائياً (أو استخدم أداة مثل [appicon.co](https://appicon.co) لتوليد كل المقاسات دفعة واحدة)
5. وصّل آيفون فعلي أو اختر Simulator واضغط ▶️ Run

### 4. افتح المشروع في Android Studio (لـ Android)

```bash
npx cap open android
```

- نفس الفكرة: عدّل `applicationId` في `android/app/build.gradle` ليطابق ما سجلته في Play Console
- ضع الأيقونة في `android/app/src/main/res/` بمختلف المجلدات (mipmap-*) — أو استخدم [Image Asset Studio](https://developer.android.com/studio/write/image-asset-studio) المدمج في Android Studio

---

## ⚠️ مهم: RevenueCat (الاشتراكات)

قبل البناء النهائي، افتح `www/index.html` وابحث عن:

```js
const RC_API_KEY = {
  ios: 'YOUR_REVENUECAT_IOS_PUBLIC_KEY',
  android: 'YOUR_REVENUECAT_ANDROID_PUBLIC_KEY',
};
```

استبدلها بالمفاتيح الحقيقية من [app.revenuecat.com](https://app.revenuecat.com) بعد ما تنشئ:
- Project + Apps (iOS & Android)
- Entitlement باسم `pro`
- Products: `monthly`, `yearly`, `lifetime`
- Offering يربط المنتجات بالـ Entitlement

بعد أي تعديل على `www/index.html`، أعد المزامنة:

```bash
npx cap sync
```

---

## كل مرة تعدّل على index.html

```bash
npx cap sync
```

هذا ينسخ التغييرات لمشروعي iOS و Android، بعدها أعد البناء من Xcode/Android Studio.

---

## بنية المشروع

```
ideaspark-capacitor/
├── package.json
├── capacitor.config.json
├── setup.sh
├── www/                    ← كل ملفات التطبيق (الواجهة)
│   ├── index.html
│   ├── manifest.json
│   ├── sw.js
│   ├── icon-1024.png       ← للأيقونة في Xcode/Android Studio
│   ├── icon-512.png
│   ├── icon-192.png
│   └── apple-touch-icon.png
├── ios/                    ← يُنشأ بعد npx cap add ios
└── android/                ← يُنشأ بعد npx cap add android
```
