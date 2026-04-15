module.exports = {
  config: {
    name: "asd",
    version: "3.0.0",
    author: "Siyam Mixed Edit",
    description: "Old + Stylish funny bot",
    role: 0,
    countDown: 0
  },

  onStart: async function () {
    console.log("✅ ASD Mixed Bot Started!");
  },

  onChat: async function ({ event, api }) {
    if (!event.body) return;

    const msg = event.body.toLowerCase();
    const send = (text) => api.sendMessage(text, event.threadID);

    // 💖 LOVE
    if (["love you bot","love u bot","bot love you","bot love u"].includes(msg)) 
      return send(`╭━━━💖━━━╮
বস সিয়াম মেয়েদের সাথে কথা বলতে মানা করছে 🙂
তাই দূরে থাক 🤣
╰━🔥━━━━━🔥━╯`);

    if (["i love you bot","bot i love you"].includes(msg)) 
      return send(`╭━━━😻━━━╮
আমাকে না 😏
আমার বস সিয়াম কে ভালোবাসো 🤗
╰━🌺━━━━━🌺━╯`);

    if (["love you","i love you"].includes(msg)) 
      return send(`╭━━━🥺━━━╮
I love you too 😭
মনে লাগে ঢেউ...কেউ ভালোবাসে না 💔
╰━💦━━━━━💦━╯`);

    // 😡 GALI
    if (["baler bot","fuck bot"].includes(msg)) 
      return send(`╭━━━😠━━━╮
আমাকে গালি দেস কেনো 😡
বেন করে দিমু কিন্তু 😤
╰━🚫━━━━━🚫━╯`);

    // 😘
    if (["kiss bot","bot kiss me","চুম্মাহ দাও"].includes(msg)) 
      return send(`╭━━━😌━━━╮
আমি ভালো 😎
তুই পঁচা 🤣
╰━😂━━━━━😂━╯`);

    // 📍 LOCATION
    if (["bot koi"].includes(msg)) 
      return send(`╭━━━📍━━━╮
এই তো আমি এখানে 🙋‍♂️
তোর সামনে দাঁড়াই আছি 😏
╰━👀━━━━━👀━╯`);

    // 🔞
    if (["/sex","/fuck"].includes(msg)) 
      return send(`╭━━━🤖━━━╮
চিহ্ 😒 ভালো হয়ে যাও
অনেক সময় দিছি তোমাকে 😤
╰━🚫━━━━━🚫━╯`);

    // 🙏
    if (["opoman korli","biyadobi koros"].includes(msg)) 
      return send(`╭━━━😔━━━╮
সরি বস 😭
ভুল হইছে, আর হবে না 🥺🙏
╰━🤲━━━━━🤲━╯`);

    // 💔
    if (["single","সিঙ্গেল"].includes(msg)) 
      return send(`╭━━━😾━━━╮
আমি সিঙ্গেল আছি 😤
প্রেম করলে নক দে বলদ 🤣
╰━💔━━━━━💔━╯`);

    // 👍
    if (["👍","👍🏼"].includes(msg)) 
      return send(`╭━━━👍━━━╮
হাত মেরে keyboard দুর্বল করিস না 🤣
ধন্যবাদ 🤗🤝
╰━⌨️━━━━━⌨️━╯`);

    // 👋
    if (["kmon acho","কেমন আছো","kmn aso","kamon aso","কেমন আছো সবাই","kmon aso sobai","kmn aso sobai"].includes(msg)) 
      return send(`╭━━━🌺━━━╮
আলহামদুলিল্লাহ আমি ভালো আছি 😌
তুমি কেমন আছো 💝
╰━🌻━━━━━🌻━╯`);

    if (["hi","hello","hlw","helo"].includes(msg)) 
      return send(`╭━━━😒━━━╮
এত হাই-হ্যালো না 😤
সালাম দিতে কি হয় 😏
╰━🕌━━━━━🕌━╯`);

    // 🤫
    if (["বট চুপ","bot tham","স্টপ","stop","চুপ","chup thak"].includes(msg)) 
      return send(`╭━━━😼━━━╮
না আমি চুপ থাকবো না 😏
বস সিয়াম আমাকে কথা বলতে বলছে 😎
╰━🔥━━━━━🔥━╯`);

    // 💍
    if (["bot jamay dau","bot jamay daw","বট জামাই দাও","jamay de","jamay daw bot","jamay dau","জামাই দাউ","জামাই দে বট"].includes(msg)) 
      return send(`╭━━━😒━━━╮
আমার বস সিয়াম কে দেখো না নাকি 😤
ওইটাই enough 😎
╰━👑━━━━━👑━╯`);

    if (["bow daw","bow dau","bow de","বউ দাউ","বউ দে","bot bow daw","bot bow dau"].includes(msg)) 
      return send(`╭━━━😼━━━╮
যেখানে বস সিয়াম সিঙ্গেল 😤
তুই বউ চাস 😒
╰━💢━━━━━💢━╯`);

    if (["gf daw bot","bf daw bot"].includes(msg)) 
      return send(`╭━━━🔪━━━╮
আগে বস সিয়াম এর জন্য gf দে 😤
তারপর তোর কথা 😏
╰━💘━━━━━💘━╯`);

    // 👤
    if (["siyam","সিয়াম"].includes(msg)) 
      return send(`╭━━━👑━━━╮
বস সিয়াম এখন বিজি 😎
👉 fb.com/profile.php?id=61568411310748
╰━🔥━━━━━🔥━╯`);

    // 😊
    if (["🙂","🙃"].includes(msg)) 
      return send(`╭━━━🥺━━━╮
মন খারাপ নাকি 😒
বল কি হইছে 😭
╰━💔━━━━━💔━╯`);

    if (["😒","🙄"].includes(msg)) 
      return send(`╭━━━😏━━━╮
এদিক ওদিক না 😤
আমার দিকে তাকাও 😎
╰━👀━━━━━👀━╯`);

    if (["😂","😁","😆","🤣","😸","😹"].includes(msg)) 
      return send(`╭━━━🤣━━━╮
এত হাসিস না 😒
চোরের মত লাগে 🤡
╰━🌚━━━━━🌚━╯`);

    if (["🥰","😍","😻","❤️"].includes(msg)) 
      return send(`╭━━━💘━━━╮
এই ভালোবাসা 😏
বস সিয়াম কে দে 😤
╰━🔥━━━━━🔥━╯`);

    // 🕌
    if (["আসসালামু আলাইকুম","assalamualaikum","assalamu alaikum","salam"].includes(msg)) 
      return send(`╭━━━🕌━━━╮
ওয়ালাইকুমুস সালাম 🌺
╰━🤲━━━━━🤲━╯`);
  }
};
