require("dotenv").config();

console.log("Conectando...");

// Instance Discord
const Discord = require("discord.js"),
  client = new Discord.Client({
    autoReconnect: true,
    messageCacheMaxSize: 2024,
    fetchAllMembers: true,
    disabledEvents: ["typingStart", "typingStop", "guildMemberSpeaking"],
    messageCacheLifetime: 1680,
    disableEveryone: true,
    messageSweepInterval: 1680,
  });
(config = { token: process.env.DISCORD_TOKEN, prefix: process.env.PREFIX }),
  (token = process.env.DISCORD_TOKEN);

// Command Prefix
let prefix = config.prefix;

// Client Auth
client.login(token);

// On Discord connection ready
client.on("ready", () => {
  // Number of Servers
  //   console.log(
  //     `Servidores(${client.guilds.size}):\n${client.guilds
  //       .map((servidor) => servidor.name)
  //       .join(", ")}`
  //   );

  // Set Game Status
  setInterval(() => {
    client.user.setPresence({
      game: {
        name: `Albion Online`,
        type: 0,
      },
    });
  }, 1 * 60 * 1000);

  // Run Killboard
  try {
    let eventFile = require(`./events/killboard.js`);
    eventFile.run({ Discord, client });
  } catch (err) {
    if (err.code == "MODULE_NOT_FOUND") return;
    console.error(err);
  }
  
  console.log("Iniciado");
});

// Run commands from commands folder
client.on("message", (message) => {
  // ignore DM
  if (message.channel.type == "dm") return;
  // ignore self and other bots
  if (message.author.bot) return;
  // ignore if not start with prefix command
  if (!message.content.startsWith(prefix)) return;

  // get args from message
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);

  // try run command from command files
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run({ Discord, client, message, args });
  } catch (err) {
    if (err.code == "MODULE_NOT_FOUND") return;
    console.error(err);
  }
});
