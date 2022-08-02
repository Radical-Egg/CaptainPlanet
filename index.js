require("dotenv").config();
// TODO
/**
 * Remove config.json references in place of dotenv
 * This will make it easier to deploy with docker
 */
const { TOKEN, LEAGUE_ID } = require("./config.json");
const CaptainPlanet = require("./src/CaptainPlanet");
// Require the necessary discord.js classes

const capt = new CaptainPlanet();

// Login to Discord with your client's token
capt.GetClient().login(TOKEN);

// let control = new SleeperController(LEAGUE_ID, "2022", "nfl");
