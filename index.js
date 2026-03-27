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

/* COMMANDS */

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
.setDescription('Duration')
.setRequired(true)
.addChoices(
    { name: 'Monthly', value: 'monthly' },
    { name: 'Permanent', value: 'perm' }
))
.addStringOption(option =>
option.setName('type')
.setDescription('Product type')
.setRequired(true)
.addChoices(
    { name: 'Angel', value: 'angel' },
    { name: 'Horror', value: 'horror' }
))

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

/* READY */

client.once('ready', () => {
console.log(`Bot online as ${client.user.tag}`);
});

/* INTERACTIONS */

client.on('interactionCreate', async interaction => {

if (!interaction.isChatInputCommand()) return;

await interaction.deferReply();

/* INFO */

if (interaction.commandName === 'info') {

const embed = new EmbedBuilder()
.setColor(0xffffff)
.setImage("https://cdn.discordapp.com/attachments/1473556214251257856/1473557047760130149/f4f4af726dc651a4565f826aaff3ef6b.gif")
.setDescription(`
## 🪽 ANGEL
• 1M Priority Queue  
• NoClip  
• Custom Chat Tag  
• Kick Permissions  

💰 $10 Monthly  
💰 $15 Lifetime  

━━━━━━━━━━━━━━━━━━

## 👻 HORROR
• 1M Priority Queue  
• NoClip  
• Custom Chat Tag  
• Kick Permissions  

💰 $10 Monthly  
💰 $15 Lifetime  
`);

return interaction.editReply({ embeds: [embed] });

}

/* PAYMENTS */

if (interaction.commandName === 'payments') {

const embed = new EmbedBuilder()
.setTitle("💳 PAYMENT METHODS")
.setColor(0x00ff99)
.setImage("https://cdn.discordapp.com/attachments/1473556214251257856/1473557047760130149/f4f4af726dc651a4565f826aaff3ef6b.gif")
.setDescription(`

**CashApp**
https://cash.app/$Pabl0716

**PayPal**
https://www.paypal.me/Pogo2310

**Zelle**
williamjrd2000@gmail.com

**Binance (USDT ID)**
160027763

`);

const row = new ActionRowBuilder()
.addComponents(

new ButtonBuilder()
.setLabel("CashApp")
.setStyle(ButtonStyle.Link)
.setURL("https://cash.app/$Pabl0716"),

new ButtonBuilder()
.setLabel("PayPal")
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

/* FIX DEFINITIVO (NO FALLA) */
let emoji = "🎲";

if (type.includes("angel")) {
    emoji = "🪽";
} else if (type.includes("horror")) {
    emoji = "ホ";
}

/* BUSCAR CANAL */
const channel = interaction.guild.channels.cache.find(
    c => c.name === "buyins"
);

if (!channel) {
    return interaction.editReply({ content: "Buyins channel not found." });
}

/* MENSAJE */
const message = `USERID: ${user.id} — ${user} — $${price} • ${time} • ${type} ${emoji}`;

/* ENVIAR */
channel.send(message);

return interaction.editReply({
    content: "Purchase logged successfully."
});

}

});

/* LOGIN */

client.login(process.env.TOKEN);