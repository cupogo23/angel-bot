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
                new MessageButton().setLabel('PayPal').setStyle('LINK').setURL('https://www.paypal.me/Pogo2310'),
                new MessageButton().setLabel('Zelle').setStyle('LINK').setURL('mailto:pableragalvisbolivar@gmail.com'),
                new MessageButton().setLabel('Binance').setStyle('LINK').setURL('https://www.binance.com/en/my/wallet/account/160027763'),
                new MessageButton().setLabel('Yappy').setStyle('LINK').setURL('https://yappy.app/'), // Si quieres tu enlace directo, ponlo aquí
                new MessageButton().setLabel('Cash App').setStyle('LINK').setURL('https://cash.app/$Pabl0716')
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
// LOGIN DEL BOT
// ===========================
client.login(process.env.TOKEN);