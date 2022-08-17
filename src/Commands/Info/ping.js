const { Client, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    name: 'ping',
    description: '🏓 Pong!',
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        await interaction.reply({ content: '🏓 Pong!' });
        return interaction.editReply({ content: `🏓 Pong! Latency is **${Date.now() - interaction.createdTimestamp}**ms.`});
    }
}