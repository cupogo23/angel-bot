// ===========================
// INDEX.JS COMPLETO - BOT VENTAS TMF (Discord.js v14)
// ===========================

const { Client, GatewayIntentBits, Partials, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel] // Para mensajes parciales si se necesita
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
// UN SOLO LISTENER PARA INTERACCIONES
// ===========================
client.on('interactionCreate', async interaction => {

    // DEPURACIÓN
    console.log('Interacción detectada:', interaction.commandName || interaction.customId);

    // SLASH COMMANDS
    if (interaction.isChatInputCommand()) {

        if (interaction.commandName === 'info') {
            const embed = new EmbedBuilder()
                .setTitle("ℹ️ Información de Servicios")
                .setDescription("Aquí van los servicios que ofrecemos...")
                .setColor("#00ff88")
                .setFooter({ text: "TMF Ventas" })
                .setImage(GIF_URL);

            await interaction.reply({ embeds: [embed] });
        }

        if (interaction.commandName === 'buyings') {
            const ticketUser = interaction.options.getUser('usuario') || interaction.user;

            const rowPrio = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId('prio_mensual').setLabel('Prio Mensual').setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId('prio_permanente').setLabel('Prio Permanente').setStyle(ButtonStyle.Danger)
                );

            await interaction.reply({
                content: `Selecciona el tipo de prio para ${ticketUser.username}`,
                components: [rowPrio],
                ephemeral: true
            });
        }
    }

    // BOTONES
    if (interaction.isButton()) {

        // Botones tipo de prio
        if (interaction.customId === "prio_mensual" || interaction.customId === "prio_permanente") {
            const tipo = interaction.customId === "prio_mensual" ? "Mensual" : "Permanente";
            interaction.message.tipoPrio = tipo;

            const rowPago = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId('paypal').setLabel('PayPal').setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId('binance').setLabel('Binance').setStyle(ButtonStyle.Success),
                    new ButtonBuilder().setCustomId('yappy').setLabel('Yappy').setStyle(ButtonStyle.Danger)
                );

            await interaction.reply({
                content: `Selecciona el método de pago para ${tipo}`,
                components: [rowPago],
                ephemeral: true
            });
            return;
        }

        // Botones de método de pago
        if (['paypal', 'binance', 'yappy'].includes(interaction.customId)) {
            const metodo = interaction.customId.charAt(0).toUpperCase() + interaction.customId.slice(1);
            const tipo = interaction.message.tipoPrio || "Mensual";
            const ticketUser = interaction.message.interaction?.options?.getUser('usuario') || interaction.user;
            const ticketUserId = ticketUser.id;

            const embed = new EmbedBuilder()
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
                .setFooter({ text: "Sistema de ventas TMF" })
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