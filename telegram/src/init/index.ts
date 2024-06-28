import bot from "../bot";

export const setChatMenuButton = async () => {
  bot.telegram
    .setChatMenuButton({
      menuButton: {
        type: "web_app",
        text: "Play",
        web_app: { url: process.env.MINI_WEB_APP_URL || "" },
      },
    })
    .then(() => {})
    // @ts-ignore
    .catch((err) => {
      console.error("Failed to set menu button:", err);
    });
};

export const setCommands = async () => {
  // await bot.telegram.setMyCommands(availableCommands);
};
