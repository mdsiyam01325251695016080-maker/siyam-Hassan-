const axios = require("axios");

module.exports = {
  config: {
    name: "allgroups",
    version: "1.0.0",
    role: 2, // Admin only
    author: "siyam",
    description: "সবগুলো গ্রুপের লিস্ট দেখাবে এবং সেখান থেকে লিভ বা ব্যান করা যাবে",
    category: "admin",
    guide: "{pn}",
    countDown: 5
  },

  onStart: async function ({ api, event, message }) {
    let threadList = await api.getThreadList(50, null, ["INBOX"]);
    let list = threadList.filter(group => group.isSubscribed && group.isGroup);

    let msg = "";
    let groupid = [];
    let i = 1;

    for (const group of list) {
      msg += `${i++}. ${group.name}\nID: ${group.threadID}\nMembers: ${group.participantIDs.length}\n\n`;
      groupid.push(group.threadID);
    }

    return message.reply(msg + 'Reply with "out <number>" or "ban <number>" to take action.', (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        groupid
      });
    });
  },

  onReply: async function ({ api, event, Reply, message, Threads }) {
    const { author, groupid, messageID } = Reply;
    if (event.senderID != author) return;

    const args = event.body.split(" ");
    const action = args[0].toLowerCase();
    const index = parseInt(args[1]) - 1;
    const targetID = groupid[index];

    if (!targetID) return message.reply("সঠিক সিরিয়াল নম্বর দিন।");

    if (action === "out") {
      try {
        await api.removeUserFromGroup(api.getCurrentUserID(), targetID);
        return message.reply(`সফলভাবে ${targetID} আইডি থেকে বের হয়ে গেছি।`);
      } catch (e) {
        return message.reply("লিভ নিতে সমস্যা হচ্ছে।");
      }
    }

    if (action === "ban") {
      try {
        // GoatBot এর Threads ডাটাবেস অনুযায়ী ব্যান
        await Threads.setData(targetID, { data: { banned: true } });
        return message.reply(`সফলভাবে গ্রুপ আইডি ${targetID} ব্যান করা হয়েছে।`);
      } catch (e) {
        return message.reply("ব্যান করতে সমস্যা হয়েছে।");
      }
    }
  }
};.cmd install allgroups.js const axios = require("axios");

module.exports = {
  config: {
    name: "allgroups",
    version: "1.0.0",
    role: 2, // Admin only
    author: "Milon",
    description: "সবগুলো গ্রুপের লিস্ট দেখাবে এবং সেখান থেকে লিভ বা ব্যান করা যাবে",
    category: "admin",
    guide: "{pn}",
    countDown: 5
  },

  onStart: async function ({ api, event, message }) {
    let threadList = await api.getThreadList(50, null, ["INBOX"]);
    let list = threadList.filter(group => group.isSubscribed && group.isGroup);

    let msg = "";
    let groupid = [];
    let i = 1;

    for (const group of list) {
      msg += `${i++}. ${group.name}\nID: ${group.threadID}\nMembers: ${group.participantIDs.length}\n\n`;
      groupid.push(group.threadID);
    }

    return message.reply(msg + 'Reply with "out <number>" or "ban <number>" to take action.', (err, info) => {
      global.GoatBot.onReply.set(info.messageID, {
        commandName: this.config.name,
        messageID: info.messageID,
        author: event.senderID,
        groupid
      });
    });
  },

  onReply: async function ({ api, event, Reply, message, Threads }) {
    const { author, groupid, messageID } = Reply;
    if (event.senderID != author) return;

    const args = event.body.split(" ");
    const action = args[0].toLowerCase();
    const index = parseInt(args[1]) - 1;
    const targetID = groupid[index];

    if (!targetID) return message.reply("সঠিক সিরিয়াল নম্বর দিন।");

    if (action === "out") {
      try {
        await api.removeUserFromGroup(api.getCurrentUserID(), targetID);
        return message.reply(`সফলভাবে ${targetID} আইডি থেকে বের হয়ে গেছি।`);
      } catch (e) {
        return message.reply("লিভ নিতে সমস্যা হচ্ছে।");
      }
    }

    if (action === "ban") {
      try {
        // GoatBot এর Threads ডাটাবেস অনুযায়ী ব্যান
        await Threads.setData(targetID, { data: { banned: true } });
        return message.reply(`সফলভাবে গ্রুপ আইডি ${targetID} ব্যান করা হয়েছে।`);
      } catch (e) {
        return message.reply("ব্যান করতে সমস্যা হয়েছে।");
      }
    }
  }
};
