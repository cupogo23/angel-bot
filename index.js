// ===========================
// BOT VENTAS TMF - v13
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
// SLASH COMMAND /INFO
// ===========================
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'info') {
        const embed = new MessageEmbed()
            .setTitle("ℹ️ Información de ANGEL")
            .setDescription("# :wing: ANGEL\n# •1 MILLION PRIO\n# •NO CLIP\n# • CHATTAG\n# • KICKS PERMS\n—————————————————————-\n# • $10 (monthly)\n# • $15 (perm)")
            .setColor("#00ff88")
            .setImage(GIF_URL)
            .setFooter("TMF Ventas");

        await interaction.reply({ embeds: [embed] });
    }

    if (interaction.commandName === 'payments') {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton().setLabel("PayPal").setStyle("LINK").setURL("https://www.paypal.me/Pogo2310"),
                new MessageButton().setLabel("Zelle").setStyle("LINK").setURL("mailto:pableragalvisbolivar@gmail.com"),
                new MessageButton().setLabel("Binance").setStyle("LINK").setURL("https://www.binance.com/es/my/wallet/account/overview?ref=160027763"),
                new MessageButton().setLabel("Yappy").setStyle("LINK").setURL("https://yappy.com/"),
                new MessageButton().setLabel("Cash App").setStyle("LINK").setURL("https://cash.app/$Pabl0716")
            );

        const embed = new MessageEmbed()
            .setTitle("💰 Métodos de pago")
            .setDescription("Selecciona tu método de pago haciendo clic en el botón correspondiente.")
            .setColor("#00ff88")
            .setImage(GIF_URL)
            .setFooter("TMF Ventas");

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
});

// ===========================
// LOGIN DEL BOT
// ===========================
client.login(process.env.TOKEN);