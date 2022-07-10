//@ts-ignore
import ascii from "ascii-table";
import { Bot } from "../Bot";
import { readdirSync } from "fs";

const table = new ascii("Commands", "").setHeading("Command", "Load status");

module.exports = (bot: Bot) => {
  // Read every commands subfolder
  bot.logger.info("Command Handler loaded");
  readdirSync("./commands/").forEach((dir) => {
    // Filter so we only have .js command files
    const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
      file.endsWith(".js"),
    );

    // Loop over the commands, and add all of them to a collection
    // If there's no name found, prevent it from returning an error,
    // By using a cross in the table we made.
    for (let file of commands) {
      const pull = require(`../../commands/${dir}/${file}`);

      if (pull.name) {
        bot.commands.set(pull.name, pull);
        table.addRow(file, "✅");
      } else {
        table.addRow(
          file,
          `❌  -> missing a help.name, or help.name is not a string.`,
        );
        continue;
      }

      // If there's an aliases key, read the aliases.
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach((alias: string) =>
          bot.command_aliases.set(alias, pull.name),
        );
    }
  });
  // Log the table
  console.log(table.toString());
};
