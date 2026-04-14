const axios = require("axios");
const { getPrefix, getStreamFromURL } = global.utils;
const { commands } = global.GoatBot;

const HELP_GIF = "https://i.imgur.com/S6hz5OY.mp4";

function roleText(role) {
  const roles = {
    0: "All Users",
    1: "Group Admins",
    2: "Bot Admin"
  };
  return roles[role] || "Unknown";
}

function findCommand(name) {
  name = name.toLowerCase();
  for (const [, cmd] of commands) {
    const a = cmd.config?.aliases;
    if (cmd.config?.name === name) return cmd;
    if (Array.isArray(a) && a.includes(name)) return cmd;
    if (typeof a === "string" && a === name) return cmd;
  }
  return null;
}

module.exports = {
  config: {
    name: "help",
    aliases: ["menu"],
    version: "3.0",
    author: "SIYAM",
    role: 0,
    category: "info",
    shortDescription: "Show all commands",
    guide: "{pn} | {pn} <command>"
  },

  onStart: async function ({ message, args, event, role }) {
    const prefix = getPrefix(event.threadID);
    const groupName = event.threadName || "UNKNOWN GROUP";
    const systemPrefix = prefix;
    const groupPrefix = prefix;

    const input = args.join(" ").trim();

    // 🔥 CATEGORY BUILD
    const categories = {};
    for (const [name, cmd] of commands) {
      if (!cmd?.config || cmd.config.role > role) continue;
      const cat = (cmd.config.category || "others").toUpperCase();

      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.config.name);
    }

    // 🔍 COMMAND DETAILS
    if (input) {
      const cmd = findCommand(input);
      if (!cmd) return message.reply(`❌ Command "${input}" not found`);

      const c = cmd.config;

      const msg = `
🔥✦━━━═══╗

👑 ╭─❖ COMMAND ❖─╮
   ╰➤ 『${c.name}』

📂 ╭─❖ CATEGORY ❖─╮
   ╰➤ 『${c.category}』

📜 ╭─❖ DESCRIPTION ❖─╮
   ╰➤ 『${c.shortDescription || "No description"}』

🔁 ╭─❖ ALIASES ❖─╮
   ╰➤ 『${c.aliases || "None"}』

⚙️ ╭─❖ VERSION ❖─╮
   ╰➤ 『${c.version || "1.0"}』

🔐 ╭─❖ PERMISSION ❖─╮
   ╰➤ 『${roleText(c.role)}』

👑 ╭─❖ AUTHOR ❖─╮
   ╰➤ 『${c.author || "Unknown"}』

╚═══━━━✦🔥
`;

      return message.reply({
        body: msg,
        attachment: await getStreamFromURL(HELP_GIF)
      });
    }

    // 📜 MAIN MENU DESIGN
    let msg = `
🔥✦━━━═══╗

👑 ╭─❖ GROUP ❖─╮
   ╰➤ 『${groupName}』

⚙️ ╭─❖ SYSTEM ❖─╮
   ╰➤ 『${systemPrefix}』

💬 ╭─❖ GROUP PREFIX ❖─╮
   ╰➤ 『${groupPrefix}』

╚═══━━━✦🔥
`;

    for (const cat of Object.keys(categories).sort()) {
      msg += `

╭━━━❖ 『 ${cat} 』 ❖━━━╮
`;
      for (const cmd of categories[cat].sort()) {
        msg += `┃ ⚡ ${cmd}\n`;
      }
      msg += `╰━━━━━━━━━━━━━━━╯\n`;
    }

    const total = Object.values(categories).reduce((a, b) => a + b.length, 0);

    msg += `
🔥✦━━━═══╗

📊 ╭─❖ TOTAL COMMAND ❖─╮
   ╰➤ 『${total}』

📖 ╭─❖ HOW TO USE ❖─╮
   ╰➤ 『${prefix}help <command>』

👑 ╭─❖ OWNER ❖─╮
   ╰➤ 『SIYAM』

╚═══━━━✦🔥
`;

    return message.reply({
      body: msg,
      attachment: await getStreamFromURL(HELP_GIF)
    });
  }
};
