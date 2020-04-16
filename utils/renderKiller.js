const Canvas = require('canvas');

exports.renderKiller = async (Discord, data) => {
	return new Promise(async (resolve, reject) => {
		const canvas = Canvas.createCanvas(1200, 732);
		const ctx = canvas.getContext('2d');

		// Drawbackground
		const background = await Canvas.loadImage('./docs/killboard-background.jpg');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		// Load Killer Images in Comp
		const killerMainHand =
			data.Killer.Equipment.MainHand &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Killer.Equipment.MainHand.Type));

		const killerHead =
			data.Killer.Equipment.Head &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Killer.Equipment.Head.Type));

		const killerArmor =
			data.Killer.Equipment.Armor &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Killer.Equipment.Armor.Type));

		const killerShoes =
			data.Killer.Equipment.Shoes &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Killer.Equipment.Shoes.Type));

		const killerBag =
			data.Killer.Equipment.Bag &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Killer.Equipment.Bag.Type));

		const killerCape =
			data.Killer.Equipment.Cape &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Killer.Equipment.Cape.Type));

		const killerMount =
			data.Killer.Equipment.Mount &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Killer.Equipment.Mount.Type));

		const killerPotion =
			data.Killer.Equipment.Potion &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Killer.Equipment.Potion.Type));

		const killerFood =
			data.Killer.Equipment.Food &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Killer.Equipment.Food.Type));

		const killerOffHand =
			data.Killer.Equipment.OffHand &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Killer.Equipment.OffHand.Type));

		// Load Victim images in comp
		const victimMainHand =
			data.Victim.Equipment.MainHand &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Victim.Equipment.MainHand.Type));

		const victimHead =
			data.Victim.Equipment.Head &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Victim.Equipment.Head.Type));

		const victimArmor =
			data.Victim.Equipment.Armor &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Victim.Equipment.Armor.Type));

		const victimShoes =
			data.Victim.Equipment.Shoes &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Victim.Equipment.Shoes.Type));

		const victimBag =
			data.Victim.Equipment.Bag &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Victim.Equipment.Bag.Type));

		const victimCape =
			data.Victim.Equipment.Cape &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Victim.Equipment.Cape.Type));

		const victimMount =
			data.Victim.Equipment.Mount &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Victim.Equipment.Mount.Type));

		const victimPotion =
			data.Victim.Equipment.Potion &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Victim.Equipment.Potion.Type));

		const victimFood =
			data.Victim.Equipment.Food &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Victim.Equipment.Food.Type));

		const victimOffHand =
			data.Victim.Equipment.OffHand &&
			(await Canvas.loadImage(process.env.KILLBOARD_URL_IMAGES + data.Victim.Equipment.OffHand.Type));

		// Killer Loadout
		killerPotion && ctx.drawImage(killerPotion, 388, 425, 120, 120);
		killerOffHand && ctx.drawImage(killerOffHand, 358, 302, 120, 120);
		killerCape && ctx.drawImage(killerCape, 388, 177, 120, 120);
		killerShoes && ctx.drawImage(killerShoes, 227, 415, 120, 120);
		killerMount && ctx.drawImage(killerMount, 227, 525, 120, 120);
		killerArmor && ctx.drawImage(killerArmor, 227, 300, 120, 120);
		killerHead && ctx.drawImage(killerHead, 225, 185, 120, 120);
		killerFood && ctx.drawImage(killerFood, 72, 425, 120, 120);
		killerMainHand && ctx.drawImage(killerMainHand, 97, 302, 120, 120);
		killerBag && ctx.drawImage(killerBag, 72, 177, 120, 120);

		// Victim Loadout 827
		victimPotion && ctx.drawImage(victimPotion, 1038, 425, 120, 120);
		victimOffHand && ctx.drawImage(victimOffHand, 1008, 302, 120, 120);
		victimCape && ctx.drawImage(victimCape, 1038, 177, 120, 120);
		victimShoes && ctx.drawImage(victimShoes, 877, 415, 120, 120);
		victimMount && ctx.drawImage(victimMount, 877, 525, 120, 120);
		victimArmor && ctx.drawImage(victimArmor, 877, 300, 120, 120);
		victimHead && ctx.drawImage(victimHead, 875, 185, 120, 120);
		victimFood && ctx.drawImage(victimFood, 722, 425, 120, 120);
		victimMainHand && ctx.drawImage(victimMainHand, 747, 302, 120, 120);
		victimBag && ctx.drawImage(victimBag, 722, 177, 120, 120);

		// Convert to att
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'killboard.png');

		const embed = new Discord.MessageEmbed()
			.setColor('#4ceb34')
			.setAuthor(
				`Clique aqui para mais informações`,
				'https://img.utdstc.com/icons/albion-online.png:225',
				`https://albiononline.com/pt/killboard/kill/${data.EventId}`
			)
			.setTitle('💀 Um Membro da Guilda está em ação.')
			.setDescription(
				`O ${data.Killer.Name} assassinou em ${data.KillArea}.`
			)
			.addField('__**Assassino:**__', `⚔️ ${data.Killer.Name} (**IP** ${parseInt(data.Killer.AverageItemPower)})`, true)
			.addField('__**Vítima:**__', `🩸 ${data.Victim.Name} (**IP** ${parseInt(data.Victim.AverageItemPower)})`, true)
			.setFooter(`O ${data.Killer.Name} recebeu ajuda de mais ${data.numberOfParticipants - 1} participante(s).`)
			.setTimestamp(data.TimeStamp);
		resolve({ embed, attachment });
	});
};
