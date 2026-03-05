// ===========================
// INDEX.JS COMPLETO - BOT VENTAS TMF
// ===========================

const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS
] });

const CHANNEL_VENTAS = "1472426456108761159"; // Canal de ventas
const GIF_URL = "https://cdn.discordapp.com/attachments/1473556214251257856/1473557047760130149/f4f4af726dc651a4565f826aaff3ef6b.gif";

// ===========================
// BOT LISTO
// ===========================
client.once('ready', () => {
    console.log(`Bot listo como ${client.user.tag}`);
});

// ===========================
// UN SOLO LISTENER PARA INTERACCIONES
// ===========================
client.on('interactionCreate', async interaction => {

    // ===========================
    // DEPURACIÓN
    // ===========================
    console.log('Interacción detectada:', interaction.commandName || interaction.customId);

    // ===========================
    // SLASH COMMAND /INFO
    // ===========================
    if (interaction.isCommand()) {
        if (interaction.commandName === 'info') {
            const embed = new MessageEmbed()
                .setTitle("ℹ️ Información de Servicios")
                .setDescription("Aquí van los servicios que ofrecemos...")
                .setColor("#00ff88")
                .setFooter("TMF Ventas")
                .setImage(GIF_URL);

            await interaction.reply({ embeds: [embed] });
        }

        // ===========================
        // SLASH COMMAND /BUYINGS - REGISTRAR COMPRA
        // ===========================
        if (interaction.commandName === 'buyings') {
            // Obtener usuario mencionado o por defecto quien ejecuta
            const ticketUser = interaction.options.getUser('usuario') || interaction.user;

            // Botones tipo de prio
            const rowPrio = new MessageActionRow()
                .addComponents(
                    new MessageButton().setCustomId('prio_mensual').setLabel('Prio Mensual').setStyle('PRIMARY'),
                    new MessageButton().setCustomId('prio_permanente').setLabel('Prio Permanente').setStyle('DANGER')
                );

            await interaction.reply({
                content: `Selecciona el tipo de prio para ${ticketUser.username}`,
                components: [rowPrio],
                ephemeral: true
            });
        }
    }

    // ===========================
    // BOTONES INTERACTIVOS
    // ===========================
    if (interaction.isButton()) {

        // Botones tipo de prio
        if (interaction.customId === "prio_mensual" || interaction.customId === "prio_permanente") {
            const tipo = interaction.customId === "prio_mensual" ? "Mensual" : "Permanente";
            interaction.message.tipoPrio = tipo;

            // Botones método de pago
            const rowPago = new MessageActionRow()
                .addComponents(
                    new MessageButton().setCustomId('paypal').setLabel('PayPal').setStyle('PRIMARY'),
                    new MessageButton().setCustomId('binance').setLabel('Binance').setStyle('SUCCESS'),
                    new MessageButton().setCustomId('yappy').setLabel('Yappy').setStyle('DANGER')
                );

            await interaction.reply({
                content: `Selecciona el método de pago para ${tipo}`,
                components: [rowPago],
                ephemeral: true
            });
            return;
        }

        // Botones método de pago
        if (['paypal', 'binance', 'yappy'].includes(interaction.customId)) {
            const metodo = interaction.customId.charAt(0).toUpperCase() + interaction.customId.slice(1);
            const tipo = interaction.message.tipoPrio || "Mensual";

            // Usuario original
            const ticketUser = interaction.message.interaction?.options?.getUser('usuario') || interaction.user;
            const ticketUserId = ticketUser.id;

            // Embed final
            const embed = new MessageEmbed()
                .setTitle("🧾 Compra registrada")
                .setColor("#00ff88")
                .addFields(
                    { name: "👤 Usuario", value: `<@${ticketUserId}>`, inline: true },
                    { name: "🆔 Discord ID", value: ticketUserId, inline: true },
                    { name: "📦 Producto", value: "Prio FiveM", inline: true },
                    { name: "⏱ Duración", value: tipo, inline: true },
                    { name: "💰 Método de Pago", value: metodo, inline: true },
                    { name: "👮 Registrado por", value: `<@${interaction.user.id}>`, inline: true }
                )
                .setImage(GIF_URL)
                .setFooter("Sistema de ventas TMF")
                .setTimestamp();

            const logChannel = client.channels.cache.get(CHANNEL_VENTAS);
            if (logChannel) logChannel.send({ embeds: [embed] });

            await interaction.reply({ content: `✅ Compra registrada: ${tipo} / ${metodo}`, ephemeral: true });
        }
    }

});

// ===========================
// LOGIN DEL BOT
// ===========================
client.login(process.env.TOKEN);