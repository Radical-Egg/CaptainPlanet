const { TOKEN, LEAGUE_ID } = require("./config.json");
const SleeperController = require("./controllers/SleeperController");
const CaptainPlanet = require("./bot/CaptainPlanet");
// Require the necessary discord.js classes

const capt = new CaptainPlanet();

// Login to Discord with your client's token
capt.GetClient().login(TOKEN);

// let control = new SleeperController(LEAGUE_ID, "2022", "nfl");
