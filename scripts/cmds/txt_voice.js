const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "text_voice",
    version: "1.0.0",
    author: "MOHAMMAD AKASH",
    countDown: 5,
    role: 0,
    shortDescription: "নির্দিষ্ট টেক্সটে ভয়েস রিপ্লাই 😍",
    longDescription: "তুমি যদি নির্দিষ্ট কিছু টেক্সট পাঠাও, তাহলে কিউট মেয়ের ভয়েস প্লে করবে 😍",
    category: "noprefix",
  },

  onChat: async function ({ event, message }) {
    const { body } = event;
    if (!body) return;

    const textAudioMap = {
      "i love you": "https://files.catbox.moe/npy7kl.mp3",
      "matha beta": "https://files.catbox.moe/5rdtc6.mp3",

      // 🆕 তোমার দেওয়া সেটগুলো (clean করা)
      "magi": "https://files.catbox.moe/ecgpak.mp4",
      "মাগি": "https://files.catbox.moe/ecgpak.mp4",
      "খানকি": "https://files.catbox.moe/ecgpak.mp4",
      "khanki": "https://files.catbox.moe/ecgpak.mp4",

      "siyam": "https://files.catbox.moe/hd993x.mp3",
      "সিয়াম ভাই": "https://files.catbox.moe/hd993x.mp3",
      "সিয়াম": "https://files.catbox.moe/hd993x.mp3",

      "nijhum": "https://files.catbox.moe/3u6shs.mp3",
      "niju": "https://files.catbox.moe/3u6shs.mp3",
      "নিঝুম": "https://files.catbox.moe/3u6shs.mp3"
    };

    const key = body.trim().toLowerCase();
    const audioUrl = textAudioMap[key];
    if (!audioUrl) return;

    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

    const filePath = path.join(cacheDir, `${encodeURIComponent(key)}.mp3`);

    try {
      const response = await axios({
        method: "GET",
        url: audioUrl,
        responseType: "stream",
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", async () => {
        await message.reply({
          attachment: fs.createReadStream(filePath),
        });
        fs.unlink(filePath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      });

      writer.on("error", (err) => {
        console.error("Error writing file:", err);
        message.reply("ভয়েস প্লে হয়নি 😅");
      });
    } catch (error) {
      console.error("Error downloading audio:", error);
      message.reply("ভয়েস প্লে হয়নি 😅");
    }
  },

  onStart: async function () {},
};
