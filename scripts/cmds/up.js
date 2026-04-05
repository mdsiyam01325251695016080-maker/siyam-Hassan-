const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const { createCanvas, loadImage } = require("canvas");
const moment = require("moment-timezone");

module.exports = {
config: {
name: "up",
aliases: ["uptime", "status"],
version: "22.0.0",
author: "Siyam Hasan",
countDown: 5,
role: 0,
category: "system",
description: "Admin: No Prefix (61568411310748) | User: With Prefix",
usePrefix: true
},

onStart: async function ({ api, event, args }) {
return this.handleUptime({ api, event });
},

onChat: async function ({ api, event }) {
const { body, senderID } = event;
if (!body) return;

// Updated Admin UID
const adminUID = "61568411310748";
const msg = body.toLowerCase();

if (senderID == adminUID && (msg == "up" || msg == "uptime")) {
return this.handleUptime({ api, event });
}
},

handleUptime: async function ({ api, event }) {
const { threadID, messageID, senderID } = event;

const sendChecking = await api.sendMessage("🔍 Checking system status, please wait...", threadID);

const timeStart = Date.now();
const uptime = process.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const timeString = `${hours}h ${minutes}m`;

const usedMem = ((os.totalmem() - os.freemem()) / (1024 ** 3)).toFixed(1);
const totalMem = (os.totalmem() / (1024 ** 3)).toFixed(1);
const ramPercentage = ((usedMem / totalMem) * 100).toFixed(0);
const currentDate = moment.tz("Asia/Dhaka").format("DD/MM/YYYY");

let userName = "User";
try {
const info = await api.getUserInfo(senderID);
userName = info[senderID].name;
} catch (e) { userName = "Developer"; }

const imgUrl = "https://i.imgur.com/xHpbI1i.jpeg";
const userImgUrl = `https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
const cachePath = path.join(__dirname, "cache", `up_siyam_final_${Date.now()}.png`);

try {
if (!fs.existsSync(path.join(__dirname, "cache"))) fs.ensureDirSync(path.join(__dirname, "cache"));

const image = await loadImage(imgUrl);
const canvas = createCanvas(image.width, image.height);
const ctx = canvas.getContext("2d");
ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// USER PROFILE
const boxSize = 220;
const boxX = centerX - (boxSize / 2);
const boxY = centerY - (boxSize / 2) + 15;

try {
const userImg = await loadImage(userImgUrl);
ctx.shadowColor = "#00ffff";
ctx.shadowBlur = 25;
ctx.strokeStyle = "#ffffff";
ctx.lineWidth = 5;
ctx.strokeRect(boxX, boxY, boxSize, boxSize);
ctx.shadowBlur = 0; 
ctx.drawImage(userImg, boxX, boxY, boxSize, boxSize);

ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
ctx.fillRect(boxX, boxY + boxSize - 35, boxSize, 35);
ctx.textAlign = "center";
ctx.fillStyle = "#ffffff";
ctx.font = "bold 16px Arial";
ctx.fillText(userName.toUpperCase(), centerX, boxY + boxSize - 12);
} catch (err) { console.log("Image load failed"); }

// Circles
const drawCircle = (x, y, radius, percent, label, value, color) => {
ctx.beginPath();
ctx.arc(x, y, radius, 0, Math.PI * 2);
ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
ctx.lineWidth = 10; ctx.stroke();
ctx.beginPath();
ctx.arc(x, y, radius, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 * (percent / 100)));
ctx.strokeStyle = color;
ctx.lineWidth = 10; ctx.lineCap = "round"; ctx.stroke();
ctx.textAlign = "center"; ctx.fillStyle = "#ffffff";
ctx.font = "bold 20px Arial"; ctx.fillText(value, x, y + 8);
ctx.font = "14px Arial"; ctx.fillText(label, x, y + 35);
};

const uptimeX = boxX - 110;
const ramX = boxX + boxSize + 110;
drawCircle(uptimeX, centerY + 30, 60, 75, "UPTIME", timeString, "#00ffcc");
drawCircle(ramX, centerY - 40, 60, ramPercentage, "RAM", `${ramPercentage}%`, "#ff3366");

const pingMS = Date.now() - timeStart;
drawCircle(ramX, centerY + 90, 50, 80, "PING", `${pingMS}ms`, "#ffff00");

// Footer
ctx.textAlign = "center";
ctx.font = "bold 24px Arial";
ctx.fillStyle = "#00ff00";
ctx.fillText("● SYSTEM STATUS: ACTIVE", centerX, canvas.height - 65);

ctx.font = "italic bold 18px Arial"; 
ctx.fillStyle = "#FFD700"; 
ctx.fillText("Developed by: Siyam Hasan", centerX, canvas.height - 95);

// Bot Name & Date
ctx.textAlign = "left";
ctx.font = "bold 30px Arial";
ctx.shadowColor = "#0000ff"; ctx.shadowBlur = 15;
ctx.fillStyle = "#33ccff";
ctx.fillText("[SIYAM-BOT]", 199, 128); 

const dateX = centerX + 82;
const dateY = 120; 
ctx.shadowBlur = 20; ctx.shadowColor = "#FF00FF";
ctx.textAlign = "center";
ctx.font = "bold 22px Arial";

const gradient = ctx.createLinearGradient(dateX - 70, dateY, dateX + 70, dateY);
gradient.addColorStop(0, "#FF0000"); 
gradient.addColorStop(0.5, "#00FF00"); 
gradient.addColorStop(1, "#0000FF");

ctx.fillStyle = "#FFFFFF"; 
ctx.fillText(`| ${currentDate}`, dateX, dateY);

ctx.shadowBlur = 0;
ctx.strokeStyle = gradient; 
ctx.lineWidth = 1.5;
ctx.strokeText(`| ${currentDate}`, dateX, dateY);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync(cachePath, buffer);

return api.sendMessage({ attachment: fs.createReadStream(cachePath) }, threadID, async (err) => {
if (!err) api.unsendMessage(sendChecking.messageID);
if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
}, messageID);

} catch (e) {
console.error(e);
api.unsendMessage(sendChecking.messageID);
return api.sendMessage("❌ Error generating status!", threadID, messageID);
}
}
};
