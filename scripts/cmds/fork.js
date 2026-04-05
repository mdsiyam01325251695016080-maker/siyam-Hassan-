const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "fork",
    aliases: ["repo", "link"],
    version: "2.1",
    author: "Siyam",
    countDown: 3,
    role: 0,
    longDescription: "Premium styled fork message",
    category: "system",
    guide: { en: "{pn}" }
  },

  onStart: async function ({ message }) {
    try {

      const text = `╔══════════════════════════════╗
║      🌸 𝗢𝗪𝗡𝗘𝗥 𝗙𝗢𝗥𝗞 🌸      ║
╠══════════════════════════════╣
║ 🤍 আসসালামু আলাইকুম 🤍        ║
║                              ║
║ 😊 আপনি চাইছেন আর আমার        ║
║ 🔥 বস সিয়াম দিবেনা —         ║
║ এটা কি কখনো হতে পারে?        ║
║                              ║
║ 💎 আমার বস সিয়াম অন্যদের     ║
║ মতো না ❌                     ║
║ প্রাইভেট করে রাখবে না!        ║
║                              ║
║ 🎁 কষ্ট করে বানাইছে আপনাদের   ║
║ উপহার দেওয়ার জন্য           ║
║                              ║
║ ✨ ব্যবহার করে আশা করি        ║
║ মজা পাবেন 💖                 ║
╠══════════════════════════════╣
║ 📌 Fork Link 🔗              ║
║ 👉 https://github.com/mdsiyam01325251695016080-maker/siyam-Hassan-.git ║
╠══════════════════════════════╣
║ 📘 Facebook:https://www.facebook.com/profile.php?id=61568411310748             ║
║                            ║
║ 💬 WhatsApp:+8801789138157             ║
║                            ║
╠══════════════════════════════╣
║ 🙏 ধন্যবাদ 🤍                 ║
╚══════════════════════════════╝`;

      // ✅ শুধু নতুন পিক লিংক রাখা হয়েছে
      const imgUrl = "https://files.catbox.moe/uuvucm.jpg";

      const cachePath = path.join(__dirname, "cache");

      if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath);
      }

      const filePath = path.join(cachePath, "fork.jpg");

      const response = await axios.get(imgUrl, {
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, Buffer.from(response.data, "binary"));

      await message.reply({
        body: text,
        attachment: fs.createReadStream(filePath)
      });

      fs.unlinkSync(filePath);

    } catch (err) {
      console.error(err);
      message.reply("❌ Error sending fork!");
    }
  }
};
