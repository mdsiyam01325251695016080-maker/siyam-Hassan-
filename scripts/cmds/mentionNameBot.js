module.exports = {
  config: {
    name: "mentionNameBot",
    version: "4.0.0",
    author: "Siyam Crazy Final",
    description: "Ultra funny crazy mention reply bot",
    role: 0,
    countDown: 0
  },

  onStart: async function () {
    console.log("😈 Ultra Crazy Mention Bot Started!");
  },

  onChat: async function ({ event, api }) {
    if (!event.body) return;

    const msg = event.body.toLowerCase();
    const names = ["সিয়াম", "siyam", "boss siyam"];

    if (!names.some(name => msg.includes(name))) return;

    const replies = [

`╭━━━😵‍💫━━━╮
কি রে পাগল নাকি? 🤨
এত ডাকাডাকি করিস কেন 😤
আমি কি তোর নোকর নাকি? 😑
╰━🔥━━━━━🔥━╯`,

`╭━━━🤣━━━╮
আবার ডাকলি? 😭
তোর life এ কাজ নাই বুঝি 🤡
আমারে নিয়েই পড়ে আছিস 😒
╰━😒━━━━━😒━╯`,

`╭━━━😈━━━╮
এই নাম মুখে নিস না 😤
VIP মানুষ আমি 😎
handle করতে পারবি না 😏
╰━💀━━━━━💀━╯`,

`╭━━━🥴━━━╮
তুই আবার শুরু করলি 🤧
এত attention চাই কেন 😭
crush ignore করছে নাকি? 🤣
╰━😂━━━━━😂━╯`,

`╭━━━😡━━━╮
এত mention মারিস না 😤
server হ্যাং হয়ে গেলে 😵
তোকে কিন্তু ছাড়বো না 😈
╰━🔥━━━━━🔥━╯`,

`╭━━━😴━━━╮
ঘুমাচ্ছিলাম রে 😒
স্বপ্নে বিরিয়ানি খাচ্ছিলাম 🤤
তুই এসে সব নষ্ট করলি 😭
╰━🍗━━━━━🍗━╯`,

`╭━━━😏━━━╮
আমারে ডাকলে আগে 😎
চা-নাস্তা লাগবে ☕🍪
free service না এটা 😤
╰━💸━━━━━💸━╯`,

`╭━━━🤡━━━╮
তুই কি bored নাকি? 🤣
life এ কাজকাম নাই? 😒
আমাকেই ধরছিস কেন 😭
╰━😵━━━━━😵━╯`,

`╭━━━😤━━━╮
শেষবার বলতেছি 😡
আর mention দিলে 🚫
direct mute 😏
╰━🚫━━━━━🚫━╯`,

`╭━━━😂━━━╮
তুই আবার online 🤣
আমারে দেখলেই ডাকিস 😒
secret crush নাকি? 😏
╰━💘━━━━━💘━╯`,

`╭━━━😎━━━╮
Boss এখন mood এ নাই 😒
respect দে আগে 😏
তারপর কথা বল 😤
╰━👑━━━━━👑━╯`,

`╭━━━😒━━━╮
ignore mode on 😏
seen দিয়ে রাখলাম 😑
reply নাই 😈
╰━📵━━━━━📵━╯`,

`╭━━━🥵━━━╮
এত ডাকাডাকি করলে 😤
heat উঠে যায় 😡
control কর নিজেকে 🤣
╰━🔥━━━━━🔥━╯`,

`╭━━━😜━━━╮
আমারে ডাকিস না 😒
আমি dangerous মানুষ 😈
love এ পড়বি পরে 🤣
╰━💔━━━━━💔━╯`,

`╭━━━😵━━━╮
এই ছেলে আবার ডাকতেছে 😒
তোরে ignore করলেও বুঝিস না 🤡
level আলাদা বুঝলি? 😏
╰━🔥━━━━━🔥━╯`,

`╭━━━🤣━━━╮
আবার নাম নিলি? 😭
Google এ search দে না 😒
আমি কি customer care নাকি 😤
╰━📞━━━━━📞━╯`,

`╭━━━😈━━━╮
বেশি ডাকাডাকি করিস 😡
একদিন vanish হয়ে যাবো 😏
তারপর কাঁদবি 😭
╰━👻━━━━━👻━╯`,

`╭━━━🥴━━━╮
তুই কি bot নাকি? 🤨
একই নাম বারবার 😒
brain lag করতেছে নাকি 😭
╰━🤖━━━━━🤖━╯`,

`╭━━━😤━━━╮
এত mention দিলে 😡
phone গরম হয়ে যায় 🔥
bill দিবি কিন্তু 😏
╰━💸━━━━━💸━╯`,

`╭━━━😂━━━╮
তুই আবার ডাকলি 🤣
আমারে ছাড়া ঘুম হয় না নাকি 😏
secret love 😜
╰━💘━━━━━💘━╯`,

`╭━━━🤡━━━╮
এই যে Mr. mention 😭
life এ অন্য কাজ নাই? 😒
আমাকেই ধরছিস কেন 🤣
╰━😵━━━━━😵━╯`,

`╭━━━😡━━━╮
এটা কি ডাকার মেশিন নাকি 😤
বারবার চাপ দিচ্ছিস 😒
button নষ্ট হয়ে যাবে 🤣
╰━🔘━━━━━🔘━╯`,

`╭━━━😴━━━╮
ঘুমাইতে দে প্লিজ 😭
ড্রিমে pizza খাচ্ছিলাম 🍕
সব নষ্ট করলি 😤
╰━🍕━━━━━🍕━╯`,

`╭━━━😏━━━╮
আমারে ডাকলে 😎
premium charge লাগে 💸
free version বন্ধ 😤
╰━💰━━━━━💰━╯`,

`╭━━━🤣━━━╮
তুই আবার active 🤡
আমারে দেখলেই fire 🔥
fan নাকি? 😏
╰━🔥━━━━━🔥━╯`,

`╭━━━😒━━━╮
ignore চলছে 😏
seen দিয়ে রাখলাম 😑
reply আশা করিস না 😈
╰━📵━━━━━📵━╯`,

`╭━━━🥵━━━╮
এত ডাকাডাকি করলে 😤
CPU overheat 🔥
shutdown হয়ে যাবো 😭
╰━💻━━━━━💻━╯`,

`╭━━━😜━━━╮
এই নামটা toxic 😈
বারবার বলিস না 😒
addicted হয়ে যাবি 🤣
╰━💊━━━━━💊━╯`,

`╭━━━😤━━━╮
তুই থামবি কবে 😡
spam করিস কেন 😒
ban খাইবি কিন্তু 😏
╰━🚫━━━━━🚫━╯`,

`╭━━━😂━━━╮
আবার ডাক 🤣
challenge নিচ্ছিস নাকি 😏
আমি ignore master 😎
╰━🎯━━━━━🎯━╯`,

`╭━━━😈━━━╮
এত সাহস কই পেলি 😤
বারবার নাম নিচ্ছিস 😒
respect কোথায়? 😡
╰━⚡━━━━━⚡━╯`,

`╭━━━🤧━━━╮
আমারে ডাকলে 😭
heart beat বাড়ে 💓
fear না love বুঝি না 🤣
╰━💓━━━━━💓━╯`,

`╭━━━😎━━━╮
Boss always busy 😏
time নাই তোর জন্য 😒
later try কর 😤
╰━⏳━━━━━⏳━╯`

    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    return api.sendMessage(
      `${randomReply}\n\n👉 FB: https://www.facebook.com/profile.php?id=61568411310748`,
      event.threadID
    );
  }
};
