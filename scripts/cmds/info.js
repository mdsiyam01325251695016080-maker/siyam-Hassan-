const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "info",
    version: "3.0.1",
    author: "Customized by Siyam",
    role: 0,
    countDown: 20,
    shortDescription: {
      en: "Owner & bot information"
    },
    longDescription: {
      en: "Show detailed information about the bot, owner, uptime and socials"
    },
    category: "owner",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message }) {

    const totalCommands = global.GoatBot?.commands?.size || 0;

    const now = moment().tz("Asia/Dhaka");
    const date = now.format("MMMM Do YYYY");
    const time = now.format("h:mm:ss A");

    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    const videoLink = "https://files.catbox.moe/k3bmau.mp4";

    return message.reply({
      body: `
⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆
╭•┄┅══❁🌺❁══┅┄•╮
•—»✨𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢✨«—•
╰•┄┅══❁🌺❁══┅┄•╯
⋆✦⋆⎯⎯⎯⎯⎯⎯⎯⎯⎯⋆✦⋆

╔══════════════════╗
║[𝗢𝗪𝗡𝗘𝗥:-[𝗨𝗗𝗔𝗬 𝗛𝗢𝗦𝗦𝗘𝗜𝗡 𝗦𝗜𝗬𝗔𝗠]] 
║🤖>𝗕𝗢𝗧-𝗡𝗔𝗠𝗘:-[>𝑺𝒊𝒚𝒂𝒎 𝑪𝒉𝒂𝒕 𝑩𝒐𝒕<]
╠══════════════════╣
║♻️>𝗥𝗲𝗹𝗶𝗴𝗶𝗼𝗻:- [>𝗜𝘀𝗹𝗮𝗺<]
║📝>𝗔𝗴𝗲:-  [>16<]
║🚻>𝗚𝗲𝗻𝗱𝗲𝗿:-  [>𝗠𝗮𝗹𝗲<]
╠══════════════════╣
║🌐>𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸:-↓
║https://www.facebook.com/profile.php?id=61568411310748
║→UDAY.HOSSEIN.SIYAM
║💬>𝗠𝗲𝘀𝘀𝗲𝗻𝗴𝗲𝗿:-↓
║ m.me/UDAY.HOSSEIN.SIYAM
║📞>𝗪𝗵𝗮𝘁𝘀𝗔𝗽𝗽:-↓
║ wa.me/+8801789138157
╠══════════════════╣
║⚡>𝗣𝗿𝗲𝗳𝗶𝘅:-『 / 』
║📦>𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀:-『 ${totalCommands} 』
║🚀>𝗣𝗶𝗻𝗴:- N/A
╠══════════════════╣
║⏳>𝗨𝗽𝘁𝗶𝗺𝗲:- ${uptimeString}
║🕒>𝗧𝗶𝗺𝗲:-『 ${time} 』
║🗓>𝗗𝗮𝘁𝗲:-『 ${date} 』
╠══════════════════╣
║🏠>𝐀𝐃𝐃𝐑𝐄𝐒𝐒:-[𝐊𝐈𝐒𝐇𝐎𝐑𝐆𝐎𝐍𝐉]
║             [𝐁𝐀𝐍𝐆𝐋𝐀𝐃𝐄𝐒𝐇]
║📚>𝗦𝗖𝗛𝗢𝗢𝗟:-[>𝗠 𝗔 𝗠𝗔𝗡𝗡𝗔𝗡 𝗠𝗔𝗡𝗜𝗞 𝗛𝗜𝗚𝗛 𝗦𝗖𝗛𝗢𝗢𝗟<]
║👩‍❤️‍👨>𝐑𝐄𝐋𝐀𝐓𝐈𝐎𝐍𝐒𝐇𝐈𝐏:-[>𝗦𝗜𝗡𝗚𝗟𝗘<]
║🧑‍🔧>𝐖𝐎𝐑𝐊:- [>𝗡𝗢𝗧 𝗪𝗢𝗥𝗞𝗜𝗡𝗚<]
╠══════════════════╣
║ ⊱༅༎😼💎༅༎⊱

- আমি ভদ্র, কিন্তু কেউ আমাকে হালকাভাবে নিতে পারবে না ✌️
- আমি যেটা চাই তা অর্জন করি, আর কারো চাপে কখনো চলি না 💥

⊱༅༎😼💎༅༎⊱
╠══════════════════╣
♡𝗧𝗛𝗔𝗡𝗞𝗦 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚 𝗠𝗬♡
♡𝑺𝒊𝒚𝒂𝒎 𝑪𝒉𝒂𝒕 𝑩𝒐𝒕♡
╚══════════════════╝
`,
      attachment: await global.utils.getStreamFromURL(videoLink)
    });
  }
};
