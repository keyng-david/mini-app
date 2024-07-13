import { Context, Markup } from "telegraf";

const message = `How to earn!!!
............................................................................`;

const keyboard = Markup.inlineKeyboard([
  [Markup.button.webApp("Play Game", process.env.MINI_WEB_APP_URL!)],
]).reply_markup;

const howto = (ctx: Context) => {
  ctx.reply(message, {
    reply_markup: keyboard,
    parse_mode: "HTML",
  });
};

export default howto;
