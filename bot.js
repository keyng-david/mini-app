const dotenv = require("dotenv");
dotenv.config();

const { Telegraf, Markup } = require("telegraf");

// Create a bot using the Telegram token
const bot = new Telegraf(process.env.HTTP_API_TOKEN || "");

const introductionMessage = `Hello! Welcome to Bot
............................................................................`;

const introductionUrlKeyboard = Markup.inlineKeyboard([
  [Markup.button.webApp("Play game", process.env.WEBAPP_URL)],
  [Markup.button.callback("How to earn from the game", "howearn")],
]).reply_markup;

const replyWithIntro = (ctx) => {
  console.log("start:", ctx.from.username);
  ctx.reply(introductionMessage, {
    reply_markup: introductionUrlKeyboard,
    parse_mode: "HTML",
  });
};

// Keep this at the bottom of the file
bot.start(replyWithIntro);
bot.help(replyWithIntro);

// How to
const howtoMessage = `How to
............................................................................`;
const howtoKeyboard = Markup.inlineKeyboard([
  Markup.button.webApp("Play game", process.env.WEBAPP_URL),
]).reply_markup;

const replyWithHowto = (ctx) => {
  ctx.reply(howtoMessage, {
    reply_markup: howtoKeyboard,
    parse_mode: "HTML",
  });
};

bot.action("howearn", replyWithHowto);

bot.on("message", replyWithIntro);
bot.launch();
