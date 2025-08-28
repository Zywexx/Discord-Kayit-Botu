
# 🤖 Discord Kayıt Botu

---

## 🚀 Özellikler

- ✅ **Otomatik Kayıtsız Rolü** → Yeni giren üyeye otomatik kayıtsız rolü verilir  
- ✅ **Kayıt Kanalı Kontrolü** → Kayıt işlemleri sadece kayıt kanalında yapılabilir  
- ✅ **Kayıt Yetkilisi Kontrolü** → Komutları sadece yetkililer kullanabilir  
- ✅ **Erkek / Kız Kayıt** → `.kayit e` veya `.kayit k` komutlarıyla kayıt  
- ✅ **DM Bilgilendirme** → Kayıtsız üyeye otomatik mesaj gönderme (opsiyonel)  
- ✅ **Kayıtsız Listeleme** → `.kayitsiz` komutu ile kayıtsızları görüntüleme  
- ✅ **Kayıtsızlara DM Gönderme** → `.kayitsiz dm` ile toplu bilgilendirme  
- ✅ **İstatistik Sistemi** → Kaç kayıtlı erkek, kız, kayıtsız üye olduğunu gösterir  
- ✅ **Kayıt Logları** → Kim kimi kaydetti, hangi rol verildi log kanalına düşer  
- ✅ **Hoş Geldin Mesajı** → Yeni kayıt olan üyeye hoş geldin mesajı gönderir  
- ✅ **Embed Mesajlar** → Modern ve şık görünümlü mesaj sistemi  

---

## 🛠️ Kurulum

1. Projeyi indir veya klonla:
    ```bash
   git clone https://github.com/Zywexx/Discord-Kayit-Botu.git
   cd kayit-bot
   ```

2. Gerekli bağımlılıkları yükle:

   ```bash
   npm install discord.js
   ```

3. `config.json` dosyasını oluştur ve aşağıdaki gibi doldur:

   ```json
   {
     "token": "BOT_TOKENINIZ",
     "prefix": ".",
     "kayitsizRol": "KAYITSIZ_ROL_ID",
     "erkekRol": "ERKEK_ROL_ID",
     "kizRol": "KIZ_ROL_ID",
     "kayitYetkiliRol": "YETKILI_ROL_ID",
     "kayitKanal": "KAYIT_KANAL_ID",
     "logKanal": "LOG_KANAL_ID",
     "welcomeKanal": "WELCOME_KANAL_ID",
     "dmKayitsiz": true
   }
   ```

4. Botu çalıştır:

   ```bash
   node index.js
   ```

---

## 📜 Komutlar

| Komut                | Açıklama                                                 |
| -------------------- | -------------------------------------------------------- |
| `.yardim`            | Yardım menüsünü gösterir                                 |
| `.kayitsiz`          | Kayıtsız üyeleri listeler                                |
| `.kayitsiz dm`       | Kayıtsız üyelere DM gönderir                             |
| `.kayit k @üye İsim` | Üyeyi kız olarak kaydeder (**sadece kayıt kanalında**)   |
| `.kayit e @üye İsim` | Üyeyi erkek olarak kaydeder (**sadece kayıt kanalında**) |
| `.istatistik`        | Sunucu istatistiklerini gösterir                         |

---

## 🖼️ Kullanım Örnekleri

* `.kayit e @Ahmet Ahmet Yılmaz` → Ahmet’i **erkek** olarak kaydeder
* `.kayit k @Ayşe Ayşe Demir` → Ayşe’yi **kız** olarak kaydeder
* `.kayitsiz` → Sunucudaki kayıtsız üyeleri listeler
* `.kayitsiz dm` → Kaydı olmayanlara özelden kayıt mesajı gönderir
* `.istatistik` → Toplam kayıtlı ve kayıtsız istatistiklerini gösterir

---

## 👑 Bot Sahibi & Destek

* 👤 **Bot Sahibi:** Zywexx
* 🌐 **Discord Sunucusu:** [Katılmak için tıkla](https://discord.gg/YAEjW6drVY)

---

## ⚡ Notlar

* Kayıt işlemleri sadece **kayıt kanalı** içinde yapılabilir
* Komutları sadece **kayıt yetkilisi rolü** kullanabilir
* Sunucu kurucusu hiçbir zaman kayıtsız/kayıtlı olarak değiştirilemez

---

## 📄 Lisans

Bu proje **MIT Lisansı** ile paylaşılmıştır.
İstediğiniz gibi geliştirebilir, düzenleyebilir ve kullanabilirsiniz.

---

✨ **By Zywexx**
