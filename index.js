const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel]
});


let istatistikler = {
    kayitli: 0,
    kayitsiz: 0,
    erkek: 0,
    kiz: 0
};


client.once("ready", async () => {
    console.log(`${client.user.tag} aktif!`);

    
    client.guilds.cache.forEach(async guild => {
        try {
            await guild.members.fetch();

            const kayitsizRol = guild.roles.cache.get(config.kayitsizRol);
            const kizRol = guild.roles.cache.get(config.kizRol);
            const erkekRol = guild.roles.cache.get(config.erkekRol);

            istatistikler.kayitsiz = kayitsizRol ? kayitsizRol.members.filter(m => m.id !== guild.ownerId).size : 0;
            istatistikler.kiz = kizRol ? kizRol.members.size : 0;
            istatistikler.erkek = erkekRol ? erkekRol.members.size : 0;
            istatistikler.kayitli = istatistikler.kiz + istatistikler.erkek;

            console.log("Başlangıç İstatistikleri:", istatistikler);
        } catch (err) {
            console.log("İstatistik alınamadı:", err);
        }
    });
});


client.on("guildMemberAdd", async (member) => {
    if (member.id === member.guild.ownerId) return; 
    const kayitsizRol = member.guild.roles.cache.get(config.kayitsizRol);
    if (kayitsizRol) member.roles.add(kayitsizRol).catch(() => {});

    if (config.dmKayitsiz) {
        member.send("Merhaba! Sunucuya katıldınız, kayıt olmanız gerekiyor.").catch(() => {});
    }

    
});


