/**
 * Boiler plate at
 * https://discordjs.guide/creating-your-bot/event-handling.html#reading-event-files
 */

const fs = require("node:fs");
const path = require("node:path");

class EventHandler {
  constructor(client) {
    this.client = client;

    this.EventRegister(this.client);
  }
  /**
   * Read through the ./events folder and load in all event files
   */
  EventRegister = () => {
    const eventsPath = path.join(__dirname, "events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        this.client.once(event.name, (...args) => event.execute(...args));
      } else {
        this.client.on(event.name, (...args) => event.execute(...args));
      }
    }
  };
}

module.exports = EventHandler;
