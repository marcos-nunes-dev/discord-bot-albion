const axios = require('axios');
const renderV = require('../utils/renderVictim');
const renderK = require('../utils/renderKiller');
const renderA = require('../utils/renderAlliance');

const Canvas = require('canvas');

let AlreadyRendered = [];

exports.run = ({ Discord, client }) => {
	const hook = new Discord.WebhookClient(process.env.KILLBOARD_HOOK_ID, process.env.KILLBOARD_HOOK_TOKEN);

	setInterval(() => {
		console.log('fetch');
		axios
			.get('http://gameinfo.albiononline.com/api/gameinfo/events?&offset=0&limit=40')
			.then((response) => {
				response.data.map((event) => {
					if (event.Killer.GuildId == process.env.KILLBOARD_GUILD_TRACK_ID) {
						if (!AlreadyRendered.includes(event.EventId)) {
							// Add Event to controller
							AlreadyRendered.push(event.EventId);
							// Member guild was the killer
							renderK.renderKiller(Discord, event).then((resolve) => {
								Promise.all([hook.send([resolve.attachment, resolve.embed])]).then(() => {
									return;
								});
							});
						}
					} else if (event.Victim.GuildId == process.env.KILLBOARD_GUILD_TRACK_ID) {
						if (!AlreadyRendered.includes(event.EventId)) {
							// Add Event to controller
							AlreadyRendered.push(event.EventId);
							// Member guild was the killer
							renderV.renderVictim(Discord, event).then((resolve) => {
								Promise.all([hook.send([resolve.attachment, resolve.embed])]).then(() => {
									return;
								});
							});
						}
					} else if (
						event.Victim.AllianceId == process.env.KILLBOARD_ALLIANCE_TRACK_ID ||
						event.Killer.AllianceId == process.env.KILLBOARD_ALLIANCE_TRACK_ID
					) {
						// if (!AlreadyRendered.includes(event.EventId)) {
						// 	// Add Event to controller
						// 	AlreadyRendered.push(event.EventId);
						// 	// Member guild was the killer
						// 	renderA.renderAlliance(Discord, event).then((resolve) => {
						// 		Promise.all([hook.send(resolve)]).then(() => {
						// 			return;
						// 		});
						// 	});
						// }
					}
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}, 60000);
};
