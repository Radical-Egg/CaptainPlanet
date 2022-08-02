/**
 * Boiler plate from
 * https://discordjs.guide/creating-your-bot/deleting-commands.html#deleting-specific-commands
 * This will delete all of the registered commands
 */

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
const { CLIENT_ID, GUILD_ID, TOKEN } = require(`../../config.json`);

const rest = new REST({ version: "10" }).setToken(TOKEN);

// for guild-based commands
rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
  .then(() => console.log("Successfully deleted all guild commands."))
  .catch(console.error);

// for global commands
rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);
