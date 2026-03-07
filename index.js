require('dotenv').config();

const {
Client,
GatewayIntentBits,
SlashCommandBuilder,
Routes,
REST,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
EmbedBuilder
} = require('discord.js');

const client = new Client({
intents: [GatewayIntentBits.Guilds]
});

const commands = [

new SlashCommandBuilder()
.setName('info')
.setDescription('Show available services'),

new SlashCommandBuilder()
.setName('payments')
.setDescription('Show payment methods'),

new SlashCommandBuilder()
.setName('log')
.setDescription('Log a purchase')
.addUserOption(option =>
option.setName('user')
.setDescription('User who bought')
.setRequired(true))
.addIntegerOption(option =>
option.setName('price')
.setDescription('Price paid')
.setRequired(true))
.addStringOption(option =>
option.setName('time')
.setDescription('Duration (monthly / perm)')
.setRequired(true))
.addStringOption(option =>
option.setName('type')
.setDescription('Product type')
.setRequired(true))

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
try {

console.log('Registering slash commands...');

await rest.put(
Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
{ body: commands }
);

console.log('Commands registered.');

} catch (error) {
console.error(error);
}
})();

client.once('clientReady', () => {
console.log(`Bot online as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {

if (!interaction.isChatInputCommand()) return;

await interaction.deferReply();



/* INFO */

if (interaction.commandName === 'info') {

const embed = new EmbedBuilder()
.setColor(0xffffff)
.setImage("https://cdn.discordapp.com/attachments/1473556214251257856/1473557047760130149/f4f4af726dc651a4565f826aaff3ef6b.gif")
.setDescription(`
# 🪽 ANGEL
• 1 MILLION PRIO
• NO CLIP
• CHATTAG
• KICKS PERMS
—————————————————————

• $10 (monthly)
• $15 (perm)

———————————————————

# • HORROR
• 1 MILLION PRIO
• NO CLIP
• CHATTAG
• KICKS PERMS
—————————————————————

• $10 (monthly)
• $15 (perm)
`);

return interaction.editReply({ embeds: [embed] });

}



/* PAYMENTS */

if (interaction.commandName === 'payments') {

const embed = new EmbedBuilder()
.setTitle("💳 Payment Methods")
.setColor(0x00ff99)
.setImage("https://cdn.discordapp.com/attachments/1473556214251257856/1473557047760130149/f4f4af726dc651a4565f826aaff3ef6b.gif")
.setDescription(`
CashApp  
https://cash.app/$Pabl0716

Zelle  
pableragalvisbolivar@gmail.com

PayPal  
https://www.paypal.me/Pogo2310

Binance (USDT)  
160027763
`);

const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setLabel("Pay with CashApp")
.setStyle(ButtonStyle.Link)
.setURL("https://cash.app/$Pabl0716"),

new ButtonBuilder()
.setLabel("Pay with PayPal")
.setStyle(ButtonStyle.Link)
.setURL("https://www.paypal.me/Pogo2310")

);

return interaction.editReply({
embeds: [embed],
components: [row]
});

}



/* LOG */

if (interaction.commandName === 'log') {

const user = interaction.options.getUser('user');
const price = interaction.options.getInteger('price');
const time = interaction.options.getString('time');
const type = interaction.options.getString('type');

const channel = interaction.guild.channels.cache.find(
c => c.name === "buyins"
);

if (!channel) {
return interaction.editReply({ content: "Buyins channel not found." });
}

const message = `USERID: ${user.id} — ${user} — $${price} • ${time} • ${type} 🎲`;

channel.send(message);

return interaction.editReply({
content: "Purchase logged successfully."
});

}

});

client.login(process.env.TOKEN);