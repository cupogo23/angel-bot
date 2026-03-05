require('dotenv').config();
const { 
  Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder,
  ButtonBuilder, ButtonStyle, SlashCommandBuilder,
  REST, Routes, AttachmentBuilder
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const rest = new REST({ version: '10' }).setToken(TOKEN);

// COMANDOS
const commands = [
  new SlashCommandBuilder()
    .setName('payments')
    .setDescription('Show payment methods | Mostrar métodos de pago'),

  new SlashCommandBuilder()
    .setName('info')
    .setDescription('Show service info | Mostrar información del servicio')
].map(c => c.toJSON());

(async () => {
  try {
    console.log("🔄 Syncing commands...");
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("✅ Commands updated");
  } catch (err) {
    console.error(err);
  }
})();

client.once('ready', () => {
  console.log(`🤖 Bot listo como ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {

  if (interaction.isChatInputCommand()) {

    const gif = new AttachmentBuilder('./assets/angel.gif');

    // PAYMENTS
    if (interaction.commandName === "payments") {

      const embed = new EmbedBuilder()
        .setTitle("💰 PAYMENT METHODS | MÉTODOS DE PAGO")
        .setDescription(
`Select a payment method below
Selecciona un método de pago abajo

🏦 Zelle / Binance → Click button
💳 CashApp / PayPal → Direct payment

After paying send proof to an admin.
Después de pagar envía el comprobante.`
        )
        .setColor(0x2B2D31)
        .setImage("attachment://angel.gif")
        .setFooter({ text: "ANGEL SERVICE" })
        .setTimestamp();

      const rowLinks = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("CashApp")
          .setStyle(ButtonStyle.Link)
          .setURL("https://cash.app"),

        new ButtonBuilder()
          .setLabel("PayPal")
          .setStyle(ButtonStyle.Link)
          .setURL("https://paypal.me")
      );

      const rowButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("zelle")
          .setLabel("Zelle")
          .setEmoji("🏦")
          .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId("binance")
          .setLabel("Binance ID")
          .setEmoji("🟡")
          .setStyle(ButtonStyle.Primary)
      );

      await interaction.reply({
        embeds: [embed],
        components: [rowLinks, rowButtons],
        files: [gif]
      });

    }

    // INFO
    if (interaction.commandName === "info") {

      const embed = new EmbedBuilder()
        .setTitle("👼 ANGEL SERVICE")
        .setDescription(
`Services | Servicios

• 1 MILLION PRIO
• NO CLIP
• CHATTAG
• KICKS PERMS

━━━━━━━━━━━━━━

Prices | Precios

• $10 Monthly
• $15 Permanent`
        )
        .setColor(0x00FFFF)
        .setImage("attachment://angel.gif")
        .setFooter({ text: "Angel Service" });

      await interaction.reply({
        embeds: [embed],
        files: [gif]
      });

    }
  }

  // BOTONES
  if (interaction.isButton()) {

    if (interaction.customId === "zelle") {
      await interaction.reply({
        content: "🏦 **Zelle Email**\n`pableragalvisbolivar@gmail.com`",
        ephemeral: true
      });
    }

    if (interaction.customId === "binance") {
      await interaction.reply({
        content: "🟡 **Binance Pay ID**\n`160027763`",
        ephemeral: true
      });
    }

  }

});

client.login(TOKEN);