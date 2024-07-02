import { Telegraf } from "telegraf";

const opts = {
  // During result publish times, servers will be slow to respond, this makes the API requests to be slower
  // Axios timeout is set to 25 seconds, but telegraf will timeout before that
  // This creates request duplication. Hence we need to increase the telegraf timeout
  handlerTimeout: 1000 * 30,
};

// Create a new bot instance
const bot = new Telegraf(process.env.BOT_TOKEN || "", opts);

// The top level error handler
// this will catch any errors that may happen
bot.catch((error) => {
  console.error("TELEGRAF ERROR", error);
});

export default bot;
