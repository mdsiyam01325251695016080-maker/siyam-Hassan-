const axios = require("axios");

const availableTEMPLATES = {
 "1": "Multicolored Neon Light",
 "2": "Galaxy Style Free Name",
 "3": "3D Underwater Text Effect",
 "4": "Logo Viettel",
 "5": "Typography Text on Pavement",
 "6": "Lovely Cute 3D Pig Text",
 "7": "Green Neon Light Effect",
 "8": "Futuristic Light Text Effect",
 "9": "Graffiti Cover",
 "10": "Neon Devil Wings Text",
 "11": "Advanced Glow Effects",
 "12": "Dragon Ball Style Text",
 "13": "Blue Metal Text Effect",
 "14": "Modern Gold",
 "15": "Galaxy Tree Effect",
 "16": "Gold Letters Online",
 "17": "Metal Mascots Logo Maker",
 "18": "Plasma Text Effect",
 "19": "Handwritten Foggy Glass",
 "20": "Modern Gold 3",
 "21": "Metal Logo Online",
 "22": "Graffiti Lettering",
 "23": "Galaxy Write Effect",
 "24": "Graffiti Text 5",
 "25": "Road Paint Text",
 "26": "Chocolate Text",
 "27": "Naruto Shippuden Logo",
 "28": "Typography Art Layers",
 "29": "Write in Sand Beach",
 "30": "Green Brush Typography",
 "31": "Boom Comic Text",
 "32": "3D Crack Text",
 "33": "Paint Splatter Text",
 "34": "Digital Glitch Text",
 "35": "Dragon Steel Text",
 "36": "Graffiti Text 3",
 "37": "Zombie 3D Text",
 "38": "Matrix Text Effect",
 "39": "Galaxy Neon Light Text",
 "40": "3D Metal Text",
 "41": "Chalkboard Writing",
 "42": "Writing on Cakes",
 "43": "Wet Glass Text",
 "44": "Galaxy Angel Wings",
 "45": "Wooden 3D Text",
 "46": "3D Foil Balloon",
 "47": "Christmas Snow Text",
 "48": "Luxury Gold Text",
 "49": "Anonymous Hacker Avatar",
 "50": "Broken Glass Text",
 "51": "Blackpink Style Logo",
 "52": "Jean Fabric Text",
 "53": "Foggy Rainy Text",
 "54": "Birthday Foil Balloon",
 "55": "Stars Night Effect",
 "56": "Paper Cut Effect",
 "57": "Water Text",
 "58": "Unique Green Light Word",
 "59": "3D Beach Text",
 "60": "Chalkboard Writing 2",
 "61": "Dragon Fire Text",
 "62": "Underwater Text",
 "63": "Cake Text",
 "64": "Metallic Impressive Font",
 "65": "Eraser Deleting Text",
 "66": "Metal Text Online",
 "67": "Dance Text",
 "68": "Cloud Text in Sky",
 "69": "3D Water Text",
 "70": "Chrome Text Effect",
 "71": "Bokeh Text Effect",
 "72": "Incandescent Bulb Text",
 "73": "Metal Avatar Name",
 "74": "3D Hologram Text",
 "75": "Stars Night Online",
 "76": "Gold Text Effect",
 "77": "Purple Text Effect",
 "78": "Pixel Glitch Text",
 "79": "Dark Green Typography",
 "80": "Diamond Text",
 "81": "Blue Neon Logo",
 "82": "Neon Text Effect",
 "83": "Shadow Text",
 "84": "Galaxy Light Text",
 "85": "Titanium Text",
 "86": "Fabric Text Effect",
 "87": "Blackpink Logo 2",
 "88": "3D Text Effect",
 "89": "Magic Text Effect",
 "90": "Sand Beach Text",
 "91": "Neon Glitch Text",
 "92": "Cloth Text Effect",
 "93": "Message Coffee Text",
 "94": "Jewel Text Effect",
 "95": "Hot Metallic Effect",
 "96": "Typography Maker 5",
 "97": "Candy Text Effect",
 "98": "Galaxy Bat Write",
 "99": "Firework Text Effect",
 "100": "Graffiti Text Online"
};

module.exports = {
 config: {
 name: "ephoto2",
 version: "1.0",
 author: "LIKHON AHMED",
 countDown: 5,
 role: 0,
 shortDescription: "Create stylish Ephoto text effect or view template list",
 longDescription: "Generate Ephoto effect using text and ID (1–100) or show all available template list",
 category: "image",
 guide: {
 en: "{pn} <text> - <id>\nExample: {pn} milon - 27\n\nView list:\n{pn} list"
 }
 },

 onStart: async function ({ event, message, args, api }) {
 const prefix =
 global.utils && typeof global.utils.getPrefix === "function"
 ? await global.utils.getPrefix(event.threadID)
 : "/";

 const input = args.join(" ").trim();

 if (input.toLowerCase() === "list") {
 let msg = "🎨 𝐄𝐏𝐇𝐎𝐓𝐎 𝐓𝐄𝐌𝐏𝐋𝐀𝐓𝐄𝐒 (1–100)\n\n";
 for (const i in availableTEMPLATES) {
 msg += `🆔 ${i.padStart(3, " ")} → ${availableTEMPLATES[i]}\n`;
 }
 msg += `\n💡 Usage:\n${prefix}ephoto <text> - <id>\nExample: ${prefix}ephoto Himu - 57`;
 return message.reply(msg);
 }

 const parts = input.split("-");
 const text = parts[0]?.trim();
 const id = parseInt(parts[1]?.trim());

 if (!text || !id) {
 return message.reply(`⚠ Usage: ${prefix}ephoto <text> - <id>\nExample: ${prefix}ephoto Saimx69x - 27`);
 }

 if (isNaN(id) || id < 1 || id > 100) {
 return message.reply(
 `❌ Invalid ID! Please use ID between 1–100.\nUse '${prefix}ephoto list' to check all available templates.`
 );
 }

 const loadingMsg = await message.reply(`🎨 Generating Ephoto effect for “${text}” (ID: ${id})...`);

 try {
 const githubRawUrl = "https://raw.githubusercontent.com/Saim-x69x/sakura/main/ApiUrl.json";
 const apiRes = await axios.get(githubRawUrl);
 const baseUrl = apiRes.data.apiv1;
 const res = await axios.get(`${baseUrl}/api/ephoto?id=${id}&text=${encodeURIComponent(text)}`);

 if (!res.data?.status || !res.data.result_url) {
 await api.unsendMessage(loadingMsg.messageID);
 return message.reply("❌ Oops! Something went wrong. Please try again later.");
 }

 await api.unsendMessage(loadingMsg.messageID);
 return message.reply({
 body: `✅ 𝐄𝐩𝐡𝐨𝐭𝐨 𝐄𝐟𝐟𝐞𝐜𝐭 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞
