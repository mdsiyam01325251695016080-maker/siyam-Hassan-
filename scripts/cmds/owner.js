const fs = require("fs-extra");
const request = require("request");
const path = require("path");

let imgIndex = 0; // image tracker

module.exports = {
  config: {
    name: "owner",
    version: "3.0.0",
    author: "SIAM",
    role: 0,
    shortDescription: "Owner info with multiple images",
    category: "Information",
    guide: {
      en: "owner"
    }
  },

  onStart: async function ({ api, event }) {

    const images = [
      "https://files.catbox.moe/losz8x.jpg",
      "https://files.catbox.moe/x6e4xy.jpg",
      "https://files.catbox.moe/qewip7.jpg"
    ];

    // change image each time
    const imgLink = images[imgIndex];
    imgIndex = (imgIndex + 1) % images.length;

    const ownerText = 
`╔═══════ 👑 OWNER PROFILE 👑 ═══════╗

👤 𝐍𝐀𝐌𝐄 ➤ UDOY HASAN SIAM
🤖 𝐁𝐎𝐓 𝐀𝐃𝐌𝐈𝐍 ➤ YES

╠═══════ 📜 ABOUT ME 📜 ═══════╣

➤ I am simple but different 😌
➤ I show people what they deserve 🙂

╠═══════ 📍 INFO 📍 ═══════╣

🏠 𝐀𝐃𝐃𝐑𝐄𝐒𝐒 ➤ Kishoreganj, Bangladesh  
🚻 𝐆𝐄𝐍𝐃𝐄𝐑 ➤ Male  
💞 𝐒𝐓𝐀𝐓𝐔𝐒 ➤ Single  
🧑‍🔧 𝐖𝐎𝐑𝐊 ➤ No Job  
🕋 𝐑𝐄𝐋𝐈𝐆𝐈𝐎𝐍 ➤ Islam  

╠═══════ 📞 CONTACT 📞 ═══════╣

📱 WhatsApp ➤ https://wa.me/+8801789138157  
🌍 Facebook ➤ https://www.facebook.com/profile.php?id=61568411310748  

╚═══════ 💙 THANK YOU 💙 ═══════╝
`;

    const cacheDir = path.join(__dirname, "cache");
    const imgPath = path.join(cacheDir, "owner.jpg");

    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const send = () => {
      api.sendMessage(
        {
          body: ownerText,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath),
        event.messageID
      );
    };

    request(encodeURI(imgLink))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", send);
  }
};
