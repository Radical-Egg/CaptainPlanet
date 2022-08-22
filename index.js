const { TOKEN, LEAGUE_ID, DB_URI } = require("./config.json");
const CaptainPlanet = require("./src/CaptainPlanet");
const MongoDB = require("./src/models/Database");

MongoDB.init(DB_URI);
// Require the necessary discord.js classes

const capt = new CaptainPlanet();

// Login to Discord with your client's token
capt.GetClient().login(TOKEN);
