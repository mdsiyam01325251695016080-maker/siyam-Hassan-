const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
config: {
name: "owner",
version: "16.3.0",
author: "Milon",
countDown: 5,
role: 0,
category: "info",
description: "Generates a premium owner information card with internal data",
guide: "{p}owner"
},

onStart: async function ({ api, event, threadsData }) {
const { threadID, messageID } = event;

let Canvas;
try {
Canvas = require("canvas");
} catch (e) {
return api.sendMessage("❌ 'canvas' library error. Please install it.", threadID, messageID);
}

const { createCanvas, loadImage } = Canvas;

// --- DATA ---
const globalPrefix = global.GoatBot.config.prefix;
const threadPrefix = await threadsData.get(threadID, "data.prefix") || globalPrefix;

const uptime = process.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const uptimeString = `${hours}h ${minutes}m`;

const totalCommands = global.GoatBot.commands.size;

// ✅ তোমার দেওয়া নতুন image
const cardUrl = "https://files.catbox.moe/4nabja.jpg"; 
const avatarUrl = "https://files.catbox.moe/jdltqj.jpg"; 

try {
api.sendMessage("⏳ Generating Premium Owner Card...", threadID, messageID);

async function getImg(url) {
const res = await axios({
url: url,
method: "GET",
responseType: "arraybuffer",
headers: { "User-Agent": "Mozilla/5.0" }
});
return await loadImage(Buffer.from(res.data));
}

const [cardImg, avatarImg] = await Promise.all([
getImg(cardUrl),
getImg(avatarUrl)
]);

const scale = 3; 
const canvas = createCanvas(cardImg.width * scale, cardImg.height * scale);
const ctx = canvas.getContext("2d");

// Background
const imageOffset = 20 * scale; 
ctx.drawImage(cardImg, -imageOffset, 0, canvas.width, canvas.height);

const centerX = (canvas.width / 2) - (15 * scale); 
const centerY = 155 * scale;

// HEADER
ctx.fillStyle = "#FFD700"; 
ctx.textAlign = "center";
ctx.font = `bold ${22 * scale}px Arial`; 
ctx.fillText("[ OWNER PROFILE ]", centerX, 75 * scale);

// AVATAR
const radius = 62 * scale; 
ctx.save();
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
ctx.closePath();
ctx.clip();
ctx.drawImage(avatarImg, centerX - radius, centerY - radius, radius * 2, radius * 2);
ctx.restore();

ctx.strokeStyle = "#FFD700";
ctx.lineWidth = 5 * scale; 
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
ctx.stroke();

// 🔥 VIP TEXT DESIGN
ctx.fillStyle = "#FFD700"; 
ctx.shadowBlur = 15;
ctx.shadowColor = "black";

const nameY = centerY + radius + (35 * scale);

// NAME
ctx.textAlign = "center";
ctx.font = `bold ${32 * scale}px Arial`; 
ctx.fillText("GOLAP", centerX, nameY); 

// INFO
const infoX = centerX - (150 * scale); 
ctx.textAlign = "left";
ctx.font = `bold ${18 * scale}px Arial`; 

let line = 1;
const gap = 28 * scale;

function draw(text) {
  ctx.fillText(text, infoX, nameY + (line * gap));
  line++;
}

// DATA
draw(`👤 NAME: UDAY HASAN SIYAM`);
draw(`🔥 NICKNAME: TURA`);
draw(`🎂 AGE: 16`);
draw(`📅 DOB: 05 MAY 2010`);
draw(`📍 LOCATION: KISHOREGANJ, BANGLADESH`);
draw(`🎓 CLASS: TEN`);
draw(`🏫 SCHOOL: M A MANNAN MANIK HIGH SCHOOL`);
draw(`💼 WORK: STUDENT`);
draw(`💔 STATUS: SINGLE`);
draw(`😎 ATTITUDE: STAY IN MY OWN ZONE`);
draw(`⚡ NOTE: DON'T TRY TO REACH MY LEVEL`);

// SAVE
const cacheDir = path.join(__dirname, "cache");
fs.ensureDirSync(cacheDir);
const outputPath = path.join(cacheDir, `owner_golap_${Date.now()}.png`);

fs.writeFileSync(outputPath, canvas.toBuffer("image/png"));

// CAPTION
const caption = 
"╔══════════════════╗\n" +
" ✨ OWNER PROFILE ✨\n" +
"╚══════════════════╝\n\n" +
"👤 Name: Uday Hasan Siyam\n" +
"🔥 Nickname: Tura\n" +
"🎂 Age: 16\n" +
"📅 DOB: 05 May 2010\n" +
"📍 Location: Kishoreganj, Bangladesh\n" +
"🎓 Class: Ten\n" +
"🏫 School: M A Mannan Manik High School\n" +
"💼 Work: Student\n" +
"💔 Status: Single\n" +
"😎 Attitude: Stay in my own zone\n" +
"⚡ Note: Don't try to reach my level\n" +
"━━━━━━━━━━━━━━━━━━━━\n" +
"🔥 VIP CARD READY!\n" +
"━━━━━━━━━━━━━━━━━━━━";

return api.sendMessage({
body: caption,
attachment: fs.createReadStream(outputPath)
}, threadID, () => {
if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
}, messageID);

} catch (error) {
console.error(error);
return api.sendMessage(`❌ Error: ${error.message}`, threadID, messageID);
}
}
};
