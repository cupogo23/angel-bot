const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder,
  SlashCommandBuilder,
  Routes,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
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

// ===== EMBED + BOTONES =====
function createPaymentMessage() {

  const embed = new EmbedBuilder()
    .setColor('#0f0f0f')
    .setTitle('💸 Angel Store | Official Payments')
    .setDescription(`
🇪🇸 Después de realizar el pago, envía el comprobante al staff.

🇺🇸 After completing the payment, please send the receipt to staff.
`)
    .setImage('https://cdn.discordapp.com/attachments/1478818162106433618/1478821886493458574/angelgg.gif')
    .setFooter({ text: 'Angel Store • Secure Payments' });

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

// ===== COMANDO CLÁSICO =====
client.on('messageCreate', message => {
  if (message.content === '!pagos') {
    const { embed, row } = createPaymentMessage();
    message.channel.send({ embeds: [embed], components: [row] });
  }
});

// ===== SLASH COMMAND =====
client.on('interactionCreate', async interaction => {

  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'payments') {
      const { embed, row } = createPaymentMessage();
      await interaction.reply({ embeds: [embed], components: [row] });
    }
  }

  // ===== RESPUESTAS A BOTONES =====
  if (interaction.isButton()) {

    if (interaction.customId === 'binance') {
      await interaction.reply({ 
        content: '🪙 Binance UID: 160027763',
        ephemeral: true 
      });
    }

    if (interaction.customId === 'yappy') {
      await interaction.reply({ 
        content: '📱 Yappy: 64135496',
        ephemeral: true 
      });
    }

    if (interaction.customId === 'zelle') {
      await interaction.reply({ 
        content: '🏦 Zelle: pableragalvisbolivar@gmail.com',
        ephemeral: true 
      });
    }

  }
});

// ===== REGISTRO SLASH INSTANTÁNEO =====
const commands = [
  new SlashCommandBuilder()
    .setName('payments')
    .setDescription('Show official payment methods')
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registrando comando slash...');
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        '1472410075439042707'
      ),
      { body: commands },
    );
    console.log('Comando /payments registrado.');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', () => {
  console.log(`Bot listo como ${client.user.tag}`);
});

client.login(process.env.TOKEN);