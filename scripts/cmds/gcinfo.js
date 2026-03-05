const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "gcinfo",
    aliases: ["spy", "spygc", "groupinfo"],
    version: "15.0.0",
    author: "Milon Hasan",
    countDown: 2,
    role: 0,
    shortDescription: "Fastest Group Monitoring Tool with Gender Count",
    category: "Information",
    guide: {
      en: "{pn} | {pn} list"
    }
  },

  onReply: async function ({ api, event, Reply, message }) {
    const { body } = event;
    const { groupList } = Reply;
    if (!isNaN(body) && groupList) {
      const inputNumber = parseInt(body);
      const targetIndex = inputNumber - 1;
      if (inputNumber <= 0 || !groupList[targetIndex]) return;
      const targetID = groupList[targetIndex].threadID;
      return await getGCInfo(api, targetID, message);
    }
  },

  onStart: async function ({ api, event, args, message }) {
    const { threadID } = event;
    try {
      if (args[0] === "list") {
        const allThreads = await api.getThreadList(500, null, ["INBOX"]);
        const groupList = allThreads.filter(group => group.isGroup);
        if (groupList.length === 0) return message.reply("❌ No groups found in database.");

        let msg = "╭──『 🛰️ 𝗚𝗖 𝗜𝗻𝗳𝗼 𝗟𝗶𝘀𝘁 』──╮\n\n";
        groupList.forEach((group, index) => {
          msg += `${index + 1}. 📦 ${group.name || "Unnamed Group"}\n`;
        });
        msg += `\n╰──────────────╯\n💡 Reply with a serial number to see details.`;

        return message.reply(msg, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            groupList: groupList
          });
        });
      }
      return await getGCInfo(api, threadID, message);
    } catch (err) {
      return message.reply(`❌ Error: ${err.message}`);
    }
  }
};

/* --- [ 🔐 INTERNAL_SECURE_METADATA ] ---
 * 🤖 BOT NAME: MILON BOT
 * 👤 OWNER: MILON HASAN
 * 🔗 FACEBOOK: https://www.facebook.com/share/17uGq8qVZ9/
 * 📞 WHATSAPP: +880 1912603270
 * 📍 LOCATION: NARAYANGANJ, BD
 * --------------------------------------- */

async function getGCInfo(api, id, message) {
  try {
    const info = await api.getThreadInfo(id);
    let male = 0, female = 0;
    if (info.userInfo) {
      info.userInfo.forEach(user => {
        if (user.gender === "MALE") male++;
        else if (user.gender === "FEMALE") female++;
      });
    }

    const infoMsg = `╭──『 🛰️ 𝗚𝗖 𝗜𝗻𝗳𝗼 𝗗𝗲𝘁𝗮𝗶𝗹𝘀 』──╮\n\n` +
                    `📝 𝗡𝗮𝗺𝗲: ${info.threadName || "No Name"}\n` +
                    `🆔 𝗜𝗗: ${id}\n\n` +
                    `👥 𝗠𝗲𝗺𝗯𝗲𝗿𝘀: ${info.participantIDs.length}\n` +
                    `🤵‍♂️ 𝗠𝗮𝗹𝗲: ${male}\n` +
                    `💃 𝗙𝗲𝗺𝗮𝗹𝗲: ${female}\n\n` +
                    `👮 𝗔𝗱𝗺𝗶𝗻𝘀: ${info.adminIDs.length}\n` +
                    `🏷️ 𝗡𝗶𝗰𝗸𝗻𝗮𝗺𝗲𝘀: ${Object.keys(info.nicknames || {}).length}\n` +
                    `🛡️ 𝗔𝗽𝗽𝗿𝗼𝘃𝗮𝗹: ${info.approvalMode ? "✅ 𝗢𝗻" : "❌ 𝗢𝗳𝗳"}\n` +
                    `💬 𝗠𝗲𝘀𝘀𝗮𝗴𝗲𝘀: ${info.messageCount || 0}\n` +
                    `🎨 𝗧𝗵𝗲𝗺𝗲: ${info.threadThemeID || "Default"}\n` +
                    `😄 𝗘𝗺𝗼𝗷𝗶: ${info.emoji || "👍"}\n\n` +
                    `╰──────────────╯`;

    if (info.imageSrc) {
      const response = await axios({
        url: info.imageSrc,
        method: 'GET',
        responseType: 'stream'
      });
      return message.reply({ body: infoMsg, attachment: response.data });
    } else {
      return message.reply(infoMsg);
    }
  } catch (e) {
    return message.reply(`❌ Fetching Failed: Info restricted.`);
  }
                               }
