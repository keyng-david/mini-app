import { Context, Markup } from "telegraf";

const message = `Help!!!
............................................................................`;

const keyboard = Markup.inlineKeyboard([
  [Markup.button.webApp("Play Game", process.env.MINI_WEB_APP_URL!)],
  [Markup.button.callback("How to earn from the game", "howto")],
]).reply_markup;

const help = (ctx: Context) => {
  ctx.reply(message, {
    reply_markup: keyboard,
    parse_mode: "HTML",
  });
};
export default help;
