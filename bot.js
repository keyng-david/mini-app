const dotenv = require("dotenv");
dotenv.config();

const { Bot, InlineKeyboard } = require("grammy");

// Create a bot using the Telegram token
const bot = new Bot(process.env.HTTP_API_TOKEN || "");

const introductionMessage = `Hello! Welcome to Bot
............................................................................`;

const aboutUrlKeyboard = new InlineKeyboard();
aboutUrlKeyboard.row().webApp(
    "Play game",
    process.env.WEBAPP_URL
);
aboutUrlKeyboard.row().text(
    "How to earn from the game",
    "howearn"
);

const replyWithIntro = (ctx) => {
    console.log(ctx.from.username);
    ctx.reply(introductionMessage, {
        reply_markup: aboutUrlKeyboard,
        parse_mode: "HTML",
    });
};

// Keep this at the bottom of the file
bot.command("start", replyWithIntro);
bot.command("help", replyWithIntro);

// How to
const howToEarnMessage = `How to 
............................................................................`;
const howToEarnKeyboard = new InlineKeyboard();
howToEarnKeyboard.row().webApp(
    "Play game",
    process.env.WEBAPP_URL
);

const howToEarnWithIntro = (ctx) => {
    console.log(ctx.from.username);
    ctx.reply(howToEarnMessage, {
        reply_markup: howToEarnKeyboard,
        parse_mode: "HTML",
    });
};

bot.callbackQuery('howearn', howToEarnWithIntro);


bot.on("message", replyWithIntro);
bot.start();