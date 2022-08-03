const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const { Collection } = require("discord.js");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

class CommandHandler {
  constructor(client) {
    this.client = client;
    this.client.commands = new Collection();
    this.CommandRegister(client);
    this.CommandExecutor(client);
  }

  CommandRegister = () => {
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      // Set a new item in the Collection
      // With the key as the command name and the value as the exported module
      this.client.commands.set(command.data.name, command);
    }
  };

  /**
   * Boiler plate to execute a slash command
   * Right now it seems like the boilerplate
   * is all that is needed
   */
  CommandExecutor = () => {
    this.client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = this.client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    });
  };
}

module.exports = CommandHandler;
