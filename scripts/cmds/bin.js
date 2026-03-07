const fsExtra = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

// ===== CONFIG =====
const ALLOWED_UID = [
  "61586540721576",
  "61585985686316"
];

const API_SOURCE =
  "https://raw.githubusercontent.com/Ayan-alt-deep/xyc/main/baseApiurl.json";

// ==================

module.exports = {
  config: {
    name: "exbin",
    aliases: ["bin"],
    version: "3.3-fixed",
    author: "Eren | Fixed by Xrotick",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Upload files to APIbin [Owner Only]"
    },
    longDescription: {
      en: "Upload local files or replied attachments to apibin (owner restricted)"
    },
    category: "utility",
    guide: {
      en: "{pn} <filename> OR reply to a file"
    }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      if (!ALLOWED_UID.includes(event.senderID)) {
        return message.reply("⛔ You are not authorized to use this command.");
      }

      const baseApiUrl = await getApiBinUrl();
      if (!baseApiUrl) {
        return message.reply("❌ Failed to fetch API base URL.");
      }

      // Reply attachment
      if (
        event.type === "message_reply" &&
        event.messageReply?.attachments?.length
      ) {
        return this.uploadAttachment(api, event, baseApiUrl);
      }

      const fileName = args[0];
      if (!fileName) {
        return message.reply(
          "📝 Provide a filename or reply to a file."
        );
      }

      await this.uploadFile(api, event, fileName, baseApiUrl);
    } catch (err) {
      console.error("EXBIN ERROR:", err);
      message.reply("❌ Error: " + err.message);
    }
  },

  uploadFile: async function (api, event, fileName, baseApiUrl) {
    const filePath = this.findFilePath(fileName);
    if (!filePath.exists) {
      return api.sendMessage(
        `🔍 File "${fileName}" not found!`,
        event.threadID,
        event.messageID
      );
    }

    const form = new FormData();
    form.append("file", fsExtra.createReadStream(filePath.fullPath));

    const { data } = await axios.post(`${baseApiUrl}/upload`, form, {
      headers: form.getHeaders()
    });

    return api.sendMessage(
      `✅ File uploaded!\n📝 Raw URL:\n${data.raw}`,
      event.threadID,
      event.messageID
    );
  },

  uploadAttachment: async function (api, event, baseApiUrl) {
    const attachment = event.messageReply.attachments[0];

    const response = await axios.get(attachment.url, {
      responseType: "stream"
    });

    const form = new FormData();
    form.append(
      "file",
      response.data,
      attachment.name || "file.bin"
    );

    const { data } = await axios.post(`${baseApiUrl}/upload`, form, {
      headers: form.getHeaders()
    });

    return api.sendMessage(
      `✅ Attachment uploaded!\n📝 Raw URL:\n${data.raw}`,
      event.threadID,
      event.messageID
    );
  },

  findFilePath: function (fileName) {
    const dir = path.join(__dirname, "..", "cmds");
    const exts = ["", ".js", ".ts", ".txt", ".json"];

    for (const ext of exts) {
      const fullPath = path.join(dir, fileName + ext);
      if (fsExtra.existsSync(fullPath)) {
        return { exists: true, fullPath };
      }
    }
    return { exists: false };
  }
};

// ===== API URL FETCH =====
async function getApiBinUrl() {
  try {
    const { data } = await axios.get(API_SOURCE);
    return data.uploadApi;
  } catch (err) {
    console.error("API FETCH ERROR:", err.message);
    return null;
  }
}
