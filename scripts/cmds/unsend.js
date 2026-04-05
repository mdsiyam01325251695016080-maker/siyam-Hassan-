module.exports = {
	config: {
		name: "unsend",
		aliases: ["u", "uns", "r"],
		version: "1.6",
		author: "NTKhang | Aphelion",
		countDown: 5,
		role: 0,
		description: {
			en: "Unsend bot message"
		},
		category: "box chat"
	},

	onStart: async function ({ message, event, api }) {
		if (!event.messageReply || event.messageReply.senderID !== api.getCurrentUserID())
			return message.reply("Please reply to a bot message");

		message.unsend(event.messageReply.messageID);
	},

	// NO-PREFIX HANDLER
	onChat: async function ({ event, message, api }) {
		if (!event.body || !event.messageReply) return;

		const text = event.body.toLowerCase().trim();

		// short silent keywords
		const silent = ["u", "siyam", "r", "🐍"];

		if (
			silent.includes(text) &&
			event.messageReply.senderID === api.getCurrentUserID()
		) {
			message.unsend(event.messageReply.messageID);
		}
	}
};
