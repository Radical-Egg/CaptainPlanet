const Sequelize = require("sequelize");
const database = require("./Database");

class Guilds {
  constructor() {
    this.Guilds = database.define("guilds", {
      guildID: {
        type: Sequelize.STRING,
        unique: true,
      },
      leagueID: Sequelize.STRING,
    });
  }
  sync = () => {
    try {
      this.Guilds.sync();
    } catch (error) {
      return error;
    }
  };
  create = async (guild_data) => {
    try {
      const guild = await this.Guilds.create({
        guildID: guild_data.guildID,
        leagueID: guild_data.leagueID,
      });
    } catch (error) {
      if (error.name == "SequelizeUniqueConstraintError") {
        throw `There is already a league registered to this server with leagueID of ${guild_data.leagueID}`;
      }

      return "Something went wrong :C";
    }
    return `Created ${guild_data.guildID} with leagueID: ${guild_data.leagueID}`;
  };
  retrieve = async (guild_data) => {
    const guild = await this.Guilds.findOne({
      where: { name: guild_data.guildID },
    });

    if (guild) {
      return interaction.reply(guild.get("leagueID"));
    }

    return interaction.reply(`Could not find league: ${guild_data.league_id}`);
  };
}

module.exports = Guilds;
