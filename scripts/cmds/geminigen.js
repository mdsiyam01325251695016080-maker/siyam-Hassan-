const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const apiUrl = "https://raw.githubusercontent.com/Saim-x69x/sakura/main/ApiUrl.json";

async function getApiUrl() {
    const res = await axios.get(apiUrl);
    return res.data.apiv3;
}

async function urlToBase64(url) {
    const res = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(res.data).toString("base64");
}

module.exports = {
    config: {
        name: "geminigen",
        aliases: ["gem"],
        version: "1.0",
        author: "Saimx69x (API by Kay)",
        countDown: 5,
        role: 0,
        shortDescription: "Create or enhance images using AI",
        longDescription:
            "Generate a new AI image from a text prompt or enhance an existing image by replying to it.",
        category: "ai",
        guide:
            "{p}geminigen <prompt>\n" +
            "{p}geminigen <prompt> (reply to an image to edit it)"
    },

    onStart: async function ({ api, event, args, message }) {
        const repliedImage = event.messageReply?.attachments?.[0];
        const prompt = args.join(" ").trim();

        if (!prompt) {
            return message.reply(
                "⚠️ | You forgot to add a prompt!\n\nTry these examples:\n• /geminigen a futuristic cityscape\n• /geminigen turn this into anime (reply to an image)"
            );
        }

        const processingMsg = await message.reply(
            "🎨 | Your image is being crafted..."
        );

        const imgPath = path.join(
            __dirname,
            "cache",
            `${Date.now()}_geminigen.jpg`
        );

        try {
            const API_URL = await getApiUrl();

            const payload = {
                prompt: repliedImage
                    ? `Enhance the attached image according to this description:\n${prompt}`
                    : `Generate a high-quality image based on the following description:\n${prompt}`,
                format: "jpg"
            };

            if (repliedImage && repliedImage.type === "photo") {
                payload.images = [await urlToBase64(repliedImage.url)];
            }

            const res = await axios.post(API_URL, payload, {
                responseType: "arraybuffer",
                timeout: 180000
            });

            await fs.ensureDir(path.dirname(imgPath));
            await fs.writeFile(imgPath, Buffer.from(res.data));

            await api.unsendMessage(processingMsg.messageID);

            await message.reply({
                body: repliedImage
                    ? `✅ Image successfully enhanced!\nPrompt: ${prompt}`
                    : `✅ Your AI-generated image is ready!\nPrompt: ${prompt}`,
                attachment: fs.createReadStream(imgPath)
            });
        } catch (error) {
            console.error("GEMINIGEN Error:", error?.response?.data || error.message);

            if (processingMsg?.messageID) {
                await api.unsendMessage(processingMsg.messageID);
            }

            message.reply(
                "❌ | Unable to complete the request at the moment.\nTry again in a few minutes."
            );
        } finally {
            if (fs.existsSync(imgPath)) {
                await fs.remove(imgPath);
            }
        }
    }
};
