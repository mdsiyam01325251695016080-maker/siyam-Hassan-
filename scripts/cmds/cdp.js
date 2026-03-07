const axios = require("axios");

module.exports = {
  config: {
    name: "cdp",
    aliases: ["coupledp", "pairdp"],
    version: "1.5",
    author: "saim fixed by Milon",
    countDown: 5,
    role: 0,
    category: "image",
    shortDescription: { en: "Get random couple DP (No-Prefix)" },
    guide: { en: "Just type 'cdp'" }
  },

  // --- No-Prefix Logic for Everyone ---
  onChat: async function ({ api, event }) {
    if (!event.body) return;
    const word = event.body.toLowerCase().trim();

    if (word === "cdp") {
      return this.onStart({ api, event });
    }
  },

  onStart: async function ({ api, event }) {
    const { threadID, messageID } = event;

    // 1. Immediate Response before processing
    api.sendMessage("⏳ | Please wait, Boss! Fetching your Couple DP... 😘✨", threadID, messageID);

    try {
      // 2. Fetch the Base API URL
      const urlRes = await axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/ApiUrl.json");
      const baseUrl = urlRes.data.saimx69x;

      // 3. Fetch the Couple DP Data
      const res = await axios.get(`${baseUrl}/api/cdp2`);
      const { boy, girl } = res.data;

      // 4. Helper to get image streams
      const getImg = async (url) => {
        return (await axios.get(url, { responseType: "stream" })).data;
      };

      // 5. Send images
      return api.sendMessage({
        body: "𝐇𝐞𝐫𝐞'𝐬 𝐲𝐨𝐮𝐫 𝐂𝐨𝐮𝐩𝐥𝐞 𝐃𝐏! 😘✨",
        attachment: [await getImg(girl), await getImg(boy)]
      }, threadID, messageID);

    } catch (e) {
      console.error(e);
      return api.sendMessage("❌ API Error! Please try again later.", threadID, messageID);
    }
  }
};
