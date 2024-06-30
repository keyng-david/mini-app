import { session } from "telegraf";
import bot from "../bot";

// Attach all middlewares to the bot
function attachMiddlewares() {
  bot.use(session());
}

export default attachMiddlewares;
