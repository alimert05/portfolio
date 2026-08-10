# Kişisel Portfolyo Sitesi — Proje Planı

## 1. Genel Bakış

**Amaç:** Kişisel portfolyo/CV sitesi. Profesyonel ama akılda kalıcı, interaktif bir terminal simülasyonu ile öne çıkan bir deneyim.

**Tasarım felsefesi:** %80 modern minimal + %20 retro/terminal aksanı. Genel layout temiz, sade, bol boşluklu ve modern; retro/terminal karakteri esas olarak interaktif terminal bölümünde ve accent renk/font seçimlerinde hissettiriliyor.

---

## 2. Teknoloji Seçimleri

| Katman | Seçim | Neden |
|---|---|---|
| Yapı | Saf HTML5 | Framework yükü yok, hızlı yüklenir, her yerde barındırılabilir |
| Stil | Saf CSS3 (custom properties / CSS variables) | Tema değişkenlerini (renk, font) merkezi yönetmek için; build adımı gerekmiyor |
| Etkileşim | Vanilla JavaScript (ES6+) | Terminal simülasyonu, scroll animasyonları, hover efektleri için yeterli; framework gereksiz |
| Fontlar | `Space Grotesk` (başlıklar/gövde) + `JetBrains Mono` (terminal ve kod/etiketler) | Modern sans-serif + retro-monospace kombinasyonu |
| İkonlar | Basit SVG ikon seti (örn. Lucide icons, inline SVG) | Hafif, harici bağımlılık az |
| Barındırma | GitHub Pages veya Vercel/Netlify (statik site) | Ücretsiz, kolay deploy, custom domain bağlanabilir |
| Versiyon kontrol | Git + GitHub reposu | Değişiklik takibi, deploy otomasyonu (GitHub Pages/Vercel ile) |

**Neden framework yok:** Site tek sayfalık (SPA benzeri scroll deneyimi), dinamik veri/backend yok, build karmaşıklığına gerek yok. İleride blog gibi genişletme istenirse Next.js'e geçiş değerlendirilebilir — ama başlangıç için gereksiz karmaşıklık.

---

## 3. Tasarım Sistemi

### Renk Paleti (Dark mode ağırlıklı)
- **Arka plan:** `#0a0e0f` (neredeyse siyah, hafif yeşilimsi ton)
- **Yüzey/kart arka planı:** `#12181a`
- **Ana metin:** `#e4e8e6`
- **İkincil metin:** `#8a9490`
- **Accent (terminal yeşili):** `#39ff88` veya `#4ade80` — CTA butonları, linkler, terminal metni, cursor
- **Accent ikincil (opsiyonel, amber/cyan):** vurgular için
- **Border/ayırıcı:** `#1f2a26` (çok düşük kontrast, subtle)

### Tipografi
- Başlıklar: `Space Grotesk`, 600-700 weight
- Gövde metni: `Space Grotesk`, 400 weight
- Terminal/kod/etiketler: `JetBrains Mono`, 400-500 weight
- Ölçek: modüler scale (örn. 1rem taban, 1.25 çarpan)

### Layout
- Max-width container: ~1100px, ortalanmış
- Bol dikey boşluk (section padding: 6-8rem)
- Grid tabanlı proje kartları (auto-fit, minmax)
- Mobil-first responsive breakpoint'ler: 640px, 960px, 1200px

### Animasyon prensipleri
- Scroll'a bağlı fade-in + slight translateY (Intersection Observer ile)
- Hover'da hafif scale/glow (proje kartları)
- Terminal karakterleri satır satır typewriter efektiyle yazılıyor
- Tüm animasyonlar `prefers-reduced-motion` medya sorgusuna saygılı (erişilebilirlik)

---

## 4. Sayfa/Bölüm Yapısı

1. **Hero**
   - İsim, kısa unvan/tagline
   - Typewriter efektiyle değişen roller/etiketler (opsiyonel)
   - Sosyal medya ikon linkleri (GitHub, LinkedIn, email vb.)
   - Scroll-down indicator

2. **Hakkımda**
   - Kısa biyografi paragrafı
   - Foto/avatar (opsiyonel, yoksa monogram/ikon)

3. **Yetenekler**
   - Kategorilere ayrılmış etiket/badge grid (Diller, Araçlar, Framework'ler vb.)
   - Hover'da hafif highlight

4. **Projeler**
   - Kart grid, her kartta: başlık, kısa açıklama, teknoloji etiketleri, link(ler) (demo/repo)
   - Hover'da glow/border highlight efekti

5. **Deneyim & Eğitim**
   - Dikey timeline formatı
   - Her item: tarih aralığı, unvan/okul, kısa açıklama

6. **İletişim**
   - Email (mailto link), sosyal medya linkleri
   - Opsiyonel basit iletişim formu (statik site olduğu için Formspree/EmailJS gibi 3. parti servis gerekebilir)

7. **🖥️ Terminal Bölümü**
   - Kendi kendine simüle bir terminal penceresi (macOS tarzı üç nokta dekorasyonu opsiyonel)
   - Desteklenen komutlar: `help`, `whoami`, `about`, `skills`, `projects`, `contact`
   - Easter egg komutlar: `sudo hire-me`, `coffee`, `joke`, `clear`
   - Komut geçmişi (yukarı/aşağı ok tuşlarıyla gezinme)
   - Bilinmeyen komutta hata mesajı simülasyonu (`command not found`)
   - Blinking cursor animasyonu

8. **Footer**
   - Küçük imza, yıl, "built with vanilla JS" gibi bir not

---

## 5. Dosya Yapısı

```
Webiste/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   └── style.css
├── js/
│   ├── main.js          # scroll animasyonları, genel etkileşimler
│   └── terminal.js       # terminal simülasyon mantığı
├── assets/
│   ├── images/
│   └── icons/
├── PLAN.md
└── README.md
```

---

## 6. Geliştirme Aşamaları (Sıra)

1. **İskelet:** HTML yapısı + temel CSS reset/variables kurulumu
2. **Statik tasarım:** Tüm bölümlerin placeholder içerikle görsel olarak tamamlanması (responsive dahil)
3. **Scroll animasyonları:** Intersection Observer ile fade-in efektleri
4. **Terminal modülü:** Komut parser, komut listesi, typewriter efekti, geçmiş navigasyonu
5. **Gerçek içerik entegrasyonu:** CV bilgileriyle placeholder'ların değiştirilmesi
6. **Polish:** Hover efektleri, micro-interactions, favicon, meta tag'ler (SEO/OG)
7. **Test:** Mobil/tablet/desktop responsive test, farklı tarayıcı testi, erişilebilirlik kontrolü
8. **Deploy:** GitHub Pages veya Vercel'e yayınlama

---

## 7. Sonraki Adım

Kullanıcıdan CV/özgeçmiş içeriği (isim, unvan, biyografi, projeler, yetenekler, deneyim, eğitim, iletişim bilgileri) alınacak ve placeholder içerikler gerçek verilerle değiştirilecek.
