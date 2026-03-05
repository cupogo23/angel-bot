// ===========================
// INDEX.JS - BOT VENTAS TMF
// ===========================

const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
});

// ===========================
// CONSTANTES
// ===========================
const GIF_URL = "https://cdn.discordapp.com/attachments/1473556214251257856/1473557047760130149/f4f4af726dc651a4565f826aaff3ef6b.gif";

// Métodos de pago
const pagos = [
    { id: 'paypal', label: 'PayPal', url: 'https://www.paypal.me/Pogo2310', style: 'PRIMARY' },
    { id: 'zelle', label: 'Zelle', url: 'mailto:pableragalvisbolivar@gmail.com', style: 'SUCCESS' },
    { id: 'binance', label: 'Binance', url: 'https://www.binance.com/en/my/wallet', style: 'PRIMARY' },
    { id: 'yappy', label: 'Yappy', url: 'https://yappy.com', style: 'DANGER' },
    { id: 'cashapp', label: 'Cash App', url: 'https://cash.app/$Pabl0716', style: 'SUCCESS' }
];

// ===========================
// BOT LISTO
// ===========================
client.once('ready', () => {
    console.log(`Bot listo como ${client.user.tag}`);
});

// ===========================
// INTERACCIONES
// ===========================
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    // ===========================
    // /info
    // ===========================
    if (interaction.commandName === 'info') {
        const embed = new MessageEmbed()
            .setTitle("ℹ️ Información de Servicios")
            .setDescription(`# :wing: ANGEL
# •1 MILLION PRIO
# •NO CLIP
# • CHATTAG
# • KICKS PERMS
—————————————————————-
# • $10 (monthly)
# • $15 (perm)`)
            .setColor("#00ff88")
            .setImage(GIF_URL)
            .setFooter("TMF Ventas");

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    // ===========================
    // /payments
    // ===========================
    if (interaction.commandName === 'payments') {
        const row = new MessageActionRow();
        pagos.forEach(p => {
            row.addComponents(
                new MessageButton()
                    .setLabel(p.label)
                    .setStyle('LINK')
                    .setURL(p.url)
            );
        });

        const embed = new MessageEmbed()
            .setTitle("💰 Métodos de pago")
            .setDescription("Selecciona tu método de pago haciendo clic en el botón correspondiente.")
            .setColor("#FFAA28")
            .setImage(GIF_URL)
            .setTimestamp();

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
});

// ===========================
// LOGIN DEL BOT
// ===========================
client.login(process.env.TOKEN);