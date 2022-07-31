require("dotenv").config();

const SleeperController = require("./controllers/SleeperController");

let control = new SleeperController(process.env.LEAGUE_ID, "2022", "nfl");

/*control.GetLeague().then((response) => {
  console.log(response);
});*/
