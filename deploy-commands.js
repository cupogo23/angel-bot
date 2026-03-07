require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

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
.setRequired(true))
.addStringOption(option =>
option.setName('type')
.setDescription('Product type')
.setRequired(true))

].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
try {

console.log("Refreshing slash commands...");

await rest.put(
Routes.applicationGuildCommands(
process.env.CLIENT_ID,
process.env.GUILD_ID
),
{ body: commands },
);

console.log("Slash commands refreshed.");

} catch (error) {
console.error(error);
}
})();