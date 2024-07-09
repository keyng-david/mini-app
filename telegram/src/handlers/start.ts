import { users } from "@/requests/requests";
import { Context, Markup } from "telegraf";

const message = `Hello! Welcome to Bot
............................................................................`;

const keyboard = Markup.inlineKeyboard([
  [Markup.button.webApp("Play game", process.env.MINI_WEB_APP_URL!)],
  [Markup.button.callback("How to earn from the game", "howto")],
]).reply_markup;

const start = async (ctx: Context) => {
  const { payload } = ctx;
  const { id, first_name, username } = ctx.update.message.from;
  ctx.reply(message, {
    reply_markup: keyboard,
    parse_mode: "HTML",
  });
  const data = {
    tgid: id,
    username: username,
    firstName: first_name,
    lastName: "",
    payload: payload,
  };
  console.log("start: ", data);
  await users(data);
};
export default start;
