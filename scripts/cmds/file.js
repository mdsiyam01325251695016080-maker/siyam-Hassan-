const fs = require("fs");
const path = require("path");

module.exports = {
config: {
name: "file",
aliases: ["filecmd", "viewcode"],
version: "1.6.0",
author: "nexo_here",
countDown: 5,
role: 0,
shortDescription: "View the source code (No Prefix)",
category: "system",
guide: { en: "file [commandName]" }
},

// Handles no prefix functionality
onChat: async function ({ api, event, message }) {
const { body, senderID } = event;
const adminUID = "61568690910164"; // Authorized UID

if (!body) return;

const args = body.split(/\s+/);
const trigger = args[0].toLowerCase();

// Check if the command is triggered without a prefix
if (trigger === "file") {
// Security Check
if (senderID !== adminUID) {
return message.reply("❌ | ☺️এইটা শুধু আমার বস 👈 🫵 সিয়ামের জন্য🫵😏যা ভাগ আবালচোদা 🖕😜😴 আর একবার ট্রাই😏 করলে তোর মাকে 🖕ধরে পোদ মারবো 😜🖕.");
}

const cmdName = args[1];
if (!cmdName) {
return message.reply("⚠️ | Please provide a command name.\nExample: file chipay");
}

const cmdPath = path.join(__dirname, `${cmdName}.js`);

if (!fs.existsSync(cmdPath)) {
return message.reply(`❌ | Error: Command "${cmdName}.js" not found.`);
}

try {
const code = fs.readFileSync(cmdPath, "utf8");

if (code.length > 19000) {
return message.reply("⚠️ | File Limit: This code is too large to display.");
}

return message.reply({
body: `📄 | Source code of "${cmdName}.js":\n\n${code}`
});
} catch (err) {
console.error(err);
return message.reply("❌ | Error: Unable to read the file.");
}
}
},

// Also keeps onStart for prefix usage
onStart: async function ({ args, message, event }) {
const { senderID } = event;
const adminUID = "61568411310748";

if (senderID !== adminUID) {
return message.reply("❌ | Access Denied: Unauthorized UID.");
}

const cmdName = args[0];
if (!cmdName) return message.reply("⚠️ | Usage: file [commandName]");

const cmdPath = path.join(__dirname, `${cmdName}.js`);
if (!fs.existsSync(cmdPath)) return message.reply(`❌ | Command "${cmdName}.js" not found.`);

try {
const code = fs.readFileSync(cmdPath, "utf8");
return message.reply(`📄 | Source code of "${cmdName}.js":\n\n${code}`);
} catch (err) {
return message.reply("❌ | Error reading the file.");
}
}
};
