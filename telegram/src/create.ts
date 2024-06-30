import axios from "axios";
import { setChatMenuButton, setCommands } from "./init";
import attachCommands from "./init/commands";
import attachMiddlewares from "./init/middlewares";
import attachListeners from "./init/listeners";

const checkEnv = async () => {
    if (!(process.env.BOT_TOKEN && process.env.ENV_TYPE)) {
        throw new Error("Missing environment variables BOT_TOKEN or ENV_TYPE.");
    }
    
    if (process.env.ENV_TYPE === "DEVELOPMENT") {
    if (process.env.MINI_WEB_APP_URL) {
      return;
    }

    try {
      const res = await axios.get("http://localhost:4040/api/tunnels/");
      process.env.MINI_WEB_APP_URL = res.data.tunnels[0].public_url;
    } catch (e) {
        console.log("ngrok not running. Please start ngrok and try again.");
    }
}
if (
    process.env.ENV_TYPE === "PRODUCTION" &&
    !process.env.WEBHOOK_PORT &&
    !process.env.WEBHOOK_DOMAIN
) {
    throw new Error("Missing environment variables.");
  }
};

// Attach all commands, middlewares and listeners to the bot
const createBot = async () => {
  await checkEnv();
  setCommands();
  setChatMenuButton();
  attachMiddlewares();
  attachCommands();
  attachListeners();
};

export default createBot;
