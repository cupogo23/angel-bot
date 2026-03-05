// ===========================
// INDEX.JS COMPLETO - BOT VENTAS TMF (Compatible v13)
// ===========================

const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

const CHANNEL_VENTAS = "1472426456108761159"; // Canal de ventas
const GIF_URL = "https://cdn.discordapp.com/attachments/1473556214251257856/1473557047760130149/f4f4af726dc651a4565f826aaff3ef6b.gif";

// ===========================
// BOT LISTO
// ===========================
client.once('ready', () => {
    console.log(`Bot listo como ${client.user.tag}`);
});

// ===========================
// ESCUCHA DE INTERACCIONES
// ===========================
client.on('interactionCreate', async interaction => {

    console.log('Interacción detectada:', interaction.commandName || interaction.customId);

    // ---------------------------
    // SLASH COMMANDS
    // ---------------------------
    if (interaction.isCommand()) {

        // /info
        if (interaction.commandName === 'info') {
            const embed = new MessageEmbed()
                .setTitle("ℹ️ Información de Servicios")
                .setDescription("Bienvenido a TMF Ventas, aquí ofrecemos los mejores servicios para tu experiencia FiveM:\n\n- Prio Mensual: acceso limitado de 30 días\n- Prio Permanente: acceso ilimitado\n- Métodos de pago: PayPal, Binance, Yappy")
                .setColor("#00ff88")
                .setFooter("TMF Ventas")
                .setImage(GIF_URL);

            await interaction.reply({ embeds: [embed] });
        }

        // /buyings
        if (interaction.commandName === 'buyings') {
            const ticketUser = interaction.options.getUser('usuario') || interaction.user;

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

        // /payments
        if (interaction.commandName === 'payments') {
            await interaction.reply({
                content: "Métodos de pago disponibles:\n- PayPal\n- Binance\n- Yappy",
                ephemeral: true
            });
        }
    }

    // ---------------------------
    // BOTONES
    // ---------------------------
    if (interaction.isButton()) {

        // Tipo de prio
        if (interaction.customId === "prio_mensual" || interaction.customId === "prio_permanente") {
            const tipo = interaction.customId === "prio_mensual" ? "Mensual" : "Permanente";
            interaction.message.tipoPrio = tipo;

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

        // Método de pago
        if (['paypal','binance','yappy'].includes(interaction.customId)) {
            const metodo = interaction.customId.charAt(0).toUpperCase() + interaction.customId.slice(1);
            const tipo = interaction.message.tipoPrio || "Mensual";
            const ticketUser = interaction.message.interaction?.options?.getUser('usuario') || interaction.user;
            const ticketUserId = ticketUser.id;

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

            await interaction.reply({
                content: `✅ Compra registrada: ${tipo} / ${metodo}`,
                ephemeral: true
            });
        }
    }

});

// ===========================
// LOGIN DEL BOT
// ===========================
client.login(process.env.TOKEN);