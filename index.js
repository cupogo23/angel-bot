require('dotenv').config();

const {
Client,
GatewayIntentBits,
EmbedBuilder,
SlashCommandBuilder,
Routes,
REST
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

client.once('ready', () => {
console.log(`Bot online as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {

if (!interaction.isChatInputCommand()) return;

if (interaction.commandName === 'info') {

const embed = new EmbedBuilder()
.setTitle('🪽 ANGEL SERVICES')
.setColor(0xffffff)
.setDescription(`
**ANGEL**

• 1 MILLION PRIO  
• NO CLIP  
• CHATTAG  
• KICKS PERMS  

Price:
• $10 (monthly)  
• $15 (perm)

──────────────

**HORROR**

• 1 MILLION PRIO  
• NO CLIP  
• CHATTAG  
• KICKS PERMS  

Price:
• $10 (monthly)  
• $15 (perm)
`);

interaction.reply({ embeds: [embed] });

}


if (interaction.commandName === 'payments') {

const embed = new EmbedBuilder()
.setTitle('💳 Payment Methods')
.setColor(0x00ff99)
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

interaction.reply({ embeds: [embed] });

}


if (interaction.commandName === 'log') {

const user = interaction.options.getUser('user');
const price = interaction.options.getInteger('price');
const time = interaction.options.getString('time');
const type = interaction.options.getString('type');

const channel = interaction.guild.channels.cache.find(
c => c.name === "buyins"
);

if (!channel) {
return interaction.reply({ content: "Buyins channel not found.", ephemeral: true });
}

const message = `USERID: ${user.id} — ${user} — $${price} • ${time} • ${type} 🎲`;

channel.send(message);

interaction.reply({
content: "Purchase logged successfully.",
ephemeral: true
});

}

});

client.login(process.env.TOKEN);