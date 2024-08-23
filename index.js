const { Client, GatewayIntentBits, Partials, Collection, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');
const colors = require("colors")
const config = require('./config.json');
const ms = require("ms")
const bump = require("./database/models/bump.js")
const client = new Client({
    intents: 3276799,
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.User,
        Partials.ThreadMember,
    ]
});

const CaptchaManager  = require("./module-captcha/captcha.js") 
const Captcha = new CaptchaManager(client)

module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();

client.on('ready', async () => {
 require("./handler")(client);
 require("./database/connect.js")
    const readyEvent = require('./events/client/ready.js')
    await readyEvent.execute(client)
})

client.login(config.token)

client.color = "#2c2d31"
client.invite = "https://discord.gg/tEx2Qgpcke"
client.image = "https://cdn.discordapp.com/attachments/1134054891506118666/1134080378903216148/20230726_165719.png";


process.on("unhandledRejection", (error) => {
if (error.code == 10062) return;
    const channel = client.channels.cache.get("1276543891344199730");
  
  const embed = new EmbedBuilder()
    .setColor(client.color)
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
    .addFields(
      { name: 'Error type', value: `\`\`\`js\n${error.name}\`\`\`` },
      { name: 'Error message', value: `\`\`\`js\n${error}\`\`\`` }
    );
  
  channel.send({ embeds: [embed] }).catch(err => {});
    console.log(`[ERROR] ${error}`.red);

})
