const axios = require("axios");

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
      //     hook.send(`${killer.Name} explodiu ${victim.Name}`);
      //   } else if (event.Victim.GuildId == process.env.KILLBOARD_GUILD_TRACK_ID) {
      //     hook.send(`${victim.Name} foi ownado por ${killer.Name}`);
      //   }
      // });
      hook.send(
        `> Vítima - ${response.data[0].Victim.Name} | IP:${response.data[0].Victim.AverageItemPower} | PKFama:${response.data[0].Victim.KillFame}`
      );
      hook.send("");
      console.log(response.data[0].Killer.Equipment.MainHand);
    })
    .catch(function (error) {
      console.log(error);
    });
};
