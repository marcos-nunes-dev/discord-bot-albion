const axios = require("axios");

exports.run = ({ Discord, client }) => {
  const hook = new Discord.WebhookClient(
    "699405231867297834",
    "L4dgAdX_DdWjRlGxNZy_MSLU9Zr86b1HRzZr37K0L0YJ4V8AI7IvqXvKxw-nzMf4W7Z6"
  );
  setInterval(() => {
    axios
      .get(
        "http://gameinfo.albiononline.com/api/gameinfo/events?&offset=0&limit=10"
      )
      .then(function (response) {
        response.data.forEach((event) => {
          if (
            event.Killer.GuildName === "Octopus Nightmare" ||
            event.Victim.GuildName === "Octopus Nightmare"
          ) {
            hook.send(JSON.stringify(event));
          } else {
            console.log("nenhum de nos");
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, 120000);
};
