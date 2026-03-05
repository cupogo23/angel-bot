require('dotenv').config();
const { 
  Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, 
  ButtonBuilder, ButtonStyle, SlashCommandBuilder, REST, Routes 
} = require('discord.js');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;
const rest = new REST({ version: '10' }).setToken(TOKEN);

// 1. REGISTRO DE COMANDOS
const commands = [
  new SlashCommandBuilder().setName('payments').setDescription('Mostrar métodos de pago'),
  new SlashCommandBuilder().setName('info').setDescription('Mostrar info del servicio')
].map(cmd => cmd.toJSON());

(async () => {
  try {
    console.log('⏳ Sincronizando comandos estéticos...');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
    console.log('✅ Sistema listo y actualizado.');
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();

client.on('interactionCreate', async interaction => {
  
  // MANEJO DE COMANDOS SLASH
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'payments') {
      const embed = new EmbedBuilder()
        .setTitle('─── · 。ﾟ☆: *. 💰 PAYMENT METHODS .* :☆ﾟ. ───')
        .setDescription(
          '**¡Hola! Para adquirir nuestros servicios, elige un método:**\n\n' +
          '> 🏦 **Zelle & Binance:** Haz clic en los botones azules abajo.\n' +
          '> 💳 **CashApp & PayPal:** Usa los botones de enlace directo.\n\n' +
          '*Una vez realizado el pago, envía el comprobante a un administrador.*'
        )
        .addFields(
          { name: '✨ Disponibilidad', value: '🟢 24/7 Instantáneo', inline: true },
          { name: '🛡️ Seguridad', value: '🔒 Transacción Segura', inline: true }
        )
        .setColor(0x2B2D31) 
        .setImage('https://cdn.discordapp.com')
        .setFooter({ text: 'ANGEL SERVICE • Elige tu método', iconURL: interaction.guild.iconURL() })
        .setTimestamp();

      const rowLinks = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel('CashApp').setStyle(ButtonStyle.Link).setURL('https://cash.app'),
        new ButtonBuilder().setLabel('PayPal').setStyle(ButtonStyle.Link).setURL('https://www.paypal.me')
      );

      const rowMethods = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('ver_zelle').setLabel('Zelle').setStyle(ButtonStyle.Primary).setEmoji('🏦'),
        new ButtonBuilder().setCustomId('ver_binance').setLabel('Binance ID').setStyle(ButtonStyle.Primary).setEmoji('🟡')
      );

      await interaction.reply({ embeds: [embed], components: [rowLinks, rowMethods] });
    }

    if (interaction.commandName === 'info') {
      const embed = new EmbedBuilder()
        .setTitle('👼 ANGEL INFO')
        .setDescription(`• 1 MILLION PRIO\n• NO CLIP\n• CHATTAG\n• KICKS PERMS\n—————————————————————\n• $10 (monthly)\n• $15 (perm)`)
        .setColor(0x00FFFF)
        .setImage('https://cdn.discordapp.com');

      await interaction.reply({ embeds: [embed] });
    }
  }

  // MANEJO DE BOTONES (LOGICA DE RESPUESTA)
  if (interaction.isButton()) {
    try {
      if (interaction.customId === 'ver_zelle') {
        await interaction.reply({ 
          content: '🏦 **Información de Zelle:**\nCorreo: `pableragalvisbolivar@gmail.com`', 
          ephemeral: true 
        });
      } else if (interaction.customId === 'ver_binance') {
        await interaction.reply({ 
          content: '🟡 **Información de Binance:**\nID: `160027763`', 
          ephemeral: true 
        });
      }
    } catch (error) {
      console.error('Error al responder al botón:', error);
    }
  }
});

client.login(TOKEN);