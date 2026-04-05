const fs = require("fs-extra");
const moment = require("moment-timezone");

const getStreamFromURL = global.utils.getStreamFromURL;

const gifList = [
"https://files.catbox.moe/nkit0j.mp4",
"https://files.catbox.moe/nkit0j.mp4"
];

const getRandomGif = () =>
	gifList[Math.floor(Math.random() * gifList.length)];

module.exports = {
	config: {
		name: "prefix",
		version: "2.2",
		author: "Siyam Hasan",
		countDown: 5,
		role: 0,
		description: "Change & show bot prefix",
		category: "config",
		prefix: "!"
	},

	langs: {
		en: {
			usage: "❌ Usage: prefix <newPrefix> | prefix reset | prefix <newPrefix> -g",
			reset: "✅ Prefix reset successful!\n🔰 System prefix: %1",
			onlyAdmin: "⛔ Only bot admin can change global prefix.",
			confirmGlobal: "__________________________________🗨️=Global prefix change requested.\n👉=React with emoji to confirm.✅\n__________________________________",
			confirmThisThread: "__________________________________🗨️=Group prefix change requested.\n👉=React with emoji to confirm.✅\n__________________________________",
			successGlobal: "✅ GROUP PREFIX CHANGED!\n🆕 NEW PREFIX: %1",
			successThisThread: "✅ GROUP PREFIX CHANGED!\n🆕 NEW PREFIX: %1"
		}
	},

	onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {
		if (!args[0])
			return message.reply(getLang("usage"));

		const gif = getRandomGif();

		if (args[0] == 'reset') {
			await threadsData.set(event.threadID, null, "data.prefix");
			return message.reply(getLang("reset", global.GoatBot.config.prefix));
		}

		const newPrefix = args[0];
		const setGlobal = args[1] === "-g";

		if (setGlobal && role < 2)
			return message.reply(getLang("onlyAdmin"));

		const confirmMsg = setGlobal
			? getLang("confirmGlobal")
			: getLang("confirmThisThread");

		message.reply({
			body: confirmMsg,
			attachment: await getStreamFromURL(gif)
		}, (err, info) => {
			if (err) return;

			global.GoatBot.onReaction.set(info.messageID, {
				commandName,
				author: event.senderID,
				newPrefix,
				setGlobal
			});
		});
	},

	onReaction: async function ({ event, message, threadsData, Reaction, getLang }) {
		if (event.userID !== Reaction.author) return;

		global.GoatBot.onReaction.delete(event.messageID);

		if (Reaction.setGlobal) {
			global.GoatBot.config.prefix = Reaction.newPrefix;
			fs.writeFileSync(
				global.client.dirConfig,
				JSON.stringify(global.GoatBot.config, null, 2)
			);
			return message.reply(
				getLang("successGlobal", Reaction.newPrefix)
			);
		}

		await threadsData.set(
			event.threadID,
			Reaction.newPrefix,
			"data.prefix"
		);

		return message.reply(
			getLang("successThisThread", Reaction.newPrefix)
		);
	},

	onChat: async function ({ event, message, threadsData }) {
		if (!event.body || event.body.toLowerCase() !== "prefix") return;

		const gif = getRandomGif();

		const systemPrefix = global.GoatBot.config.prefix;
		const groupPrefix = global.utils.getPrefix(event.threadID);

		const threadInfo = await threadsData.get(event.threadID);
		const groupName = threadInfo?.threadName || "Unknown Group";

		const time = moment().tz("Asia/Dhaka").format("hh:mm A");
		const date = moment().tz("Asia/Dhaka").format("DD MMM YYYY");

		const owner = "Uday Hasan Siyam";
		const location = "Kishoreganj, Bangladesh";

		return message.reply({
			body:
`╭━━━〔《𓆩PREFIX𓆪》〕━━━╮
┃ 🏷️ 𓆩GROUP𓆪: 《𓆩${groupName}𓆪》
┃ 🔰 𓆩SYSTEM𓆪: 《${systemPrefix}》
┃ 💬 𓆩GROUP PREFIX𓆪: 《${groupPrefix}》
┃ ⏰ 𓆩TIME𓆪: 《𓆩${time}𓆪》
┃ 📅 𓆩DATE𓆪:𓆩${date}𓆪
┃ 👑 𓆩OWNER𓆪: 《𓆩${owner}𓆪》
┃ 📍 𓆩LOCATION𓆪: 《𓆩${location}𓆪》
┃ ⚡ 𓆩STATUS𓆪: 《𓆩ONLINE𓆪》
╰━━━〔《𓆩SIZUKA𓆪》〕━━━╯`,
			attachment: await getStreamFromURL(gif)
		});
	}
};
