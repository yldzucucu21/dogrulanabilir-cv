
# CV Sistemi

> Modern, doğrulanabilir ve profesyonel CV oluşturma uygulaması (Next.js, TypeScript)

---

## Özellikler

- **Sürükle-Bırak Bölümler:** CV bölümlerini kolayca taşıyın, sıralayın, kategori seçin.
- **Profil Fotoğrafı:** Yuvarlak önizleme, kolay yükleme ve silme.
- **Bağlantılar:** LinkedIn, GitHub, Portföy/Website alanları.
- **Sertifika Yükleme:** PDF veya görsel olarak sertifika ekleyin, önizleyin.
- **PDF/PNG Dışa Aktarım:** CV'yi PDF veya görsel olarak indirin. PDF'de doğrulama kodu bulunur.
- **Doğrulama Sistemi:** PDF'deki kodu /verify sayfasında girerek CV'nin gerçekliğini kontrol edin.
- **Blockchain Damgalama:** CV'yi blockchain'e damgalayın, hash ile doğrulayın (mock).
- **Kategoriler:** 12 profesyonel kategori, tıklanarak hızlı ekleme.
- **Kullanıcı Dostu Arayüz:** Modern, responsive ve sade tasarım.

---

## Kurulum

```powershell
cd "C:\Users\Yıldız\Desktop\cv sistemi"
npm install
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışır.

---

## Kullanım

1. **CV Oluştur:**
	- Profil bilgilerini, bağlantıları ve fotoğrafı ekleyin.
	- Bölümler ekleyin, kategorileri seçin, sürükleyin.
	- Sertifika dosyası yükleyin (isteğe bağlı).
2. **Önizleme:**
	- Sağda gerçek zamanlı CV önizlemesi.
3. **Dışa Aktar:**
	- PDF veya PNG olarak indirin. PDF'de doğrulama kodu bulunur.
4. **Doğrulama:**
	- /verify sayfasında PDF'deki kodu girerek CV'nin gerçekliğini kontrol edin.

---

## Ekran Görüntüsü

> ![cv-uygulama-ekran](docs/screenshot.png)

---

## Teknik Detaylar

- **Framework:** Next.js (pages router), React 18, TypeScript
- **State:** useState, prop drilling
- **PDF/PNG:** html2canvas, jsPDF
- **Sürükle-Bırak:** react-beautiful-dnd
- **Dosya Yükleme:** FileReader (Base64)
- **Veri Saklama:** data/db.json (mock JSON dosyası)
- **API:** Next.js API routes (kategori, cv, blockchain)

---

## Katkı

Katkı sağlamak için PR gönderebilir veya issue açabilirsiniz.

---

## Lisans

MIT
