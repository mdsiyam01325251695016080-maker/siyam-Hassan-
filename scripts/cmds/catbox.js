const axios = require("axios");
const fs = require("fs-extra");
const FormData = require("form-data");
const path = require("path");

async function handleCatboxUpload({ event, api, message }) {
  const { messageReply, messageID } = event;

  if (!messageReply || !messageReply.attachments || messageReply.attachments.length === 0) {
    return message.reply("⚠️ | Please reply to an image or video.");
  }

  const attachment = messageReply.attachments[0];
  const fileUrl = attachment.url;

  // ✅ Detect extension properly
  let ext = ".dat";
  if (attachment.type === "photo") ext = ".jpg";
  else if (attachment.type === "video") ext = ".mp4";
  else if (attachment.type === "audio") ext = ".mp3";

  // ✅ Unique file name (fix overwrite issue)
  const filePath = path.join(__dirname, `temp_${Date.now()}${ext}`);

  api.setMessageReaction("⏳", messageID, () => {}, true);
  const loading = await message.reply("📤 Uploading to Catbox... Please wait!");

  try {
    // 📥 Download file
    const response = await axios.get(fileUrl, { responseType: "stream" });
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // 📤 Upload to Catbox
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("fileToUpload", fs.createReadStream(filePath));

    const upload = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    fs.unlinkSync(filePath);

    api.setMessageReaction("✅", messageID, () => {}, true);

    // ✅ Clean link output
    const link = upload.data?.toString().trim();

    return message.reply(`✅ | Upload Successful!\n🔗 ${link}`);

  } catch (err) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    api.setMessageReaction("❌", messageID, () => {}, true);

    console.error(err.response?.data || err.message);

    return message.reply("❌ | Upload failed! Try again later.");
  } finally {
    setTimeout(() => {
      api.unsendMessage(loading.messageID);
    }, 4000);
  }
}

module.exports = {
  config: {
    name: "catbox",
    aliases: ["ct"],
    version: "2.0",
    author: "Fixed by ChatGPT",
    countDown: 5,
    role: 0,
    shortDescription: "Upload media to catbox",
    longDescription: "Reply to image/video/audio to upload to catbox.moe",
    category: "tools",
    guide: {
      en: "{pn} (reply to media)"
    }
  },

  onStart: async function ({ event, api, message }) {
    return handleCatboxUpload({ event, api, message });
  }
};
