const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "emoji_voice",
    version: "2.0.2",
    author: "亗 SIYAM HASAN 亗",
    countDown: 5,
    role: 0,
    shortDescription: "Sends a cute girl's voice when an emoji is used 😍",
longDescription: "One emoji triggers multiple voices, sent randomly 😘",
    category: "system"
  },

  onStart: async function () {},

  onChat: async function ({ event, message }) {
    const { body } = event;
    if (!body || body.length > 2) return;

    // --- EMOJI WITH MULTIPLE RANDOM AUDIO LINKS ---
    const emojiAudioMap = {
      "🥱": ["https://files.catbox.moe/9pou40.mp3","https://files.catbox.moe/60cwcg.mp3"],
      "😁": ["https://files.catbox.moe/60cwcg.mp3"],
      "😌": ["https://files.catbox.moe/epqwbx.mp3"],
      "🥺": ["https://files.catbox.moe/wc17iq.mp3","https://files.catbox.moe/dv9why.mp3"],
      "🤭": ["https://files.catbox.moe/cu0mpy.mp3"],
      "😅": ["https://files.catbox.moe/jl3pzb.mp3"],
      "😏": ["https://files.catbox.moe/z9e52r.mp3"],
      "😞": ["https://files.catbox.moe/tdimtx.mp3"],
      "🤫": ["https://files.catbox.moe/0uii99.mp3"],
      "🍼": ["https://files.catbox.moe/p6ht91.mp3"],
      "🤔": ["https://files.catbox.moe/hy6m6w.mp3"],
      "🥰": ["https://files.catbox.moe/dv9why.mp3"],
      "🤦": ["https://files.catbox.moe/ivlvoq.mp3"],
      "😘": ["https://files.catbox.moe/ma2jlz.mp4","https://files.catbox.moe/37dqpx.mp3"],
      "😑": ["https://files.catbox.moe/p78xfw.mp3"],
      "😢": ["https://files.catbox.moe/shxwj1.mp3"],
      "🙊": ["https://files.catbox.moe/3bejxv.mp3"],
      "🤨": ["https://files.catbox.moe/4aci0r.mp3"],
      "😡": ["https://files.catbox.moe/shxwj1.mp3","https://files.catbox.moe/h9ekli.mp3"],
      "🤬": ["https://files.catbox.moe/shxwj1.mp3","https://files.catbox.moe/h9ekli.mp3"],
      "🙈": ["https://files.catbox.moe/3qc90y.mp3"],
      "😍": ["https://files.catbox.moe/qjfk1b.mp3"],
      "😭": ["https://files.catbox.moe/itm4g0.mp3"],
      "😱": ["https://files.catbox.moe/mu0kka.mp3"],
      "😻": ["https://files.catbox.moe/y8ul2j.mp3"],
      "😿": ["https://files.catbox.moe/tqxemm.mp3"],
      "💔": ["https://files.catbox.moe/6yanv3.mp3"],
      "🤣": ["https://files.catbox.moe/2sweut.mp3","https://files.catbox.moe/jl3pzb.mp3"],
      "🥹": ["https://files.catbox.moe/jf85xe.mp3"],
      "বট": ["https://files.catbox.moe/3u6shs.mp3"],
      "🫣": ["https://files.catbox.moe/ttb6hi.mp3"],
      "🐸": ["https://files.catbox.moe/utl83s.mp3","https://files.catbox.moe/sg6ugl.mp3"],
      "💋": ["https://files.catbox.moe/37dqpx.mp3"],
      "🫦": ["https://files.catbox.moe/61w3i0.mp3"],
      "😴": ["https://files.catbox.moe/rm5ozj.mp3"],
      "🙏": ["https://files.catbox.moe/7avi7u.mp3"],
      "😼": ["https://files.catbox.moe/4oz916.mp3"],
      "🖕": ["https://files.catbox.moe/593u3j.mp3","https://files.catbox.moe/dtua60.mp3"],
      "🥵": ["https://files.catbox.moe/l90704.mp3"],
      "🙂": ["https://files.catbox.moe/4oks08.mp3"],
      "😒": ["https://files.catbox.moe/mt5il0.mp3"],
      "😓": ["https://files.catbox.moe/zh3mdg.mp3"],
      "🤧": ["https://files.catbox.moe/zh3mdg.mp3"],
      "🙄": ["https://files.catbox.moe/vgzkeu.mp3"]

    };

    const emoji = body.trim();
    const audioList = emojiAudioMap[emoji];
    if (!audioList) return;

    // --- RANDOM AUDIO SELECT ---
    const audioUrl = audioList[Math.floor(Math.random() * audioList.length)];

    const cacheDir = path.join(__dirname, "cache");
    fs.ensureDirSync(cacheDir);

    // 🔥 UNIQUE FILE NAME EVERY TIME TO AVOID REPEAT
    const filePath = path.join(
      cacheDir,
      `${encodeURIComponent(emoji)}_${Date.now()}_${Math.floor(Math.random() * 1000)}.mp3`
    );

    try {
      const response = await axios.get(audioUrl, { responseType: "arraybuffer" });
      fs.writeFileSync(filePath, Buffer.from(response.data));

      // 🔥 REPLY WITH FRESH STREAM
      await message.reply({ attachment: fs.createReadStream(filePath) });

      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete cache file:", err);
      });
    } catch (error) {
      console.error(error);
      message.reply("ইমোজি দিয়ে লাভ নাই 😒\nযাও বস সিয়াম কে কল দাও 😘 🫰+8801789138157");
    }
  }
};
