module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    // client.emit("weeklyWinners");
    client.emit("scoreSettings", client);
    client.emit("transactions", client);
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
