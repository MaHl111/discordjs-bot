import { Message, MessageEmbed } from "discord.js";
import pckg from "../../package.json";
import { Bot } from "../../utils/Bot";

module.exports = {
  name: "info",
  aliases: ["information", "i"],
  category: "info",
  description: "Show information about bot.",
  usage: "",
  run: async (bot: Bot, message: Message, args: string[]) => {
    if (!message.author.bot && message.deletable) message.delete();

    const embed = new MessageEmbed()
      .setTitle("INFO")
      .setDescription(bot.user?.username!)
      .setColor("#FFD500")
      .setThumbnail(bot.user!.displayAvatarURL())
      //.setImage(client.user.displayAvatarURL()
      .setFooter(message.author.username, message.author.displayAvatarURL())
      .setTimestamp(message.createdTimestamp)
      .addField("Version", pckg.version)
      .addField("Author", "<@96602767056973824>")
      .addField(
        "Usage",
        "Type `.h` or `.help` to see all commands. Use `.help <command | alias>` to see information about specific command. In case of any issues with bot, DM me, I will fix it as soon as possible.",
      );

    const response = message.channel.send({ embeds: [embed] });
    return response;
  },
};
