const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready");
});

client.initialize();

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function runCompletion(message) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 200,
  });
  return completion.data.choices[0].text;
}

client.on("message", (message) => {
  // if(message.from === "120363133147614218@g.us") {
    if(message.from === "919817479497@c.us") {
      console.log(JSON.stringify({message}));
      runCompletion(message.body).then((result) => message.reply("custom: "+ result.toUpperCase()));
    }
  // }
});
