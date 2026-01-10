# CorpFinGuard - Finansal Risk Analiz Platformu

Yapay zeka destekli, kurumsal finansal risk analizi ve tahminleme platformu.

## 📋 Özellikler

- 📊 **Finansal Veri Analizi** - Excel/CSV dosya yükleme ve analiz
- 🤖 **İflas Tahmini** - 7 farklı finansal model
- 🔍 **Fraud Detection** - Hileli raporlama tespiti
- 📈 **Finansal Oranlar** - 40+ oran analizi
- 📄 **Raporlama** - PDF ve Excel rapor oluşturma
- 🔐 **Güvenlik** - Kullanıcı kimlik doğrulaması

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Modern web tarayıcı (Chrome, Firefox, Safari, Edge)
- Python 3.6+ (yerel sunucu için)
- Git

### Kurulum

```bash
# Depoyu klonla
git clone https://github.com/YOUR_USERNAME/corpfinguard.git
cd corpfinguard

# Yerel sunucuyu başlat
python -m http.server 3000

# Tarayıcıda aç
# http://localhost:3000
```

## 📁 Dosya Yapısı

```
corpfinguard/
├── index.html           # Ana sayfa
├── login.html           # Giriş sayfası
├── signup.html          # Kayıt sayfası
├── dashboard.html       # Dashboard
├── xai.html             # Analiz detayları
├── styles.css           # Global stiller
├── script.js            # JavaScript fonksiyonları
├── package.json         # Proje metadata
└── README.md            # Bu dosya
```

## 📖 Sayfa Açıklamaları

### index.html
Ana sayfa - Ürün tanıtımı, özellikler ve çağrı-to-action butonları

### login.html
Kullanıcı giriş sayfası - Email ve şifre ile kimlik doğrulama

### signup.html
Yeni kullanıcı kayıt sayfası - Email, şifre ve doğrulama

### dashboard.html
Kullanıcı dashboard'u - Yapılan analizlerin listesi ve yönetimi

### xai.html
Analiz detayları - Finansal oranlar, risk skoru ve açıklamalar

## 🔧 Geliştirme

### Yerel Sunucu Başlatma

```bash
# Python ile
python -m http.server 3000

# Node.js ile
npx http-server -p 3000

# PHP ile
php -S localhost:3000
```

### Stil Özelleştirmesi

`styles.css` dosyasında CSS değişkenlerini düzenle:

```css
:root {
  --primary: #2563eb;        /* Ana renk */
  --secondary: #64748b;      /* İkincil renk */
  --success: #10b981;        /* Başarı rengi */
  --danger: #ef4444;         /* Hata rengi */
}
```

### JavaScript Fonksiyonları

`script.js` dosyasında hazır fonksiyonlar:

```javascript
// Kullanıcı kimlik doğrulaması
Auth.login(email, password)
Auth.logout()
Auth.isLoggedIn()

// Analiz işlemleri
Analysis.uploadFile(file)
Analysis.analyzeData(data)
Analysis.generateReport(analysisId, format)

// Utility fonksiyonları
Utils.fetch(url, options)
Utils.showNotification(message, type)
Utils.formatCurrency(value)
Utils.formatDate(date)
```

## 🌐 Backend Entegrasyonu

### API Endpoints

```
POST /api/login              # Giriş
POST /api/signup             # Kayıt
POST /api/upload             # Dosya yükleme
POST /api/analyze            # Analiz
GET  /api/analyses           # Analiz listesi
GET  /api/report/:id         # Rapor oluşturma
```

### Örnek API Çağrısı

```javascript
// Dosya yükleme
const file = document.querySelector('#file-input').files[0];
const result = await Analysis.uploadFile(file);

// Rapor oluşturma
await Analysis.generateReport(analysisId, 'pdf');
```

## 📱 Responsive Tasarım

Tüm sayfalar mobil cihazlara uyumludur:

- Tablet: 768px ve üzeri
- Masaüstü: 1200px ve üzeri

## 🔐 Güvenlik Notları

- Şifreler en az 6 karakter olmalı
- Tüm API çağrıları HTTPS üzerinden yapılmalı
- JWT token'ları localStorage'da saklanıyor
- CORS politikası uygulanmalı

## 🐛 Sorun Giderme

### Sayfa yüklenmedi

```bash
# Sunucuyu kontrol et
curl http://localhost:3000

# Cache'i temizle
# Tarayıcıda: Ctrl+Shift+Delete
```

### API bağlantısı başarısız

- Backend sunucusunun çalıştığını kontrol et
- CORS ayarlarını doğrula
- Network sekmesinde hataları kontrol et

### Dosya yükleme çalışmıyor

- Dosya boyutunu kontrol et (max 10MB)
- Dosya türünü kontrol et (Excel, CSV)
- Tarayıcı konsolunda hataları kontrol et

## 📚 Kaynaklar

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [HTML5 Spec](https://html.spec.whatwg.org/)

## 🤝 Katkı

Katkılar hoş karşılanır! Lütfen:

1. Fork et
2. Feature branch oluştur (`git checkout -b feature/amazing-feature`)
3. Değişiklikleri commit et (`git commit -m 'Add amazing feature'`)
4. Branch'i push et (`git push origin feature/amazing-feature`)
5. Pull Request oluştur

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 📧 İletişim

- Email: support@corpfinguard.com
- GitHub Issues: [Açık issue oluştur](https://github.com/YOUR_USERNAME/corpfinguard/issues)
- Website: https://corpfinguard.com

## 🙏 Teşekkürler

Bu proje aşağıdaki kütüphaneler ve araçlar kullanılarak oluşturulmuştur:

- HTML5
- CSS3
- Vanilla JavaScript
- Chart.js (grafik gösterimi)
- jsPDF (PDF oluşturma)
- XLSX (Excel işlemleri)

---

**Son Güncelleme:** 10 Ocak 2026
**Versiyon:** 1.0.0
