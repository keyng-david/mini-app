import bot from "../bot";
import help from "../handlers/help";
import howto from "../handlers/howto";
import start from "../handlers/start";

function attachListeners() {
  bot.start(start);
  bot.help(help);
  bot.action("howto", howto);
}

export default attachListeners;
