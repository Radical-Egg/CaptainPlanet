module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    const halfDay = 60 * 60 * 1000 * 12;

    setInterval(() => {
      client.emit("scoreSettings", client);
      // client.emit("transactions", client);
    }, halfDay);
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
