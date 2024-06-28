import { Context, Markup } from "telegraf";

const message = `Hello! Welcome to Bot
............................................................................`;

const keyboard = Markup.inlineKeyboard([
  [Markup.button.webApp("Play game", process.env.MINI_WEB_APP_URL!)],
  [Markup.button.callback("How to earn from the game", "howto")],
]).reply_markup;

const start = (ctx: Context) => {
  ctx.reply(message, {
    reply_markup: keyboard,
    parse_mode: "HTML",
  });
};
export default start;
