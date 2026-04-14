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

      const text = `╔═══════❖🔥 𝗢𝗪𝗡𝗘𝗥 𝗙𝗢𝗥𝗞 🔥❖═══════╗

╭─❖ 🤍 𝘼𝙎𝙎𝘼𝙇𝘼𝙈𝙐 𝘼𝙇𝘼𝙄𝙆𝙐𝙈 ❖─╮
│ ✨ শান্তি ও ভালোবাসা রইলো 💖
╰────────────────────────────╯

╔═━𓊈😊 𝗠𝗘𝗦𝗦𝗔𝗚𝗘 𝗭𝗢𝗡𝗘𓊉━═╗
║ আপনি চাইছেন আর আমার
║ 🔥 বস সিয়াম দিবেনা —
║ এটা কি কখনো হতে পারে?
╚═━━━❖💬❖━━━═╝

╭━━━❖💎 𝗦𝗜𝗬𝗔𝗠 𝗣𝗢𝗪𝗘𝗥 ❖━━━╮
┃ 💥 আমার বস সিয়াম অন্যদের মতো না ❌
┃ 🚫 কখনো কিছু প্রাইভেট রাখে না!
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╔═══════🎁 𝗚𝗜𝗙𝗧 𝗭𝗢𝗡𝗘 🎁═══════╗
║ 🎀 কষ্ট করে বানাইছে আপনাদের
║ 💝 উপহার দেওয়ার জন্য
╚════════════════════════════╝

╭━━━━━✨ 𝗨𝗦𝗘𝗥 𝗙𝗘𝗘𝗟 ✨━━━━━╮
┃ 😌 ব্যবহার করে আশা করি
┃ 💖 মজা পাবেন
╰━━━━━━━━━━━━━━━━━━━━━━╯

╔════❖📌 𝗙𝗢𝗥𝗞 𝗨𝗣𝗗𝗔𝗧𝗘 ❖════╗
║ 👉 https://github.com/mdsiyam01325251695016080-maker/siyam-Hassan-.git
║
║
╚════════════════════════════╝

╭━━━🌐 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗛𝗨𝗕 🌐━━━╮
┃ 📘 Facebook:
┃ ➤ https://www.facebook.com/profile.php?id=61568411310748
┃
┃ 💬 WhatsApp:
┃ ➤ +8801789138157
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╔═══════🙏 𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨 🙏═══════╗
║ 🤍 ধন্যবাদ 🤍
╚═══════👑 𝗦𝗜𝗬𝗔𝗠 𝗚𝗢𝗗 👑═══════╝`;

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
