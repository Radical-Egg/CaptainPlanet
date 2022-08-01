module.exports = {
  name: "messageCreate",
  execute(message) {
    if (message.author.bot) {
      return;
    }
    message.reply("ok?");
    console.log("Sent!");
  },
};
