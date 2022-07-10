import { ActivityTypes } from "discord.js/typings/enums";
import { Bot } from "../Bot";

module.exports = (bot: Bot) => {
  bot.once("ready", () => {
    const randomActivity: string[] = [
      `Type .h or .help for commands`,
      `with ${bot.guilds.cache.size} servers | Type .help`,
      `with ${bot.users.cache.size} users | Type .help`,
    ];
    let randActivity = Math.floor(Math.random() * randomActivity.length);
    let presence = randomActivity[randActivity].toString();

    bot.user?.setPresence({
      status: "online",
      activities: [
        {
          name: presence,
          type: ActivityTypes.PLAYING,
        },
      ],
    });

    bot.logger.log("Bot ready.");
  });
};