client.on("messageCreate", async (message) => {
    if (!message.guild || message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
    const guild = message.guild;

    
    if (!message.member.roles.cache.has(config.kayitYetkiliRol)) {
        const embed = new EmbedBuilder()
            .setTitle("❌ Yetki Hatası")
            .setDescription("Bu komutu kullanmak için kayıt yetkilisi olmanız gerekiyor.")
            .setColor("Red");
        return message.channel.send({ embeds: [embed] });
    }

    
if (command === "yardim") {
    const embed = new EmbedBuilder()
        .setTitle("📜 Kayıt Bot Komutları")
        .setColor("Blue")
        .setDescription(
            `${config.prefix}kayitsiz → Kayıtsız üyeleri gösterir.\n` +
            `${config.prefix}kayitsiz dm → Kayıtsız üyelerin DM’ine mesaj yollar.\n` +
            `${config.prefix}kayit k <@üye> <isim> → Kız olarak kaydet (sadece kayıt odasında).\n` +
            `${config.prefix}kayit e <@üye> <isim> → Erkek olarak kaydet (sadece kayıt odasında).\n` +
            `${config.prefix}istatistik → Roller üzerinden istatistik gösterir.\n` +
            `${config.prefix}yardim → Bu menüyü gösterir.\n\n` +
            `👑 By: **Zywexx**\n` +
            `🌐 Sunucu: [Discord Sunucusu](https://discord.gg/YAEjW6drVY)`
        );
    return message.channel.send({ embeds: [embed] });
}


    
    if (command === "kayitsiz") {
        const kayitsizRol = guild.roles.cache.get(config.kayitsizRol);
        if (!kayitsizRol) {
            const embed = new EmbedBuilder()
                .setTitle("❌ Hata")
                .setDescription("Kayıtsız rolü bulunamadı.")
                .setColor("Red");
            return message.channel.send({ embeds: [embed] });
        }

        let kayitsizUyeList = kayitsizRol.members
            .filter(m => m.id !== guild.ownerId)
            .map(m => `${m.user.tag}`)
            .join("\n");
        if (!kayitsizUyeList) kayitsizUyeList = "Kayıtsız üye yok.";

        const embed = new EmbedBuilder()
            .setTitle("❔ Kayıtsız Üyeler")
            .setDescription(kayitsizUyeList)
            .setColor("Yellow");
        message.channel.send({ embeds: [embed] });

        if (args[0] === "dm" && config.dmKayitsiz) {
            kayitsizRol.members
                .filter(m => m.id !== guild.ownerId)
                .forEach(m => m.send("Merhaba! Kayıt olmanız gerekiyor.").catch(() => {}));
            const dmEmbed = new EmbedBuilder()
                .setDescription("📩 Kayıtsız üyelere DM gönderildi.")
                .setColor("Green");
            message.channel.send({ embeds: [dmEmbed] });
        }
    }

    
    if (command === "kayit") {
        if (message.channel.id !== config.kayitKanal) {
            const embed = new EmbedBuilder()
                .setTitle("❌ Hata")
                .setDescription(`Bu komut sadece <#${config.kayitKanal}> kanalında kullanılabilir.`)
                .setColor("Red");
            return message.channel.send({ embeds: [embed] });
        }

        const cinsiyet = args.shift();
        const uye = message.mentions.members.first() || guild.members.cache.get(args[0]);
        const isim = args.slice(1).join(" ");

        if (!cinsiyet || !uye || !isim) {
            const embed = new EmbedBuilder()
                .setTitle("❌ Kullanım Hatası")
                .setDescription(`Kullanım: ${config.prefix}kayit <k/e> <@üye> <isim>`)
                .setColor("Red");
            return message.channel.send({ embeds: [embed] });
        }

        if (uye.id === guild.ownerId) {
            const embed = new EmbedBuilder()
                .setTitle("❌ Hata")
                .setDescription("Kurucu zaten kayıtlı sayılır, değişiklik yapılamaz.")
                .setColor("Red");
            return message.channel.send({ embeds: [embed] });
        }

        let rol;
        if (cinsiyet.toLowerCase() === "k") rol = config.kizRol;
        else if (cinsiyet.toLowerCase() === "e") rol = config.erkekRol;
        else {
            const embed = new EmbedBuilder()
                .setTitle("❌ Hata")
                .setDescription("Cinsiyet `k` (kız) veya `e` (erkek) olmalı.")
                .setColor("Red");
            return message.channel.send({ embeds: [embed] });
        }

        try {
            await uye.setNickname(isim);
            await uye.roles.remove(config.kayitsizRol).catch(() => {});
            await uye.roles.add(rol);

            
            istatistikler.kayitli++;
            if (rol === config.kizRol) istatistikler.kiz++;
            if (rol === config.erkekRol) istatistikler.erkek++;
            istatistikler.kayitsiz = istatistikler.kayitsiz > 0 ? istatistikler.kayitsiz - 1 : 0;

            const embed = new EmbedBuilder()
                .setTitle("✅ Kayıt Başarılı")
                .setDescription(`${uye} başarıyla kaydedildi!`)
                .setColor("Green");
            message.channel.send({ embeds: [embed] });

            
            const logKanal = guild.channels.cache.get(config.logKanal);
            if (logKanal) {
                const logEmbed = new EmbedBuilder()
                    .setTitle("📌 Kayıt Yapıldı")
                    .addFields(
                        { name: "Kayıt Eden", value: `${message.author}`, inline: true },
                        { name: "Kayıt Edilen", value: `${uye}`, inline: true },
                        { name: "Verilen Rol", value: `<@&${rol}>`, inline: true }
                    )
                    .setColor("Blue");
                logKanal.send({ embeds: [logEmbed] });
            }

            
            const welcomeKanal = guild.channels.cache.get(config.welcomeKanal);
            if (welcomeKanal) {
                const welcomeEmbed = new EmbedBuilder()
                    .setDescription(`🎉 Aramıza hoş geldin ${uye}!`)
                    .setColor("Green");
                welcomeKanal.send({ embeds: [welcomeEmbed] });
            }

        } catch (err) {
            const embed = new EmbedBuilder()
                .setTitle("❌ Yetki Hatası")
                .setDescription("Bu üyeyi kaydetmek için yeterli yetkim yok veya rolü değiştiremem.")
                .setColor("Red");
            message.channel.send({ embeds: [embed] });
        }
    }

    
    if (command === "istatistik") {
        const embed = new EmbedBuilder()
            .setTitle("📊 Sunucu İstatistikleri")
            .setColor("Blue")
            .addFields(
                { name: "👩 Kız Üye", value: `${istatistikler.kiz}`, inline: true },
                { name: "👨 Erkek Üye", value: `${istatistikler.erkek}`, inline: true },
                { name: "❔ Kayıtsız Üye", value: `${istatistikler.kayitsiz}`, inline: true },
                { name: "👥 Toplam Kayıtlı Üye", value: `${istatistikler.kayitli}`, inline: true }
            );

        message.channel.send({ embeds: [embed] });
    }
});

client.login(config.token);
