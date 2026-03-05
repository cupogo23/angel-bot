const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder,
  SlashCommandBuilder,
  Routes,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField
} = require('discord.js');

const { REST } = require('@discordjs/rest');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ]
});

// ===== EMBED + BOTONES PAYMENTS =====
function createPaymentMessage() {

  const embed = new EmbedBuilder()
    .setColor('#0f0f0f')
    .setTitle('💸 Angel Store | Official Payments')
    .setDescription(`
🇪🇸 Después de realizar el pago, envía el comprobante al staff.

🇺🇸 After completing the payment, please send the receipt to staff.
`)
    .setImage('https://cdn.discordapp.com/attachments/1478818162106433618/1478821886493458574/angelgg.gif')
    .setFooter({ text: 'Angel Store • Secure Payments' })
    .setTimestamp();

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setLabel('PayPal')
        .setStyle(ButtonStyle.Link)
        .setURL('https://www.paypal.me/Pogo2310'),

      new ButtonBuilder()
        .setLabel('Binance UID')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('binance'),

      new ButtonBuilder()
        .setLabel('Yappy')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('yappy'),

      new ButtonBuilder()
        .setLabel('Zelle')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('zelle')
    );

  return { embed, row };
}

// ===== EVENTO INTERACCIONES =====
client.on('interactionCreate', async interaction => {

  // ===== SLASH COMMANDS =====
  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === 'payments') {
      const { embed, row } = createPaymentMessage();
      await interaction.reply({ embeds: [embed], components: [row] });
    }

    if (interaction.commandName === 'info') {

      const embed = new EmbedBuilder()
        .setColor('#0f0f0f')
        .setTitle('🪽 ANGEL PACKAGE')
        .setDescription(`
• 1 MILLION PRIO  
• NO CLIP  
• CHATTAG  
• KICKS PERMS  

────────────────────

💵 $10 (monthly)  
💎 $15 (perm)
        `)
        .setFooter({ text: 'Angel Store • Official Package' })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  }

  // ===== RESPUESTAS A BOTONES =====
  if (interaction.isButton()) {

    switch (interaction.customId) {

      case 'binance':
        await interaction.reply({ 
          content: '🪙 Binance UID: 160027763',
          ephemeral: true 
        });
        break;

      case 'yappy':
        await interaction.reply({ 
          content: '📱 Yappy: 64135496',
          ephemeral: true 
        });
        break;

      case 'zelle':
        await interaction.reply({ 
          content: '🏦 Zelle: pableragalvisbolivar@gmail.com',
          ephemeral: true 
        });
        break;
    }
  }
});

// ===== REGISTRO SLASH COMMANDS =====
const commands = [
  new SlashCommandBuilder()
    .setName('payments')
    .setDescription('Show official payment methods')
    .toJSON(),

  new SlashCommandBuilder()
    .setName('info')
    .setDescription('Show Angel package information')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registrando comandos slash...');
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands },
    );
    console.log('Comandos registrados correctamente.');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log(`Bot listo como ${client.user.tag}`);
});

client.login(process.env.TOKEN);