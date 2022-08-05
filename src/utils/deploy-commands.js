/*
Boilerplate from 
https://discordjs.guide/creating-your-bot/creating-commands.html#command-deployment-script
*/
const fs = require("node:fs");
const path = require("node:path");
const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { CLIENT_ID, GUILD_ID, TOKEN } = require("../../config.json");

const commands = [];
const commandsPath = path.join(__dirname, "../commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

/*
 * register the commands with the discord server
 * Guild refers to server, if we want to register applications globally we need to use
 * Routes.applicationCommands
 */
rest
  .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

rest
  .put(Routes.applicationCommands(CLIENT_ID), { body: commands })
  .then(() =>
    console.log("Successfully registered global application commands.")
  )
  .catch(console.error);
