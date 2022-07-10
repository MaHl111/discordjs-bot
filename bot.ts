import { Bot } from "./utils/Bot";
import { readdirSync } from "fs";
import { Intents } from "discord.js";
require("dotenv").config();
const intents = [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
];

const bot: Bot = new Bot({ intents: intents });

bot.login(process.env.DISCORD_TOKEN);

/* Load Handlers / Features */
readdirSync("./utils/handlers/")
  .filter((file) => file.endsWith(".js"))
  .forEach((handler) => require(`./utils/handlers/${handler}`)(bot));
