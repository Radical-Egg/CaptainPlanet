const commands = require("./Commands");
const events = require("./Events");
const { TOKEN } = require("../config.json");
const { Collection, Client, GatewayIntentBits } = require("discord.js");

/**
 * This class is primarily the boiler plate code
 * from the discord.js documentation
 * This should make it easier to use the bot with other classes without getting
 * to cluttered in the root dir
 */

class CaptainPlanet {
  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });
    this.client.commands = new Collection();

    // When the client is ready, run this code (only once)
    this.client.once("ready", () => {});

    /**
     * Register commands and events to the bot
     * To update guild or global commands
     * see deploy-commands.js and delete-commands.js
     */

    commands.CommandRegister(this.client);
    commands.CommandExecutor(this.client);
    events.EventRegister(this.client);
  }
  GetClient() {
    return this.client;
  }
}

module.exports = CaptainPlanet;
