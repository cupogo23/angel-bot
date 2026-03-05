// ===========================
// INDEX.JS COMPLETO - BOT VENTAS TMF (v13 estable con botones)
// ===========================

const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const CHANNEL_VENTAS = "1472426456108761159"; // Canal donde se registran las compras
const GIF_URL = "https://cdn.discordapp.com/attachments/1473556214251257856/1473557047760130149/f4f4af726dc651a4565f826aaff3ef6b.gif";

// ===========================
// BOT LISTO
// ===========================
client.once('ready', () => {
    console.log(`Bot listo como ${client.user.tag}`);
});

// ===========================
// SLASH COMMANDS
// ===========================
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    // /info
    if (interaction.commandName === 'info') {
        const embed = new MessageEmbed()
            .setTitle("ℹ️ Información de Servicios")
            .setDescription("Bienvenido a TMF Ventas, aquí ofrecemos los mejores servicios para tu experiencia FiveM:\n\n- Prio Mensual: acceso limitado de 30 días\n- Prio Permanente: acceso ilimitado")
            .setColor("#00ff88")
            .setFooter("TMF Ventas")
            .setImage(GIF_URL);

        await interaction.reply({ embeds: [embed] });
    }

    // /payments
    if (interaction.commandName === 'payments') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton().setCustomId('paypal').setLabel('PayPal').setStyle('PRIMARY'),
                new MessageButton().setCustomId('binance').setLabel('Binance').setStyle('SUCCESS'),
                new MessageButton().setCustomId('yappy').setLabel('Yappy').setStyle('DANGER'),
                new MessageButton().setCustomId('cl').setLabel('CL').setStyle('SECONDARY')
            );

        const embed = new MessageEmbed()
            .setTitle("💳 Métodos de Pago")
            .setDescription("Selecciona tu método de pago:")
            .setColor("#ffcc00")
            .setImage(GIF_URL)
            .setFooter("TMF Ventas");

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
});

// ===========================
// MANEJO DE BOTONES
// ===========================
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    // Detecta cuál botón se tocó
    const metodo = interaction.customId.charAt(0).toUpperCase() + interaction.customId.slice(1);

    // Embed final que se envía al canal de ventas
    const embed = new MessageEmbed()
        .setTitle("🧾 Método de pago seleccionado")
        .setColor("#00ff88")
        .addFields(
            { name: "👤 Usuario", value: `<@${interaction.user.id}>`, inline: true },
            { name: "💰 Método de Pago", value: metodo, inline: true }
        )
        .setImage(GIF_URL)
        .setFooter("Sistema de ventas TMF")
        .setTimestamp();

    const logChannel = client.channels.cache.get(CHANNEL_VENTAS);
    if (logChannel) logChannel.send({ embeds: [embed] });

    await interaction.reply({ content: `✅ Has seleccionado: ${metodo}`, ephemeral: true });
});

// ===========================
// LOGIN DEL BOT
// ===========================
client.login(process.env.TOKEN);