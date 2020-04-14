const axios = require("axios");
const renderV = require("../utils/renderVictim");
const renderKiller = require("../utils/renderKiller");

exports.run = ({ Discord, client }) => {
  const hook = new Discord.WebhookClient(
    process.env.KILLBOARD_HOOK_ID,
    process.env.KILLBOARD_HOOK_TOKEN
  );

  setInterval(() => {}, 30000000);
  axios
    .get(
      "http://gameinfo.albiononline.com/api/gameinfo/events?&offset=0&limit=10"
    )
    .then(function (response) {
      // response.data.forEach((event) => {
      //   if (event.Killer.GuildId == process.env.KILLBOARD_GUILD_TRACK_ID) {
      //     // Member guild was the killer
      //     hook.send(renderKiller(event));
      //   } else if (
      //     event.Victim.GuildId == process.env.KILLBOARD_GUILD_TRACK_ID
      //   ) {
      //     // Member guild was the victim
      //     hook.send(renderVictim(event));
      //   }
      // });

      // test purpose
      renderV.renderVictim(Discord, response.data[0]).then((resolve) => {
        hook.send(resolve);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
