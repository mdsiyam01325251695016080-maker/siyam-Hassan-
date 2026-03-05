const axios = require("axios");
const { getPrefix } = global.utils;
const { commands } = global.GoatBot;

let xfont = null;
let yfont = null;
let categoryEmoji = null;

/* ───── Load Fonts & Emoji ───── */
async function loadResources() {
  try {
    const [x, y, c] = await Promise.all([
      axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/xfont.json"),
      axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/yfont.json"),
      axios.get("https://raw.githubusercontent.com/Saim-x69x/sakura/main/category.json")
    ]);
    xfont = x.data;
    yfont = y.data;
    categoryEmoji = c.data;
  } catch (e) {
    console.error("[HELP] Resource load failed");
  }
}

/* ───── Font Convert ───── */
function fontConvert(text, type = "command") {
  const map = type === "category" ? xfont : yfont;
  if (!map) return text;
  return text.split("").map(c => map[c] || c).join("");
}

function getCategoryEmoji(cat) {
  return categoryEmoji?.[cat.toLowerCase()] || "🗂️";
}

function roleText(role) {
  if (role === 0) return "All Users";
  if (role === 1) return "Group Admins";
  if (role === 2) return "Bot Admin";
  return "Unknown";
}

/* ───── Command Find ───── */
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
    name: "help2",
    aliases: ["menu"],
    version: "2.0",
    author: "Saimx69x | fixed milon",
    role: 0,
    category: "info",
    shortDescription: "Show all commands",
    guide: "{pn} | {pn} <command> | {pn} -c <category>"
  },

  onStart: async function ({ message, args, event, role }) {
    if (!xfont || !yfont || !categoryEmoji) await loadResources();

    const prefix = getPrefix(event.threadID);
    const input = args.join(" ").trim();

    /* ───── Collect Categories ───── */
    const categories = {};
    for (const [name, cmd] of commands) {
      if (!cmd?.config || cmd.config.role > role) continue;
      const cat = (cmd.config.category || "UNCATEGORIZED").toUpperCase();
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(name);
    }

    /* ───── Category View ───── */
    if (args[0] === "-c" && args[1]) {
      const cat = args[1].toUpperCase();
      if (!categories[cat])
        return message.reply(`❌ Category "${cat}" not found`);

      let msg = `━━━━━━━━━━━━━━\n`;
      msg += `📂 ${getCategoryEmoji(cat)} ${fontConvert(cat, "category")}\n`;
      msg += `━━━━━━━━━━━━━━\n`;

      for (const c of categories[cat].sort())
        msg += `• ${fontConvert(c)}\n`;

      msg += `━━━━━━━━━━━━━━\n`;
      msg += `🔢 Total: ${categories[cat].length}\n`;
      msg += `⚡ Prefix: ${prefix}`;

      return message.reply(msg);
    }

    /* ───── Main Menu ───── */
    if (!input) {
      let msg = `━━━━━━━━━━━━━━\n📜 COMMAND LIST\n━━━━━━━━━━━━━━\n`;

      for (const cat of Object.keys(categories).sort()) {
        msg += `\n${getCategoryEmoji(cat)} ${fontConvert(cat, "category")}\n`;
        for (const c of categories[cat].sort())
          msg += `  • ${fontConvert(c)}\n`;
      }

      const total = Object.values(categories).reduce((a, b) => a + b.length, 0);

      msg += `\n━━━━━━━━━━━━━━\n`;
      msg += `🔢 Total Commands: ${total}\n`;
      msg += `⚡ Prefix: ${prefix}\n`;
      msg += `👑 Owner: 𝗠𝗶𝗹𝗼𝗻 𝗛𝗮𝘀𝗮𝗻`;

      return message.reply(msg);
    }

    /* ───── Command Info ───── */
    const cmd = findCommand(input);
    if (!cmd) return message.reply(`❌ Command "${input}" not found`);

    const c = cmd.config;
    const aliasText = Array.isArray(c.aliases)
      ? c.aliases.join(", ")
      : c.aliases || "None";

    let usage = "No usage";
    if (c.guide) {
      if (typeof c.guide === "string") {
        usage = c.guide;
      } else if (typeof c.guide === "object") {
        usage = c.guide.en || Object.values(c.guide)[0] || "No usage";
      }
      usage = usage.replace(/{pn}/g, `${prefix}${c.name}`);
    }

    const msg = `
╭─── COMMAND INFO ───╮
🔹 Name : ${c.name}
📂 Category : ${(c.category || "UNCATEGORIZED").toUpperCase()}
📜 Description : ${c.longDescription || c.shortDescription || "N/A"}
🔁 Aliases : ${aliasText}
⚙️ Version : ${c.version || "1.0"}
🔐 Permission : ${roleText(c.role)}
⏱️ Cooldown : ${c.countDown || 5}s
👑 Author : ${c.author || "𝗠𝗶𝗹𝗼𝗻 𝗛𝗮𝘀𝗮𝗻"}
📖 Usage : ${usage}
╰───────────────────╯`;

    return message.reply(msg);
  }
};
