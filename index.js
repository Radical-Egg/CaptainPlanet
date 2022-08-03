const { TOKEN, LEAGUE_ID } = require("./config.json");
const CaptainPlanet = require("./src/CaptainPlanet");
// Require the necessary discord.js classes

const capt = new CaptainPlanet();

// Login to Discord with your client's token
capt.GetClient().login(TOKEN);
