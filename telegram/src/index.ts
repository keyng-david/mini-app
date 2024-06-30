import bot from "./bot";
import createBot from "./create";

const launchBot = async () => {
  bot.launch();
  if (bot)
    bot.telegram.getMe().then((res) => {
      console.log(`Bot started. Available at https://t.me/${res.username}`);
    });
};

const telegram_bot = async () => {
  await createBot();
  await launchBot();
};

telegram_bot();
