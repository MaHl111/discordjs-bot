import {
  Client,
  ClientOptions,
  Collection,
  Guild,
  Message,
  User,
} from "discord.js";
import { EventEmitter } from "node:events";
const Cabin = require("cabin");

class Bot extends Client {
  logger: typeof Cabin;
  //   config: Object;
  //   db: Database; //Collection<string, Database>;
  commands: Collection<string, Command>;
  command_aliases: Collection<string, string>;
  event_manager: EventEmitter;
  constructor(options: ClientOptions) {
    super(options);

    this.logger = new Cabin();

    /* Collections */
    this.commands = new Collection();
    this.command_aliases = new Collection();

    /* EventEmitter */
    this.event_manager = new EventEmitter();
  }
}

/**
 * Interface for commands
 * @interface Commands
 */
interface Command {
  name: string;
  aliases: string[];
  category: string;
  description: string;
  usage: string;
  run: (bot: Bot, message: Message, args: string[]) => {};
}

export { Bot, Command };
