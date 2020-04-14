const Canvas = require('canvas');

exports.renderVictim = async (Discord, data) => {
	return new Promise(async (resolve, reject) => {
		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');

		const background = await Canvas.loadImage('https://i.imgur.com/wSTFkRM.png');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'teste.png');

		const embed = new Discord.MessageEmbed()
			.setColor('#c2180c')
			.setImage(attachment)
			.setAuthor(
				`Clique aqui para mais informações`,
				'https://img.utdstc.com/icons/albion-online.png:225',
				`https://albiononline.com/pt/killboard/kill/${data.EventId}`
			)
			.setTitle('💀 Um Membro da Guilda foi de base.')
			.setDescription(
				`O ${data.Victim.Name} foi morto em ${data.KillArea} com ${data.Victim.Inventory.length} Itens na Bag.`
			)
			.addField('__**Vítima:**__', `🩸 ${data.Victim.Name}`)
			.addField('**Fama**', parseInt(data.Victim.FameRatio), true)
			.addField('**Guild**', data.Victim.GuildName ? data.Victim.GuildName : '-', true)
			.addField('**IP**', parseInt(data.Victim.AverageItemPower), true)
			.addField('__**Assassino:**__', `⚔️ ${data.Killer.Name}`)
			.addField('**Fama**', parseInt(data.Killer.FameRatio), true)
			.addField('**Guild**', data.Killer.GuildName ? data.Killer.GuildName : '-', true)
			.addField('**IP**', parseInt(data.Killer.AverageItemPower), true)
			.setFooter(`O ${data.Killer.Name} recebeu ajuda de mais ${data.numberOfParticipants} participante(s).`)
			.setTimestamp(data.TimeStamp);
		resolve(embed);
	});
};
