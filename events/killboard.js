const axios = require('axios');
const renderV = require('../utils/renderVictim');
const renderK = require('../utils/renderKiller');
const renderA = require('../utils/renderAlliance');

const Canvas = require('canvas');

exports.run = ({ Discord, client }) => {
	const hook = new Discord.WebhookClient(process.env.KILLBOARD_HOOK_ID, process.env.KILLBOARD_HOOK_TOKEN);

	setInterval(() => {
		console.log('fetch');
		axios
			.get('http://gameinfo.albiononline.com/api/gameinfo/events?&offset=0&limit=40')
			.then(async (response) => {
				response.data.forEach((event) => {
					if (event.Killer.GuildId == process.env.KILLBOARD_GUILD_TRACK_ID) {
						// Member guild was the killer
						renderK.renderKiller(Discord, event).then(async (resolve) => {
							await hook.send(resolve.attachment).then(() => {
								hook.send(resolve.embed);
							});
						});
					} else if (event.Victim.GuildId == process.env.KILLBOARD_GUILD_TRACK_ID) {
						renderV.renderVictim(Discord, event).then(async (resolve) => {
							await hook.send(resolve.attachment).then(() => {
								hook.send(resolve.embed);
							});
						});
					} else if (
						event.Victim.AllianceId == process.env.KILLBOARD_ALLIANCE_TRACK_ID ||
						event.Killer.AllianceId == process.env.KILLBOARD_ALLIANCE_TRACK_ID
					) {
						renderA.renderAlliance(Discord, event).then(async (resolve) => {
							await hook.send(resolve.attachment).then(() => {
								hook.send(resolve.embed);
							});
						});
					}
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}, 60000);
};
