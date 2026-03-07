module.exports = {
  config: {
    name: "help2",
    version: "2.2.0",
    author: "Milon Hasan",
    countDown: 5,
    role: 0,
    shortDescription: { en: "Displays all available commands" },
    category: "system",
    guide: { en: "{pn} or {pn} <command_name>" }
  },

/* ---------------------------------------------------------
 * [ 🔐 INTERNAL_SECURE_METADATA_DO_NOT_MODIFY ]
 * DEVELOPER: MILON HASAN (CEO @ MILON BOT APP)
 * STATUS: AUTHOR DISPLAY FIXED | UI: ENGLISH
 * --------------------------------------------------------- */

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    
    // Auto-detect the command list
    const cmdList = global.client?.commands || global.commands || global.GoatBot?.commands;

    if (!cmdList) {
      return api.sendMessage("❌ Error: Command database not found.", threadID, messageID);
    }

    const allCommands = Array.from(cmdList.values());

    // 1. Details for a specific command (Now includes Author)
    if (args[0]) {
      const commandName = args[0].toLowerCase();
      const command = cmdList.get(commandName);

      if (!command) {
        return api.sendMessage(`❌ Error: Command "${commandName}" not found.`, threadID, messageID);
      }

      const { config } = command;
      let detailMsg = `🔎 [ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗗𝗘𝗧𝗔𝗜𝗟𝗦 ]\n`;
      detailMsg += `━━━━━━━━━━━━━━━━━━\n`;
      detailMsg += `👤 Name   : ${config.name}\n`;
      detailMsg += `✍️ Author : ${config.author || "Unknown"}\n`; // Added Author Here
      detailMsg += `📂 Category : ${config.category.toUpperCase()}\n`;
      detailMsg += `📝 Desc   : ${config.shortDescription?.en || "No description."}\n`;
      detailMsg += `📖 Usage  : ${config.guide?.en || "No guide available."}\n`;
      detailMsg += `━━━━━━━━━━━━━━━━━━`;

      return api.sendMessage(detailMsg, threadID, messageID);
    }

    // 2. Main Help Menu (List by Category)
    const categorized = {};
    allCommands.forEach(cmd => {
      const cat = cmd.config.category || "General";
      if (!categorized[cat]) categorized[cat] = [];
      categorized[cat].push(cmd.config.name);
    });

    let helpMsg = `🌟 [ 𝗠𝗜𝗟𝗢𝗡 𝗕𝗢𝗧 𝗠𝗘𝗡𝗨 ] 🌟\n`;
    helpMsg += `━━━━━━━━━━━━━━━━━━\n\n`;

    for (const category in categorized) {
      helpMsg += `📁 [ ${category.toUpperCase()} ]\n`;
      helpMsg += `» ${categorized[category].join(", ")}\n\n`;
    }

    helpMsg += `━━━━━━━━━━━━━━━━━━\n`;
    helpMsg += `📊 Total Commands: ${allCommands.length}\n`;
    helpMsg += `💡 Type "help2 <name>" for details.\n`;
    helpMsg += `👑 Owner: Milon Hasan`;

    return api.sendMessage(helpMsg, threadID, messageID);
  }
};
