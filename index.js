// ===========================
// INDEX.JS COMPLETO - BOT VENTAS TMF
// ===========================

const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

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
            .setTitle("🪽 ANGEL")
            .setDescription(
`• 1 MILLION PRIO
• NO CLIP
• CHATTAG
• KICKS PERMS
—————————————————————-
• $10 (monthly)
• $15 (perm)`
            )
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
                new MessageButton().setCustomId('zelle').setLabel('Zelle').setStyle('SECONDARY')
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

    const metodo = interaction.customId.charAt(0).toUpperCase() + interaction.customId.slice(1);

    // Confirmación privada al usuario
    await interaction.reply({ content: `✅ Has seleccionado: ${metodo}`, ephemeral: true });
});

// ===========================
// LOGIN DEL BOT
// ===========================
client.login(process.env.TOKEN);